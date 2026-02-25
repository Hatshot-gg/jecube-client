import cls from "./Text.module.scss";

export default function H1({ children }) {
  return <h1 className={cls.h1}>{children}</h1>;
}
