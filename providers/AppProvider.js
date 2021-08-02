import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

AppProvider.propTypes = {
  children: PropTypes.node,
  page: PropTypes.object,
};

const AppContext = createContext({});

export function AppProvider({ children, page }) {
  const router = useRouter();

  useEffect(() => {
    const routeChangeComplete = () => setTransition(false);

    router.events.on("routeChangeComplete", routeChangeComplete);
  }, []);

  const [transitioning, setTransition] = useState(false);
  const [_page, setPage] = useState(page);

  useEffect(() => {
    setPage(page);
  }, [router.asPath]);

  return (
    <AppContext.Provider
      value={{
        transitioning,
        setTransition,
        page: _page,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppState() {
  return useContext(AppContext);
}
