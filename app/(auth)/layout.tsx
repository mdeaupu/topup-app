import NavbarAuth from "@/components/navbar-auth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#333330] h-auto">
      <NavbarAuth />
      {children}
    </div>
  );
};

export default AuthLayout;
