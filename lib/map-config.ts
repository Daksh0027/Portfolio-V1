import { DistrictID, DistrictData } from "./data";

export const DISTRICT_ORDER: DistrictID[] = [
  "core",
  "proving",
  "load",
  "surface",
  "archives",
  "transmission",
  "classified",
];

export const GRID_STYLES: Record<DistrictID, React.CSSProperties> = {
  core: { left: "14px", top: "14px", width: "188px", height: "120px" },
  proving: { left: "226px", top: "14px", width: "188px", height: "120px" },
  load: { left: "438px", top: "14px", width: "188px", height: "120px" },
  surface: {
    left: "14px",
    top: "158px",
    width: "612px",
    height: "120px",
    background: "rgba(14,20,16,0.8)",
  },
  archives: { left: "14px", top: "302px", width: "188px", height: "120px" },
  transmission: { left: "226px", top: "302px", width: "188px", height: "120px" },
  classified: { left: "438px", top: "302px", width: "188px", height: "120px" },
};

export function getSpatialDelay(d: DistrictData): number {
  const distFromCenter = Math.sqrt(
    Math.pow(d.pos.x - 320, 2) + Math.pow(d.pos.y - 218, 2)
  );
  return 0.1 + distFromCenter * 0.0015;
}

export function getAdjacentDistricts(
  activeDistrict: DistrictID,
  data: Record<string, DistrictData>
): { prev: DistrictData | null; next: DistrictData | null } {
  const currentIndex = DISTRICT_ORDER.indexOf(activeDistrict);
  const prevId = DISTRICT_ORDER[(currentIndex - 1 + DISTRICT_ORDER.length) % DISTRICT_ORDER.length];
  const nextId = DISTRICT_ORDER[(currentIndex + 1) % DISTRICT_ORDER.length];
  return {
    prev: data[prevId] ?? null,
    next: data[nextId] ?? null,
  };
}

export const STATUS_COLORS: Record<string, string> = {
  OPTIMAL: "#4eff91",
  ACTIVE: "#4eff91",
  NOMINAL_ACTIVE: "#4eff91",
  default: "#8a9e8f",
};

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status] ?? STATUS_COLORS.default;
}