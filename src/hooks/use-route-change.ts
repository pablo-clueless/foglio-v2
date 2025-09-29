import { useRouter } from "next/router";
import React from "react";

export const useRouteChangeLoader = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const prevPathRef = React.useRef(router.asPath);

  const handleStart = React.useCallback(() => {
    setLoading(true);
  }, []);

  const handleComplete = React.useCallback(() => {
    prevPathRef.current = router.asPath;
    setLoading(false);
  }, [router.asPath]);

  React.useEffect(() => {
    // if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    //   return;
    // }
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, handleStart, handleComplete]);

  return loading;
};
