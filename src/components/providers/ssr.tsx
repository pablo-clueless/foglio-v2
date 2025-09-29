import React from "react";

const canUseDOM = Boolean(
  typeof window !== "undefined" && window?.document && window?.document?.createElement,
);

interface SSRContextProps {
  isServer: boolean;
  isClient: boolean;
}

const defaultSSRContext: SSRContextProps = {
  isServer: !canUseDOM,
  isClient: canUseDOM,
};

const SSRContext = React.createContext<SSRContextProps>(defaultSSRContext);

export const SSRProvider: React.FC<React.PropsWithChildren & {}> = (props) => {
  const { children } = props;
  const ctx = { ...defaultSSRContext };

  return <SSRContext.Provider value={ctx}>{children}</SSRContext.Provider>;
};

export function useSSR() {
  const ctx = React.useContext(SSRContext);
  const isInSSRContext = ctx !== defaultSSRContext;
  const [isHydrating, setIsHydrating] = React.useState(canUseDOM && isInSSRContext);

  React.useLayoutEffect(() => {
    if (canUseDOM) {
      setIsHydrating(false);
    }
  }, []);

  return { ...ctx, isHydrating };
}
