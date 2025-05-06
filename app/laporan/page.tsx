import type { Metadata } from "next";
import ProductTable from "@/components/product-table";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Products",
};

const ProductPage = async () => {
  const session = await auth();
  if (!session?.user?.role.includes("admin")) {
    redirect("/");
  }
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-md mx-auto py-10">
        <h1 className="text-2xl font-bold">Product List</h1>
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductPage;
