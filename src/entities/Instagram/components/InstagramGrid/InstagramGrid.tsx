import React, { useState, useEffect } from "react";
import { Button, Slider } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import s from "./InstagramGrid.module.scss";

// Интерфейс для карточек
interface Card {
  id: number;
  span?: number; // Количество колонок, которые занимает карточка
  row?: number; // Количество строк, которые занимает карточка
}

const cardData: Card[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

const InstagramGrid: React.FC = () => {
  const [layout, setLayout] = useState<Card[]>(cardData);
  const [columns, setColumns] = useState(4); // Количество колонок
  const [gap, setGap] = useState(20); // Промежуток между карточками

  // Функция для динамического назначения span и row
  const getCardLayout = (columns: number) => {
    const updatedLayout = cardData.map((card, index) => {
      let span = 1; // Стандартное значение для span (1 колонка)
      let row = 1; // Стандартное значение для row (1 строка)

      // Настроим span и row в зависимости от количества колонок
      if (columns === 1) {
        span = 1; // Для одной колонки каждая карточка будет занимать всю ширину
        row = 1; // Каждая карточка будет на одной строке
      } else if (columns === 2) {
        // Для двух колонок иногда карточки могут занимать 2 колонки
        span = index % 2 === 0 ? 2 : 1; // Чередуем, чтобы одна карточка занимала 2 колонки
        row = span === 2 ? 2 : 1;
      } else if (columns === 3) {
        // Для трех колонок можно также сделать более гибкое распределение
        span = index % 3 === 0 ? 2 : 1; // Чередуем карточки на 2 колонки
        row = span === 2 ? 2 : 1;
      } else {
        // Для большее количество колонок делаем карточки меньшими
        span = 1;
        row = 1;
      }

      return { ...card, span, row };
    });
    setLayout(updatedLayout);
  };

  useEffect(() => {
    getCardLayout(columns); // Обновляем Block при изменении количества колонок
  }, [columns]);

  const shuffleLayout = () => {
    const shuffled = [...layout].sort(() => Math.random() - 0.5);
    setLayout(shuffled);
  };

  return (
    <div>
      {/* Контролы */}
      <div style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={shuffleLayout} style={{ marginRight: "20px" }}>
          Shuffle Layout
        </Button>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div>
            <p>Columns</p>
            <Slider min={1} max={4} step={1} value={columns} onChange={setColumns} style={{ width: "200px" }} />
          </div>
          <div>
            <p>Gap</p>
            <Slider min={0} max={50} step={5} value={gap} onChange={setGap} style={{ width: "200px" }} />
          </div>
        </div>
      </div>

      {/* Сетка */}
      <div
        className={s.grid}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`, // Динамическое количество колонок
          gap: `${gap}px`, // Промежуток между карточками
        }}
      >
        <AnimatePresence>
          {layout.map((card) => (
            <motion.div
              key={card.id}
              className={s.card}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              style={{
                gridColumn: `span ${card.span}`, // Количество колонок, которое занимает карточка
                gridRow: `span ${card.row}`, // Количество строк, которое занимает карточка
              }}
            >
              <Image
                src="./images/tablet.png"
                alt="card"
                layout="fill"
                objectFit="cover" // Изображение будет обрезано по размеру карточки
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InstagramGrid;
