export const SITE = {
  name: "Takxila AI Academy",
  supportEmail: "support@takxila.in",
  /** Country code + number, no "+" or spaces: what wa.me and tel: links need */
  phoneE164: "917276607776",
  phoneDisplay: "+91 72766 07776",
  /** Every lead from this site is emailed here. */
  inbox: "takxila.ai.academy@gmail.com",
  address: "",
} as const;

/** Apps Script web app link (ends in /exec); VITE_MAIL_WEBHOOK in .env wins. Empty: leads go out through FormSubmit only. */
export const MAIL_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzXcyK920wIkbC1M8oXnwELIgfjzES6-rn6_OoDEoeVKBq3ZsYOFE9SdGFpC6apW-dU/exec";

export const TEL_HREF = "tel:+" + SITE.phoneE164;
export const MAILTO_HREF = "mailto:" + SITE.supportEmail;
export const whatsappLink = (text: string) => `https://wa.me/${SITE.phoneE164}?text=${encodeURIComponent(text)}`;
