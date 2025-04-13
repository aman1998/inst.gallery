import React from "react";
import { Carousel, Modal } from "antd";

import { IInstagramDownloadedPost, IInstagramPost } from "@entities/Instagram/model/types";
import InstagramPost from "@entities/Instagram/components/InstagramPost";

import s from "./InstagramCarousel.module.scss";

const IGNORE_CLASS = "antd-instagram-post";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  feeds: IInstagramDownloadedPost[] | IInstagramPost[];
  initialSlide?: number;
}

const InstagramCarousel: React.FC<Props> = ({ isOpen, onClose, feeds, initialSlide }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleMaskClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;

    if (!target.closest(".slick-arrow") && !target.closest(`.${IGNORE_CLASS}`) && !target.closest(".slick-dots li")) {
      onClose();
    }
  };

  return (
    <Modal
      panelRef={modalRef}
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      rootClassName="antd-instagram-carousel"
      className={s.modal}
      classNames={{
        body: s.modal__body,
        wrapper: s.modal__wrapper,
        content: s.modal__content,
        mask: s.modal__mask,
      }}
      style={{ top: 0, left: 0, width: "100vw", height: "100vh", margin: 0 }}
      footer={null}
      title={null}
      destroyOnClose
    >
      <div className={s["modal__carouser-wrapper"]} onClick={handleMaskClick}>
        <Carousel
          initialSlide={initialSlide}
          effect="fade"
          lazyLoad="ondemand"
          infinite={true}
          className={s.modal__carousel}
          rootClassName={s["modal__carouser-wrapper"]}
          dots={feeds.length > 1}
          arrows={feeds.length > 1}
        >
          {feeds.map((post) => (
            <InstagramPost className={IGNORE_CLASS} post={post} key={post.id} />
          ))}
        </Carousel>
      </div>
    </Modal>
  );
};

export default InstagramCarousel;
