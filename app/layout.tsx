import type { Metadata } from "next";
import { MotionShell } from "./components/MotionShell";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import "./globals.css";

const siteUrl = "https://espaco-fit-academia-sjm.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Espaço Fit Academia | São José da Mata",
  description:
    "Musculação e funcional em São José da Mata, Campina Grande. Agende sua aula experimental na Espaço Fit.",
  openGraph: {
    title: "Espaço Fit Academia | Vem ser Fit",
    description:
      "Musculação e funcional em São José da Mata. Agende sua aula experimental.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Espaço Fit Academia — matrículas abertas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espaço Fit Academia | Matrículas abertas",
    description: "Planos a partir de R$ 65,00 em São José da Mata.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ExerciseGym",
              name: "Espaço Fit Academia",
              url: siteUrl,
              image: `${siteUrl}/espaco-fit-fachada.png`,
              priceRange: "R$ 65–75",
              address: {
                "@type": "PostalAddress",
                addressLocality: "São José da Mata",
                addressRegion: "PB",
                postalCode: "58441-000",
                addressCountry: "BR",
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "05:00", closes: "22:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "07:00", closes: "18:00" },
              ],
              sameAs: ["https://www.instagram.com/espacofitsjm/"],
            }),
          }}
        />
        <MotionShell />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
