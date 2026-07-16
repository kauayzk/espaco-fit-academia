import type { Metadata } from "next";
import { BrandLogo } from "../components/BrandLogo";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacidade | Espaço Fit Academia",
  description: "Informações sobre o uso demonstrativo do formulário de matrícula.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header><BrandLogo /><a href="/matricula">← Voltar para a matrícula</a></header>
      <article>
        <span>AVISO DE PRIVACIDADE</span>
        <h1>Esta é uma experiência de portfólio.</h1>
        <p className="privacy-lead">O formulário de matrícula funciona apenas como demonstração visual e não realiza contato com a academia.</p>
        <section><h2>Os dados são enviados?</h2><p>Não. A simulação termina no próprio navegador e não envia os campos preenchidos para a academia, WhatsApp ou banco de dados.</p></section>
        <section><h2>O que devo preencher?</h2><p>Use somente informações fictícias para experimentar o fluxo demonstrativo.</p></section>
        <section><h2>Qual é a finalidade?</h2><p>Apresentar a experiência, o design e a automação que poderiam ser utilizados em um projeto real.</p></section>
        <small>Última atualização: julho de 2026.</small>
      </article>
      <SiteFooter />
    </main>
  );
}
