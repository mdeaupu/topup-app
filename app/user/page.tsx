import type { Metadata } from "next";
import UserTable from "@/components/user-table";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Users",
};

const UserPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  } else if (!session?.user?.role.includes("admin")) {
    redirect("/");
  }
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-md mx-auto py-10">
        <h1 className="text-2xl font-bold">User List</h1>
        <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
