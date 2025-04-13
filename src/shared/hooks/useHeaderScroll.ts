import React from "react";

const HEADER_HEIGHT = 82;

interface Props {
  height?: number;
}
export const useHeaderScroll = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // // Проверяем, находится ли пользователь в пределах 100vh
      // if (currentScrollY < windowHeight) {
      //   if (currentScrollY > lastScrollY && currentScrollY > HEADER_HEIGHT) {
      //     setIsVisible(false);
      //   } else if (currentScrollY < lastScrollY) {
      //     setIsVisible(true);
      //   }
      // }

      if (currentScrollY > lastScrollY && currentScrollY > HEADER_HEIGHT) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return { isVisible, lastScrollY };
};
