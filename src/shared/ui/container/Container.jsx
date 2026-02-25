import cls from "./Container.module.scss";

export default function Container({ children }) {
  return <div className={cls.container}>{children}</div>;
}
