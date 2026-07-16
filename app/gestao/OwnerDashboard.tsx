"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BrandLogo } from "../components/BrandLogo";

type Lead = {
  id: number;
  name: string;
  phone: string;
  plan: string;
  price: string;
  objective: string;
  preferredPeriod: string;
  preferredDate: string;
  experience: string;
  notes: string;
  source: string;
  status: string;
  whatsappOpened: boolean;
  createdAt: string;
};

type EventTotal = { event: string; total: number };
type Settings = {
  priceIndividual: string;
  priceCasal: string;
  priceFamilia: string;
  weekdayHours: string;
  saturdayHours: string;
  announcement: string;
};

const initialSettings: Settings = {
  priceIndividual: "75,00",
  priceCasal: "70,00",
  priceFamilia: "65,00",
  weekdayHours: "05h — 22h",
  saturdayHours: "07h — 18h",
  announcement: "Matrículas abertas",
};

const statusLabels: Record<string, string> = {
  novo: "Novo",
  retorno: "Retorno",
  contatado: "Contatado",
  agendado: "Agendado",
  matriculado: "Matriculado",
  perdido: "Não convertido",
};

const statuses = Object.keys(statusLabels);

function formatDate(value: string) {
  if (!value) return "—";
  const normalized = value.includes("T") ? value : `${value.replace(" ", "T")}Z`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: value.length > 10 ? "short" : undefined }).format(date);
}

function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}`;
}

export function OwnerDashboard({ adminName, signOutUrl }: { adminName: string; signOutUrl: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<EventTotal[]>([]);
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [savingSettings, setSavingSettings] = useState(false);
  const [status, setStatus] = useState("todos");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/leads", { cache: "no-store" });
      const result = (await response.json()) as { leads?: Lead[]; events?: EventTotal[]; settings?: Settings; error?: string };
      if (!response.ok) throw new Error(result.error || "Não foi possível carregar.");
      setLeads(result.leads ?? []);
      setEvents(result.events ?? []);
      if (result.settings) setSettings(result.settings);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Não foi possível carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(loadTimer);
  }, [load]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus = status === "todos" || lead.status === status;
      const matchesSearch = !term || `${lead.name} ${lead.phone} ${lead.plan} ${lead.objective}`.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [leads, search, status]);

  const enrolled = leads.filter((lead) => lead.status === "matriculado").length;
  const scheduled = leads.filter((lead) => lead.status === "agendado").length;
  const newLeads = leads.filter((lead) => lead.status === "novo" || lead.status === "retorno").length;
  const conversion = leads.length ? Math.round((enrolled / leads.length) * 100) : 0;
  const clickTotal = events.find((event) => event.event === "cta_click")?.total ?? 0;

  const updateStatus = async (id: number, nextStatus: string) => {
    const previous = leads;
    setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, status: nextStatus } : lead));
    const response = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    });
    if (!response.ok) {
      setLeads(previous);
      setError("Não foi possível atualizar esse contato.");
    }
  };

  const exportCsv = () => {
    const rows = [
      ["ID", "Data", "Nome", "WhatsApp", "Plano", "Objetivo", "Data desejada", "Período", "Status", "Origem", "Observações"],
      ...filtered.map((lead) => [lead.id, lead.createdAt, lead.name, lead.phone, lead.plan, lead.objective, lead.preferredDate, lead.preferredPeriod, statusLabels[lead.status] ?? lead.status, lead.source, lead.notes]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `espaco-fit-contatos-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    setError("");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(settings),
      });
      const result = (await response.json()) as { settings?: Settings; error?: string };
      if (!response.ok || !result.settings) throw new Error(result.error || "Não foi possível salvar.");
      setSettings(result.settings);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Não foi possível salvar.");
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <main className="owner-dashboard">
      <header className="dashboard-header">
        <BrandLogo />
        <div><span>PAINEL DA ACADEMIA</span><strong>Olá, {adminName}</strong></div>
        <nav><a href="/" target="_blank">Ver site ↗</a><a href={signOutUrl}>Sair</a></nav>
      </header>

      <section className="dashboard-intro">
        <div><span>GESTÃO DE MATRÍCULAS</span><h1>Contatos em um só lugar.</h1><p>Acompanhe cada interessado do primeiro clique até a matrícula.</p></div>
        <button type="button" onClick={() => void load()}>Atualizar dados</button>
      </section>

      <section className="dashboard-metrics" aria-label="Resumo de desempenho">
        <article><span>CONTATOS</span><strong>{leads.length}</strong><small>Total registrado</small></article>
        <article className="metric-orange"><span>NOVOS</span><strong>{newLeads}</strong><small>Aguardando atendimento</small></article>
        <article><span>AGENDADOS</span><strong>{scheduled}</strong><small>Próximas visitas</small></article>
        <article><span>MATRICULADOS</span><strong>{enrolled}</strong><small>{conversion}% de conversão</small></article>
        <article><span>CLIQUES</span><strong>{clickTotal}</strong><small>Chamadas principais</small></article>
      </section>

      <section className="dashboard-settings">
        <div><span>CONTEÚDO DO SITE</span><strong>Atualizações rápidas</strong><p>Altere preços, horários e o aviso principal sem editar o site.</p></div>
        <div className="dashboard-settings-fields">
          <label><span>Individual</span><input value={settings.priceIndividual} onChange={(event) => setSettings({ ...settings, priceIndividual: event.target.value })} /></label>
          <label><span>Casal</span><input value={settings.priceCasal} onChange={(event) => setSettings({ ...settings, priceCasal: event.target.value })} /></label>
          <label><span>Família</span><input value={settings.priceFamilia} onChange={(event) => setSettings({ ...settings, priceFamilia: event.target.value })} /></label>
          <label><span>Segunda a sexta</span><input value={settings.weekdayHours} onChange={(event) => setSettings({ ...settings, weekdayHours: event.target.value })} /></label>
          <label><span>Sábado</span><input value={settings.saturdayHours} onChange={(event) => setSettings({ ...settings, saturdayHours: event.target.value })} /></label>
          <label><span>Aviso principal</span><input value={settings.announcement} onChange={(event) => setSettings({ ...settings, announcement: event.target.value })} /></label>
        </div>
        <button type="button" onClick={() => void saveSettings()} disabled={savingSettings}>{savingSettings ? "Salvando..." : "Salvar no site"}</button>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-toolbar">
          <div><strong>Leads e agendamentos</strong><span>{filtered.length} resultado(s)</span></div>
          <label><span>Buscar</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nome, telefone ou plano" /></label>
          <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="todos">Todos</option>{statuses.map((item) => <option key={item} value={item}>{statusLabels[item]}</option>)}</select></label>
          <button type="button" onClick={exportCsv} disabled={!filtered.length}>Exportar CSV</button>
        </div>

        {error ? <p className="dashboard-error" role="alert">{error}</p> : null}
        {loading ? <div className="dashboard-empty">Carregando contatos...</div> : null}
        {!loading && !filtered.length ? <div className="dashboard-empty">Nenhum contato encontrado com esses filtros.</div> : null}

        <div className="lead-list">
          {filtered.map((lead) => (
            <article className="lead-card" key={lead.id}>
              <div className="lead-main">
                <span className={`lead-status status-${lead.status}`}>{statusLabels[lead.status] ?? lead.status}</span>
                <small>EF-{lead.id} · {formatDate(lead.createdAt)}</small>
                <h2>{lead.name}</h2>
                <a href={whatsappLink(lead.phone)} target="_blank" rel="noreferrer">{lead.phone} ↗</a>
              </div>
              <dl>
                <div><dt>Plano</dt><dd>{lead.plan} · R$ {lead.price}</dd></div>
                <div><dt>Objetivo</dt><dd>{lead.objective}</dd></div>
                <div><dt>Visita desejada</dt><dd>{formatDate(lead.preferredDate)} · {lead.preferredPeriod}</dd></div>
                <div><dt>Experiência</dt><dd>{lead.experience}</dd></div>
                <div><dt>Origem</dt><dd>{lead.source}</dd></div>
                {lead.notes ? <div className="lead-notes"><dt>Observações</dt><dd>{lead.notes}</dd></div> : null}
              </dl>
              <div className="lead-actions">
                <label><span>Atualizar etapa</span><select value={lead.status} onChange={(event) => void updateStatus(lead.id, event.target.value)}>{statuses.map((item) => <option key={item} value={item}>{statusLabels[item]}</option>)}</select></label>
                <a href={whatsappLink(lead.phone)} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
