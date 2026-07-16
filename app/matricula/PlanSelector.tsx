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
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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

  const buildWhatsappUrl = (leadId: number) => {
    const message = [
      "Olá, equipe Espaço Fit! Acabei de preencher minha matrícula no site.",
      "",
      "*DADOS DO ALUNO*",
      `Código: EF-${leadId}`,
      `Nome: ${name.trim()}`,
      `WhatsApp: ${phone}`,
      `Plano escolhido: ${currentPlan.name}`,
      `Valor informado: R$ ${currentPlan.price}`,
      `Objetivo: ${objective}`,
      `Data desejada para conhecer: ${preferredDate.split("-").reverse().join("/")}`,
      `Melhor período: ${period}`,
      `Experiência: ${experience}`,
      notes.trim() ? `Observações: ${notes.trim()}` : "Observações: —",
      "",
      "Podem confirmar a disponibilidade e me orientar sobre os próximos passos?",
    ].join("\n");

    return `https://wa.me/5583998458019?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isReady || isSubmitting) return;

    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const attribution = getAttribution();
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          plan: currentPlan.name,
          price: currentPlan.price,
          objective,
          preferredPeriod: period,
          preferredDate,
          experience,
          notes,
          consent,
          website,
          ...attribution,
        }),
      });
      const result = (await response.json()) as { lead?: { id: number }; error?: string };
      if (!response.ok || !result.lead) throw new Error(result.error || "Não foi possível concluir.");

      void fetch("/api/leads", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: result.lead.id, whatsappOpened: true }),
        keepalive: true,
      });
      track("whatsapp_opened", { leadId: String(result.lead.id), plan: currentPlan.name });
      const destination = buildWhatsappUrl(result.lead.id);
      if (whatsappWindow) whatsappWindow.location.href = destination;
      else window.location.href = destination;
    } catch (error) {
      whatsappWindow?.close();
      setSubmitError(error instanceof Error ? error.message : "Não foi possível concluir. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="enrollment-flow">
      <ol className="enrollment-progress" aria-label="Etapas da matrícula">
        <li className="is-complete"><span>1</span><div><strong>Plano</strong><small>Escolha concluída</small></div></li>
        <li className={isReady ? "is-complete" : "is-current"}><span>2</span><div><strong>Seus dados</strong><small>Preencha para avançar</small></div></li>
        <li className={isReady ? "is-current" : ""}><span>3</span><div><strong>WhatsApp</strong><small>Envio para a equipe</small></div></li>
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
          <h2>SEUS DADOS.<br /><em>MENSAGEM PRONTA.</em></h2>
          <p>Preencha uma vez e nós organizamos as informações para a equipe receber tudo no WhatsApp.</p>
          <div className="selected-plan-summary" aria-live="polite">
            <small>PLANO SELECIONADO</small>
            <strong>{currentPlan.name}</strong>
            <span>R$ {currentPlan.price} <small>por pessoa</small></span>
          </div>
          <ul className="automation-benefits">
            <li><span>✓</span> Dados organizados automaticamente</li>
            <li><span>✓</span> Atendimento direto com a academia</li>
            <li><span>✓</span> Sem criar conta ou baixar aplicativo</li>
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
              <span>Nome completo *</span>
              <input
                id="student-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Como podemos chamar você?"
                autoComplete="name"
                required
              />
            </label>

            <label className="form-field" htmlFor="student-phone">
              <span>Seu WhatsApp *</span>
              <input
                id="student-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                placeholder="(83) 99999-9999"
                autoComplete="tel"
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

            <label className="form-honeypot" aria-hidden="true">
              Website
              <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </label>
          </div>

          <label className="consent-field">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
            <span>Autorizo a Espaço Fit a usar estes dados para entrar em contato sobre minha matrícula. Li o <a href="/privacidade" target="_blank">aviso de privacidade</a>.</span>
          </label>

          {submitError ? <p className="form-error" role="alert">{submitError}</p> : null}
          <button className="button button-primary enrollment-submit" type="submit" disabled={!isReady || isSubmitting}>
            <span>{isSubmitting ? "Salvando seus dados..." : isReady ? "Salvar e abrir o WhatsApp" : "Complete os campos obrigatórios"}</span>
            <b aria-hidden="true">→</b>
          </button>
          <small className="form-privacy">Ao continuar, o WhatsApp abrirá com a mensagem pronta. Basta revisar e tocar em enviar.</small>
        </form>
      </div>
    </div>
  );
}
