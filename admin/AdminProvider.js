import { createContext, useState, useContext, useEffect } from "react";
import API from "@/utils/API";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { AdminPanel, Modal, Notification } from "@/admin";

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
          .catch(errorHandler);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    api.get("/api/media").then(setMedia).catch(errorHandler);
  }, []);

  const [activeField, setActiveField] = useState(null);
  const [fieldType, setFieldType] = useState(null);
  const [_page, setPage] = useState(page);
  const [enabled, toggle] = useState(false);
  const [user, setUser] = useState(false);
  const [visible, setVisibility] = useState();
  const [media, setMedia] = useState([]);
  const [modalChildren, setChildren] = useState(null);
  const [notification, setNotification] = useState(null);

  const closeNotification = () => setNotification(null);

  useEffect(() => {
    setPage(page);
  }, [page]);

  const updateField = (value) => {
    setPage({ ...page, [activeField]: value });
  };

  const save = async (data) => {
    api
      .post("/api/save", {
        path: _page.path,
        data,
      })
      .catch(errorHandler);
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
      errorHandler(e);
      return null;
    }
  };

  const setToken = (token) => Cookies.set(LOGIN_TOKEN, token);

  const getToken = () => Cookies.get(LOGIN_TOKEN);

  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await api.post(`/api/media`, formData);
      if (data.error) {
        throw Error(data.error);
      }
      setMedia([...media, data]);
    } catch (e) {
      errorHandler(e);
    }
  };

  const updateMedia = async (image) => {
    try {
      const data = await api.patch(`/api/media`, {
        alt: image.alt,
        key: image.key,
      });

      if (data.error) {
        throw Error(data.error);
      }

      const index = media.findIndex((item) => item.key === image.key);
      const images = media.slice(0);
      images[index] = image;
      setMedia(images);
      setNotification({ message: "Media saved", type: "success" });
    } catch (e) {
      errorHandler(e);
    }
  };

  const deleteMedia = async (key) => {
    try {
      const data = await api.delete(`/api/media?key=${key}`);
      if (data.error) {
        throw Error(data.error);
      }
      setMedia(media.filter((item) => item.key !== key));
    } catch (e) {
      errorHandler(e);
    }
  };

  const errorHandler = (e) =>
    setNotification({ message: e.message, type: "danger" });

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
        visible,
        children: modalChildren,
        openModal: (node) => {
          setVisibility(true);
          setChildren(node);
        },
        closeModal: () => {
          setVisibility(null);
          setChildren(null);
        },
        media,
        updateMedia,
      }}
    >
      <AdminPanel enabled={enabled} />
      <Notification notification={notification} close={closeNotification} />
      <Modal />
      {children}
    </AdminContext.Provider>
  );
}

export default function useAdminContext() {
  return useContext(AdminContext);
}
