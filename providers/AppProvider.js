import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

AppProvider.propTypes = {
  children: PropTypes.node,
};

const AppContext = createContext({});

export function AppProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    const routeChangeComplete = () => setTransition(false);

    router.events.on("routeChangeComplete", routeChangeComplete);
  }, []);

  const [transitioning, setTransition] = useState(false);

  return (
    <AppContext.Provider
      value={{
        transitioning,
        setTransition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppState() {
  return useContext(AppContext);
}
