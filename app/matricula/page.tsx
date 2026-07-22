import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "../components/BrandLogo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { PlanSelector } from "./PlanSelector";
import { getSiteSettings } from "../site-settings";

export const metadata: Metadata = {
  title: "Matricule-se | Espaço Fit Academia",
  description: "Escolha seu plano e fale com a equipe da Espaço Fit pelo WhatsApp.",
};

export default async function EnrollmentPage() {
  const settings = await getSiteSettings();
  return (
    <main className="enrollment-page">
      <SiteHeader />

      <section className="enrollment-hero">
        <div className="enrollment-hero-inner" data-reveal>
          <Link className="back-link" href="/">← Voltar para o início</Link>
          <BrandLogo href="/" className="enrollment-logo" />
          <p className="eyebrow eyebrow-light"><span /> MATRÍCULAS ABERTAS</p>
          <h1>ESCOLHA SEU PLANO.<br /><em>COMECE AGORA.</em></h1>
          <p>Saúde, foco, disciplina e resultado. Selecione a melhor opção para você e finalize direto com a equipe.</p>
        </div>
      </section>

      <section className="enrollment-plans" id="planos" data-reveal>
        <div className="plans-heading">
          <span>PLANOS MENSAIS</span>
          <p>Valores informados pela academia. Consulte condições diretamente com a equipe.</p>
        </div>
        <PlanSelector prices={{ individual: settings.priceIndividual, casal: settings.priceCasal, familia: settings.priceFamilia }} />
      </section>

      <section className="enrollment-trust" data-reveal>
        <div><strong>05H — 22H</strong><span>Segunda a sexta</span></div>
        <div><strong>DESDE 2015</strong><span>Treino com identidade local</span></div>
        <div><strong>SÃO JOSÉ DA MATA</strong><span>Perto de você</span></div>
      </section>

      <SiteFooter />
    </main>
  );
}
