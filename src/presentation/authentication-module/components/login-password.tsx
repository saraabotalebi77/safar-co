import { FC, useContext, useState } from "react";
import Button from "@/presentation/shared/components/custom-components/ui/button";
import { FormElementEvent } from "@/presentation/shared/types";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { login_password } from "@/infrastructure/api/authServices";
import { MainContext } from "@/presentation/shared/context/context";
import { setCookie } from "@/presentation/shared/utils/cookie";

interface IUser {
  phone: string;
  passwordMessage: number;
  ttl: number;
}
type PropsLoginPassword = {
  selectDialogContent: (
    login: boolean,
    loginPassword: boolean,
    confirmCode: boolean,
    changePassword: boolean,
    resetPassword: boolean
  ) => void;
  closeDialog: () => void;
  userInfo: IUser|null;
};

const LoginPassword: FC<PropsLoginPassword> = ({
  selectDialogContent,
  closeDialog,
  userInfo,
}) => {
  const {setToken} = useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useCustomizedMutation(
    ["login-password"],
    login_password
  );
  const submitFormHandler = (e: FormElementEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const inputElement = formElement.getElementsByTagName("input")[0];
    mutate({
      data:{
        phone : userInfo?.phone || "",
        password : inputElement.value,
      }
    },{
      onSuccess : (data)=>{
        //set toke in cookie and token state
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        setCookie("safarCo:user_key", data.data.token, {
          expires,
        });
        setToken(data.data.token);
        closeDialog();
      }
    });
  };
  return (
    <>
      <div className="flex relative py-3">
        <button
          onClick={() => {
            selectDialogContent(true, false, false, false, false);
          }}
        >
          <img
            src="/assets/images/header/right-arrow.svg"
            alt="right-arrow"
            className="w-6 h-6"
          />
        </button>
        <img
          src="/assets/images/Logo-text.svg"
          alt="Logo"
          width="80px"
          className="absolute top-0 left-1/2 -translate-x-1/2"
        />
      </div>
      <h4 className="mt-5 font-bold mb-5 text-gray-100">
        رمز عبور را وارد کنید
      </h4>
      <form
        noValidate
        className="group flex flex-col gap-2"
        onSubmit={submitFormHandler}
      >
        <div
          id="handle-error-input"
          className="flex justify-between border border-gray-200 rounded-md overflow-hidden focus-within:border-accent-400 pl-2"
        >
          <input
            type={showPassword ? "text" : "password"}
            autoFocus
            className="grow p-2 text-sm"
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^*&%$#@!]).{8,}$"
            required
          />
          {showPassword ? (
            <img
              src="/assets/images/header/eye-closed.svg"
              alt="eye-closed"
              className="cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <img
              src="/assets/images/header/eye-show.svg"
              alt="eye-show"
              className="cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        <span
          className="flex items-center cursor-pointer mt-3 self-start"
          onClick={() => {
            selectDialogContent(false, false, true, false, false);
          }}
        >
          <span className="text-accent-400 text-[13px]">
            ورود با رمز یکبارمصرف
          </span>
          <img
            src="/assets/images/header/left-arrow.svg"
            width="12px"
            height="12px"
            alt="left-arrow"
          />
        </span>
        <span
          className="flex items-center cursor-pointer self-start"
          onClick={() => {
            selectDialogContent(false, false, false, true, false);
          }}
        >
          <span className="text-accent-400 text-[13px]">فراموشی رمز عبور</span>
          <img
            src="/assets/images/header/left-arrow.svg"
            width="12px"
            height="12px"
            alt="left-arrow"
          />
        </span>
        <Button type="submit" className="flex items-center justify-center h-9 w-full mt-4 text-base">
          {!isPending && <span>تایید</span>}
          {isPending && <span className="loading"></span>}
        </Button>
      </form>
    </>
  );
};

export default LoginPassword;
