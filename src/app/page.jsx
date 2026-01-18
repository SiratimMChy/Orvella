import CategoryCards from "@/components/home/CategoryCards";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import BestSellers from "@/components/home/BestSellers";
import NewArrivals from "@/components/home/NewArrivals";
import { getNewArrivals } from '@/actions/server/Product';
import Image from "next/image";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
   const session = await getServerSession(authOptions);
   const newArrivals = await getNewArrivals(4);
  return (
    <div className="space-y-12 mb-6">
      <section>
        <Hero></Hero>
      </section>
      <section>
        <CategoryCards></CategoryCards>
      </section>
      <section>
        <BestSellers></BestSellers>
      </section>
      <section>
        <NewArrivals products={newArrivals}></NewArrivals>
      </section>
      <section>
        <AboutPage/>
      </section>
      <section>
        <ContactPage/>
      </section>
    </div>
  );
}
