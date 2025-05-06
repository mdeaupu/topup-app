import Carousel from "@/components/carousel";
import ContentGame from "@/components/content-game";
import NavbarHome from "@/components/navbar-home";
import SearchBar from "@/components/search-bar";

export const gameData = [
  {
    name: "Mobile Legends",
    imageUrl: "/ml-1.jpg", // Pastikan path ini benar
    topupUrl: "/mobilelegends",
  },
  {
    name: "Arena Breakout",
    imageUrl: "/ab-1.jpg", // Pastikan path ini benar
    topupUrl: "/arenabreakout",
  },
  {
    name: "Free Fire",
    imageUrl: "/ff-1.jpg", // Pastikan path ini benar
    topupUrl: "/freefire",
  },
  {
    name: "Mobile Legends",
    imageUrl: "/ml-1.jpg", // Pastikan path ini benar
    topupUrl: "/mobilelegends2",
  },
  {
    name: "Arena Breakout",
    imageUrl: "/ab-1.jpg", // Pastikan path ini benar
    topupUrl: "/arenabreakout2",
  },
  {
    name: "Free Fire",
    imageUrl: "/ff-1.jpg", // Pastikan path ini benar
    topupUrl: "/freefire2",
  },
];

export default function Home() {
  const imageList = ["/ml-1.jpg", "/ab-1.jpg", "/ff-1.jpg"];

  return (
    <div className="bg-[#333330] min-h-screen">
      <NavbarHome />
      <div className="w-[1080px] h-[250px] mx-auto mt-2">
        <Carousel
          images={imageList}
          autoSlide={true}
          slideInterval={5000}
          width="w-full"
          height="h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <SearchBar />
      </div>
      <ContentGame games={gameData} />
    </div>
  );
}
