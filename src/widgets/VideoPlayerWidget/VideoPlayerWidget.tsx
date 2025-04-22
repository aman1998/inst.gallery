"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Button from "@shared/ui/Button";
import VideoPlayer from "@shared/ui/VideoPlayer";
import { ROUTES } from "@shared/config/routes";

interface Props {
  className?: string;
}

const VideoPlayerWidget: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  return (
    <section className={className}>
      <VideoPlayer src="/video/demo.mp4" />
      <Button onClick={() => router.push(ROUTES.demoCustomize)} type="primary">
        Try it live
      </Button>
    </section>
  );
};

export default VideoPlayerWidget;
