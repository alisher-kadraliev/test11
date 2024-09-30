import { Button } from "@/components/ui/button";
import Image from "next/image";
import NavBar from "./components/Navbar";
import MainBody from "./components/mainpage/MainBody";
import WhyUs from "./components/mainpage/WhyUs";
import HireLikeaPro from "./components/mainpage/HireLikeaPro";

export default function Home() {
  return (
    <div>
      <NavBar/>
      <MainBody/>
      <WhyUs/>
      <HireLikeaPro/>
    </div>
  );
}
