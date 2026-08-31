import { CakeSlice, ChefHat, Clock, Phone, Truck } from "lucide-react";
import { OWNER_WHATSAPP, whatsappLink } from "@/lib/whatsapp";

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
            +91 89045 84277.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={whatsappLink(OWNER_WHATSAPP, "Hi Crumble & Whisk! I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-pistachio px-4 py-2 text-xs font-semibold text-foreground transition-transform hover:scale-[1.03]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.3A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp order
            </a>
            <a
              href="tel:+918904584277"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-secondary"
            >
              <Phone className="h-4 w-4" />
              Call now
            </a>
          </div>
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
        <div className="flex items-center gap-3">
          <a
            href={whatsappLink(OWNER_WHATSAPP, "Hi Crumble & Whisk! I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary"
            aria-label="WhatsApp"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.3A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <a
            href="tel:+918904584277"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary"
            aria-label="Call"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Crumble &amp; Whisk. Baked with love.
        </p>
      </div>
    </footer>
  );
}
