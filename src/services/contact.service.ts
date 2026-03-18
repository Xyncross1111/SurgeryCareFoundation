import { apiClient } from "@/lib/api-client";
import type { ContactFormData } from "@/types/content";

export const contactService = {
  send(data: ContactFormData) {
    return apiClient.post<void>("/public/contact", data);
  },
};
