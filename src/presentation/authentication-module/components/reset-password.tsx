import Button from "@/presentation/shared/components/custom-components/ui/button";
import {
  FormElementEvent,
  InputChangeEvent,
} from "@/presentation/shared/types";
import { FC, useState, useContext } from "react";
import formValidation from "@/presentation/shared/utils/form-validation";
import { MainContext } from "@/presentation/shared/context/context";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { reset_password } from "@/infrastructure/api/authServices";
import { setState } from "@/presentation/shared/types";

interface IUser {
  phone: string;
  passwordMessage: number;
  ttl: number;
}
type PropsResetPassword = {
  selectDialogContent: (
    login: boolean,
    loginPassword: boolean,
    confirmCode: boolean,
    changePassword: boolean,
    resetPassword: boolean
  ) => void;
  closeDialog: () => void;
  userInfo: IUser | null;
  setOperation : setState<string>
};
const ResetPassword: FC<PropsResetPassword> = ({
  selectDialogContent,
  closeDialog,
  userInfo,
  setOperation
}) => {
  const { token } = useContext(MainContext);
  const { isPending, mutate } = useCustomizedMutation(
    ["reset-passord"],
    reset_password
  );
  const [validation, setValidation] = useState({
    password: "",
    confirmPassword: "",
  });
  const [inputValue, setInputValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const handleValidation = (key: string, value: string) => {
    setValidation({
      ...validation,
      [key]: value,
    });
  };
  const handleInputValue = (key: string, value: string) => {
    setInputValue({
      ...inputValue,
      [key]: value,
    });
  };
  const inputChangeHandler = (e: InputChangeEvent, inputName: string) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputName == "password") {
      handleInputValue("password", inputElement.value);
      handleValidation("password", "");
    } else {
      handleInputValue("confirmPassword", inputElement.value);
      handleValidation("confirmPassword", "");
    }
  };
  const inputBlurHandler = (inputName: string) => {
    if (inputName == "password") {
      if (inputValue.password.length == 0) {
        handleValidation("password", "لطفا این قسمت را خالی نگذارید");
      } else if (!formValidation("password", inputValue.password)) {
        handleValidation("password", "رمز عبور معتبر نیست");
      }
    } else if (inputName == "confirm-password") {
      if (inputValue.password !== inputValue.confirmPassword) {
        handleValidation("confirmPassword", "رمز عبور و تکرار آن برابر نیستند");
      }
    }
  };
  const submitHandler = (e: FormElementEvent) => {
    e.preventDefault();
    if (inputValue.password.length == 0) {
      handleValidation("password", "لطفا این قسمت را خالی نگذارید");
      return;
    } else if (!formValidation("password", inputValue.password)) {
      handleValidation("password", "رمز عبور معتبر نیست");
      return;
    }
    if (inputValue.password !== inputValue.confirmPassword) {
      handleValidation("confirmPassword", "رمز عبور و تکرار آن برابر نیستند");
      return;
    }
    mutate(
      {
        token,
        data: {
          phone: userInfo?.phone || "",
          password: inputValue.password,
        },
      },
      {
        onSuccess: () => {
          setOperation("login");
          closeDialog();
        },
      }
    );
  };

  return (
    <>
      <div className="flex relative py-3">
        <button
          onClick={() => {
            selectDialogContent(false, false, false, true, false);
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
      <h4 className="mt-5 font-bold mb-5 text-gray-100">تغییر رمز عبور</h4>
      <form onSubmit={submitHandler}>
        <span className="text-sm text-gray-100">
          رمز عبور باید حداقل 8 حرفی باشد
        </span>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mx-2 mt-3 text-sm self-start after:content-['*'] after:text-error"
          >
            رمز عبور جدید
          </label>
          <div className="h-20">
            <div className="flex border border-gray-200 rounded py-2 px-3 mt-2 mb-1 focus-within:border-accent-400">
              <input
                type={showPassword.password ? "text" : "password"}
                autoFocus
                id="password"
                className="grow"
                onChange={(e) => inputChangeHandler(e, "password")}
                onBlur={() => inputBlurHandler("password")}
              />
              {showPassword.password ? (
                <img
                  src="/assets/images/header/eye-closed.svg"
                  alt="eye-closed"
                  className="cursor-pointer"
                  onClick={() =>
                    setShowPassword({ ...showPassword, password: false })
                  }
                />
              ) : (
                <img
                  src="/assets/images/header/eye-show.svg"
                  alt="eye-show"
                  className="cursor-pointer"
                  onClick={() =>
                    setShowPassword({ ...showPassword, password: true })
                  }
                />
              )}
            </div>
            <small className="text-error">{validation.password}</small>
          </div>
          <ul className="flex flex-col gap-[5px] list-disc list-inside text-gray-200 text-xs font-light">
            <li
              className={`mt-3 ${
                /\d/.test(inputValue.password) ? "hidden" : "list-item"
              }`}
            >
              شامل عدد
            </li>
            <li
              className={`${
                /.{8,}/.test(inputValue.password) ? "hidden" : "list-item"
              }`}
            >
              حداقل 8 حرف
            </li>
            <li
              className={`${
                /.*[*&%$#@!].*/.test(inputValue.password)
                  ? "hidden"
                  : "list-item"
              }`}
            >
              شامل علامت (!@#$%&*^)
            </li>
            <li
              className={`mb-3 ${
                /^(?=.*[a-z])(?=.*[A-Z]).*/.test(inputValue.password)
                  ? "hidden"
                  : "list-item"
              }`}
            >
              شامل یک حرف بزرگ و کوچک
            </li>
          </ul>
          <label
            htmlFor="confirm-password"
            className="mx-2 text-sm self-start after:content-['*'] after:text-error"
          >
            تکرار رمز عبور جدید
          </label>
          <div className="h-20">
            <div className="flex border border-gray-200 rounded py-2 px-3 mt-2 mb-1 focus-within:border-accent-400">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirm-password"
                className="grow"
                onChange={(e) => inputChangeHandler(e, "confirm-password")}
                onBlur={() => inputBlurHandler("confirm-password")}
              />
              {showPassword.confirmPassword ? (
                <img
                  src="/assets/images/header/eye-closed.svg"
                  alt="eye-closed"
                  className="cursor-pointer"
                  onClick={() =>
                    setShowPassword({ ...showPassword, confirmPassword: false })
                  }
                />
              ) : (
                <img
                  src="/assets/images/header/eye-show.svg"
                  alt="eye-show"
                  className="cursor-pointer"
                  onClick={() =>
                    setShowPassword({ ...showPassword, confirmPassword: true })
                  }
                />
              )}
            </div>
            <small className="text-error">{validation.confirmPassword}</small>
          </div>
        </div>
        <Button
          type="submit"
          className="flex items-center justify-center h-9 w-full text-base mt-6"
        >
          {!isPending && <span>تغییر رمز عبور</span>}
          {isPending && <span className="loading"></span>}
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
