const whatsappUrl =
  "https://wa.me/5583998458019?text=Oi%2C%20Espa%C3%A7o%20Fit!%20Quero%20agendar%20uma%20aula%20experimental.";

const mapsUrl = "https://share.google/r3HigJuOwnCCQsjLc";

const benefits = [
  {
    number: "01",
    title: "Musculação",
    text: "Estrutura para treinar força, resistência e evolução no seu ritmo.",
  },
  {
    number: "02",
    title: "Funcional",
    text: "Aulas dinâmicas para ganhar condicionamento, mobilidade e disposição.",
  },
  {
    number: "03",
    title: "Rotina possível",
    text: "Horário amplo para o treino caber de verdade no seu dia.",
  },
];

const faqs = [
  {
    question: "Nunca treinei. Posso começar?",
    answer:
      "Pode. Chame a equipe no WhatsApp, conte seu objetivo e combine a melhor forma de começar.",
  },
  {
    question: "Como funciona a aula experimental?",
    answer:
      "Fale com a equipe pelo WhatsApp para consultar disponibilidade e agendar sua visita.",
  },
  {
    question: "Quais são os horários?",
    answer:
      "De segunda a sexta, das 05h às 22h. Aos sábados, das 07h às 18h.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Espaço Fit — início">
          <span className="brand-mark" aria-hidden="true">
            EF
          </span>
          <span className="brand-name">
            ESPAÇO<span>FIT</span>
            <small>ACADEMIA</small>
          </span>
        </a>

        <nav className="nav" aria-label="Navegação principal">
          <a href="#estrutura">Estrutura</a>
          <a href="#horarios">Horários</a>
          <a href="#localizacao">Localização</a>
        </nav>

        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Falar no WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> Academia em São José da Mata
            </p>
            <h1>
              SEU CORPO.
              <br />
              <em>SEU RITMO.</em>
              <br />
              SEU RESULTADO.
            </h1>
            <p className="hero-text">
              Musculação e funcional em um ambiente feito para quem quer começar,
              evoluir e não parar mais.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                Quero minha aula experimental <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#estrutura">
                Conhecer a academia <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="microcopy">Resposta rápida pelo WhatsApp • Sem compromisso</p>
          </div>

          <div className="hero-visual">
            <div className="orange-slab" aria-hidden="true" />
            <img
              src="/espaco-fit-fachada.png"
              alt="Fachada da Academia Espaço Fit em São José da Mata"
              className="hero-image"
            />
            <div className="open-badge">
              <span>ABERTO</span>
              <strong>05H — 22H</strong>
              <small>SEGUNDA A SEXTA</small>
            </div>
            <div className="since-stamp" aria-label="Desde 2015">
              <small>DESDE</small>
              <strong>2015</strong>
            </div>
          </div>
        </div>
        <div className="hero-stripe" aria-hidden="true">
          <span>FORÇA</span><i>•</i><span>FOCO</span><i>•</i><span>CONSTÂNCIA</span><i>•</i><span>RESULTADO</span><i>•</i><span>FORÇA</span>
        </div>
      </section>

      <section className="proof-strip" aria-label="Diferenciais da Espaço Fit">
        <div><strong>10+</strong><span>anos fazendo história</span></div>
        <div><strong>05H–22H</strong><span>de segunda a sexta</span></div>
        <div><strong>2</strong><span>modalidades para evoluir</span></div>
        <div><strong>2,3 MIL+</strong><span>seguidores no Instagram</span></div>
      </section>

      <section className="section training" id="estrutura">
        <div className="section-intro">
          <p className="eyebrow"><span /> TREINO COMPLETO</p>
          <h2>TUDO O QUE VOCÊ PRECISA PARA <em>IR ALÉM.</em></h2>
          <p>
            Sem frescura e sem desculpa: estrutura, energia e uma equipe pronta para
            receber você.
          </p>
        </div>

        <div className="benefit-list">
          {benefits.map((benefit) => (
            <article className="benefit" key={benefit.number}>
              <span className="benefit-number">{benefit.number}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Quero saber mais sobre ${benefit.title}`}>
                Saber mais <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="schedule" id="horarios">
        <div className="schedule-poster">
          <img src="/espaco-fit-horarios.png" alt="Card de horários da Academia Espaço Fit" />
        </div>
        <div className="schedule-content">
          <p className="eyebrow eyebrow-light"><span /> ABERTA CEDO. ABERTA ATÉ TARDE.</p>
          <h2>SEU TREINO CABE NA SUA <em>ROTINA.</em></h2>
          <p className="schedule-lead">
            Antes do trabalho, no intervalo ou no fim do dia. Escolha seu melhor
            horário e venha treinar.
          </p>
          <div className="hours-row">
            <span>SEG — SEX</span>
            <strong>05H <i>ÀS</i> 22H</strong>
          </div>
          <div className="hours-row">
            <span>SÁBADO</span>
            <strong>07H <i>ÀS</i> 18H</strong>
          </div>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Agendar meu primeiro treino <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="section location" id="localizacao">
        <div className="location-copy">
          <p className="eyebrow"><span /> PERTINHO DE VOCÊ</p>
          <h2>NO CORAÇÃO DE <em>SÃO JOSÉ DA MATA.</em></h2>
          <p>
            Venha conhecer a estrutura, conversar com a equipe e dar o primeiro
            passo para uma rotina mais forte.
          </p>
          <address>
            <small>ENDEREÇO</small>
            <strong>São José da Mata, Campina Grande — PB</strong>
            <span>CEP 58441-000</span>
          </address>
          <div className="location-actions">
            <a className="button button-dark" href={mapsUrl} target="_blank" rel="noreferrer">
              Traçar rota no Google <span aria-hidden="true">↗</span>
            </a>
            <a className="phone-link" href="tel:+5583998458019">(83) 99845-8019</a>
          </div>
        </div>
        <div className="location-image">
          <img src="/espaco-fit-fachada.png" alt="Entrada da Academia Espaço Fit" />
          <div className="location-tag">VOCÊ CHEGOU.</div>
        </div>
      </section>

      <section className="section faq">
        <div className="faq-title">
          <p className="eyebrow"><span /> DÚVIDAS RÁPIDAS</p>
          <h2>PRONTO PARA <em>COMEÇAR?</em></h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div>
          <p className="eyebrow eyebrow-light"><span /> O MELHOR DIA PARA COMEÇAR É HOJE</p>
          <h2>VEM SER <em>FIT.</em></h2>
          <p>Chame no WhatsApp e agende sua aula experimental.</p>
        </div>
        <a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">
          Quero treinar na Espaço Fit <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <a className="brand brand-footer" href="#inicio" aria-label="Espaço Fit — voltar ao início">
          <span className="brand-mark" aria-hidden="true">EF</span>
          <span className="brand-name">ESPAÇO<span>FIT</span><small>ACADEMIA</small></span>
        </a>
        <p>Musculação e funcional em São José da Mata.</p>
        <div className="footer-links">
          <a href="https://www.instagram.com/espacofitsjm/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="tel:+5583998458019">Telefone</a>
          <a href={mapsUrl} target="_blank" rel="noreferrer">Como chegar ↗</a>
        </div>
        <small>© {new Date().getFullYear()} Espaço Fit Academia</small>
      </footer>

      <a className="mobile-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
        Agendar aula experimental <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
