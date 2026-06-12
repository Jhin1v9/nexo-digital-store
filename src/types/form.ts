export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface WhiteLabelConfig {
  businessName: string;
  businessType: string;
  industry: string;
  sense: string;
  contactName: string;
  email: string;
  phone: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  features: string[];
  integrations: string[];
  paymentMethods: string[];
  needsMenu: boolean;
  menuItems?: MenuItem[];
  needsBooking: boolean;
  needsInventory: boolean;
  needsReports: boolean;
  needsMultiUser: boolean;
  userCount?: number;
  businessHours: BusinessHours[];
  additionalNotes: string;
  budget?: number;
  timeline: string;
}

export interface RequestFormData {
  config: WhiteLabelConfig;
  requestId: string;
  submittedAt: string;
  status: "pending" | "reviewing" | "approved" | "rejected" | "completed";
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}
