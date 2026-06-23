import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "AMtech · Sites web, systèmes de réservation et chatbots IA en Tunisie",
  description: "AMtech crée des sites professionnels, des systèmes de réservation en ligne, et des chatbots IA pour les entreprises en Tunisie. Travail sur mesure, prix clairs, contact direct.",
  keywords: ["site web tunisie", "réservation en ligne", "chatbot ia", "agence digitale tunisie", "amtech"],
  authors: [{ name: "AMtech" }],
  creator: "AMtech",
  metadataBase: new URL("https://amtech.tn"),
  openGraph: {
    title: "AMtech · Sites web & solutions digitales en Tunisie",
    description: "Sites pros, systèmes de réservation, et chatbots IA — faits sur mesure pour votre business en Tunisie.",
    siteName: "AMtech",
    locale: "fr_TN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMtech · Solutions digitales en Tunisie",
    description: "Sites pros, systèmes de réservation, et chatbots IA — faits sur mesure pour votre business en Tunisie.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
