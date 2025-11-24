import { useMutation } from "@tanstack/react-query";
import type {
  ContactFormData,
  ContactFormResponse,
} from "../../shared/api";

/**
 * API client for contact form submission
 */
async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || result.message || "Failed to send message");
  }

  return result;
}

/**
 * Custom hook for contact form submission using TanStack Query
 *
 * @returns Mutation object with methods and state for form submission
 *
 * @example
 * const { mutate, isPending, isError, isSuccess } = useContactForm({
 *   onSuccess: (data) => console.log("Success:", data.message),
 *   onError: (error) => console.error("Error:", error.message),
 * });
 *
 * mutate({ name: "John", email: "john@example.com", phone: "+123", message: "Hi" });
 */
export function useContactForm(options?: {
  onSuccess?: (data: ContactFormResponse) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationFn: submitContactForm,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
