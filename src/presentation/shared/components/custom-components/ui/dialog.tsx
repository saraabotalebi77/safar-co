import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogOverlay,
} from "@/presentation/shared/components/shadcn-components/components/ui/dialog";
import { FC, ReactNode } from "react";

type PropsDialog = {
  children: ReactNode;
  title: string;
  description: string;
  triggerElement: ReactNode;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeDialog?: () => void;
  overlyName: string;
};

const CustomizeDialog: FC<PropsDialog> = ({
  children,
  title,
  description,
  triggerElement,
  isOpen,
  setOpen,
  closeDialog,
  overlyName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogOverlay
        onClick={(e) => {
          const overlyElement = e.target as HTMLElement;
          if (closeDialog && document.getElementById(overlyName) && overlyElement.classList.contains("overly")) {
            closeDialog();
          }
        }}
      >
        <DialogContent
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <span
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                margin: "-1px",
                padding: "0",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: "0",
              }}
            >
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </span>
          </DialogHeader>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
export default CustomizeDialog;
