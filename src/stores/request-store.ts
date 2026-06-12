import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WhiteLabelConfig } from "@/types/form";
import { mockApi } from "@/lib/api-client";

type RequestStep = 1 | 2 | 3 | 4 | 5;

interface RequestStore {
  formData: Partial<WhiteLabelConfig>;
  step: RequestStep;
  isSubmitting: boolean;
  isComplete: boolean;
  requestId: string | null;
  errors: Record<string, string>;

  setField: <K extends keyof WhiteLabelConfig>(field: K, value: WhiteLabelConfig[K]) => void;
  setFields: (fields: Partial<WhiteLabelConfig>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: RequestStep) => void;
  submit: () => Promise<{ success: boolean; requestId?: string; message?: string }>;
  reset: () => void;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  clearErrors: () => void;
}

const defaultFormData: Partial<WhiteLabelConfig> = {
  primaryColor: "#3B82F6",
  secondaryColor: "#10B981",
  features: [],
  integrations: [],
  paymentMethods: [],
  needsMenu: false,
  needsBooking: false,
  needsInventory: false,
  needsMultiUser: false,
  businessHours: [
    { day: "Segunda", open: "09:00", close: "18:00", isOpen: true },
    { day: "Terca", open: "09:00", close: "18:00", isOpen: true },
    { day: "Quarta", open: "09:00", close: "18:00", isOpen: true },
    { day: "Quinta", open: "09:00", close: "18:00", isOpen: true },
    { day: "Sexta", open: "09:00", close: "18:00", isOpen: true },
    { day: "Sabado", open: "09:00", close: "13:00", isOpen: true },
    { day: "Domingo", open: "09:00", close: "18:00", isOpen: false },
  ],
};

export const useRequestStore = create<RequestStore>()(
  persist(
    (set, get) => ({
      formData: { ...defaultFormData },
      step: 1,
      isSubmitting: false,
      isComplete: false,
      requestId: null,
      errors: {},

      setField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      setFields: (fields) =>
        set((state) => ({
          formData: { ...state.formData, ...fields },
        })),

      nextStep: () =>
        set((state) => ({
          step: Math.min(5, state.step + 1) as RequestStep,
        })),

      prevStep: () =>
        set((state) => ({
          step: Math.max(1, state.step - 1) as RequestStep,
        })),

      setStep: (step) => set({ step }),

      submit: async () => {
        set({ isSubmitting: true, errors: {} });
        try {
          const result = await mockApi.submitRequest(get().formData as WhiteLabelConfig);
          if (result.success) {
            set({
              isSubmitting: false,
              isComplete: true,
              requestId: result.requestId,
            });
          }
          return result;
        } catch (err) {
          set({
            isSubmitting: false,
            errors: {
              submit: err instanceof Error ? err.message : "Erro ao enviar solicitacao",
            },
          });
          return { success: false, message: "Erro ao enviar" };
        }
      },

      reset: () =>
        set({
          formData: { ...defaultFormData },
          step: 1,
          isSubmitting: false,
          isComplete: false,
          requestId: null,
          errors: {},
        }),

      setError: (field, message) =>
        set((state) => ({
          errors: { ...state.errors, [field]: message },
        })),

      clearError: (field) =>
        set((state) => {
          const { [field]: _, ...rest } = state.errors;
          return { errors: rest };
        }),

      clearErrors: () => set({ errors: {} }),
    }),
    {
      name: "nexo-request",
      partialize: (state) => ({
        formData: state.formData,
        step: state.step,
      }),
    }
  )
);
