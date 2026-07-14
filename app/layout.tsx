import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Espaço Fit Academia | São José da Mata",
  description:
    "Musculação e funcional em São José da Mata, Campina Grande. Agende sua aula experimental na Espaço Fit.",
  openGraph: {
    title: "Espaço Fit Academia | Vem ser Fit",
    description:
      "Musculação e funcional em São José da Mata. Agende sua aula experimental.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
