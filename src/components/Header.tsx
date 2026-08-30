import { CakeSlice, ShoppingBasket } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CakeSlice className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Crumble &amp; Whisk
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#menu" className="transition-colors hover:text-foreground">
            Menu
          </a>
          <a href="#how" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#about" className="transition-colors hover:text-foreground">
            Our kitchen
          </a>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-bake transition-transform hover:scale-[1.03] active:scale-95"
        >
          <ShoppingBasket className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-jam px-1 text-[11px] font-bold text-accent-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
