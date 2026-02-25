import { getProducts } from "@/entities/product";
import Container from "@/shared/ui/container/Container";
import Loader from "@/shared/ui/loader/Loader";
import H1 from "@/shared/ui/text/Text";

import { ProductGrid } from "@/widgets/product-grid/ui/ProductGrid";
import React, { useEffect, useState } from "react";
import cls from "./CatalogPage.module.scss";

export function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let alive = true;

    async function load() {
      setStatus("loading");
      try {
        const data = await getProducts();
        if (!alive) return;
        setProducts(data);
        setStatus("succes");
      } catch (e) {
        if (!alive) return;
        setStatus("error");
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Container>
      <div className={cls.header}>
        <H1>Каталог</H1>
      </div>
      {status === "loading" && (
        <div className={cls.center}>
          <Loader />
        </div>
      )}

      {status === "error" && (
        <div className={cls.center}>Ошибка загрузки товаров</div>
      )}

      {status === "succes" && <ProductGrid products={products} />}
    </Container>
  );
}
