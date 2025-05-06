import NavbarTopUp from "@/components/navbar-topup";

const TopUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100">
      <NavbarTopUp />
      {children}
    </div>
  );
};

export default TopUpLayout;
