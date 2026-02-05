"use client";

import Link from "next/link";
import { Mail, MessageCircle, MapPin, Instagram, Youtube, Linkedin } from "lucide-react";

const quickLinks = [
  { href: "#programs", label: "Programs" },
  { href: "#whats-included", label: "Resources" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Youtube, label: "YouTube" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-footer-bg text-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#D1D5DB] transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-[#D1D5DB]">
              <li className="flex items-center gap-2">
                <Mail size={18} className="shrink-0 text-gold" />
                <a
                  href="mailto:hello@mentorsubhimath.com"
                  className="hover:text-gold transition-colors"
                >
                  hello@mentorsubhimath.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={18} className="shrink-0 text-gold" />
                <span>WhatsApp (placeholder)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="shrink-0 text-gold" />
                <span>UK • USA • Singapore</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 className="font-heading font-semibold text-white">Follow Us</h4>
            <ul className="mt-4 flex gap-4">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-[#D1D5DB] transition-colors hover:text-gold"
                    aria-label={item.label}
                  >
                    <item.icon size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#374151] pt-8 sm:flex-row">
          <p className="text-sm text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} MentorSubhiMath. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="#"
              className="text-[#9CA3AF] hover:text-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[#9CA3AF] hover:text-gold transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
