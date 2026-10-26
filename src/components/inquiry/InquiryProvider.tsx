import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// Keep demo translations out of the other business pages' client payload.
export default async function InquiryProvider({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return <NextIntlClientProvider messages={{ inquiryDemo: messages.inquiryDemo, inquiryShowcase: messages.inquiryShowcase }}>{children}</NextIntlClientProvider>;
}
