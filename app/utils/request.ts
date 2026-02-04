import { useRequestHeaders } from "#app";

const fetchData = async (
  path: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  body: any = null,
  withCredentials: boolean = true
) => {
  const options: any = {
    method,
    credentials: withCredentials ? "include" : "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  if (import.meta.server && withCredentials) {
    const headers = useRequestHeaders(["cookie"]);
    options.headers = {
      ...(options.headers || {}),
      ...(headers || {}),
    };
  }

  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://mtsoft.lt";

    const data: any = await $fetch(`${url}/api/${path}`, options);
    return data;
  } catch (error) {
    console.error(`Error during ${method} request to ${path}:`, error);
    throw error;
  }
};

export default {
  get: (path: string, withCredentials: boolean = true) =>
    fetchData(path, "GET", null, withCredentials),
  post: (path: string, body: any = null, withCredentials: boolean = true) =>
    fetchData(path, "POST", body, withCredentials),
  patch: (path: string, body: any = null, withCredentials: boolean = true) =>
    fetchData(path, "PATCH", body, withCredentials),
  delete: (path: string, body: any = null, withCredentials: boolean = true) =>
    fetchData(path, "DELETE", body, withCredentials),

  getNoCredentials: (path: string) => fetchData(path, "GET", null, false),
  postNoCredentials: (path: string, body: any = null) => fetchData(path, "POST", body, false),
  patchNoCredentials: (path: string, body: any = null) => fetchData(path, "PATCH", body, false),
  deleteNoCredentials: (path: string, body: any = null) => fetchData(path, "DELETE", body, false),
};
