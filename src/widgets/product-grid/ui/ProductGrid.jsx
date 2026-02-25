import styles from "./ProductGrid.module.scss";
import { ProductCard } from "@/entities/product";

export function ProductGrid({ products }) {
  return (
    <section className={styles.grid}>
      {products.map((p) => (
        <ProductCard key={String(p.id)} product={p} />
      ))}
    </section>
  );
}
