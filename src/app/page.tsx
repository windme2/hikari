import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Catalog from "@/components/Catalog";
import About from "@/components/About";
import Reasons from "@/components/Reasons";
import Reviews from "@/components/Reviews";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Catalog />
        <About />
        <Reasons />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
