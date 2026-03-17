import { NextResponse } from "next/server";
import generateKundli from "@/services/scraper/astrosageScraper";

export async function POST(request) {

  const body = await request.json();

  const result = await generateKundli(body);

  return NextResponse.json(result);
}