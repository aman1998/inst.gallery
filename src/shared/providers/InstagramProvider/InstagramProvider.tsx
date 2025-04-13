"use client";
import React from "react";
import dynamic from "next/dynamic";

import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  carouselPostsSelector,
  initialCarouselSlideSelector,
  isModalOpenSelector,
  setCarouselPostsSelector,
  setInitialCarouselSlideSelector,
  setIsModalOpenSelector,
} from "@entities/Instagram/model/selectors";

const InstagramCarousel = dynamic(() => import("@entities/Instagram/components/InstagramCarousel"), {
  ssr: false,
});

interface Props {
  children: React.ReactNode;
}

const InstagramProvider: React.FC<Props> = ({ children }) => {
  const isModalOpen = useInstagramStore(isModalOpenSelector);
  const setIsModalOpen = useInstagramStore(setIsModalOpenSelector);
  const carouselPosts = useInstagramStore(carouselPostsSelector);
  const setCarouselPosts = useInstagramStore(setCarouselPostsSelector);
  const initialCarouselSlide = useInstagramStore(initialCarouselSlideSelector);
  const setInitialCarouselSlide = useInstagramStore(setInitialCarouselSlideSelector);

  return (
    <>
      {children}
      <InstagramCarousel
        initialSlide={initialCarouselSlide ?? 0}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCarouselPosts([]);
          setInitialCarouselSlide(null);
        }}
        feeds={carouselPosts}
      />
    </>
  );
};

export default InstagramProvider;
