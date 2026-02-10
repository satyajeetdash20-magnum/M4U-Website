"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "@/lib/shop";
import { Button } from "@/components/ui/Button";

interface AdminOrder {
  id: string;
  order_number: string;
  customer_email: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface AdminProduct {
  id: string;
  title: string;
  price: number;
  is_active: boolean;
}

export function AdminDashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/products"),
      ]);

      if (!ordersRes.ok || !productsRes.ok) {
        throw new Error("Unable to load admin data.");
      }

      setOrders(await ordersRes.json());
      setProducts(await productsRes.json());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load data.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const markFulfilled = async (orderId: string) => {
    const response = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: "fulfilled" }),
    });

    if (!response.ok) {
      toast.error("Could not update order status.");
      return;
    }

    toast.success("Order marked as fulfilled.");
    void loadData();
  };

  const toggleActive = async (productId: string, isActive: boolean) => {
    const response = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, isActive }),
    });

    if (!response.ok) {
      toast.error("Could not update product status.");
      return;
    }

    toast.success("Product status updated.");
    void loadData();
  };

  const updatePrice = async (productId: string, nextPrice: number) => {
    const response = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, price: nextPrice }),
    });

    if (!response.ok) {
      toast.error("Could not update product price.");
      return;
    }

    toast.success("Price updated.");
    void loadData();
  };

  const seedProducts = async () => {
    const response = await fetch("/api/admin/seed-products", { method: "POST" });
    if (!response.ok) {
      toast.error("Could not seed sample products.");
      return;
    }

    toast.success("Sample products synced to Supabase.");
    void loadData();
  };

  if (isLoading) {
    return <p className="py-10 text-dark-gray">Loading admin data...</p>;
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-charcoal">Orders</h2>
        <div className="overflow-x-auto rounded-lg border border-light-gray">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-light-gray/20">
              <tr>
                <th className="p-3">Order #</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-light-gray/60">
                  <td className="p-3">{order.order_number}</td>
                  <td className="p-3">{order.customer_email}</td>
                  <td className="p-3">{formatCurrency(Number(order.total_amount))}</td>
                  <td className="p-3">{order.status}</td>
                  <td className="p-3">
                    {new Date(order.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-3">
                    {order.status !== "fulfilled" ? (
                      <Button size="sm" onClick={() => markFulfilled(order.id)}>
                        Mark fulfilled
                      </Button>
                    ) : (
                      <span className="text-dark-gray">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-charcoal">Products</h2>
          <Button size="sm" variant="outline" onClick={seedProducts}>
            Sync sample products
          </Button>
        </div>
        <div className="space-y-3">
          {products.length === 0 ? (
            <p className="rounded-lg border border-light-gray p-4 text-sm text-dark-gray">
              No products found in Supabase. Click &quot;Sync sample
              products&quot; to seed
              from `/data/products.ts`.
            </p>
          ) : null}
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-3 rounded-lg border border-light-gray p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium text-charcoal">{product.title}</p>
                <p className="text-sm text-dark-gray">
                  Status: {product.is_active ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  defaultValue={Number(product.price)}
                  step="0.01"
                  min={0}
                  type="number"
                  className="w-28 rounded-lg border border-light-gray px-3 py-2 text-sm"
                  onBlur={(event) => {
                    const value = Number(event.target.value);
                    if (!Number.isNaN(value) && value >= 0) {
                      void updatePrice(product.id, value);
                    }
                  }}
                />
                <Button
                  size="sm"
                  variant={product.is_active ? "outline" : "secondary"}
                  onClick={() => toggleActive(product.id, !product.is_active)}
                >
                  {product.is_active ? "Set inactive" : "Set active"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
