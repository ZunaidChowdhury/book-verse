import Hero from "@/components/sections/Hero";
import { getProtectedMessage } from "@/lib/data";
import { Button } from "@heroui/react";
import Image from "next/image";


export default async function Home() {
  // const protectedMessage = await getProtectedMessage();
  // console.log('client/jwttest/protectedMessage: ', protectedMessage)
  return (
    <div>
      <Hero  />


      {/* <Image
      src='/design.png'
      width={1000}
      height={5000}
       /> */}
    </div>
  );
}
