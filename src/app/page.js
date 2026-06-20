import Slider from "@/components/sections/Slider";
import Slide1 from "@/components/slider/Slide1";
import Slide2 from "@/components/slider/Slide2";
import { getFeaturedBooks } from "@/lib/api/books";
import { getProtectedMessage } from "@/lib/data";
import { Button } from "@heroui/react";
import Image from "next/image";


export default async function Home() {
  const featuredBooks = await getFeaturedBooks();
  // console.log('featuredBooks: ', featuredBooks);
  // const protectedMessage = await getProtectedMessage();
  // console.log('client/jwttest/protectedMessage: ', protectedMessage)
  return (
    <div>
      <Slider slides={[Slide1, Slide2]} />


      {/* <Image
      src='/design.png'
      width={1000}
      height={5000}
       /> */}
    </div>
  );
}
