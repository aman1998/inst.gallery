import React from "react";
import { Modal } from "antd";
import cn from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CreateInstagramPostHeader from "./components/CreateInstagramPostHeader";
import CreateInstagramPostForm from "./components/CreateInstagramPostForm";
import { TCustomizeCreateInstagramPostSchema, customizeCreateInstagramPostSchema } from "./lib/schema";
import s from "./CreateInstagramPost.module.scss";

const IGNORE_CLASS = "antd-instagram-post";
const defaultValues = {
  title: "",
  content: "",
  link: "",
  posts: [],
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateInstagramPost: React.FC<Props> = ({ isOpen, onClose }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
  } = useForm<TCustomizeCreateInstagramPostSchema>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(customizeCreateInstagramPostSchema),
  });

  const handleModalOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClose();
  };

  const onSubmit = (data: TCustomizeCreateInstagramPostSchema) => {
    console.log("data =>", data);
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
          <CreateInstagramPostHeader
            isDirty={isDirty}
            isValid={isValid}
            className={IGNORE_CLASS}
            onReset={() => reset(defaultValues)}
            onSubmit={handleSubmit(onSubmit)}
          />
          <CreateInstagramPostForm control={control} className={IGNORE_CLASS} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateInstagramPost;
