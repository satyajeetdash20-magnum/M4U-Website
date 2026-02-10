import { cookies } from "next/headers";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminToolbar } from "@/components/admin/AdminToolbar";

export default function AdminPage() {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("m4u-admin-auth")?.value === "1";

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl font-bold text-charcoal">Admin Panel</h1>
      {isAuthed ? (
        <>
          <AdminToolbar />
          <AdminDashboard />
        </>
      ) : (
        <AdminLoginForm />
      )}
    </section>
  );
}
