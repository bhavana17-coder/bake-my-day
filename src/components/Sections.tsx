import { CakeSlice, ChefHat, Clock, Truck } from "lucide-react";

const steps = [
  {
    icon: CakeSlice,
    title: "Pick your bakes",
    text: "Browse the menu and fill your basket with cakes, pastries, and bites.",
  },
  {
    icon: ChefHat,
    title: "We bake to order",
    text: "Nothing sits on a shelf. Your order goes straight into our ovens.",
  },
  {
    icon: Truck,
    title: "Doorstep delivery",
    text: "Chilled, careful delivery across Kolkata in 2-hour slots.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-jam">
            How it works
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            From our mixer to your table
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-3xl border border-border bg-card p-7 shadow-bake"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl font-semibold text-border">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-card p-8 shadow-bake md:grid-cols-[1.2fr_1fr] md:p-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-jam">
            Our kitchen
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            A cloud kitchen with a corner-bakery heart
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Crumble &amp; Whisk is a delivery-only bakery in Kolkata. We skipped
            the glass display counter and invested in better butter, single-origin
            chocolate, and slow fermentation instead. Every cake is baked after
            you order — never before.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <div>
              <p className="font-display text-2xl font-semibold text-jam">12k+</p>
              <p className="text-muted-foreground">cakes delivered</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-jam">100%</p>
              <p className="text-muted-foreground">eggless options</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-jam">0</p>
              <p className="text-muted-foreground">preservatives, ever</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-secondary p-7">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="h-4 w-4 text-jam" />
            Kitchen hours
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b border-dashed border-border pb-2">
              <span className="text-muted-foreground">Mon – Fri</span>
              <span className="font-medium">9 AM – 9 PM</span>
            </li>
            <li className="flex justify-between border-b border-dashed border-border pb-2">
              <span className="text-muted-foreground">Saturday</span>
              <span className="font-medium">9 AM – 10 PM</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Sunday</span>
              <span className="font-medium">10 AM – 8 PM</span>
            </li>
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Custom &amp; wedding cakes need 48 hours notice — call us at
            +91 90000 12345.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CakeSlice className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold">
            Crumble &amp; Whisk
          </span>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Delivery-only bakery · Salt Lake, Kolkata · FSSAI Lic. 12345678901234
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Crumble &amp; Whisk. Baked with love.
        </p>
      </div>
    </footer>
  );
}
