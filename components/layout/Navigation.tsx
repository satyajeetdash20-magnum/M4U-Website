"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-subtle">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link
          href="#hero"
          className="font-heading text-xl font-bold text-charcoal md:text-2xl"
        >
          MentorSubhi<span className="text-gold">Math</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-dark-gray transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link href="#contact">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="p-2 text-charcoal md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 border-t border-light-gray px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-dark-gray transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="#contact" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
