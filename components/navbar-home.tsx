import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import ClientNavbarHome from "./home";

const NavbarHome = async () => {
  const session = await auth();

  if (!session) {
    return (
      <nav className="bg-[#333330]">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={128}
              height={36}
              priority
            ></Image>
          </Link>
          <Link
            href="/login"
            className="flex items-center text-sm ring-2 px-4 py-2 bg-[#5b6c8f] rounded-full cursor-pointer list-none"
          >
            <p className="mr-2 hidden md:inline-block font-semibold text-white capitalize">
              Sign In
            </p>

            <Image
              src={"/avatar.png"}
              alt="avatar"
              width={64}
              height={64}
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#333330]">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={128}
            height={36}
            priority
          ></Image>
        </Link>
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-white">
            <ClientNavbarHome session={session} />
          </ul>
          {session && (
            <div className="relative">
              <details className="dropdown">
                <summary className="flex items-center text-sm ring-2 px-4 py-2 bg-[#5b6c8f] rounded-full cursor-pointer list-none">
                  <span className="mr-2 hidden md:inline-block font-semibold text-white capitalize">
                    {session.user?.name}
                  </span>
                  <Image
                    src={session.user?.image || "/avatar.png"}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                </summary>
                <ul className="absolute top-full right-0 mt-2 w-32 bg-white rounded-md shadow-md z-10">
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <form
                      action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                      }}
                    >
                      <button
                        type="submit"
                        className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full rounded-md text-left cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
