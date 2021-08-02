import { createContext, useState, useContext, useEffect } from "react";
import API from "@/utils/API";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { AdminPanel } from "@/admin";

const LOGIN_TOKEN = "dsb_login_token";

AdminProvider.propTypes = {
  children: PropTypes.node,
  page: PropTypes.object,
};

const AdminContext = createContext({});

const api = new API();

export function AdminProvider({ children, page }) {
  const router = useRouter();

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

  const [activeField, setActiveField] = useState(null);
  const [fieldType, setFieldType] = useState(null);
  const [_page, setPage] = useState(page);
  const [enabled, toggle] = useState(false);
  const [user, setUser] = useState(false);

  const updateField = (value) => {
    setPage({ ...page, [activeField]: value });
  };

  const save = async (data) => {
    api.post("/api/save", {
      path: _page.path,
      data,
    });
  };

  const login = ({ user, token }) => {
    router.push("/");
    setUser(user);
    setToken(token);
    api.setAuthHeader("X-Login-Token", token);
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

  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("path", domain);

    try {
      // const data = await api.post(`/api/media`, formData);

      // if (data.error) {
      //   throw Error(data.error);
      // }

      // setMedia([...media, ...data.map(strapiToData)]);
      console.log("UPLOAD", id);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMedia = async (id) => {
    try {
      // const data = await api.delete(`/api/media/${id}`);

      // console.log(data)
      console.log("DELETE", id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminContext.Provider
      value={{
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
        login,
        logout,
        setUser,
        logout,
        uploadMedia,
        deleteMedia,
      }}
    >
      <AdminPanel enabled={enabled} />
      {children}
    </AdminContext.Provider>
  );
}

export default function useAdminContext() {
  return useContext(AdminContext);
}
