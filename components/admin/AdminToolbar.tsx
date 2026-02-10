"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

export function AdminToolbar() {
  const router = useRouter();

  const logout = async () => {
    const response = await fetch("/api/admin/logout", { method: "POST" });
    if (!response.ok) {
      toast.error("Could not log out.");
      return;
    }

    toast.success("Logged out.");
    router.refresh();
  };

  return (
    <div className="mb-6 flex justify-end">
      <Button size="sm" variant="outline" onClick={logout}>
        Log out
      </Button>
    </div>
  );
}
