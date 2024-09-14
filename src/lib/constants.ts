export const STATES = {
  ACTIVE: 1,
  CANCELLED: 2,
  FINALIZED: 3,
} as const;

export const ROUTES = {
  DASHBOARD: "/",
  INVENTORY: "/inventario",
  ORDERS: "/ordenes",
  LOGIN: "/login",
} as const;