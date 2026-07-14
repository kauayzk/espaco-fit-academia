import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const whatsappUrl =
  "https://wa.me/5583998458019?text=Oi%2C%20Espa%C3%A7o%20Fit!%20Quero%20agendar%20uma%20aula%20experimental.";
const mapsUrl = "https://share.google/r3HigJuOwnCCQsjLc";

const faqs = [
  ["Nunca treinei. Posso começar?", "Pode. Chame a equipe, conte seu objetivo e combine a melhor forma de começar."],
  ["Como funciona a aula experimental?", "Fale com a equipe pelo WhatsApp para consultar disponibilidade e agendar sua visita."],
  ["Quais são os horários?", "De segunda a sexta, das 05h às 22h. Aos sábados, das 07h às 18h."],
];

export default function Home() {
  return (
    <main className="ref-site">
      <SiteHeader />

      <section className="ref-hero" id="inicio">
        <div className="ref-orb ref-orb-one" aria-hidden="true" />
        <div className="ref-orb ref-orb-two" aria-hidden="true" />
        <div className="ref-hero-inner" data-reveal>
          <div className="ref-kicker"><span><img src="/ef-mark.png" alt="" /></span> Academia em São José da Mata</div>
          <h1>Treine melhor.<br /><em>Viva mais forte.</em></h1>
          <p>Musculação e funcional em um espaço próximo, completo e pronto para acompanhar sua evolução.</p>
          <div className="ref-hero-actions">
            <a className="ref-button ref-button-primary" href="/matricula">Comece agora <span>→</span></a>
            <a className="ref-button ref-button-ghost" href={whatsappUrl} target="_blank" rel="noreferrer">Agendar aula experimental</a>
          </div>
          <small>Sem compromisso · Atendimento direto pelo WhatsApp</small>
        </div>

        <div className="ref-hero-stage" data-reveal>
          <div className="ref-stage-photo">
            <img src="/espaco-fit-fachada.png" alt="Fachada da Academia Espaço Fit" />
          </div>
          <div className="ref-float ref-float-hours">
            <span>ABERTA HOJE</span><strong>05h — 22h</strong><small>segunda a sexta</small>
          </div>
          <div className="ref-float ref-float-since">
            <span>DESDE</span><strong>2015</strong>
          </div>
          <div className="ref-float ref-float-community">
            <div className="ref-avatars" aria-hidden="true"><i>F</i><i>O</i><i>C</i><i>O</i></div>
            <strong>2,3 mil+</strong><span>seguidores no Instagram</span>
          </div>
        </div>
      </section>

      <section className="ref-trust" aria-label="Diferenciais" data-reveal>
        <p>FEITA PARA QUEM QUER EVOLUIR</p>
        <div><span>Saúde</span><i>✦</i><span>Foco</span><i>✦</i><span>Disciplina</span><i>✦</i><span>Resultados</span><i>✦</i><span>Comunidade</span></div>
      </section>

      <section className="ref-section ref-bento-section" id="estrutura">
        <div className="ref-section-heading" data-reveal>
          <span className="ref-label">A ESPAÇO FIT</span>
          <h2>Tudo o que você precisa.<br /><em>Em um só lugar.</em></h2>
          <p>Uma experiência simples, acolhedora e sem complicação — do primeiro treino ao próximo resultado.</p>
        </div>

        <div className="ref-bento" data-reveal>
          <article className="ref-bento-card ref-bento-photo" id="historia">
            <img src="/espaco-fit-fachada.png" alt="Entrada da Espaço Fit em São José da Mata" />
            <div><span>NOSSA CASA</span><strong>Uma academia com a energia do bairro.</strong></div>
          </article>
          <article className="ref-bento-card ref-bento-orange" id="modalidades">
            <span className="ref-card-icon" aria-hidden="true">01</span>
            <div><small>MUSCULAÇÃO</small><h3>Força para superar seus limites.</h3><p>Treine resistência, potência e evolução no seu ritmo.</p></div>
          </article>
          <article className="ref-bento-card ref-bento-dark">
            <span className="ref-card-icon" aria-hidden="true">02</span>
            <div><small>FUNCIONAL</small><h3>Movimento para transformar sua rotina.</h3><p>Mais condicionamento, mobilidade e disposição.</p></div>
          </article>
          <article className="ref-bento-card ref-bento-light" id="horarios">
            <div className="ref-card-top"><small>HORÁRIOS</small><span>ABERTO</span></div>
            <div className="ref-time-row"><span>Segunda a sexta</span><strong>05h — 22h</strong></div>
            <div className="ref-time-row"><span>Sábado</span><strong>07h — 18h</strong></div>
          </article>
        </div>
      </section>

      <section className="ref-journey" aria-labelledby="journey-title">
        <div className="ref-journey-copy" data-reveal>
          <span className="ref-label">COMEÇAR É SIMPLES</span>
          <h2 id="journey-title">Seu próximo resultado começa com <em>um passo.</em></h2>
          <p>A gente deixa o caminho claro para você focar no que importa: treinar.</p>
          <a className="ref-button ref-button-dark" href="/matricula">Quero começar <span>→</span></a>
        </div>
        <div className="ref-journey-steps">
          <article className="ref-step ref-step-one" data-reveal><span>1</span><div><small>ESCOLHA</small><h3>Encontre o plano certo.</h3><p>Individual, casal ou família. Você decide como quer evoluir.</p></div></article>
          <article className="ref-step ref-step-two" data-reveal><span>2</span><div><small>CONVERSE</small><h3>Fale com quem entende.</h3><p>Finalize pelo WhatsApp com atendimento direto da equipe.</p></div></article>
          <article className="ref-step ref-step-three" data-reveal><span>3</span><div><small>TREINE</small><h3>Venha viver a experiência.</h3><p>Conheça a estrutura, encontre seu ritmo e mantenha o foco.</p></div></article>
        </div>
      </section>

      <section className="ref-section ref-pricing" id="planos">
        <div className="ref-section-heading ref-pricing-heading" data-reveal>
          <span className="ref-label">PLANOS</span>
          <h2>Escolha seu jeito de <em>ficar mais forte.</em></h2>
          <p>Condições simples para começar sozinho, a dois ou com a família.</p>
        </div>
        <div className="ref-price-grid" data-reveal>
          <article><span>INDIVIDUAL</span><p>Para treinar no seu ritmo.</p><strong><small>R$</small>75,00</strong><a href="/matricula#planos">Escolher individual <b>→</b></a></article>
          <article className="ref-price-featured"><i>MAIS ESCOLHIDO</i><span>CASAL</span><p>Mais motivação para evoluir juntos.</p><strong><small>R$</small>70,00</strong><a href="/matricula#planos">Escolher casal <b>→</b></a></article>
          <article><span>+2 FAMÍLIA</span><p>Uma condição feita para a família.</p><strong><small>R$</small>65,00</strong><a href="/matricula#planos">Escolher família <b>→</b></a></article>
        </div>
        <p className="ref-price-note">Consulte as condições de cada modalidade diretamente com a equipe.</p>
      </section>

      <section className="ref-section ref-location" id="localizacao" data-reveal>
        <div className="ref-location-copy">
          <span className="ref-label">PERTINHO DE VOCÊ</span>
          <h2>São José da Mata é a nossa <em>casa.</em></h2>
          <p>Venha conhecer a academia, conversar com a equipe e começar uma rotina mais forte.</p>
          <div className="ref-address"><small>ENDEREÇO</small><strong>São José da Mata, Campina Grande — PB</strong><span>CEP 58441-000</span></div>
          <div className="ref-location-actions"><a className="ref-button ref-button-dark" href={mapsUrl} target="_blank" rel="noreferrer">Traçar rota <span>↗</span></a><a href="tel:+5583998458019">(83) 99845-8019</a></div>
        </div>
        <div className="ref-location-visual">
          <img src="/espaco-fit-fachada.png" alt="Fachada da academia" />
          <div><span>VOCÊ CHEGOU</span><strong>Espaço Fit</strong></div>
        </div>
      </section>

      <section className="ref-section ref-faq">
        <div className="ref-section-heading" data-reveal><span className="ref-label">DÚVIDAS RÁPIDAS</span><h2>Antes de começar,<br /><em>vale perguntar.</em></h2></div>
        <div className="ref-faq-list" data-reveal>
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="ref-final" data-reveal>
        <div className="ref-final-orb" aria-hidden="true" />
        <span className="ref-label">MATRÍCULAS ABERTAS</span>
        <h2>Seu melhor treino<br />pode começar <em>hoje.</em></h2>
        <p>Escolha seu plano e finalize com a equipe pelo WhatsApp.</p>
        <a className="ref-button ref-button-light" href="/matricula">Quero me matricular <span>→</span></a>
      </section>

      <SiteFooter />
      <a className="mobile-whatsapp" href="/matricula">Ver planos e me matricular <span>→</span></a>
    </main>
  );
}
