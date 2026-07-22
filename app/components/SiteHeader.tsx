"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";

type MenuId = "academy" | "plans" | "start";

const whatsappUrl =
  "https://wa.me/5583998458019?text=Oi%2C%20Espa%C3%A7o%20Fit!%20Quero%20agendar%20uma%20aula%20experimental.";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleMenu = (menu: MenuId) => setOpenMenu((current) => current === menu ? null : menu);
  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const closeAllMenus = () => {
      setOpenMenu(null);
      setMobileOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeAllMenus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAllMenus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header ref-header" ref={headerRef}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="header-inner">
        <BrandLogo />

        <nav className="mega-nav" aria-label="Navegação principal">
          <div className={`mega-item ${openMenu === "academy" ? "is-open" : ""}`}>
            <button type="button" aria-expanded={openMenu === "academy"} aria-controls="menu-academy" onClick={() => toggleMenu("academy")}>A academia <span aria-hidden="true">⌄</span></button>
            <div className="mega-panel mega-panel-wide" id="menu-academy" aria-hidden={openMenu !== "academy"}>
              <div className="mega-column">
                <small>CONHEÇA A ESPAÇO FIT</small>
                <Link href="/#estrutura" onClick={closeMenus}><b>Estrutura completa</b><span>Um espaço para começar e evoluir.</span></Link>
                <Link href="/#modalidades" onClick={closeMenus}><b>Musculação e funcional</b><span>Duas formas de ficar mais forte.</span></Link>
              </div>
              <div className="mega-column">
                <small>PLANEJE SEU TREINO</small>
                <Link href="/#horarios" onClick={closeMenus}><b>Horários</b><span>Seg–sex 05h–22h · Sáb 07h–18h.</span></Link>
                <Link href="/#localizacao" onClick={closeMenus}><b>Como chegar</b><span>São José da Mata, Campina Grande.</span></Link>
              </div>
              <Link className="mega-promo" href="/#historia" onClick={closeMenus}>
                <span>DESDE 2015</span>
                <strong>Uma academia com a energia do bairro.</strong>
                <em>Conheça nossa história →</em>
              </Link>
            </div>
          </div>

          <div className={`mega-item ${openMenu === "plans" ? "is-open" : ""}`}>
            <button type="button" aria-expanded={openMenu === "plans"} aria-controls="menu-plans" onClick={() => toggleMenu("plans")}>Planos <span aria-hidden="true">⌄</span></button>
            <div className="mega-panel mega-plans" id="menu-plans" aria-hidden={openMenu !== "plans"}>
              <div className="mega-column">
                <small>ESCOLHA SEU PLANO</small>
                <Link href="/matricula#planos" onClick={closeMenus}><b>Individual</b><span>R$ 75,00</span></Link>
                <Link href="/matricula#planos" onClick={closeMenus}><b>Casal</b><span>R$ 70,00</span></Link>
                <Link href="/matricula#planos" onClick={closeMenus}><b>+2 Família</b><span>R$ 65,00</span></Link>
              </div>
              <Link className="mega-promo mega-promo-orange" href="/matricula" onClick={closeMenus}>
                <span>MATRÍCULAS ABERTAS</span>
                <strong>Escolha o plano que acompanha sua rotina.</strong>
                <em>Ver todos os planos →</em>
              </Link>
            </div>
          </div>

          <div className={`mega-item ${openMenu === "start" ? "is-open" : ""}`}>
            <button type="button" aria-expanded={openMenu === "start"} aria-controls="menu-start" onClick={() => toggleMenu("start")}>Comece agora <span aria-hidden="true">⌄</span></button>
            <div className="mega-panel mega-start" id="menu-start" aria-hidden={openMenu !== "start"}>
              <div className="mega-column">
                <small>SEU PRÓXIMO PASSO</small>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenus}><b>Aula experimental</b><span>Converse com a equipe pelo WhatsApp.</span></a>
                <Link href="/matricula" onClick={closeMenus}><b>Matricule-se</b><span>Escolha o plano e finalize online.</span></Link>
              </div>
              <div className="mega-mini-stat"><strong>10+</strong><span>anos treinando São José da Mata</span></div>
            </div>
          </div>

          <a className="mega-direct" href="https://www.instagram.com/espacofitsjm/" target="_blank" rel="noreferrer">Instagram</a>
        </nav>

        <div className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}>
          <button type="button" aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((current) => !current)}><span /> <span /> <span /></button>
          <nav id="mobile-navigation" aria-label="Navegação móvel" aria-hidden={!mobileOpen}>
            <Link href="/#estrutura" onClick={closeMenus}>A academia</Link>
            <Link href="/#modalidades" onClick={closeMenus}>Modalidades</Link>
            <Link href="/#horarios" onClick={closeMenus}>Horários</Link>
            <Link href="/#planos" onClick={closeMenus}>Planos</Link>
            <Link href="/#localizacao" onClick={closeMenus}>Localização</Link>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenus}>Aula experimental</a>
            <Link href="/matricula" onClick={closeMenus}>Matricule-se</Link>
          </nav>
        </div>

        <Link className="header-cta" href="/matricula" data-track="header_matricula" onClick={closeMenus}>
          Matricule-se <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
