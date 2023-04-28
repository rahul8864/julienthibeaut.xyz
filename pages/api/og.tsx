import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const image = fetch(
  new URL("../../public/og/blueskybg.jpg", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const imageData = await image;

    const hasTitle = searchParams.has("title");

    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    console.log("imageData", imageData);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          <img src={imageData as any} alt="bg" />
          <div
            style={{ display: "flex", backdropFilter: "blur(24px)" }}
            tw="absolute bottom-0 right-0 h-[80%] w-[90%] rounded-tl-2xl bg-gray-900/80 shadow-2xl"
          >
            <div
              style={{ display: "flex" }}
              tw="absolute top-0 left-0 flex w-full rounded-tl-2xl border-b border-gray-700/50 bg-slate-800/70 py-[10px] px-4"
            >
              <div tw="h-3 w-3 mr-2 rounded-full bg-[#FE5F57]"></div>
              <div tw="h-3 w-3 mr-2 rounded-full bg-[#FFBC2E]"></div>
              <div tw="h-3 w-3 rounded-full bg-[#28C840]"></div>
            </div>
            <div
              tw="flex h-full w-full flex-col justify-end p-10 text-white"
              style={{ display: "flex" }}
            >
              <div tw="text-left flex-col" style={{ display: "flex" }}>
                <h2 tw="font-sans text-8xl font-black">{title}</h2>
                <div tw="mt-6 flex whitespace-nowrap text-gray-400">
                  <div tw="flex">
                    <img
                      alt="Author"
                      src={`https://github.com/ibelick.png`}
                      tw="object-cove mr-2 h-8 w-8 rounded-full"
                    />
                    <div tw="mt-1">@ibelick</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);

    new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
