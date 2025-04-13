import React from "react";

interface Props {
  handlePress: () => void;
}

export const useEscapeKey = ({ handlePress }: Props) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handlePress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePress]);
};
