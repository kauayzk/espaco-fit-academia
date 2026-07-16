import Link from "next/link";
import { getAdminUser } from "../admin-auth";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { BrandLogo } from "../components/BrandLogo";
import { OwnerDashboard } from "./OwnerDashboard";

export const dynamic = "force-dynamic";

export default async function ManagementPage() {
  await requireChatGPTUser("/gestao");
  const admin = await getAdminUser();

  if (!admin) {
    return (
      <main className="admin-denied">
        <BrandLogo />
        <span>ACESSO RESTRITO</span>
        <h1>Este painel é exclusivo do responsável pela academia.</h1>
        <p>Você entrou com uma conta que não está autorizada para visualizar os contatos.</p>
        <Link href="/">Voltar ao site</Link>
      </main>
    );
  }

  return <OwnerDashboard adminName={admin.displayName} signOutUrl={chatGPTSignOutPath("/")} />;
}
