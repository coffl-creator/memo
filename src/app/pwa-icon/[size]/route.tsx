import { appIcon } from "@/lib/appIcon";

const SIZES = [192, 512];

export function generateStaticParams() {
  return SIZES.map((size) => ({ size: String(size) }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/pwa-icon/[size]">,
) {
  const { size } = await params;
  const value = Number(size);
  if (!SIZES.includes(value)) return new Response(null, { status: 404 });
  return appIcon(value);
}
