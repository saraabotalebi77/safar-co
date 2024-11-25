import http from "../utils/httpService";
import handleError from "../utils/handle-error";

interface AuthenticateResponse {
  status: number;
  message: string;
  data: {
    phone: string;
    passwordMessage: number;
    ttl: number;
  };
}
interface VerifyOtpResponse {
  status: number;
  message: string;
  data: {
    user: {
      phone: string;
    };
    token: string;
  };
}

export function authenticate({
  data,
}: {
  data: { phone: string };
}): Promise<AuthenticateResponse> {
  return handleError(() => http.post("api/auth/authenticate", data));
}

export function verifyOtp({
  data,
}: {
  data: { phone: string; otp: string };
}): Promise<VerifyOtpResponse> {
  return handleError(() => http.post("api/auth/verify-otp", data));
}

export function verifyResetOtp({
  data,
}: {
  data: { phone: string; otp: string };
}): Promise<VerifyOtpResponse> {
  return handleError(() => http.post("api/auth/verify-reset-otp", data));
}

export function login_password({data}:{data:{
    phone: string,
    password: string,
}}):Promise<VerifyOtpResponse>{
  return handleError(() => http.post("api/auth/login", data));
}

export function forgot_password({data}:{
  data:{
    phone: string
  }
}):Promise<AuthenticateResponse>{
  return handleError(() => http.post("api/auth/forgot-password", data));
}

export function reset_password({data,token}:{
  data:{
    phone: string,
    password: string,
  },
  token:string|undefined
}){
  return handleError(() => http.post("api/auth/reset-password", data,{
    headers: {
      'Authorization': `bearer ${token}`,
      "Content-Type": "application/json",
    },
  }));
}

export function logout({ token }: { token: string }) {
  return handleError(() =>
    http.post(
      "api/auth/logout",
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
  );
}
