import { DialogClose } from "@/presentation/shared/components/shadcn-components/components/ui/dialog";
import Button from "@/presentation/shared/components/custom-components/ui/button";
import { FormElementEvent } from "@/presentation/shared/types";
import { FC, useContext } from "react";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { postUserName } from "@/infrastructure/api/userServices";
import { MainContext } from "@/presentation/shared/context/context";
import { useQueryClient } from "@tanstack/react-query";

interface IPropsComponent {
  user: {
    avatar: string;
    created_at: string;
    id: number;
    name: string;
    phone: string;
    role: string;
    updated_at: string;
  };
  closeDialog : ()=>void;
}
const EditInfo: FC<IPropsComponent> = ({ user,closeDialog }) => {
  const { token } = useContext(MainContext);
  const queryClient = useQueryClient()
  const { mutate, isPending } = useCustomizedMutation(
    ["user-name"],
    postUserName
  );
  const submitFormHandler = (e: FormElementEvent) => {
    e.preventDefault();
    const inputElement = document.getElementById(
      "userName-input"
    ) as HTMLInputElement;
    mutate(
      {
        token,
        data: { name: inputElement.value },
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ['user'] });
          closeDialog()
        },
      }
    );
  };
  return (
    <>
      <div className="flex items-center justify-between  border-b-2 border-gray-400 pb-3">
        <span className="text-[15px] font-bold text-gray-100">
          ثبت اطلاعات شناسایی
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
      <form onSubmit={submitFormHandler}>
        <div className="flex flex-col gap-[6px] my-3">
          <label
            htmlFor="userName-input"
            className="text-sm text-gray-100 font-bold"
          >
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            id="userName-input"
            defaultValue={user.name || ""}
            className="w-full border border-gray-200 rounded py-[6px] px-3 focus:border-accent-400"
          />
        </div>
        <Button
          type="submit"
          className="flex items-center justify-center h-9 w-full text-[15px] mt-6"
        >
          {!isPending && <span>اعمال تغییرات</span>}
          {isPending && <span className="loading"></span>}
        </Button>
      </form>
    </>
  );
};
export default EditInfo;
