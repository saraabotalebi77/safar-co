import { FC } from "react";
import { FormElementEvent, setState } from "@/presentation/shared/types";
import Button from "@/presentation/shared/components/custom-components/ui/button";
import formValidation from "@/presentation/shared/utils/form-validation";
import { useLocation } from "react-router-dom";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { forgot_password } from "@/infrastructure/api/authServices";
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
  setOperation: setState<string>;
  closeDialog: () => void;
  setTimer: setState<number | null>;
  setUserInfo: setState<IUser | null>;
};
const ChangePassword: FC<PropsLoginPassword> = ({
  selectDialogContent,
  setOperation,
  closeDialog,
  setTimer,
  setUserInfo
}) => {
  const { mutate, isPending} = useCustomizedMutation(
    ["change-passord"],
    forgot_password
  );
  const { pathname } = useLocation();
  const submitFormHandler = (e: FormElementEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const inputElement = formElement.getElementsByTagName("input")[0];
    if (!formValidation("mobile", inputElement.value)) {
      inputElement.blur();
      return;
    }
    mutate(
      {
        data: {
          phone: inputElement.value,
        },
      },
      {
        onSuccess: (data) => {
          setUserInfo(data.data);
          setTimer(data.data.ttl);
          setOperation("change-password");
          selectDialogContent(false, false, true, false, false);
        },
      }
    );
  };
  return (
    <>
      <div className="flex relative py-3">
        <button
          onClick={() => {
            if (pathname == "/profile") {
              closeDialog();
            } else {
              selectDialogContent(true, false, false, false, false);
            }
          }}
        >
          {pathname == "/profile" ? (
            <img
              src="/assets/images/close-circle.svg"
              alt="close-circle"
              className="w-6 h-6"
            />
          ) : (
            <img
              src="/assets/images/header/right-arrow.svg"
              alt="right-arrow"
              className="w-6 h-6"
            />
          )}
        </button>
        <img
          src="/assets/images/Logo-text.svg"
          alt="Logo"
          width="80px"
          className="absolute top-0 left-1/2 -translate-x-1/2"
        />
      </div>
      <h4 className="mt-5 font-bold mb-5 text-gray-100">تغییر رمز عبور</h4>
      <form
        noValidate
        className="group flex flex-col gap-2"
        onSubmit={submitFormHandler}
      >
        <div className="flex flex-col gap-2 h-24">
          <label className="text-sm">
            برای تغییر رمز عبور، شماره موبایل خود را وارد کنید.
          </label>
          <input
            type="text"
            autoFocus
            placeholder="09224571245"
            className="peer rounded py-2 px-3 border border-gray-200 placeholder:text-gray-300 focus:border-accent-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-error"
            pattern="^(?:\+98|0|98)9(0[0-5]|[13]\d|2[0-3]|9\d)\d{7}$"
            required
          />
          <small className="hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-error">
            شماره موبایل نادرست است
          </small>
        </div>
        <Button
          type="submit"
          className="flex items-center justify-center h-9 w-full text-base mt-7 group-invalid:pointer-events-none group-invalid:opacity-40 transition-opacity duration-300"
        >
          {!isPending && <span>تایید</span>}
          {isPending && <span className="loading"></span>}
        </Button>
      </form>
    </>
  );
};
export default ChangePassword;
