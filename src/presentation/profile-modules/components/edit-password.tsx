import { DialogClose } from "@/presentation/shared/components/shadcn-components/components/ui/dialog";
import Button from "@/presentation/shared/components/custom-components/ui/button";
import {
  FormElementEvent,
  InputChangeEvent,
} from "@/presentation/shared/types";
import { useContext, useState } from "react";
import formValidation from "@/presentation/shared/utils/form-validation";
import { MainContext } from "@/presentation/shared/context/context";
import AuthDialog from "@/presentation/authentication-module/components/dialog";
import { FC } from "react";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { setPassword } from "@/infrastructure/api/userServices";
import { useQueryClient } from "@tanstack/react-query";

interface IPropsComponent {
  passwordMessage: number;
  closeDialog: () => void;
}
const EditPassword: FC<IPropsComponent> = ({
  passwordMessage,
  closeDialog,
}) => {
  const { mutate, isPending } = useCustomizedMutation(
    ["set-passord"],
    setPassword
  );
  const queryClient = useQueryClient();
  const {token} = useContext(MainContext);
  const [operation,setOperation] = useState("change-password");
  const [validation, setValidation] = useState({
    password: "",
    confirmPassword: "",
  });
  const [inputValue, setInputValue] = useState({
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    password: false,
    confirmPassword: false,
  });
  const { setOpenAuthenticateDialog, selectAuthenticateDialogContent } =
    useContext(MainContext);
  //handle state of validation
  const handleValidation = (key: string, value: string) => {
    setValidation({
      ...validation,
      [key]: value,
    });
  };
  //handle state of inputValue
  const handleInputValue = (key: string, value: string) => {
    setInputValue({
      ...inputValue,
      [key]: value,
    });
  };
  //input change event handler
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
  //input blur event handler
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
  const submitFormHandler = (e: FormElementEvent) => {
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
        data : {
          current_password: inputValue.currentPassword ,
          new_password: inputValue.password,
          new_password_confirmation: inputValue.confirmPassword,
        }
      },{
        onSuccess : ()=>{
          queryClient.invalidateQueries({
            queryKey:["user"]
          });
          queryClient.refetchQueries({ queryKey: ['notification']});
          closeDialog();
        }
      }
    )

  };

  const retrievalPasswordHandler = () => {
    setOpenAuthenticateDialog(true);
    selectAuthenticateDialogContent(false, false, false, true, false);
  };
  return (
    <div className="flex flex-col max-h-[85vh] ">
      <div className="flex justify-between items-center border-b-2 border-gray-400 pb-3">
        <span className="text-[15px] font-bold text-gray-100">
          تغییر رمز عبور
        </span>
        <DialogClose>
          <img
            src="/assets/images/close-circle.svg"
            alt="close-circle"
            width="25xp"
            height="25px"
          />
        </DialogClose>
      </div>
      <form
        className="grow overflow-auto scrollbar-thin p-2 my-2"
        onSubmit={submitFormHandler}
      >
        {passwordMessage && (
          <>
            <label
              htmlFor="current-password"
              className="mx-2 mt-3 text-sm self-start after:content-['*'] after:text-error"
            >
              رمز عبور فعلی
            </label>
            <div className="h-20">
              <div className="flex  border border-gray-200 rounded py-2 px-3 mt-2 mb-1 focus-within:border-accent-400">
                <input
                  type={showPassword.currentPassword ? "text" : "password"}
                  id="current-password"
                  className="grow"
                  onChange={(e) => {
                    handleInputValue("currentPassword", e.target.value);
                  }}
                />
                {showPassword.currentPassword ? (
                  <img
                    src="/assets/images/header/eye-closed.svg"
                    alt="eye-closed"
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        currentPassword: false,
                      })
                    }
                  />
                ) : (
                  <img
                    src="/assets/images/header/eye-show.svg"
                    alt="eye-show"
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        currentPassword: true,
                      })
                    }
                  />
                )}
              </div>
              <AuthDialog operation={operation} setOperation={setOperation} >
                <div
                  className="inline-flex items-center gap-1 text-accent-400 cursor-pointer"
                  onClick={retrievalPasswordHandler}
                >
                  <small>بازیابی رمز عبور</small>
                  <img
                    src="/assets/images/header/left-arrow.svg"
                    alt="left-arrow"
                    width="12px"
                    height="12px"
                  />
                </div>
              </AuthDialog>
            </div>
          </>
        )}

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
    </div>
  );
};

export default EditPassword;
