import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const fileUrl = `https://develop.sonduckfilm.com/wp-content/uploads/woocommerce_uploads/2022/03/53-TimerProPack-DownloadLink.pdf`;

    const fileResponse = await fetch(fileUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!fileResponse.ok) {
      throw new Error(`Failed to download file: ${fileResponse.status} ${fileResponse.statusText}`);
    }

    const arrayBuffer = await fileResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": fileResponse.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileUrl.split("/").pop()}"`,
      },
    });
  } catch (err) {
    console.error(`Error fetching file:`, err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
