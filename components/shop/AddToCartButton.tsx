"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { trackAddToCart } from "@/lib/analytics";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export function AddToCartButton({
  product,
  quantity = 1,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Button
      className={className ?? "w-full md:w-auto"}
      leftIcon={<ShoppingCart size={16} />}
      isLoading={isAdding}
      onClick={async () => {
        setIsAdding(true);
        addItem(product, quantity);
        trackAddToCart(product.id, product.price);
        toast.success("Added to cart!");
        await new Promise((resolve) => setTimeout(resolve, 250));
        setIsAdding(false);
      }}
    >
      Add to cart
    </Button>
  );
}
