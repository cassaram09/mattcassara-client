import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import API from "@/utils/API";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { LOGIN_TOKEN } from "@/utils/constants";

AppProvider.propTypes = {
  children: PropTypes.node,
  page: PropTypes.object,
};

const AppContext = createContext({});

const api = new API();

export function AppProvider({ children, page }) {
  const router = useRouter();

  useEffect(() => {
    const routeChangeComplete = () => setTransition(false);

    router.events.on("routeChangeComplete", routeChangeComplete);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const token = getToken();
      const user = decode(token);

      if (user) {
        api.setAuthHeader("X-Login-Token", token);
        api
          .post("/api/user")
          .then((user) => {
            if (user && user.id) {
              setUser(user);
            }
          })
          .catch((e) => {
            console.error("error fetching user", e);
          });
      }
    }

    fetchUser();
  }, []);

  const [transitioning, setTransition] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [fieldType, setFieldType] = useState(null);
  const [_page, setPage] = useState(page);
  const [enabled, toggle] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setPage(page);
  }, [router.asPath]);

  const updateField = (value) => {
    setPage({ ...page, [activeField]: value });
  };

  const save = async (data) => {
    api.post("/api/save", {
      path: _page.path,
      data,
    });
  };

  const logout = () => {
    Cookies.remove(LOGIN_TOKEN);
    api.headers = {};
    setUser(null);
    toggle(false);
  };

  const decode = (token) => {
    try {
      const user = token && jwt_decode(token);

      if (user && user.id && Date.now() <= user.exp * 1000) {
        return user;
      }

      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const setToken = (token) => Cookies.set(LOGIN_TOKEN, token);

  const getToken = () => Cookies.get(LOGIN_TOKEN);

  console.log("USER", user);
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
        user,
        api,
        setToken,
        logout,
        setUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppState() {
  return useContext(AppContext);
}
