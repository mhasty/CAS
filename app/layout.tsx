import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Caarps | Appraisal Order Tracking & Management Software",
    template: "%s | Caarps"
  },
  description: "Manage appraisal orders, automate AMC portal submissions, validate UAD XML, review reports, track accounting, and deliver appraisals in one platform for appraisers, AMCs, and lenders.",
  keywords: ["appraisal order management software", "AMC appraisal tracking platform", "appraisal workflow software", "real estate appraisal management system", "UAD appraisal software"],
  openGraph: {
    title: "Caarps Appraisal Order Tracking Software",
    description: "Modern appraisal order management, XML validation, review automation, lender delivery, vendor portals, and accounting workflows.",
    url: siteUrl,
    siteName: "Caarps",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Caarps Appraisal OS",
    description: "Appraisal order tracking, AMC workflow automation, UAD XML review, and lender delivery software."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Caarps Appraisal OS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: metadata.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
