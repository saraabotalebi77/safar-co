import http from "../utils/httpService";
import handleError from "../utils/handle-error";

interface IUserResponse {
  data: {
    passwordMessage: number;
    user: {
      avatar: string;
      created_at: string;
      id: number;
      name: string;
      phone: string;
      role: string;
      updated_at: string;
    };
  };
}

interface IUserImage {
  data: string;
}

export function getUser({
  token,
}: {
  token: string | undefined;
}): Promise<IUserResponse> {
  return handleError(() =>
    http.get("api/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
}

export function getUserImage({
  token,
}: {
  token: string | undefined;
}): Promise<IUserImage> {
  return handleError(() =>
    http.get("api/auth/user/show-avatar", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
}

export function postUserName({
  token,
  data,
}: {
  token: string | undefined;
  data: {
    name: string;
  };
}) {
  return handleError(() =>
    http.post("api/auth/user/name", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
}

export function setPassword({
  token,
  data,
}: {
  token: undefined | string;
  data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  };
}) {
  return handleError(() =>
    http.post("api/auth/user/update-password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
}

export function postUserImage({
  token,
  formData,
}: {
  token: string | undefined,
  formData: FormData,
}) {
  return handleError(()=>http.post("api/auth/user/avatar",formData,{
    headers:{
      Authorization : `Bearer ${token}`,
    }
  }))
}
