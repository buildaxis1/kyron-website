export type VendorKey =
  | "modmed"
  | "amazing_charts"
  | "epic"
  | "cerner"
  | "athena"
  | "allscripts";

export type VendorStatus = "certified" | "beta" | "planned" | "coming_soon";

export interface Vendor {
  key: VendorKey;
  name: string;
  description: string;
  status: VendorStatus;
}

export interface Connection {
  id: string;
  vendor: VendorKey;
  org: string;
  environment: "production" | "sandbox";
  createdAt: string;
  status: "active" | "error" | "revoked";
}
