import { useState } from "react";
import { Plus } from "lucide-react";
import { categories, formatINR, menuItems, type MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";

function MenuCard({ item }: { item: MenuItem }) {
  const { add, setOpen } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add(item);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-bake transition-transform duration-300 hover:-translate-y-1">
      <button
        onClick={() => {
          add(item);
          setOpen(true);
        }}
        className="relative block overflow-hidden"
        aria-label={`Add ${item.name} to cart and view cart`}
      >
        <img
          src={item.image}
          alt={item.name}
          width={768}
          height={768}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-jam px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
            {item.badge}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug">
            {item.name}
          </h3>
          <span
            className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 border-pistachio"
            title="Vegetarian"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-pistachio" />
          </span>
        </div>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-display text-xl font-semibold">
              {formatINR(item.price)}
            </span>
            <span className="ml-1.5 text-xs text-muted-foreground">
              / {item.unit}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
              justAdded
                ? "bg-pistachio text-primary-foreground"
                : "bg-primary text-primary-foreground hover:scale-105"
            }`}
          >
            <Plus className="h-4 w-4" />
            {justAdded ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}

export function MenuSection() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All");

  const visible =
    category === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === category);

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-jam">
          Baked to order
        </p>
        <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Today's menu
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Everything is baked after you order. Cakes need 4 hours, pastries
          just 90 minutes.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
