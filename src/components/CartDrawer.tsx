import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Clock,
  Minus,
  MessageCircle,
  Plus,
  ShoppingBasket,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/menu";
import {
  CUTOFF_MINUTES,
  formatClosesIn,
  getAvailableSlots,
  type DeliverySlot,
} from "@/lib/slots";
import {
  OWNER_WHATSAPP,
  customerMessage,
  openWhatsApp,
  ownerMessage,
  type OrderDetails,
} from "@/lib/whatsapp";

const DELIVERY_FEE = 49;
const FREE_ABOVE = 999;

type Step = "cart" | "details" | "done";

export function CartDrawer() {
  const { lines, subtotal, isOpen, setOpen, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "", slot: "" });
  const [order, setOrder] = useState<OrderDetails | null>(null);

  // Slots are time-sensitive: compute on the client and refresh every minute
  // so cutoffs expire live while the drawer is open.
  const [slots, setSlots] = useState<DeliverySlot[]>([]);
  useEffect(() => {
    const refresh = () => setSlots(getAvailableSlots());
    refresh();
    const t = setInterval(refresh, 60_000);
    return () => clearInterval(t);
  }, []);

  const selectedSlot = useMemo(
    () => slots.find((s) => s.id === form.slot) ?? null,
    [slots, form.slot],
  );

  // Keep a valid selection: pick the soonest slot, or move on if one expires.
  useEffect(() => {
    if (slots.length === 0) return;
    if (!slots.some((s) => s.id === form.slot)) {
      setForm((f) => ({ ...f, slot: slots[0]!.id }));
    }
  }, [slots, form.slot]);

  const deliveryFee = subtotal === 0 || subtotal >= FREE_ABOVE ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const close = () => {
    setOpen(false);
    if (step === "done") setStep("cart");
  };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    const details: OrderDetails = {
      orderId: `CW${Math.floor(100000 + Math.random() * 900000)}`,
      name: form.name,
      phone: form.phone,
      address: form.address,
      slot: selectedSlot.label,
      lines,
      subtotal,
      deliveryFee,
      total,
    };
    setOrderId(details.orderId);
    setOrder(details);
    setStep("done");
    clear();
    // Notify the kitchen on WhatsApp straight away.
    openWhatsApp(OWNER_WHATSAPP, ownerMessage(details));
  };

  const inputCls =
    "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40";

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-bake-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-xl font-semibold">
            {step === "cart" && "Your basket"}
            {step === "details" && "Delivery details"}
            {step === "done" && "Order placed"}
          </h2>
          <button
            onClick={close}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBasket className="h-12 w-12 text-muted-foreground/50" />
                  <p className="font-display text-lg font-semibold">
                    Your basket is empty
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add something sweet from the menu.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map(({ item, qty }) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-2xl border border-border bg-background p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        width={768}
                        height={768}
                        loading="lazy"
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-snug">
                            {item.name}
                          </p>
                          <button
                            onClick={() => remove(item.id)}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatINR(item.price)} / {item.unit}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 rounded-full border border-border px-1.5 py-1">
                            <button
                              onClick={() => setQty(item.id, qty - 1)}
                              className="rounded-full p-1 hover:bg-secondary"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold">
                              {qty}
                            </span>
                            <button
                              onClick={() => setQty(item.id, qty + 1)}
                              className="rounded-full p-1 hover:bg-secondary"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold">
                            {formatINR(item.price * qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="space-y-2 border-t border-border px-6 py-5">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery {deliveryFee === 0 && "(free)"}</span>
                  <span>{deliveryFee === 0 ? "₹0" : formatINR(deliveryFee)}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-jam">
                    Add {formatINR(FREE_ABOVE - subtotal)} more for free delivery
                  </p>
                )}
                <div className="flex justify-between border-t border-dashed border-border pt-2 font-display text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
                <button
                  onClick={() => setStep("details")}
                  className="mt-2 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-bake transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Checkout · {formatINR(total)}
                </button>
              </div>
            )}
          </>
        )}

        {step === "details" && (
          <form onSubmit={placeOrder} className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Phone</label>
                <input
                  required
                  type="tel"
                  pattern="[0-9+ -]{10,}"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Delivery address
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={inputCls}
                  placeholder="Flat, street, landmark, pin code"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Delivery slot
                </label>
                {slots.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                    Checking today's kitchen availability…
                  </p>
                ) : (
                  <select
                    required
                    value={form.slot}
                    onChange={(e) => setForm({ ...form, slot: e.target.value })}
                    className={inputCls}
                  >
                    {slots.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                )}
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedSlot && formatClosesIn(selectedSlot.closesInMinutes)
                    ? `Orders for this slot ${formatClosesIn(selectedSlot.closesInMinutes)}`
                    : `Slots close ${CUTOFF_MINUTES} minutes before delivery starts`}
                </p>
              </div>
              <p className="rounded-xl bg-secondary px-4 py-3 text-xs leading-relaxed text-secondary-foreground">
                Pay on delivery (UPI, card, or cash). We'll call to confirm your
                order within 10 minutes.
              </p>
            </div>
            <div className="mt-auto flex gap-3 pt-6">
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-bake transition-transform hover:scale-[1.02] active:scale-95"
              >
                Place order · {formatINR(total)}
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-pistachio" />
            <h3 className="font-display text-2xl font-semibold">
              Thank you, {form.name.split(" ")[0] || "friend"}!
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Order <strong className="text-foreground">#{orderId}</strong> is
              confirmed. Our bakers are preheating the oven — we'll call you
              shortly to confirm delivery ({order?.slot}).
            </p>
            <p className="text-xs text-muted-foreground">
              We've sent the order to our kitchen on WhatsApp. Get your own copy
              below.
            </p>
            <div className="mt-1 flex w-full flex-col gap-2">
              {order && (
                <>
                  <button
                    onClick={() => openWhatsApp(order.phone, customerMessage(order))}
                    className="flex items-center justify-center gap-2 rounded-full bg-pistachio px-7 py-3 text-sm font-semibold text-foreground shadow-bake transition-transform hover:scale-[1.03]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send my WhatsApp confirmation
                  </button>
                  <button
                    onClick={() => openWhatsApp(OWNER_WHATSAPP, ownerMessage(order))}
                    className="flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                  >
                    Resend order to the kitchen
                  </button>
                </>
              )}
              <button
                onClick={close}
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-bake transition-transform hover:scale-[1.03]"
              >
                Keep browsing
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
