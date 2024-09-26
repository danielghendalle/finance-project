import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import qs from "qs";

export const api = axios.create({
  baseURL: "",
});

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies(); // Pega os cookies
    const token = cookies["authorization_token"]; // Obtém o token do cookie

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token nos headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function signIn(username, password) {
  const params = qs.stringify({
    grant_type: "password",
    username,
    password,
  });

  try {
    const response = await api.post("/oauth/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: "admin",
        password: "admin",
      },
    });

    // Armazenar tokens em cookies
    const { access_token, refresh_token } = response.data;
    setCookie(undefined, "authorization_token", access_token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    setCookie(undefined, "refresh_token", refresh_token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  } catch (err) {
    // Tratar erro
    destroyCookie(undefined, "authorization_token");
    destroyCookie(undefined, "refresh_token");

    if (err.response) {
      const errorMessage =
        err.response.data.error_description || "Erro desconhecido";
      alert(errorMessage);
    } else {
      alert("Erro na conexão com o servidor.");
    }
  }
}

export async function userRegister(username, password) {
  try {
    const response = await api.post("/users", {
      username,
      password,
    });
    alert("Sucesso ao registrar o usuário !");
  } catch (err) {
    alert("Não foi possível registrar o usuário !");
    return console.log(err);
  }
}
