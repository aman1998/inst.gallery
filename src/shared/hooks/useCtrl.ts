import React from "react";

interface Props {
  handlePress: () => void;
  eventKey: string;
}

export const useCtrl = ({ handlePress, eventKey }: Props) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === eventKey) {
        event.preventDefault();
        handlePress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePress, eventKey]);
};
