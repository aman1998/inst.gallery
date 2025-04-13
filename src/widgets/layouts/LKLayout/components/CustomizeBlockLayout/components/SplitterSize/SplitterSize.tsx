import React from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import s from "./SplitterSize.module.scss";

interface Props {
  size: number;
}

const SplitterSize: React.FC<Props> = ({ size }) => (
  <div className={s.size}>
    <div className={s.size__left}>
      <ArrowLeftOutlined />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className={s.size__dot} />
      ))}
    </div>
    <div className={s.size__center}>{size}px</div>
    <div className={s.size__right}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className={s.size__dot} />
      ))}
      <ArrowRightOutlined />
    </div>
  </div>
);

export default SplitterSize;
