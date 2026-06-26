import Slider from "@/components/sections/Slider";
import Slide1 from "@/components/slider/Slide1";
import Slide2 from "@/components/slider/Slide2";
import { getFeaturedBooks } from "@/lib/api/books";
import { getProtectedMessage } from "@/lib/data";
import { Button } from "@heroui/react";
import Image from "next/image";
import FeaturedBooks from "../components/sections/FeaturedBooks";
import { getTopWriters } from "@/lib/api/writers";
import TopWriters from "@/components/sections/TopWriters";
import BookGenres from "@/components/sections/BookGenres";
import Newsletter from "@/components/sections/Newsletter";


export default async function Home() {
  const featuredBooks = await getFeaturedBooks();
  const topWriters = await getTopWriters();
  // console.log('topWriters: ', topWriters);
  // const protectedMessage = await getProtectedMessage();
  // console.log('client/jwttest/protectedMessage: ', protectedMessage)
  return (
    <div>
      <Slider slides={[Slide1, Slide2]} />
      <FeaturedBooks featuredBooks={featuredBooks} />
      <TopWriters topWriters={topWriters} />
      <BookGenres />
      <Newsletter />
      

      {/* <Image
      src='/design.png'
      width={1000}
      height={5000}
       /> */}
    </div>
  );
}
