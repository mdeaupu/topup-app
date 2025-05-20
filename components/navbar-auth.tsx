"use client"; // Add this to make it a client component

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavbarAuth = () => {
  const pathname = usePathname();

  const report = () => {
    prompt();
  };

  // Check if current path is /register
  const isRegisterPage =
    pathname === "/register" || pathname === "/forgotpassword";

  return (
    <nav className="bg-[#4578a7]">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={128} height={36} priority />
        </Link>
        <div className="flex flex-row gap-6">
          {/* Show avatar button only on register page */}
          {isRegisterPage && (
            <button
              onClick={report}
              className="flex items-center text-sm ring-2 px-4 py-2 bg-[#5b6c8f] rounded-full cursor-pointer list-none"
            >
              <Image
                src="/operator.png"
                alt="avatar"
                width={64}
                height={64}
                className="w-8 h-8 rounded-full"
              />
            </button>
          )}
          {/* Always show home button */}
          <Link
            href="/"
            className="flex items-center text-sm ring-2 px-4 py-2 bg-[#5b6c8f] rounded-full cursor-pointer list-none"
          >
            <Image
              src="/home.png"
              alt="home"
              width={64}
              height={64}
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAuth;
