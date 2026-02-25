import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import cls from "./ImageCarousel.module.scss";
import { useCoarsePointer } from "@/shared/lib/useCoarsePointer";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function ImageCarousel({
  images = [],
  altFallback = "Image",
  className = "",
  showArrowsOnHover = true,
  resetKey,
}) {
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const slides = useMemo(() => {
    // если бэк гарантирует порядок — можно без sort
    const safe = [...images].sort((a, b) => {
      if (!!a.isMain !== !!b.isMain) return a.isMain ? -1 : 1;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    });

    return safe.map((img) => ({
      id: img.id,
      src: apiBaseUrl + img.url,
    }));
  }, [images, apiBaseUrl]);
  const isCoarsePointer = useCoarsePointer();

  const emblaOptions = useMemo(() => {
    if (isCoarsePointer) {
      // ✅ Телефон: оставляем drag + “желе”
      return {
        loop: true,
        align: "start",
        watchDrag: true,
        duration: 18,
      };
    }

    // ✅ ПК: без drag мышкой + без “желе”
    return {
      loop: true,
      align: "start",
      dragFree: false,
      watchDrag: true, // мышью нельзя “слайдить”
      duration: 18,
    };
  }, [isCoarsePointer]);

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    const idx = emblaApi.selectedScrollSnap();
    const count = emblaApi.scrollSnapList().length;

    setSelectedIndex(idx);
    setSnapCount(count);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // сброс на первую фотку при смене варианта
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(0, true);
    setSelectedIndex(0);
  }, [emblaApi, resetKey]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!slides.length) {
    return <div className={cls.placeholder}>No image</div>;
  }

  return (
    <div
      className={[
        cls.root,
        showArrowsOnHover ? cls.hoverArrows : "",
        className,
      ].join(" ")}
    >
      {/* viewport — это “корень”, который Embla таскает */}
      <div className={cls.viewport} ref={emblaRef}>
        <div className={cls.container}>
          {slides.map((s) => (
            <div className={cls.slide} key={s.id}>
              <img
                className={cls.image}
                src={s.src}
                alt={altFallback}
                loading="eager"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {snapCount > 1 && (
        <div className={cls.progress}>
          <div className={cls.progressTrack}>
            <div
              className={cls.progressThumb}
              style={{
                width: `${100 / snapCount}%`,
                transform: `translate3d(${selectedIndex * 100}%, 0, 0)`,
              }}
            />
          </div>
        </div>
      )}

      {slides.length > 1 && (
        <>
          <div
            type="button"
            className={`${cls.arrow} ${cls.left}`}
            onClick={scrollPrev}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </div>
          <div
            type="button"
            className={`${cls.arrow} ${cls.right}`}
            onClick={scrollNext}
            aria-label="Next image"
          >
            <FaChevronRight />
          </div>
        </>
      )}
    </div>
  );
}
