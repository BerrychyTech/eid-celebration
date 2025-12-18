export type Vehicle = {
  id: string;
  plate: string;
  model: string;
  partnerCompany: string;
  status: "active" | "maintenance" | "inactive" | "available";
};
