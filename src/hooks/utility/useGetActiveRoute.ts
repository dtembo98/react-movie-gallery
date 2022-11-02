/* eslint-disable react-hooks/exhaustive-deps */
import react, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useGetActiveRoute = () => {
  const location = useLocation();
  const [isLikedRoute, setLikedRoute] = react.useState<boolean>();
  const [isPopularMovie, setPopularMovie] = react.useState<boolean>();

  useEffect(() => {
    setLikedRoute(location.pathname === "/liked");
    setPopularMovie(location.pathname === "/");
  }, [location.pathname]);

  const handleRouteChange = (route: string) => {
    if (route === "/") {
      setPopularMovie(true);
      setLikedRoute(false);
    }
    if (route === "/liked") {
      setLikedRoute(true);
      setPopularMovie(false);
    }
  };

  return {
    isLikedRoute,
    isPopularMovie,
    handleRouteChange,
  } as const;
};
