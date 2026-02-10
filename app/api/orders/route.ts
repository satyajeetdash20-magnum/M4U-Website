import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

interface OrderItemPayload {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

function buildOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.floor(Math.random() * 9000 + 1000);
  return `MSM-${date}-${suffix}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customerEmail?: string;
      items?: OrderItemPayload[];
      totalAmount?: number;
      paypalOrderId?: string;
    };

    if (
      !body.customerEmail ||
      !body.items ||
      body.items.length === 0 ||
      !body.totalAmount
    ) {
      return NextResponse.json(
        { error: "Missing order details." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    const orderNumber = buildOrderNumber();

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_email: body.customerEmail,
        items_json: {
          items: body.items,
          paypalOrderId: body.paypalOrderId ?? null,
        },
        total_amount: body.totalAmount,
        status: "paid",
      })
      .select("id, order_number")
      .single();

    if (orderError || !orderData) {
      return NextResponse.json(
        { error: orderError?.message ?? "Could not create order." },
        { status: 500 }
      );
    }

    const downloadRows = body.items.map((item) => ({
      order_id: orderData.id,
      product_id: item.productId,
      download_count: 0,
    }));

    const { error: downloadsError } = await supabase
      .from("downloads")
      .insert(downloadRows);

    if (downloadsError) {
      return NextResponse.json(
        { error: downloadsError.message },
        { status: 500 }
      );
    }

    // Placeholder for email service integration.
    console.info("Order confirmation email placeholder", {
      customerEmail: body.customerEmail,
      orderNumber: orderData.order_number,
    });

    return NextResponse.json({
      id: orderData.id,
      orderNumber: orderData.order_number,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
