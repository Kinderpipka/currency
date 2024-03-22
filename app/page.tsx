import Image from "next/image";
import MetamaskPage from "./currency/current";
import "./globals.css";
import Star from "./curencystar/curencystar";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <MetamaskPage/>
     <Star/>
    </main>
  );
}
