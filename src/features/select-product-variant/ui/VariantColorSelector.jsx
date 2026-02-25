import React from "react";
import cls from "./VariantColorSelector.module.scss";
import ColorDot from "@/shared/ui/color-dot/ColorDot";

export default function VariantColorSelector({
  variants,
  selectedId,
  onSelect,
}) {
  return (
    <div className={cls.wrap}>
      {variants.map((v) => {
        const isActive = v.id === selectedId;

        return (
          <div
            key={v.id}
            type="button"
            className={`${cls.item} ${isActive ? cls.active : ""}`}
            onClick={() => onSelect(v.id)}
          >
            <ColorDot color={v.color.hex} />
            <span className={cls.bar} />
          </div>
        );
      })}
    </div>
  );
}
