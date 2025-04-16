import React from "react";
import { Modal } from "antd";
import cn from "classnames";

import s from "./CreateInstagramPost.module.scss";
import { MOCK_INSTAGRAM_POSTS } from "@/entities/Instagram/lib/constants";
import CreateInstagramPostHeader from "./components/CreateInstagramPostHeader";
import CreateInstagramPostForm from "./components/CreateInstagramPostForm";

const IGNORE_CLASS = "antd-instagram-post";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateInstagramPost: React.FC<Props> = ({ isOpen, onClose }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleModalOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClose();
  };

  return (
    <Modal
      panelRef={modalRef}
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      rootClassName="antd-instagram-carousel-create"
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
      <div onClick={handleModalOutsideClick} className={s.modal__outside}>
        <div className={cn(s["modal__carousel-wrapper"], IGNORE_CLASS)} onClick={(e) => e.stopPropagation()}>
          <CreateInstagramPostHeader className={IGNORE_CLASS} />
          <CreateInstagramPostForm className={IGNORE_CLASS} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateInstagramPost;
