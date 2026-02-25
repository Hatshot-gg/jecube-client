import { http } from "@/shared/api/http";

export async function getProducts() {
  const { data } = await http.get("/products/");

  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;

  return [];
}
