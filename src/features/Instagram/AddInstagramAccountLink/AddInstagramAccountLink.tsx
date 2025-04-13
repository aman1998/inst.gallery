import { PlusCircleFilled } from "@ant-design/icons";
import React from "react";

import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

const AddInstagramAccountLink = () => (
  <Button href={ROUTES.apiInstagramUrl} type="dashed" icon={<PlusCircleFilled />} iconPosition="start">
    Add Account
  </Button>
);

export default AddInstagramAccountLink;
