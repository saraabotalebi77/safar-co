import Button from "@/presentation/shared/components/custom-components/ui/button";
import CustomizeDialog from "@/presentation/shared/components/custom-components/ui/dialog";
import { DialogClose } from "@/presentation/shared/components/shadcn-components/components/ui/dialog";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { logout } from "@/infrastructure/api/authServices";
import { FC, ReactNode, useContext, useState } from "react";
import { MainContext } from "@/presentation/shared/context/context";
import { deleteCookie } from "@/presentation/shared/utils/cookie";
import { useNavigate } from "react-router-dom";

type PropsLogout = {
  children: ReactNode;
};
const Logout: FC<PropsLogout> = ({ children }) => {
  const { token, setToken } = useContext(MainContext);
  const { isPending, mutate } = useCustomizedMutation(["logout-user"], logout);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logoutBtnHandler = async() => {
    if (token) {
      mutate(
        { token },
        {
          onSuccess: () => {
            setToken(undefined);
            deleteCookie("safarCo:user_key");
            navigate("/");
            setOpen(false);
          },
        }
      );
    }
  };
  return (
    <>
      <CustomizeDialog
        title="خروج از حساب کاربری"
        description="خروج از حساب کاربری"
        triggerElement={children}
        isOpen={open}
        setOpen={setOpen}
        overlyName="profile"
      >
        <div className="flex flex-col items-center gap-4">
          <img src="/assets/images/profile/sad.svg" alt="" />
          <h5 className="font-medium text-center">
            واقعا میخوای از حساب کاربری خودت خارج بشی؟
          </h5>
          <div className="w-full flex justify-center gap-2 px-4 xs:px-16">
            <Button
              className="grow !text-black flex items-center justify-center h-9 "
              onClick={logoutBtnHandler}
            >
              {isPending && <span className="loading"></span> }
              {!isPending && <span>بله</span> }
          
            </Button>
            <DialogClose asChild>
              <Button className="grow !text-black bg-white border border-gray-300">خیر</Button>
            </DialogClose>
          </div>
        </div>
      </CustomizeDialog>
    </>
  );
};
export default Logout;
