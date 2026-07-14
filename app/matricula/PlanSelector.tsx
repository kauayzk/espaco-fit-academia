"use client";

import { useMemo, useState } from "react";

const plans = [
  { id: "individual", name: "Individual", price: "75,00", note: "Seu plano, seu ritmo, seu resultado." },
  { id: "casal", name: "Casal", price: "70,00", note: "Treinem juntos e mantenham o foco." },
  { id: "familia", name: "+2 Família", price: "65,00", note: "Condição especial para a família treinar." },
];

export function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const [name, setName] = useState("");

  const currentPlan = plans.find((plan) => plan.id === selectedPlan) ?? plans[0];
  const whatsappUrl = useMemo(() => {
    const firstName = name.trim() || "Olá";
    const message = `${firstName}! Quero me matricular no plano ${currentPlan.name}, no valor de R$ ${currentPlan.price}. Pode me passar as condições?`;
    return `https://wa.me/5583998458019?text=${encodeURIComponent(message)}`;
  }, [currentPlan, name]);

  return (
    <div className="enrollment-flow">
      <div className="plan-grid" role="radiogroup" aria-label="Escolha seu plano">
        {plans.map((plan, index) => (
          <label className={`plan-card ${selectedPlan === plan.id ? "is-selected" : ""}`} key={plan.id}>
            {index === 1 ? <span className="popular-tag">MAIS ESCOLHIDO</span> : null}
            <input
              type="radio"
              name="plan"
              value={plan.id}
              checked={selectedPlan === plan.id}
              onChange={() => setSelectedPlan(plan.id)}
            />
            <span className="plan-check" aria-hidden="true" />
            <span className="plan-name">{plan.name}</span>
            <span className="plan-price"><small>R$</small>{plan.price}</span>
            <span className="plan-note">{plan.note}</span>
            <span className="plan-select">{selectedPlan === plan.id ? "Plano selecionado" : "Escolher plano"}</span>
          </label>
        ))}
      </div>

      <div className="enrollment-box">
        <div>
          <span className="step-label">ÚLTIMO PASSO</span>
          <h2>COMECE SUA <em>TRANSFORMAÇÃO.</em></h2>
          <p>Você escolheu <strong>{currentPlan.name}</strong> por <strong>R$ {currentPlan.price}</strong>. Finalize com a equipe pelo WhatsApp.</p>
        </div>
        <div className="enrollment-action">
          <label htmlFor="first-name">Como podemos chamar você?</label>
          <input
            id="first-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Seu primeiro nome"
            autoComplete="given-name"
          />
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Finalizar no WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <small>Você será atendido diretamente pela equipe da Espaço Fit.</small>
        </div>
      </div>
    </div>
  );
}
