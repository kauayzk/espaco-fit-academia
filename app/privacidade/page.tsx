import type { Metadata } from "next";
import { BrandLogo } from "../components/BrandLogo";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacidade | Espaço Fit Academia",
  description: "Como a Espaço Fit utiliza os dados enviados na solicitação de matrícula.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header><BrandLogo /><a href="/matricula">← Voltar para a matrícula</a></header>
      <article>
        <span>AVISO DE PRIVACIDADE</span>
        <h1>Seus dados servem para cuidar do seu atendimento.</h1>
        <p className="privacy-lead">Ao enviar uma solicitação de matrícula, você compartilha informações diretamente com a Espaço Fit Academia.</p>
        <section><h2>Quais dados são coletados?</h2><p>Nome, telefone, plano de interesse, objetivo, experiência com treino, data e período desejados para a visita e observações informadas voluntariamente.</p></section>
        <section><h2>Para que os dados são utilizados?</h2><p>Para responder sua solicitação, organizar o atendimento, confirmar disponibilidade, acompanhar a possível matrícula e entender quais canais trazem novos interessados.</p></section>
        <section><h2>Com quem são compartilhados?</h2><p>Os dados são destinados à equipe responsável pelo atendimento da Espaço Fit. O WhatsApp só recebe as informações quando você revisa e envia a mensagem preparada pelo site.</p></section>
        <section><h2>Como solicitar alteração ou exclusão?</h2><p>Fale com a academia pelo telefone <a href="tel:+5583998458019">(83) 99845-8019</a> e informe que deseja consultar, corrigir ou excluir seus dados.</p></section>
        <small>Última atualização: julho de 2026.</small>
      </article>
      <SiteFooter />
    </main>
  );
}
