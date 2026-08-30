import { Clock, MapPin, Star } from "lucide-react";
import { heroImage } from "@/lib/menu";

export function Hero() {
  return (
    <section id="top" className="texture-dots overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-jam" />
            Cloud bakery · Kolkata
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Fresh from our oven,{" "}
            <span className="italic text-jam">straight to your door.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Small-batch cakes, pastries, and bakes made to order in our cloud
            kitchen. No storefront, no shortcuts — just butter, time, and care.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-bake transition-transform hover:scale-[1.03] active:scale-95"
            >
              Order now
            </a>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-butter text-crust" />
              <span>
                <strong className="text-foreground">4.9</strong> · 1,200+ happy
                sweet tooths
              </span>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-jam" />
            Order by 6 PM for same-day delivery, 7–10 PM slot
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-secondary" />
          <img
            src={heroImage}
            alt="Belgian chocolate truffle cake topped with fresh berries"
            width={1024}
            height={1024}
            className="aspect-square w-full rounded-[2rem] object-cover shadow-bake-lg"
          />
          <div className="absolute -bottom-5 left-6 rounded-2xl border border-border bg-card px-5 py-3 shadow-bake">
            <p className="font-display text-lg font-semibold">
              Belgian Truffle Cake
            </p>
            <p className="text-sm text-muted-foreground">
              Bestseller · from ₹749
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
