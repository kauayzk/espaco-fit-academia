import { BrandLogo } from "./BrandLogo";

const mapsUrl = "https://share.google/r3HigJuOwnCCQsjLc";
const developerWhatsappUrl =
  "https://wa.me/5511977147610?text=Ol%C3%A1%2C%20Kau%C3%A3!%20Vim%20pelo%20site%20da%20Espa%C3%A7o%20Fit.";

export function SiteFooter() {
  return (
    <footer>
      <BrandLogo className="brand-footer" />
      <p>Musculação e funcional em São José da Mata.</p>
      <div className="footer-links">
        <a href="https://www.instagram.com/espacofitsjm/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <a href="tel:+5583998458019">(83) 99845-8019</a>
        <a href={mapsUrl} target="_blank" rel="noreferrer">Como chegar ↗</a>
        <a href="/gestao">Área do proprietário</a>
      </div>
      <div className="footer-meta">
        <small>© {new Date().getFullYear()} Espaço Fit Academia</small>
        <a
          className="developer-credit"
          href={developerWhatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar com Kauã Araujo pelo WhatsApp"
        >
          Desenvolvido por Kauã Araujo
        </a>
      </div>
    </footer>
  );
}
