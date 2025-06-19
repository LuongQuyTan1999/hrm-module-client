// src/shared/lib/auth-storage.ts
// import { User } from "@/entities/auth/model/types";
import { AuthTokens, User } from "../types/auth";
import { Storage } from "./storage";

export interface StoredAuthData {
  user: User;
  tokens: AuthTokens;
  lastActivity: number;
  deviceId: string;
}

export class AuthStorage {
  // Storage keys
  private static readonly AUTH_TOKEN_KEY = "auth_access_token";
  private static readonly REFRESH_TOKEN_KEY = "auth_refresh_token";
  private static readonly USER_DATA_KEY = "auth_user_data";
  private static readonly DEVICE_ID_KEY = "auth_device_id";
  private static readonly LAST_ACTIVITY_KEY = "auth_last_activity";
  private static readonly SESSION_EXPIRY_KEY = "auth_session_expiry";

  // Session configuration
  private static readonly SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
  private static readonly ACTIVITY_UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

  /**
   * Get access token
   */
  static getAccessToken(): string | null {
    return Storage.getItem<string>(this.AUTH_TOKEN_KEY);
  }

  /**
   * Set access token with expiry
   */
  static setAccessToken(token: string, expiresAt?: number): boolean {
    const success = Storage.setItem(this.AUTH_TOKEN_KEY, token);

    if (success && expiresAt) {
      Storage.setItem(this.SESSION_EXPIRY_KEY, expiresAt);
    }

    this.updateLastActivity();
    return success;
  }

  /**
   * Get refresh token
   */
  static getRefreshToken(): string | null {
    return Storage.getItem<string>(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Set refresh token
   */
  static setRefreshToken(token: string): boolean {
    return Storage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Set both tokens
   */
  static setTokens(tokens: AuthTokens): boolean {
    const accessSuccess = this.setAccessToken(
      tokens.accessToken,
      tokens.expiresAt
    );
    const refreshSuccess = this.setRefreshToken(tokens.refreshToken);

    return accessSuccess && refreshSuccess;
  }

  /**
   * Get user data
   */
  static getUserData<T extends User = User>(): T | null {
    return Storage.getItem<T>(this.USER_DATA_KEY);
  }

  /**
   * Set user data
   */
  static setUserData<T extends User = User>(userData: T): boolean {
    const success = Storage.setItem(this.USER_DATA_KEY, userData);
    this.updateLastActivity();
    return success;
  }

  /**
   * Update user data partially
   */
  static updateUserData<T extends User = User>(updates: Partial<T>): boolean {
    const currentUser = this.getUserData<T>();
    if (!currentUser) return false;

    const updatedUser = { ...currentUser, ...updates };
    return this.setUserData(updatedUser);
  }

  /**
   * Clear all auth data
   */
  static clearTokens(): boolean {
    const results = [
      Storage.removeItem(this.AUTH_TOKEN_KEY),
      Storage.removeItem(this.REFRESH_TOKEN_KEY),
      Storage.removeItem(this.USER_DATA_KEY),
      Storage.removeItem(this.SESSION_EXPIRY_KEY),
      Storage.removeItem(this.LAST_ACTIVITY_KEY),
    ];

    return results.every((result) => result);
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const hasToken = this.hasValidToken();
    const hasUser = Storage.hasItem(this.USER_DATA_KEY);
    const isSessionValid = this.isSessionValid();

    return hasToken && hasUser && isSessionValid;
  }

  /**
   * Check if access token exists and is valid
   */
  static hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    const expiryTime = Storage.getItem<number>(this.SESSION_EXPIRY_KEY);
    if (expiryTime && Date.now() >= expiryTime) {
      return false; // Token expired
    }

    return true;
  }

  /**
   * Check if session is still valid based on activity
   */
  static isSessionValid(): boolean {
    const lastActivity = Storage.getItem<number>(this.LAST_ACTIVITY_KEY);
    if (!lastActivity) return false;

    const now = Date.now();
    const timeSinceLastActivity = now - lastActivity;

    return timeSinceLastActivity < this.SESSION_TIMEOUT;
  }

  /**
   * Update last activity timestamp
   */
  static updateLastActivity(): void {
    Storage.setItem(this.LAST_ACTIVITY_KEY, Date.now());
  }

  /**
   * Get or generate device ID
   */
  static getDeviceId(): string {
    let deviceId = Storage.getItem<string>(this.DEVICE_ID_KEY);

    if (!deviceId) {
      deviceId = this.generateDeviceId();
      Storage.setItem(this.DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
  }

  /**
   * Generate unique device ID
   */
  private static generateDeviceId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2);
    return `device_${timestamp}_${randomPart}`;
  }

  /**
   * Get complete auth state
   */
  static getAuthState(): {
    isAuthenticated: boolean;
    user: User | null;
    hasValidToken: boolean;
    isSessionValid: boolean;
    lastActivity: number | null;
    deviceId: string;
  } {
    return {
      isAuthenticated: this.isAuthenticated(),
      user: this.getUserData(),
      hasValidToken: this.hasValidToken(),
      isSessionValid: this.isSessionValid(),
      lastActivity: Storage.getItem<number>(this.LAST_ACTIVITY_KEY),
      deviceId: this.getDeviceId(),
    };
  }

  /**
   * Get session info
   */
  static getSessionInfo(): {
    lastActivity: Date | null;
    expiresAt: Date | null;
    timeUntilExpiry: number | null;
    isExpired: boolean;
  } {
    const lastActivity = Storage.getItem<number>(this.LAST_ACTIVITY_KEY);
    const expiryTime = Storage.getItem<number>(this.SESSION_EXPIRY_KEY);

    const lastActivityDate = lastActivity ? new Date(lastActivity) : null;
    const expiryDate = expiryTime ? new Date(expiryTime) : null;

    const now = Date.now();
    const timeUntilExpiry = expiryTime ? expiryTime - now : null;
    const isExpired = expiryTime ? now >= expiryTime : false;

    return {
      lastActivity: lastActivityDate,
      expiresAt: expiryDate,
      timeUntilExpiry,
      isExpired,
    };
  }

  /**
   * Extend session
   */
  static extendSession(): boolean {
    if (!this.isAuthenticated()) return false;

    this.updateLastActivity();
    return true;
  }

  /**
   * Check if session needs refresh (within 5 minutes of expiry)
   */
  static shouldRefreshToken(): boolean {
    const expiryTime = Storage.getItem<number>(this.SESSION_EXPIRY_KEY);
    if (!expiryTime) return false;

    const now = Date.now();
    const timeUntilExpiry = expiryTime - now;
    const refreshThreshold = 5 * 60 * 1000; // 5 minutes

    return timeUntilExpiry <= refreshThreshold && timeUntilExpiry > 0;
  }

  /**
   * Export auth data for backup/migration
   */
  static exportAuthData(): StoredAuthData | null {
    const user = this.getUserData();
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const lastActivity =
      Storage.getItem<number>(this.LAST_ACTIVITY_KEY) || Date.now();
    const deviceId = this.getDeviceId();

    if (!user || !accessToken || !refreshToken) return null;

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
        expiresAt:
          Storage.getItem<number>(this.SESSION_EXPIRY_KEY) ?? undefined,
      },
      lastActivity,
      deviceId,
    };
  }

  /**
   * Import auth data from backup
   */
  static importAuthData(data: StoredAuthData): boolean {
    try {
      const tokenSuccess = this.setTokens(data.tokens);
      const userSuccess = this.setUserData(data.user);

      Storage.setItem(this.LAST_ACTIVITY_KEY, data.lastActivity);
      Storage.setItem(this.DEVICE_ID_KEY, data.deviceId);

      return tokenSuccess && userSuccess;
    } catch (error) {
      console.error("Error importing auth data:", error);
      return false;
    }
  }

  /**
   * Clean up expired sessions
   */
  static cleanup(): void {
    if (!this.isSessionValid() || !this.hasValidToken()) {
      this.clearTokens();
    }
  }

  /**
   * Get storage usage for auth data
   */
  static getStorageUsage(): {
    totalSize: number;
    breakdown: Record<string, number>;
  } {
    const keys = [
      this.AUTH_TOKEN_KEY,
      this.REFRESH_TOKEN_KEY,
      this.USER_DATA_KEY,
      this.DEVICE_ID_KEY,
      this.LAST_ACTIVITY_KEY,
      this.SESSION_EXPIRY_KEY,
    ];

    const breakdown: Record<string, number> = {};
    let totalSize = 0;

    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      const size = value ? value.length + key.length : 0;
      breakdown[key] = size;
      totalSize += size;
    });

    return { totalSize, breakdown };
  }
}
