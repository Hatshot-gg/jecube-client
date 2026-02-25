import cls from "./ColorDot.module.scss";
export default function ColorDot({ color }) {
  return <div className={cls.dot} style={{ backgroundColor: color }}></div>;
}
