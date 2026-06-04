export default function handler(
  _req: any,
  res: { status: (code: number) => { json: (data: any) => void } }
) {
  res.status(200).json({ ok: true, source: "vercel-native" });
}
