"use client";

import { FormEvent, useRef, useState } from "react";

const objectives = ["Emagrecimento", "Ganho de massa", "Condicionamento", "Saúde e qualidade de vida"];
const periods = ["Manhã", "Tarde", "Noite", "Horário flexível"];
const experiences = ["Estou começando agora", "Já treinei antes", "Já treino atualmente"];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function PlanSelector({ prices }: { prices: { individual: string; casal: string; familia: string } }) {
  const plans = [
    { id: "individual", name: "Individual", price: prices.individual, note: "Seu plano, seu ritmo, seu resultado." },
    { id: "casal", name: "Casal", price: prices.casal, note: "Treinem juntos e mantenham o foco." },
    { id: "familia", name: "+2 Família", price: prices.familia, note: "Condição especial para a família treinar." },
  ];
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [objective, setObjective] = useState("");
  const [period, setPeriod] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [experience, setExperience] = useState(experiences[0]);
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [demoComplete, setDemoComplete] = useState(false);
  const formStarted = useRef(false);

  const currentPlan = plans.find((plan) => plan.id === selectedPlan) ?? plans[0];
  const phoneDigits = phone.replace(/\D/g, "");
  const isReady = name.trim().length >= 3 && phoneDigits.length >= 10 && Boolean(objective) && Boolean(period) && Boolean(preferredDate) && consent;
  const minimumDate = new Date().toISOString().slice(0, 10);

  const getAttribution = () => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") ?? "";
    const referrer = document.referrer.toLowerCase();
    const source = utmSource || (referrer.includes("instagram") ? "instagram" : referrer.includes("google") ? "google" : referrer ? "referência" : "direto");
    return { source, utmSource, utmMedium: params.get("utm_medium") ?? "", utmCampaign: params.get("utm_campaign") ?? "" };
  };

  const track = (event: string, metadata: Record<string, string> = {}) => {
    const attribution = getAttribution();
    void fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, path: window.location.pathname, source: attribution.source, metadata }),
      keepalive: true,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isReady) return;
    setDemoComplete(true);
    track("demo_completed", { plan: currentPlan.name });
  };

  return (
    <div className="enrollment-flow">
      <ol className="enrollment-progress" aria-label="Etapas da matrícula">
        <li className="is-complete"><span>1</span><div><strong>Plano</strong><small>Escolha concluída</small></div></li>
        <li className={isReady ? "is-complete" : "is-current"}><span>2</span><div><strong>Seus dados</strong><small>Preencha para avançar</small></div></li>
        <li className={demoComplete ? "is-complete" : isReady ? "is-current" : ""}><span>3</span><div><strong>Demonstração</strong><small>Nenhum dado é enviado</small></div></li>
      </ol>

      <div className="plan-grid" role="radiogroup" aria-label="Escolha seu plano">
        {plans.map((plan, index) => (
          <label className={`plan-card ${selectedPlan === plan.id ? "is-selected" : ""}`} key={plan.id}>
            {index === 1 ? <span className="popular-tag">MAIS ESCOLHIDO</span> : null}
            <input
              type="radio"
              name="plan"
              value={plan.id}
              checked={selectedPlan === plan.id}
              onChange={() => {
                setSelectedPlan(plan.id);
                track("plan_selected", { plan: plan.name });
              }}
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
        <div className="enrollment-summary">
          <span className="step-label">MATRÍCULA ASSISTIDA</span>
          <h2>TESTE O FLUXO.<br /><em>SEM ENVIAR DADOS.</em></h2>
          <p>Use informações fictícias para experimentar como seria uma matrícula automatizada.</p>
          <div className="selected-plan-summary" aria-live="polite">
            <small>PLANO SELECIONADO</small>
            <strong>{currentPlan.name}</strong>
            <span>R$ {currentPlan.price} <small>por pessoa</small></span>
          </div>
          <ul className="automation-benefits">
            <li><span>✓</span> Experiência completa de demonstração</li>
            <li><span>✓</span> Nenhum contato com a academia</li>
            <li><span>✓</span> Nenhum dado pessoal armazenado</li>
          </ul>
        </div>

        <form
          className="enrollment-action enrollment-form"
          onSubmit={handleSubmit}
          onFocus={() => {
            if (!formStarted.current) {
              formStarted.current = true;
              track("form_started", { plan: currentPlan.name });
            }
          }}
        >
          <div className="form-heading">
            <span>2 DE 3</span>
            <div><strong>Conte um pouco sobre você</strong><small>Campos com * são obrigatórios</small></div>
          </div>

          <div className="form-grid">
            <label className="form-field form-field-wide" htmlFor="student-name">
              <span>Nome fictício *</span>
              <input
                id="student-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Visitante Demo"
                autoComplete="off"
                required
              />
            </label>

            <label className="form-field" htmlFor="student-phone">
              <span>Telefone fictício *</span>
              <input
                id="student-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                placeholder="(00) 00000-0000"
                autoComplete="off"
                required
              />
            </label>

            <label className="form-field" htmlFor="student-objective">
              <span>Principal objetivo *</span>
              <select id="student-objective" value={objective} onChange={(event) => setObjective(event.target.value)} required>
                <option value="" disabled>Selecione</option>
                {objectives.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="form-field" htmlFor="student-period">
              <span>Melhor período *</span>
              <select id="student-period" value={period} onChange={(event) => setPeriod(event.target.value)} required>
                <option value="" disabled>Selecione</option>
                {periods.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="form-field" htmlFor="student-date">
              <span>Quando quer conhecer? *</span>
              <input
                id="student-date"
                type="date"
                min={minimumDate}
                value={preferredDate}
                onChange={(event) => setPreferredDate(event.target.value)}
                required
              />
            </label>

            <label className="form-field" htmlFor="student-experience">
              <span>Experiência com treino</span>
              <select id="student-experience" value={experience} onChange={(event) => setExperience(event.target.value)}>
                {experiences.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="form-field form-field-wide" htmlFor="student-notes">
              <span>Algo que a equipe precisa saber?</span>
              <textarea
                id="student-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value.slice(0, 240))}
                placeholder="Ex.: quero começar ainda esta semana, tenho restrição de horário..."
                rows={3}
              />
              <small>{notes.length}/240</small>
            </label>

          </div>

          <label className="consent-field">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
            <span>Entendo que esta é uma simulação e usarei somente dados fictícios. Li o <a href="/privacidade" target="_blank">aviso da demonstração</a>.</span>
          </label>

          {demoComplete ? <p className="form-success" role="status">Demonstração concluída. Nenhum dado foi enviado ou armazenado.</p> : null}
          <button className="button button-primary enrollment-submit" type="submit" disabled={!isReady}>
            <span>{demoComplete ? "Demonstração concluída" : isReady ? "Concluir demonstração" : "Complete os campos obrigatórios"}</span>
            <b aria-hidden="true">→</b>
          </button>
          <small className="form-privacy">Este portfólio não envia os dados preenchidos e não abre contato externo.</small>
        </form>
      </div>
    </div>
  );
}
