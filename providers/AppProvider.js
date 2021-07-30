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

  useEffect(() => {
    const routeChangeComplete = () => setTransition(false);

    router.events.on("routeChangeComplete", routeChangeComplete);
  }, []);

  const [transitioning, setTransition] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [fieldType, setFieldType] = useState(null);
  const [_page, setPage] = useState(page);
  const [enabled, toggle] = useState(false);
  useEffect(() => {
    setPage(page);
  }, [router.asPath]);

  const updateField = (value) => {
    setPage({ ...page, [activeField]: value });
  };

  const save = async (data) => {
    const api = new API("http://192.168.1.198:3000");

    api.post("/api/save", {
      path: _page.path,
      data,
    });
  };

  return (
    <AppContext.Provider
      value={{
        transitioning,
        setTransition,
        activeField,
        setActiveField: (name, type) => {
          if (name) {
            toggle(true);
            setActiveField(name);
            setFieldType(type);
          } else {
            setActiveField(null);
            setFieldType(null);
          }
        },
        page: _page,
        updateField,
        enabled,
        toggle,
        save,
        fieldType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppState() {
  return useContext(AppContext);
}
