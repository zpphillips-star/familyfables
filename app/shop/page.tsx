import { redirect } from "next/navigation";
import { AMAZON_STORE_URL } from "@/lib/books";

export default function ShopPage() {
  redirect(AMAZON_STORE_URL);
}
