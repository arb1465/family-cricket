import { useEffect } from "react";

const usePolling = (callback, delay = 2000) => {
  useEffect(() => {
    const interval = setInterval(callback, delay);
    return () => clearInterval(interval);
  }, [callback, delay]);
};

export default usePolling;