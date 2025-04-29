import { CommonDTO, DefaultResponse } from "./api.interfaces";
import { API_URL } from "@/config";

const fetchHelper = {
  get: async <T>(url: string, config?: RequestInit) => {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        ...config,
        method: "GET",
        headers: {
          ...config?.headers,
        },
      });

      const data: DefaultResponse<T> = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          await fetchHelper.handleUnauthorized(response);
        }
        return {
          success: false,
          data: data.data,
          code: data.statusCode,
          description: data.statusDescription,
          message: data.statusMessage,
        } as CommonDTO<T>;
      }

      return {
        success: true,
        data: data.data,
        code: data.statusCode,
        description: data.statusDescription,
        message: data.statusMessage,
      } as CommonDTO<T>;
    } catch (error) {
      return {
        success: false,
        data: null,
        code: null,
        description: null,
        message: (error as Error).message,
      } as unknown as CommonDTO<T>;
    }
  },

  post: async <T>(url: string, payload: any = {}, config: RequestInit = {}) => {
    try {
      let headers: any = config.headers || {};

      let body: any = null;

      if (payload instanceof FormData) {
        body = payload;

        headers = {
          ...headers,
        };
      } else {
        body = JSON.stringify(payload);
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }

      const response: any = await fetch(`${API_URL}${url}`, {
        ...config,
        method: "POST",
        headers,
        body,
        cache: "no-store",
      });

      const data: DefaultResponse<T> = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          await fetchHelper.handleUnauthorized(response);
        }

        return {
          success: false,
          data: data,
          code: data.statusCode,
          description: data.statusDescription,
          message: data.statusMessage,
        } as CommonDTO<T>;
      }

      return {
        success: true,
        data: data.data,
        code: data.statusCode,
        description: data.statusDescription,
        message: data.statusMessage,
        headers: response.headers,
      } as unknown as CommonDTO<T>;
    } catch (error) {
      return {
        success: false,
        data: JSON.stringify(error),
        code: null,
        description: JSON.stringify(error),
        message: (error as Error).message,
      } as unknown as CommonDTO<T>;
    }
  },

  put: async <T>(url: string, payload: any = {}, config: RequestInit = {}) => {
    try {
      let headers: HeadersInit = config.headers || {};

      let body: BodyInit | null = null;

      if (payload instanceof FormData) {
        body = payload;
        headers = {
          ...headers,
        };
      } else {
        body = JSON.stringify(payload);
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }

      const response = await fetch(`${API_URL}${url}`, {
        ...config,
        method: "PUT",
        headers,
        body,
        cache: "no-store",
      });

      const data: DefaultResponse<T> = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          await fetchHelper.handleUnauthorized(response);
        }
        return {
          success: false,
          data: data.data,
          code: data.statusCode,
          description: data.statusDescription,
          message: data.statusMessage,
        } as CommonDTO<T>;
      }

      return {
        success: true,
        data: data.data,
        code: data.statusCode,
        description: data.statusDescription,
        message: data.statusMessage,
      } as CommonDTO<T>;
    } catch (error) {
      return {
        success: false,
        data: null,
        code: null,
        description: null,
        message: (error as Error).message,
      } as unknown as CommonDTO<T>;
    }
  },

  delete: async <T>(url: string, config?: RequestInit) => {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        ...config,
        method: "DELETE",
        headers: {
          ...config?.headers,
        },
        cache: "no-store",
      });

      const data: DefaultResponse<T> = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          await fetchHelper.handleUnauthorized(response);
        }
        return {
          success: false,
          data: data.data,
          code: data.statusCode,
          description: data.statusDescription,
          message: data.statusMessage,
        } as CommonDTO<T>;
      }

      return {
        success: true,
        data: data.data,
        code: data.statusCode,
        description: data.statusDescription,
        message: data.statusMessage,
      } as CommonDTO<T>;
    } catch (error) {
      return {
        success: false,
        data: null,
        code: null,
        description: null,
        message: (error as Error).message,
      } as unknown as CommonDTO<T>;
    }
  },

  patch: async <T>(
    url: string,
    payload: any = {},
    config: RequestInit = {}
  ) => {
    try {
      let headers: HeadersInit = config.headers || {};

      let body: BodyInit | null = null;

      if (payload instanceof FormData) {
        body = payload;
        headers = {
          ...headers,
        };
      } else {
        body = JSON.stringify(payload);
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }
      const response = await fetch(`${API_URL}${url}`, {
        ...config,
        method: "PATCH",
        headers,
        body,
        cache: "no-store",
      });

      const data: DefaultResponse<T> = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          await fetchHelper.handleUnauthorized(response);
        }
        return {
          success: false,
          data: data.data,
          code: data.statusCode,
          description: data.statusDescription,
          message: data.statusMessage,
        } as CommonDTO<T>;
      }

      return {
        success: true,
        data: data.data,
        code: data.statusCode,
        description: data.statusDescription,
        message: data.statusMessage,
      } as CommonDTO<T>;
    } catch (error) {
      return {
        success: false,
        data: null,
        code: null,
        description: null,
        message: (error as Error).message,
      } as unknown as CommonDTO<T>;
    }
  },

  handleUnauthorized: async (response: Response) => {
    if (response.status === 401) {
      // Implementa tu lógica aquí
      // Por ejemplo, redirigir al usuario al inicio de sesión
      // Esto no es posible directamente desde el servidor, así que debes manejarlo en el cliente
    }
    throw response;
  },
};

export default fetchHelper;
