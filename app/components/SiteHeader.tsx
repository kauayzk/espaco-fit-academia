import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

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
                <Link href="/#estrutura"><b>Estrutura completa</b><span>Um espaço para começar e evoluir.</span></Link>
                <Link href="/#modalidades"><b>Musculação e funcional</b><span>Duas formas de ficar mais forte.</span></Link>
              </div>
              <div className="mega-column">
                <small>PLANEJE SEU TREINO</small>
                <Link href="/#horarios"><b>Horários</b><span>Seg–sex 05h–22h · Sáb 07h–18h.</span></Link>
                <Link href="/#localizacao"><b>Como chegar</b><span>São José da Mata, Campina Grande.</span></Link>
              </div>
              <Link className="mega-promo" href="/#historia">
                <span>DESDE 2015</span>
                <strong>Uma academia com a energia do bairro.</strong>
                <em>Conheça nossa história →</em>
              </Link>
            </div>
          </details>

          <details className="mega-item">
            <summary>Planos <span aria-hidden="true">⌄</span></summary>
            <div className="mega-panel mega-plans">
              <div className="mega-column">
                <small>ESCOLHA SEU PLANO</small>
                <Link href="/matricula#planos"><b>Individual</b><span>R$ 75,00</span></Link>
                <Link href="/matricula#planos"><b>Casal</b><span>R$ 70,00</span></Link>
                <Link href="/matricula#planos"><b>+2 Família</b><span>R$ 65,00</span></Link>
              </div>
              <Link className="mega-promo mega-promo-orange" href="/matricula">
                <span>MATRÍCULAS ABERTAS</span>
                <strong>Escolha o plano que acompanha sua rotina.</strong>
                <em>Ver todos os planos →</em>
              </Link>
            </div>
          </details>

          <details className="mega-item">
            <summary>Comece agora <span aria-hidden="true">⌄</span></summary>
            <div className="mega-panel mega-start">
              <div className="mega-column">
                <small>SEU PRÓXIMO PASSO</small>
                <Link href="/matricula"><b>Aula experimental</b><span>Veja como funciona o fluxo demonstrativo.</span></Link>
                <Link href="/matricula"><b>Matricule-se</b><span>Escolha o plano e finalize online.</span></Link>
              </div>
              <div className="mega-mini-stat"><strong>10+</strong><span>anos treinando São José da Mata</span></div>
            </div>
          </details>

          <a className="mega-direct" href="https://www.instagram.com/espacofitsjm/" target="_blank" rel="noreferrer">Instagram</a>
        </nav>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu"><span /> <span /> <span /></summary>
          <nav aria-label="Navegação móvel">
            <Link href="/#estrutura">A academia</Link>
            <Link href="/#modalidades">Modalidades</Link>
            <Link href="/#horarios">Horários</Link>
            <Link href="/#planos">Planos</Link>
            <Link href="/#localizacao">Localização</Link>
            <Link href="/matricula">Matricule-se</Link>
          </nav>
        </details>

        <Link className="header-cta" href="/matricula" data-track="header_matricula">
          Matricule-se <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
