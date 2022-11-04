import react, { useState, useEffect, useLayoutEffect } from "react";
/**
 * @description get screen size
 */
export const useGetScreenSize = () => {
  const [isSmall, setSmall] = useState(false);
  const [isMedium, setMedium] = useState(false);
  const [isLarge, setLarge] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
    // return () => {
    //   window.removeEventListener("resize", () => {
    //     setScreenSize(window.innerWidth);
    //   });
    // };
  }, []);

  useEffect(() => {
    if (screenSize < 640) {
      setSmall(true);
      setMedium(false);
      setLarge(false);
    } else if (screenSize >= 640 && screenSize <= 1007) {
      setSmall(false);
      setMedium(true);
      setLarge(false);
    } else {
      setSmall(false);
      setMedium(false);
      setLarge(true);
    }
  }, [screenSize]);

  return { isSmall, isMedium, isLarge } as const;
};
