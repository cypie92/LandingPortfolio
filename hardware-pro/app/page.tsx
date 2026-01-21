import Categories from "./components/Categories";
import NewsBlog from "./components/NewsBlog";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import NewArrivals from "./components/NewArrivals";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-noise">
        <Hero />
        <Categories />
        <NewArrivals />
        <NewsBlog />
      </main>
    </div>
  );
}
