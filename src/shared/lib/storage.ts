// src/shared/lib/storage.ts
"use client";

export class Storage {
  private static isClient = typeof window !== "undefined";

  static getItem<T>(key: string): T | null {
    if (!this.isClient) return null;

    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      return null;
    }
  }

  static setItem<T>(key: string, value: T): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting localStorage item "${key}":`, error);
      return false;
    }
  }

  static removeItem(key: string): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage item "${key}":`, error);
      return false;
    }
  }

  static clear(): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }

  static hasItem(key: string): boolean {
    if (!this.isClient) return false;

    return localStorage.getItem(key) !== null;
  }
}
