import heroCake from "@/assets/hero-cake.jpg";
import redVelvet from "@/assets/red-velvet.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import brownies from "@/assets/brownies.jpg";
import croissants from "@/assets/croissants.jpg";
import cheesecake from "@/assets/cheesecake.jpg";
import macarons from "@/assets/macarons.jpg";

export const heroImage = heroCake;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // INR
  unit: string;
  image: string;
  category: "Cakes" | "Pastries" | "Bites";
  badge?: string;
  veg: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "choco-truffle-cake",
    name: "Belgian Truffle Cake",
    description:
      "Three layers of dark chocolate sponge, silky ganache drip, crowned with fresh berries.",
    price: 749,
    unit: "500 g",
    image: heroCake,
    category: "Cakes",
    badge: "Bestseller",
    veg: true,
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    description:
      "Classic crimson layers with tangy cream-cheese frosting. Soft, moist, unforgettable.",
    price: 699,
    unit: "500 g",
    image: redVelvet,
    category: "Cakes",
    veg: true,
  },
  {
    id: "strawberry-cheesecake",
    name: "Strawberry Cheesecake",
    description:
      "Baked New-York style cheesecake on a biscuit base, glazed with macerated strawberries.",
    price: 899,
    unit: "700 g",
    image: cheesecake,
    category: "Cakes",
    badge: "Chef's Pick",
    veg: true,
  },
  {
    id: "cupcake-box",
    name: "Celebration Cupcakes",
    description:
      "Box of six — vanilla bean, rose, and chocolate cupcakes with buttercream swirls.",
    price: 449,
    unit: "box of 6",
    image: cupcakes,
    category: "Bites",
    veg: true,
  },
  {
    id: "fudge-brownies",
    name: "Fudgy Brownies",
    description:
      "Dense, crackly-topped brownies made with 70% dark chocolate. Box of four.",
    price: 349,
    unit: "box of 4",
    image: brownies,
    category: "Bites",
    badge: "Bestseller",
    veg: true,
  },
  {
    id: "french-macarons",
    name: "French Macarons",
    description:
      "Assorted box of eight — pistachio, raspberry, salted caramel, and vanilla.",
    price: 549,
    unit: "box of 8",
    image: macarons,
    category: "Bites",
    veg: true,
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant Duo",
    description:
      "Slow-laminated, 27-layer croissants baked fresh every morning. Pack of two.",
    price: 249,
    unit: "pack of 2",
    image: croissants,
    category: "Pastries",
    veg: true,
  },
  {
    id: "pain-au-chocolat",
    name: "Pain au Chocolat",
    description:
      "Flaky pastry wrapped around two batons of single-origin dark chocolate.",
    price: 179,
    unit: "each",
    image: croissants,
    category: "Pastries",
    veg: true,
  },
];

export const categories = ["All", "Cakes", "Pastries", "Bites"] as const;

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
