import { auth } from "@/auth";
import NavbarHome from "@/components/navbar-home";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="bg-[#333330]">
      <NavbarHome />
    </div>
  );
};

export default Dashboard;
