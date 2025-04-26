"use client";
import React from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";

import Button from "@shared/ui/Button";
import VideoPlayer from "@shared/ui/VideoPlayer";
import { ROUTES } from "@shared/config/routes";

import s from "./VideoPlayerWidget.module.scss";

interface Props {
  className?: string;
}

const VideoPlayerWidget: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  return (
    <section className={cn(s.widget, className)}>
      <VideoPlayer src="/video/demo.mp4" />
      <Button
        className={cn(s.widget__btn, s["widget__btn--desktop"])}
        onClick={() => {
          router.push(ROUTES.demoCustomize);
        }}
        type="primary"
      >
        Try it live
      </Button>
      <Button
        className={cn(s.widget__btn, s["widget__btn--mobile"])}
        onClick={() => {
          router.push(ROUTES.demoSite);
        }}
        type="primary"
      >
        Demo page
      </Button>
    </section>
  );
};

export default VideoPlayerWidget;
