import Button from "@/presentation/shared/components/custom-components/ui/button";
import Otp from "@/presentation/shared/components/custom-components/ui/otp";
import { FC, useContext, useEffect, useState } from "react";
import { FormElementEvent, setState } from "@/presentation/shared/types";
import formValidation from "@/presentation/shared/utils/form-validation";
import ConvertSecondToTime from "../utils/convert-second-to-time";
import { authenticate, verifyOtp, verifyResetOtp } from "@/infrastructure/api/authServices";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { setCookie } from "@/presentation/shared/utils/cookie";
import { MainContext } from "@/presentation/shared/context/context";

interface IUser {
  phone: string;
  passwordMessage: number;
  ttl: number;
}

type PropsConfirmCode = {
  selectDialogContent: (
    login: boolean,
    loginPassword: boolean,
    confirmCode: boolean,
    changePassword: boolean,
    resetPassword: boolean
  ) => void;
  operation: string;
  closeDialog: () => void;
  timer: null | number;
  setTimer: setState<number | null>;
  userInfo: IUser | null;
  setUserInfo: setState<IUser | null>;
};

const ConfirmCode: FC<PropsConfirmCode> = ({
  selectDialogContent,
  operation,
  closeDialog,
  timer,
  setTimer,
  userInfo,
  setUserInfo,
}) => {
  const [otp, setOtp] = useState("");
  const { setToken } = useContext(MainContext);
  const { mutate: mutateAuth } = useCustomizedMutation(
    ["authenticate"],
    authenticate
  );
  const { mutate: mutateOtp , isPending } = useCustomizedMutation(
    ["verify-otp"],
    verifyOtp
  );
  const {mutate:mutateResetOtp } = useCustomizedMutation(
    ["verify-reset-otp"],
    verifyResetOtp
  )
  const submitFormHandler = (e: FormElementEvent) => {
    e.preventDefault();
    if (!formValidation("otp", otp)) {
      return;
    }

    if(operation=="login"){
      mutateOtp(
        {data:{ phone: userInfo?.phone || "", otp }},
        {
          onSuccess: (data) => {
            //set token in cookie and token state
            const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            setCookie("safarCo:user_key", data.data.token, {
              expires,
            });
            setToken(data.data.token);
            closeDialog();
          },
        }
      );
    }else{
      mutateResetOtp(
        {data:{ phone: userInfo?.phone || "", otp }},
        {
          onSuccess: (data) => {
            //set token in cookie and token state
            const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            setCookie("safarCo:user_key", data.data.token, {
              expires,
            });
            selectDialogContent(false, false, false, false, true);
            setToken(data.data.token);
          },
        }
      )
    }
    
  };
  //resend otp code again
  const resendOtpCodeBtnHandler = () => {
    mutateAuth(
      {data:{ phone: userInfo?.phone || "" }},
      {
        onSuccess: (data) => {
          setUserInfo(data.data);
          setTimer(data.data.ttl);
        },
      }
    );
  };
  //Enable otp code expiration timer
  useEffect(() => {
    setTimeout(() => {
      if (typeof timer == "number" && timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
  }, [timer]);
  return (
    <>
      <div className="flex relative py-3">
        <button
          onClick={() => {
            if (operation == "login") {
              selectDialogContent(true, false, false, false, false);
            } else {
              selectDialogContent(false, false, false, true, false);
            }
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
        کد تایید را وارد کنید
      </h4>
      <form
        noValidate
        className="group flex flex-col items-start gap-2"
        onSubmit={submitFormHandler}
      >
        <span className="font-light text-sm">
          کد تایید به شماره {userInfo?.phone} ارسال شد
        </span>
        <Otp
          otp={otp}
          setOtp={setOtp}
          length={4}
          pattern={"^[a-zA-Z0-9]{4}$"}
          className="otp self-center"
        />
        {operation == "login" && userInfo?.passwordMessage == 1 && (
          <span
            className="flex items-center cursor-pointer mt-3"
            onClick={() => {
              selectDialogContent(false, true, false, false, false);
            }}
          >
            <span className="text-accent-400 text-[13px]">ورود با رمزعبور</span>
            <img
              src="/assets/images/header/left-arrow.svg"
              width="12px"
              height="12px"
              alt="left-arrow"
            />
          </span>
        )}
        {timer == 0 ? (
          <span className=" flex gap-1 items-center text-sm text-gray-100 mt-3 self-center">
            <span>دریافت مجدد کد از طریق </span>
            <span
              className="text-accent-400 flex cursor-pointer"
              onClick={resendOtpCodeBtnHandler}
            >
              پیامک{" "}
              <img
                src="/assets/images/header/left-arrow.svg"
                width="10px"
                height="10px"
                alt="left-arrow"
              />
            </span>
          </span>
        ) : (
          <span className="flex gap-1 items-center text-sm text-gray-100 mt-3 self-center">
            <img
              src="/assets/images/header/orange-clock.svg"
              alt="orange-clock"
            />
            <span className="flex justify-center w-8">
              {ConvertSecondToTime(timer)}
            </span>
            <span>دقیقه تا دریافت مجدد کد</span>
          </span>
        )}
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

export default ConfirmCode;
