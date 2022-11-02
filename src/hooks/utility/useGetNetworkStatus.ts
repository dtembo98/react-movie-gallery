/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetNetworkStatus = (): boolean => {
  const navigate = useNavigate();
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  });

  useEffect(() => {
    if (isOnline) {
      navigate("/");
    }
    if (!isOnline) {
      navigate("/no-connection");
    }
  }, [isOnline]);

  return isOnline;
};
