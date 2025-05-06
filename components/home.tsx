"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

interface ClientNavbarHomeProps {
  session: Session | null;
}

const ClientNavbarHome = ({ session }: ClientNavbarHomeProps) => {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-white">
      {session?.user?.role === "admin" && (
        <>
          <li>
            <Link href="/laporan" className=" hover:text-[#5b6c8f]">
              Laporan
            </Link>
          </li>
          <li>
            <Link href="/user" className=" hover:text-[#5b6c8f]">
              User
            </Link>
          </li>
        </>
      )}
      {pathname === "/dashboard" && (
        <>
          <li>
            <Link href="/" className=" hover:text-[#5b6c8f]">
              Home
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default ClientNavbarHome;
