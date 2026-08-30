import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { CartDrawer } from "@/components/CartDrawer";
import { About, Footer, HowItWorks } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crumble & Whisk — Order Fresh Cakes & Bakery Online" },
      {
        name: "description",
        content:
          "Delivery-only cloud bakery in Kolkata. Order fresh-baked cakes, cupcakes, brownies, croissants and macarons — baked to order and delivered to your door.",
      },
      { property: "og:title", content: "Crumble & Whisk — Order Fresh Cakes & Bakery Online" },
      {
        property: "og:description",
        content:
          "Small-batch cakes and pastries baked to order in our cloud kitchen and delivered across Kolkata.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <MenuSection />
          <HowItWorks />
          <About />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
