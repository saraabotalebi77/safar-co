import CustomizeDialog from "@/presentation/shared/components/custom-components/ui/dialog";
import { useState, FC, ReactNode, useContext } from "react";
import Login from "./login";
import ConfirmCode from "./confirm-code";
import ChangePassword from "./change-password";
import LoginPassword from "./login-password";
import ResetPassword from "./reset-password";
import { MainContext } from "@/presentation/shared/context/context";
import { setState } from "@/presentation/shared/types";

interface IPropsDialog {
  children: ReactNode;
  operation: string;
  setOperation: setState<string>;
}
interface IUser {
  phone: string;
  passwordMessage: number;
  ttl: number;
}

const Dialog: FC<IPropsDialog> = ({ children, operation, setOperation }) => {
  const {
    openAuthenticateDialog: open,
    setOpenAuthenticateDialog: setOpen,
    authenticateDialog: DialogContent,
    selectAuthenticateDialogContent: selectDialogContent,
  } = useContext(MainContext);
  const [userInfo, setUserInfo] = useState<null | IUser>(null);
  const [timer, setTimer] = useState<null | number>(null);

  const closeDialog = () => {
    setOpen(false);
    selectDialogContent(true, false, false, false, false);
  };

  return (
    <CustomizeDialog
      title="ورود | ثبت نام"
      description="ورود | ثبت نام"
      triggerElement={children}
      isOpen={open}
      setOpen={setOpen}
      closeDialog={closeDialog}
      overlyName="authenticate"
    >
      <div id="authenticate">
        {DialogContent.login && (
          <Login
            selectDialogContent={selectDialogContent}
            setOpen={setOpen}
            setOperation={setOperation}
            setTimer={setTimer}
            setUserInfo={setUserInfo}
          />
        )}
        {DialogContent.loginPassword && (
          <LoginPassword
            selectDialogContent={selectDialogContent}
            closeDialog={closeDialog}
            userInfo={userInfo}
          />
        )}
        {DialogContent.confirmCode && (
          <ConfirmCode
            selectDialogContent={selectDialogContent}
            operation={operation}
            closeDialog={closeDialog}
            timer={timer}
            setTimer={setTimer}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
        {DialogContent.changePassword && (
          <ChangePassword
            selectDialogContent={selectDialogContent}
            setOperation={setOperation}
            closeDialog={closeDialog}
            setTimer={setTimer}
            setUserInfo={setUserInfo}
          />
        )}
        {DialogContent.resetPassword && (
          <ResetPassword
            selectDialogContent={selectDialogContent}
            closeDialog={closeDialog}
            userInfo={userInfo}
            setOperation={setOperation}
          />
        )}
      </div>
    </CustomizeDialog>
  );
};

export default Dialog;
