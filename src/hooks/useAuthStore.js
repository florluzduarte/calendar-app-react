import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  handleChecking,
  handleLogin,
  handleLogout,
} from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(handleChecking());
      const response = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        handleLogin({ name: response.data.name, uid: response.data.uid })
      );
    } catch (error) {
      dispatch(handleLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(handleChecking());
      const response = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        handleLogin({ name: response.data.name, uid: response.data.uid })
      );
    } catch (error) {
      dispatch(
        handleLogout(error.response.data?.msg || "Error al crear el usuario")
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(handleLogout());

    try {
      const response = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        handleLogin({ name: response.data.name, uid: response.data.uid })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(handleLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(handleLogout());
  };

  return {
    //Properties
    errorMessage,
    status,
    user,

    //Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
