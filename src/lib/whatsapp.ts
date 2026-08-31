import { formatINR } from "@/lib/menu";
import type { CartLine } from "@/lib/cart";

/** Kitchen WhatsApp number in international format, digits only. */
export const OWNER_WHATSAPP = "918904584277";

export interface OrderDetails {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  slot: string;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

function itemLines(lines: CartLine[]) {
  return lines
    .map((l) => `• ${l.qty} × ${l.item.name} — ${formatINR(l.item.price * l.qty)}`)
    .join("\n");
}

export function ownerMessage(o: OrderDetails) {
  return [
    `🧁 *New order #${o.orderId}* — Crumble & Whisk`,
    "",
    itemLines(o.lines),
    "",
    `Subtotal: ${formatINR(o.subtotal)}`,
    `Delivery: ${o.deliveryFee === 0 ? "Free" : formatINR(o.deliveryFee)}`,
    `*Total: ${formatINR(o.total)}* (pay on delivery)`,
    "",
    `Slot: ${o.slot}`,
    `Customer: ${o.name} (${o.phone})`,
    `Address: ${o.address}`,
  ].join("\n");
}

export function customerMessage(o: OrderDetails) {
  return [
    `Hi ${o.name.split(" ")[0] || "there"}! Your Crumble & Whisk order *#${o.orderId}* is confirmed. 🎂`,
    "",
    itemLines(o.lines),
    "",
    `Total: ${formatINR(o.total)} (pay on delivery)`,
    `Delivery: ${o.slot}`,
    `Address: ${o.address}`,
    "",
    "We'll call you shortly to confirm. Thank you for ordering!",
  ].join("\n");
}

function digits(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
}

export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${digits(phone)}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(phone: string, message: string) {
  if (typeof window === "undefined") return;
  window.open(whatsappLink(phone, message), "_blank", "noopener,noreferrer");
}
