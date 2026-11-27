/**
 * Light Studio → booking form hand-off. The studio announces the fabric someone
 * wants to see in person; the form picks it up and shows it as a chip.
 */
export type FabricPick = { id: string; name: string; pass: number; tone: string };

const EVENT = "hikari:fabric-pick";

export function pickFabric(fabric: FabricPick) {
  window.dispatchEvent(new CustomEvent<FabricPick>(EVENT, { detail: fabric }));
}

export function onFabricPick(cb: (fabric: FabricPick) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<FabricPick>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
