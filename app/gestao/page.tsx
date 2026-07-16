import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "../admin-auth";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { BrandLogo } from "../components/BrandLogo";
import { isVercelRuntime } from "../platform";
import { OwnerDashboard } from "./OwnerDashboard";

export const dynamic = "force-dynamic";

export default async function ManagementPage() {
  if (isVercelRuntime()) {
    redirect("https://espaco-fit-sjm.kauayzk.chatgpt.site/gestao");
  }

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
