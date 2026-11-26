export const img = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const brand = {
  name: "Hikari",
  phone: "+66 2 123 4567",
  phoneHref: "tel:+6621234567",
  address: "Bangna, Bangkok",
  hours: "Mon–Fri 10:00–19:00",
  line: "https://line.me/",
};

export const photos = {
  hero: img("1643949914872-317d6047f107", 2400),
  studio: img("1758315417320-a8bbed64d29b", 2000),
  visit: img("1781888699751-15f2b304693c", 2000),
};

/* ---------- Hero ---------- */

export const heroStats = [
  { value: 12, label: "years of craft\nsince 2014" },
  { value: 10, prefix: "~", label: "years of\nservice life" },
  { value: 0, prefix: "฿", label: "measuring &\ninstallation visit" },
  { value: 7, suffix: " days", label: "made to order\nfrom measure" },
];

export const promises = [
  "Free home measuring",
  "Made to order in 7 days",
  "2-year warranty",
  "300+ fabrics to choose from",
  "Installed in a single visit",
  "Greater Bangkok",
];

/* ---------- Catalog ---------- */

export type Category = "curtains" | "blinds";

export type Product = {
  name: string;
  type: Category;
  price: string;
  note: string;
  src: string;
  badge?: string;
};

export const products: Product[] = [
  { name: "Sheer curtains", type: "curtains", price: "฿690 / m", note: "Soft, filtered daylight", src: img("1570427224050-b080ad19e3c4", 900), badge: "Bestseller" },
  { name: "Zebra day & night", type: "blinds", price: "฿990 / m²", note: "Shift from view to privacy", src: img("1659949294512-95abb6aebf6c", 900) },
  { name: "Blackout curtains", type: "curtains", price: "฿1,590 / m", note: "100% light block", src: img("1771039621945-c79535c6361c", 900) },
  { name: "Roller blinds", type: "blinds", price: "฿850 / m²", note: "Clean lines, tiny stack", src: img("1776261293170-66fd3b09273e", 900) },
  { name: "Pinch pleat drapes", type: "curtains", price: "฿1,290 / m", note: "Tailored triple pleats", src: img("1757382603619-7682803cfc5d", 900) },
  { name: "Venetian blinds", type: "blinds", price: "฿1,190 / m²", note: "Tilt to steer the light", src: img("1587812226208-37081e8c0ede", 900) },
  { name: "Eyelet curtains", type: "curtains", price: "฿990 / m", note: "Easy glide, easy wash", src: img("1771039622237-2725bdf33edf", 900) },
  { name: "Wooden blinds", type: "blinds", price: "฿1,890 / m²", note: "Warm basswood slats", src: img("1622605058034-5cbf25d135de", 900), badge: "New" },
];

/* ---------- Light studio ---------- */

export type Fabric = {
  id: string;
  name: string;
  /** share of light that passes when fully closed (0–1) */
  pass: number;
  tone: string;
  privacy: string;
  best: string;
};

export const fabrics: Fabric[] = [
  { id: "sheer", name: "Sheer voile", pass: 0.78, tone: "#f4f1ea", privacy: "Silhouettes by day", best: "Living rooms, reading nooks" },
  { id: "linen", name: "Linen dim-out", pass: 0.42, tone: "#d8cfbf", privacy: "Private by day", best: "Living & dining rooms" },
  { id: "dim", name: "Dim-out 90%", pass: 0.12, tone: "#8b8378", privacy: "Private day and night", best: "Bedrooms, home offices" },
  { id: "blackout", name: "Blackout", pass: 0.02, tone: "#3d3934", privacy: "Fully opaque", best: "Bedrooms, media rooms" },
];

/* ---------- Rooms ---------- */

export type Room = {
  id: string;
  label: string;
  src: string;
  /** point on the curtain, as a fraction of the original photo */
  spot: { x: number; y: number };
  product: string;
  price: string;
  detail: string;
};

export const rooms: Room[] = [
  {
    id: "living",
    label: "Living room",
    src: img("1757382546725-8d22975962b4", 2200),
    spot: { x: 0.42, y: 0.42 },
    product: "Sheer curtains",
    price: "from ฿690 / m",
    detail: "Floor-length linen voile on a slim ceiling track.",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    src: img("1759328257280-28bdb3050be3", 2200),
    spot: { x: 0.3, y: 0.55 },
    product: "Double drapes",
    price: "from ฿1,590 / m",
    detail: "Sheer layer plus 100% blackout on a twin rail.",
  },
  {
    id: "lounge",
    label: "Lounge",
    src: img("1784653548916-796e08667ba6", 2200),
    spot: { x: 0.4, y: 0.42 },
    product: "Pinch pleat drapes",
    price: "from ฿1,290 / m",
    detail: "Cream cotton blend, tied back by day.",
  },
  {
    id: "family",
    label: "Family room",
    src: img("1785962019598-2c71b10357b9", 2200),
    spot: { x: 0.5, y: 0.52 },
    product: "Venetian blinds",
    price: "from ฿1,190 / m²",
    detail: "Tilt the slats to bounce light up to the ceiling.",
  },
];

/* ---------- About ---------- */

export const aboutStats = [
  { value: 4800, suffix: "+", label: "windows dressed" },
  { value: 300, suffix: "+", label: "fabrics in stock" },
  { value: 18, label: "in-house fitters" },
  { value: 99, suffix: "%", label: "happy clients" },
];

/* ---------- Reasons ---------- */

export const reasons = [
  {
    title: "Speed",
    body: "Measured this week, hanging next week. Most orders are made in 7 days.",
    src: img("1778731525567-a65ec40a4bb5", 900),
  },
  {
    title: "Made in-house",
    body: "Cut and sewn in our own workroom, fitted by the team that measured it.",
    src: img("1758974775331-c5400bbef625", 900),
  },
  {
    title: "Quality",
    body: "Fade-resistant fabrics and quiet tracks, backed by a 2-year warranty.",
    src: img("1616100587911-1747ac739e4e", 900),
  },
  {
    title: "Variety",
    body: "Curtains, sheers and blinds in 300+ fabrics to suit any style and budget.",
    src: img("1779894015350-c5486bf8f618", 900),
  },
];

/* ---------- Reviews ---------- */

export const reviews = [
  { name: "Ploy S.", place: "Condo, Charoen Nakhon", quote: "They held the samples up to my window in the afternoon light. Choosing was so much easier than a catalogue." },
  { name: "Ton R.", place: "Townhouse, Ari", quote: "The bedroom is truly dark now. Seams are perfect and they finished the whole house in a single day." },
  { name: "Mint K.", place: "House, Bang Na", quote: "Sent photos on LINE and had a rough quote the same day. The final price matched almost exactly." },
  { name: "James W.", place: "Condo, Thonglor", quote: "The zebra blinds in my office kill the glare on my screens but I still get the view. Exactly what I asked for." },
  { name: "Nok P.", place: "Café, Nimman", quote: "They dressed eleven windows over a weekend so we didn't have to close. Neat, quiet and on time." },
  { name: "Arthit C.", place: "House, Ratchapruek", quote: "Two years on, the linen still hangs beautifully and hasn't faded at all in the west-facing room." },
];

/* ---------- Home visit ---------- */

export const visitSteps = [
  { title: "Book a time", body: "Leave your number. We call back within one working day." },
  { title: "Measure & choose", body: "We measure every window and bring 300+ fabrics to try in your light." },
  { title: "Installed in a day", body: "Made in 7 days, then fitted and steamed in a single visit." },
];
