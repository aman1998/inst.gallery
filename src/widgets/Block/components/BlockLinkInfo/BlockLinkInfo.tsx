"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { QRCode } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector } from "@entities/Project/model/selectors";

import { ROUTES } from "@shared/config/routes";
import Button from "@shared/ui/Button";
import { SITE_URL } from "@shared/config/appConfig";
import { copyToClipboard } from "@shared/utils/text";

import s from "./BlockLinkInfo.module.scss";

const BlockLinkInfo: React.FC = () => {
  const project = useProjectStore(projectSelector);
  const router = useRouter();
  const { isDemo } = useLKLayout();

  if (!project?.link) return <p>No link available</p>;
  const { link } = project;
  const url = isDemo ? `${SITE_URL}${ROUTES.demoSite}` : `${SITE_URL}/${link}`;
  const fullUrl = `www.${url}`;

  const doDownload = (url: string, fileName: string) => {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadSvgQRCodeAsPng = () => {
    const svg = document.getElementById("myqrcode")?.querySelector<SVGElement>("svg");

    if (svg) {
      // Создаем canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const width = 300;
        const height = 300;

        // Устанавливаем размер canvas
        canvas.width = width;
        canvas.height = height;

        // Преобразуем SVG в изображение
        const svgData = new XMLSerializer().serializeToString(svg);
        const image = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);

        image.onload = () => {
          // Рисуем изображение на canvas
          ctx.drawImage(image, 0, 0, width, height);

          // Получаем изображение в формате PNG
          const pngDataUrl = canvas.toDataURL("image/png");

          // Скачиваем PNG
          doDownload(pngDataUrl, `${link}-QRCode.png`);
        };

        // Загружаем SVG как изображение
        image.src = url;
      }
    } else {
      console.error("SVG element not found.");
    }
  };

  const handleLinkClick = () => {
    if (isDemo) {
      router.push(ROUTES.demoSite);
    } else {
      window.open(ROUTES.siteId(project.link));
    }
  };

  return (
    <section className={s.info}>
      <div className={s.info__header}>
        <QRCode id="myqrcode" value={fullUrl} type="svg" />
      </div>
      <div className={s.info__footer}>
        <Button className={s.info__link} size="small" type="text" onClick={handleLinkClick}>
          {url}
        </Button>
        <Button
          className={s.info__copy}
          size="small"
          type="text"
          onClick={() => copyToClipboard(fullUrl)}
          icon={<CopyOutlined />}
        />
        <Button size="small" type="text" onClick={downloadSvgQRCodeAsPng} icon={<DownloadOutlined />} />
      </div>
    </section>
  );
};

export default BlockLinkInfo;
