"use client";
import React from "react";
import cn from "classnames";

import s from "./VideoPlayer.module.scss";

interface Props {
  src: string;
  className?: string;
}
const VideoPlayer: React.FC<Props> = ({ src, className }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current as HTMLVideoElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };

      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen(); // Safari
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen(); // IE/Edge
      }
    }
  };

  const handleFullscreenChange = () => {
    const fullscreenElement =
      document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement;

    setIsFullscreen(!!fullscreenElement);
  };

  React.useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Safari
    document.addEventListener("msfullscreenchange", handleFullscreenChange); // IE/Edge

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className={cn(s["video__preview"], className)}>
      <video
        muted
        autoPlay
        loop
        className={cn(s.video, isFullscreen && s["video--fullscreen"])}
        src={src}
        onClick={handleVideoClick}
        ref={videoRef}
      />
    </div>
  );
};

export default VideoPlayer;
