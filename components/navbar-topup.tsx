import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import ClientNavbarHome from "./home";
import { headers } from "next/headers";
import { gameData } from "@/app/page";

const NavbarTopUp = async () => {
  const headersList = headers();
  const pathname = (await headersList).get("x-pathname") || "/";

  const currentGame = gameData.find((game) =>
    pathname.startsWith(game.topupUrl)
  );

  console.log(currentGame);
  const session = await auth();
  if (!session) {
    return (
      <nav className="bg-[#4578a7]">
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
          <div className="flex flex-row gap-6">
            <Link
              href={`/login?redirectTo=${currentGame?.topupUrl}`}
              className="flex items-center text-sm ring-2 px-4 py-2 bg-[#5b6c8f] rounded-full cursor-pointer list-none"
            >
              <p className="mr-2 hidden md:inline-block font-semibold text-white capitalize">
                Masuk
              </p>

              <Image
                src={"/avatar.png"}
                alt="avatar"
                width={64}
                height={64}
                className="w-8 h-8 rounded-full"
              />
            </Link>
            <Link
              href="/"
              className="flex items-center text-sm ring-2 px-4 py-2 bg-[#5b6c8f] rounded-full cursor-pointer list-none"
            >
              <Image
                src={"/home.png"}
                alt="avatar"
                width={64}
                height={64}
                className="w-8 h-8 rounded-full"
              />
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#4578a7]">
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
            <div className="flex flex-row gap-6">
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
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <form
                        action={async () => {
                          "use server";
                          const headersList = headers();
                          const referer =
                            (await headersList).get("referer") || "/";
                          const redirectTo =
                            [
                              "/mobilelegends",
                              "/arenabreakout",
                              "/freefire",
                            ].find((p) => referer.includes(p)) || "/";
                          await signOut({ redirectTo });
                        }}
                      >
                        <button
                          type="submit"
                          className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </form>
                    </li>
                  </ul>
                </details>
              </div>
              <Link
                href="/"
                className="flex items-center text-sm ring-2 px-4 py-2 bg-[#5b6c8f] rounded-full cursor-pointer list-none"
              >
                <Image
                  src={"/home.png"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarTopUp;
