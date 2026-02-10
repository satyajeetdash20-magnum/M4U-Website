import { forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps>,
    Omit<MotionProps, "children"> {
  variant?: "default" | "elevated" | "outlined";
  children?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-white shadow-subtle",
      elevated: "bg-white shadow-elevated-lg",
      outlined: "bg-white border-2 border-light-gray",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-lg p-6",
          variants[variant],
          className
        )}
        whileHover={{ y: -4, boxShadow: "0 14px 28px rgba(0, 0, 0, 0.14)" }}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-xl font-semibold text-charcoal", className)}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-dark-gray", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4 pt-4 border-t border-light-gray", className)} {...props} />
));

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
