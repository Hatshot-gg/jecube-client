import cls from "./Loader.module.scss";

export default function Loader() {
  return <div className={cls.loader} aria-label="Loading" />;
}
