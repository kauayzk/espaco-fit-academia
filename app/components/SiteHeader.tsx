import { BrandLogo } from "./BrandLogo";

const whatsappUrl =
  "https://wa.me/5583998458019?text=Oi%2C%20Espa%C3%A7o%20Fit!%20Quero%20agendar%20uma%20aula%20experimental.";

export function SiteHeader() {
  return (
    <header className="site-header ref-header">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="header-inner">
        <BrandLogo />

        <nav className="mega-nav" aria-label="Navegação principal">
          <details className="mega-item">
            <summary>A academia <span aria-hidden="true">⌄</span></summary>
            <div className="mega-panel mega-panel-wide">
              <div className="mega-column">
                <small>CONHEÇA A ESPAÇO FIT</small>
                <a href="/#estrutura"><b>Estrutura completa</b><span>Um espaço para começar e evoluir.</span></a>
                <a href="/#modalidades"><b>Musculação e funcional</b><span>Duas formas de ficar mais forte.</span></a>
              </div>
              <div className="mega-column">
                <small>PLANEJE SEU TREINO</small>
                <a href="/#horarios"><b>Horários</b><span>Seg–sex 05h–22h · Sáb 07h–18h.</span></a>
                <a href="/#localizacao"><b>Como chegar</b><span>São José da Mata, Campina Grande.</span></a>
              </div>
              <a className="mega-promo" href="/#historia">
                <span>DESDE 2015</span>
                <strong>Uma academia com a energia do bairro.</strong>
                <em>Conheça nossa história →</em>
              </a>
            </div>
          </details>

          <details className="mega-item">
            <summary>Planos <span aria-hidden="true">⌄</span></summary>
            <div className="mega-panel mega-plans">
              <div className="mega-column">
                <small>ESCOLHA SEU PLANO</small>
                <a href="/matricula#planos"><b>Individual</b><span>R$ 75,00</span></a>
                <a href="/matricula#planos"><b>Casal</b><span>R$ 70,00</span></a>
                <a href="/matricula#planos"><b>+2 Família</b><span>R$ 65,00</span></a>
              </div>
              <a className="mega-promo mega-promo-orange" href="/matricula">
                <span>MATRÍCULAS ABERTAS</span>
                <strong>Escolha o plano que acompanha sua rotina.</strong>
                <em>Ver todos os planos →</em>
              </a>
            </div>
          </details>

          <details className="mega-item">
            <summary>Comece agora <span aria-hidden="true">⌄</span></summary>
            <div className="mega-panel mega-start">
              <div className="mega-column">
                <small>SEU PRÓXIMO PASSO</small>
                <a href={whatsappUrl} target="_blank" rel="noreferrer"><b>Aula experimental</b><span>Converse com a equipe pelo WhatsApp.</span></a>
                <a href="/matricula"><b>Matricule-se</b><span>Escolha o plano e finalize online.</span></a>
              </div>
              <div className="mega-mini-stat"><strong>10+</strong><span>anos treinando São José da Mata</span></div>
            </div>
          </details>

          <a className="mega-direct" href="https://www.instagram.com/espacofitsjm/" target="_blank" rel="noreferrer">Instagram</a>
        </nav>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu"><span /> <span /> <span /></summary>
          <nav aria-label="Navegação móvel">
            <a href="/#estrutura">A academia</a>
            <a href="/#modalidades">Modalidades</a>
            <a href="/#horarios">Horários</a>
            <a href="/#planos">Planos</a>
            <a href="/#localizacao">Localização</a>
            <a href="/matricula">Matricule-se</a>
          </nav>
        </details>

        <a className="header-cta" href="/matricula">
          Matricule-se <span aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
