import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import s from "./CarouselCustom.module.scss";

interface CarouselProps {
  children?: React.ReactNode[];
}

const CarouselCustom: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  if (!children?.length) return null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : children.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < children.length - 1 ? prevIndex + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 50) handlePrev();
    if (deltaX < -50) handleNext();
    setTouchStartX(null);
  };

  return (
    <div className={s.carousel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <button className={s.carousel__btn} onClick={handlePrev}>
        <LeftOutlined />
      </button>
      <div className={s.carousel__track} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children.map((child, index) => (
          <div key={index} className={s.carousel__item}>
            {child}
          </div>
        ))}
      </div>
      <button className={s.carousel__btn} onClick={handleNext}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default CarouselCustom;
