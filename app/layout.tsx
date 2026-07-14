import type { Metadata } from "next";
import { MotionShell } from "./components/MotionShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://espaco-fit-sjm.kauayzk.chatgpt.site"),
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
        <MotionShell />
        {children}
      </body>
    </html>
  );
}
