import { formatPrice } from "@/shared/lib/formatPrice";
import cls from "./ProductCard.module.scss";
import { useMemo, useState } from "react";
import VariantColorSelector from "@/features/select-product-variant/ui/VariantColorSelector";
import ImageCarousel from "@/shared/ui/image-carousel/ImageCarousel";

export function ProductCard({ product }) {
  const { variants } = product;

  const [selectedVariantId, setSelectedVariantId] = useState(variants?.[0]?.id);

  const activeVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId) ?? variants[0],
    [variants, selectedVariantId],
  );

  return (
    <article className={cls.card}>
      <div className={cls.imageWrap}>
        <ImageCarousel
          images={activeVariant?.images || []}
          altFallback={product.name}
          showArrowsOnHover
          resetKey={activeVariant?.id}
        />
      </div>

      <div className={cls.body}>
        <div>
          <h3 className={cls.title}>{product.name}</h3>

          <div className={cls.price}>
            {activeVariant.price !== null
              ? formatPrice(activeVariant.price)
              : "Цена не указана"}
          </div>
        </div>
        {variants.length > 1 ? (
          <VariantColorSelector
            variants={variants}
            selectedId={selectedVariantId}
            onSelect={setSelectedVariantId}
          />
        ) : (
          ""
        )}
      </div>
    </article>
  );
}
