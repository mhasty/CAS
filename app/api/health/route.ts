export async function GET() {
  return Response.json({ ok: true, service: "caarps-appraisal-os", version: "0.4.0" });
}
