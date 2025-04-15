import React from "react";
import { Modal } from "antd";

import InstagramPost from "@entities/Instagram/components/InstagramPost";

import s from "./CreateInstagramPost.module.scss";
import { MOCK_INSTAGRAM_POSTS } from "@/entities/Instagram/lib/constants";

const IGNORE_CLASS = "antd-instagram-post";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateInstagramPost: React.FC<Props> = ({ isOpen, onClose }) => {
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
      <div className={s["modal__carousel-wrapper"]} onClick={handleMaskClick}>
        <InstagramPost className={IGNORE_CLASS} post={MOCK_INSTAGRAM_POSTS[0]} />
      </div>
    </Modal>
  );
};

export default CreateInstagramPost;
