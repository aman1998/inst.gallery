"use client";

import React from "react";
import { FloatButton, Modal, Tooltip } from "antd";
import { CreditCardOutlined, LinkOutlined, SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";
import BlockLinkInfo from "@widgets/Block/components/BlockLinkInfo";
import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";

import DeleteBlock from "@features/Block/DeleteBlock";

import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector } from "@entities/Project/model/selectors";
import { selectedBlockSelector } from "@entities/Block/model/selectors";
import { useBlockStore } from "@entities/Block/model/store";
import { EBlockNavigation } from "@entities/Block/model/types";

import { ROUTES } from "@shared/config/routes";
import { useModal } from "@shared/hooks/useModal";

import s from "./BlockFloatSettings.module.scss";
import SignOut from "@/features/Auth/SignOut";

const BlockFloatSettings: React.FC = () => {
  const project = useProjectStore(projectSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);

  const router = useRouter();
  const { isDemo, subNavigation, navigation } = useLKLayout();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <FloatButton.Group
        style={{ position: "absolute", top: 16, right: 9, height: "max-content" }}
        key={"top"}
        rootClassName={s.btn}
        trigger="click"
        placement="bottom"
        icon={<SettingOutlined />}
      >
        <Tooltip placement="left" title="Link">
          <FloatButton onClick={openModal} icon={<LinkOutlined />} />
        </Tooltip>
        {!isDemo && (
          <Tooltip placement="left" title="Upgrade plan">
            <FloatButton
              onClick={() => {
                router.push(ROUTES.subscriptionPrices);
              }}
              icon={<CreditCardOutlined />}
            />
          </Tooltip>
        )}
        {/* {selectedBlock?.block_id &&
          (subNavigation !== EBlockNavigation.advanced || navigation !== ELKLayoutNavigation.sub) && (
            <Tooltip placement="left" title="Delete block">
              <div>
                <DeleteBlock isFloating id={selectedBlock?.block_id} />
              </div>
            </Tooltip>
          )} */}
        {!isDemo && (
          <Tooltip placement="left" title="Logout">
            <div>
              <SignOut isFloating />
            </div>
          </Tooltip>
        )}
      </FloatButton.Group>
      <Modal destroyOnClose title={null} footer={null} open={isOpen} onCancel={closeModal}>
        <BlockLinkInfo />
      </Modal>
    </>
  );
};

export default BlockFloatSettings;
