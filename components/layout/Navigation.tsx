"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { useCartStore } from "@/stores/useCartStore";

const navLinks = [
  { href: "#programs", label: "Programs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const onScroll = () => {
      setShowHeader(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);
    if (!section) return;

    const y = section.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: showHeader ? 0 : -100, opacity: showHeader ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-charcoal/70 backdrop-blur-md"
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <button
            onClick={() => scrollToSection("#hero")}
            className="font-heading text-xl font-bold text-white md:text-2xl"
            aria-label="Scroll to top"
          >
            MentorSubhi<span className="text-gold">Math</span>
          </button>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            <Link
              href="/shop"
              className="text-sm text-white/90 transition-colors hover:text-gold"
            >
              Shop
            </Link>
            <Link
              href="/resources/free"
              className="text-sm text-white/90 transition-colors hover:text-gold"
            >
              Free Resources
            </Link>
            <Link
              href="/cart"
              className="text-sm text-white/90 transition-colors hover:text-gold"
            >
              Cart ({itemCount})
            </Link>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-white/90 transition-colors hover:text-gold"
                aria-label={`Go to ${link.label} section`}
              >
                {link.label}
              </button>
            ))}
            <BookCallButton size="sm" label="Book Free Call" />
          </div>

          <button
            className="rounded-md p-2 text-white md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-50 bg-charcoal/70 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-72 flex-col gap-6 bg-white p-6 shadow-elevated-lg md:hidden"
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between">
                <p className="font-heading text-lg font-semibold text-charcoal">
                  Menu
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 text-charcoal transition-colors hover:bg-light-gray/40"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-charcoal transition-colors hover:text-gold"
                >
                  Shop
                </Link>
                <Link
                  href="/resources/free"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-charcoal transition-colors hover:text-gold"
                >
                  Free Resources
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-charcoal transition-colors hover:text-gold"
                >
                  Cart ({itemCount})
                </Link>
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-charcoal transition-colors hover:text-gold"
                    aria-label={`Go to ${link.label} section`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <BookCallButton
                size="sm"
                className="mt-auto w-full"
                label="Book Free Call"
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
