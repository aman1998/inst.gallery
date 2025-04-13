import React from "react";

interface Props {
  children: React.ReactNode;
  show: boolean;
}
const Show: React.FC<Props> = ({ children, show }) => {
  if (!show) return null;

  return <>{children}</>;
};

export default Show;
