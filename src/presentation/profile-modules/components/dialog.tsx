import CustomizeDialog from "@/presentation/shared/components/custom-components/ui/dialog";
import { ReactNode, FC, useState } from "react";
import EditPassword from "./edit-password";
import EditInfo from "./edit-info";

type PropsDialog = {
  children: ReactNode;
  title: string;
  description?: string;
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
};

const Dialog: FC<PropsDialog> = ({ children, title, data }) => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <CustomizeDialog
      title="ویرایش پروفایل"
      description="ویرایش پروفایل"
      triggerElement={children}
      isOpen={open}
      setOpen={setOpen}
      closeDialog={closeDialog}
      overlyName="profile"
    >
      <div id="profile">
        {title == "edit-password" ? (
          <EditPassword
            passwordMessage={data.passwordMessage}
            closeDialog={closeDialog}
          />
        ) : (
          <EditInfo user={data.user} closeDialog={closeDialog} />
        )}
      </div>
    </CustomizeDialog>
  );
};
export default Dialog;
