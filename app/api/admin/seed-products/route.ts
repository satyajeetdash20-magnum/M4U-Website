import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST() {
  if (!requireAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const rows = products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      original_price: product.original_price ?? null,
      category: product.category,
      difficulty_tier: product.difficulty_tier ?? null,
      product_type: product.product_type,
      image_url: product.image_url,
      pdf_url: product.sample_url ?? null,
      video_url: null,
      is_active: true,
    }));

    const { error } = await supabase.from("products").upsert(rows, {
      onConflict: "id",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: rows.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
