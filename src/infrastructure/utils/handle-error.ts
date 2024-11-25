import { AxiosResponse } from "axios";

type TOwnError = Error & {
  detail?: {
    message: string;
    status?: string;
    data?: null;
  };
};

const handleError = <T>(api: () => Promise<AxiosResponse>): Promise<T> => {
  return api()
    .then((res) => {
      if (res.data.status < 200 || res.data.status >= 300) {
        const detail = {
          message: res.data.message,
          status: res.data.status,
          data: null,
        };
        const error: TOwnError = new Error("Something went wrong");
        error.detail = detail;
        throw error;
      }
      return res.data;
    })
};

export default handleError;
