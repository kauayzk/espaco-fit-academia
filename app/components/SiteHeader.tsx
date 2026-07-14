import { BrandLogo } from "./BrandLogo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandLogo />

        <nav className="nav" aria-label="Navegação principal">
          <a href="/#estrutura">A academia</a>
          <a href="/#horarios">Horários</a>
          <a href="/#planos">Planos</a>
          <a href="/#localizacao">Localização</a>
        </nav>

        <a className="header-cta" href="/matricula">
          Matricule-se <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
