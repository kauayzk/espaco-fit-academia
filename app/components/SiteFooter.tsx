import { BrandLogo } from "./BrandLogo";

const mapsUrl = "https://share.google/r3HigJuOwnCCQsjLc";

export function SiteFooter() {
  return (
    <footer>
      <BrandLogo className="brand-footer" />
      <p>Musculação e funcional em São José da Mata.</p>
      <div className="footer-links">
        <a href="https://www.instagram.com/espacofitsjm/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <span>Projeto demonstrativo</span>
        <a href={mapsUrl} target="_blank" rel="noreferrer">Como chegar ↗</a>
        <a href="/gestao">Área do proprietário</a>
      </div>
      <small>© {new Date().getFullYear()} Espaço Fit Academia</small>
    </footer>
  );
}
