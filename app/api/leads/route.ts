export async function POST() {
  return Response.json(
    { ok: true, demo: true, message: "Nenhum dado foi enviado ou armazenado." },
    { status: 202 },
  );
}

export async function PATCH() {
  return Response.json({ ok: true, demo: true }, { status: 202 });
}
