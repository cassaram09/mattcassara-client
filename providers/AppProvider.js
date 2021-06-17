import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import API from "@/utils/API";

AppProvider.propTypes = {
  children: PropTypes.node,
  page: PropTypes.object,
};

const AppContext = createContext({});

export function AppProvider({ children, page }) {
  const router = useRouter();

  console.log(page);

  useEffect(() => {
    const routeChangeComplete = () => setTransition(false);

    router.events.on("routeChangeComplete", routeChangeComplete);
  }, []);

  const [transitioning, setTransition] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [_page, setPage] = useState(page);
  const [enabled, toggle] = useState(false);
  useEffect(() => {
    setPage(page);
  }, [router.asPath]);

  const updateField = (value) => {
    setPage({ ...page, [activeField]: value });
  };

  const save = async () => {
    const api = new API("http://192.168.1.198:3000");

    const data = await api.post("/api/save", {
      ref: page.ref,
      data: { [activeField]: _page[activeField] },
    });

    console.log(data);
  };

  return (
    <AppContext.Provider
      value={{
        transitioning,
        setTransition,
        activeField,
        setActiveField: (name) => {
          if (name) {
            toggle(true);
            setActiveField(name);
          } else {
            setActiveField(null);
          }
        },
        page: _page,
        updateField,
        enabled,
        toggle,
        save,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppState() {
  return useContext(AppContext);
}
