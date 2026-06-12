import { z } from "zod";

// WhiteLabel step-by-step validation
export const whiteLabelStep1Schema = z.object({
  businessName: z.string().min(2, "Nome do negocio deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  businessType: z.string().min(1, "Selecione o tipo de negocio"),
  industry: z.string().min(1, "Selecione a industria"),
  sense: z.string().min(1, "Selecione o segmento"),
});

export const whiteLabelStep2Schema = z.object({
  contactName: z.string().min(2, "Nome do contato deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email invalido"),
  phone: z.string().min(8, "Telefone invalido").optional().or(z.literal("")),
});

export const whiteLabelStep3Schema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor invalida").default("#3B82F6"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor invalida").default("#10B981"),
  logoUrl: z.string().url("URL invalida").optional().or(z.literal("")),
  features: z.array(z.string()).min(1, "Selecione pelo menos uma funcionalidade"),
});

export const whiteLabelStep4Schema = z.object({
  integrations: z.array(z.string()).default([]),
  paymentMethods: z.array(z.string()).min(1, "Selecione pelo menos um metodo de pagamento"),
  needsMenu: z.boolean().default(false),
  needsBooking: z.boolean().default(false),
  needsInventory: z.boolean().default(false),
  needsMultiUser: z.boolean().default(false),
  userCount: z.number().min(1).max(100).optional(),
});

export const whiteLabelStep5Schema = z.object({
  additionalNotes: z.string().max(2000, "Texto muito longo").optional(),
  budget: z.number().min(0).optional(),
  timeline: z.string().min(1, "Selecione o prazo desejado"),
});

export const whiteLabelConfigSchema = z.object({
  businessName: z.string().min(2).max(100),
  businessType: z.string().min(1),
  industry: z.string().min(1),
  sense: z.string().min(1),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  logoUrl: z.string().optional(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  features: z.array(z.string()),
  integrations: z.array(z.string()),
  paymentMethods: z.array(z.string()),
  needsMenu: z.boolean(),
  needsBooking: z.boolean(),
  needsInventory: z.boolean(),
  needsMultiUser: z.boolean(),
  userCount: z.number().optional(),
  businessHours: z.array(z.object({
    day: z.string(),
    open: z.string(),
    close: z.string(),
    isOpen: z.boolean(),
  })).optional(),
  additionalNotes: z.string().optional(),
  budget: z.number().optional(),
  timeline: z.string(),
});

export type WhiteLabelConfigInput = z.infer<typeof whiteLabelConfigSchema>;

// Review form validation
export const reviewFormSchema = z.object({
  author: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(50, "Nome muito longo"),
  rating: z.number().min(1, "Selecione uma avaliacao").max(5, "Avaliacao maxima e 5"),
  title: z.string().min(5, "Titulo deve ter pelo menos 5 caracteres").max(100, "Titulo muito longo"),
  body: z.string().min(10, "Review deve ter pelo menos 10 caracteres").max(2000, "Review muito longo"),
});

export type ReviewFormInput = z.infer<typeof reviewFormSchema>;

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("Email invalido"),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres").max(100, "Assunto muito longo"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres").max(5000, "Mensagem muito longa"),
  company: z.string().max(100, "Nome da empresa muito longo").optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Chat message validation
export const chatMessageSchema = z.object({
  content: z.string().min(1, "Mensagem nao pode estar vazia").max(4000, "Mensagem muito longa"),
  sessionId: z.string().min(1, "Session ID obrigatorio"),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
