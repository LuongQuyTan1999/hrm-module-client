// src/shared/lib/notifications.ts
import { toast } from "sonner";

export const notifications = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warning(message),
};

export const createNotifications = (domain: string) => ({
  addSuccess: () => notifications.success(`${domain} added successfully!`),
  addError: (error?: string) =>
    notifications.error(error || `Failed to add ${domain.toLowerCase()}`),
  updateSuccess: () => notifications.success(`${domain} updated successfully!`),
  updateError: (error?: string) =>
    notifications.error(error || `Failed to update ${domain.toLowerCase()}`),
  deleteSuccess: () => notifications.success(`${domain} deleted successfully!`),
  deleteError: (error?: string) =>
    notifications.error(error || `Failed to delete ${domain.toLowerCase()}`),
});
