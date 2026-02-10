"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Invalid password.");
      }

      toast.success("Admin login successful.");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to log in.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-lg border border-light-gray p-6">
      <h2 className="text-xl font-semibold text-charcoal">Admin Login</h2>
      <p className="mt-2 text-sm text-dark-gray">
        Enter the admin panel password configured in your environment.
      </p>
      <label htmlFor="admin-password" className="mt-5 block text-sm font-medium text-charcoal">
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mt-2 w-full rounded-lg border border-light-gray px-4 py-3"
        placeholder="********"
      />
      <Button className="mt-5 w-full" type="submit" isLoading={isLoading}>
        Enter admin panel
      </Button>
    </form>
  );
}
