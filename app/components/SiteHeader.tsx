"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";

type MenuId = "academy" | "plans" | "start";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleMenu = (menu: MenuId) => setOpenMenu((current) => current === menu ? null : menu);
  const closeMenus = () => setOpenMenu(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpenMenu(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
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
                <Link href="/matricula" onClick={closeMenus}><b>Aula experimental</b><span>Veja como funciona o fluxo demonstrativo.</span></Link>
                <Link href="/matricula" onClick={closeMenus}><b>Matricule-se</b><span>Escolha o plano e finalize online.</span></Link>
              </div>
              <div className="mega-mini-stat"><strong>10+</strong><span>anos treinando São José da Mata</span></div>
            </div>
          </div>

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

        <Link className="header-cta" href="/matricula" data-track="header_matricula" onClick={closeMenus}>
          Matricule-se <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
