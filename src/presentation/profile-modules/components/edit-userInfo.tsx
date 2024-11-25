import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/presentation/shared/components/shadcn-components/components/ui/avatar";
import Dialog from "./dialog";
import { FC, useContext } from "react";
import { InputChangeEvent } from "@/presentation/shared/types";
import { MainContext } from "@/presentation/shared/context/context";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { postUserImage } from "@/infrastructure/api/userServices";
import { useQueryClient } from "@tanstack/react-query";


interface IPropsComponent {
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
  userImage : string;
}

const EditUserInfo: FC<IPropsComponent> = ({ data , userImage }) => {
  const {token} = useContext(MainContext);
  const queryClient = useQueryClient(); 
  const {mutate} = useCustomizedMutation(["user-image"],postUserImage);


  const fileInputHandler = (e:InputChangeEvent)=>{
    const fileInput = e.target as HTMLInputElement;
    const formData = new FormData();
    if(fileInput.files){
      formData.append("avatar",fileInput.files[0]);
      mutate({token,formData},{
        onSuccess : ()=>{
          queryClient.invalidateQueries({ queryKey: ['user-img']});
          queryClient.invalidateQueries({ queryKey: ['notification']});
        }
      })
    }
  }
  return (
    <div className="mx-auto max-w-[500px] bg-primary-500 rounded-xl p-4 py-10 text-white">
      <div className="flex flex-col items-center justify-center gap-3">
        <label
          htmlFor="image-user"
          className="relative rounded-full cursor-pointer after:content-[''] after:absolute after:top-0 after-left-0 after:rounded-full after:w-full after:h-full after:bg-[#797979a1] after:bg-[url('/assets/images/profile/filled-edit.svg')] after:bg-no-repeat after:bg-center after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500"
        >
          <input type="file" id="image-user" hidden onChange={fileInputHandler}/>
          <Avatar className="w-[60px] h-[60px] lg:w-[75px] lg:h-[75px]">
            <AvatarImage className="object-cover" src={userImage} />
            <AvatarFallback>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1205 14.03C12.1005 14.03 12.0705 14.03 12.0505 14.03C12.0205 14.03 11.9805 14.03 11.9505 14.03C9.68047 13.96 7.98047 12.19 7.98047 10.01C7.98047 7.78998 9.79047 5.97998 12.0105 5.97998C14.2305 5.97998 16.0405 7.78998 16.0405 10.01C16.0305 12.2 14.3205 13.96 12.1505 14.03C12.1305 14.03 12.1305 14.03 12.1205 14.03ZM12.0005 7.46998C10.6005 7.46998 9.47047 8.60998 9.47047 9.99998C9.47047 11.37 10.5405 12.48 11.9005 12.53C11.9305 12.52 12.0305 12.52 12.1305 12.53C13.4705 12.46 14.5205 11.36 14.5305 9.99998C14.5305 8.60998 13.4005 7.46998 12.0005 7.46998Z"
                  fill="#797979"
                />
                <path
                  d="M12.0008 23.25C9.31081 23.25 6.74081 22.25 4.75081 20.43C4.57081 20.27 4.49081 20.03 4.51081 19.8C4.64081 18.61 5.38081 17.5 6.61081 16.68C9.59081 14.7 14.4208 14.7 17.3908 16.68C18.6208 17.51 19.3608 18.61 19.4908 19.8C19.5208 20.04 19.4308 20.27 19.2508 20.43C17.2608 22.25 14.6908 23.25 12.0008 23.25ZM6.08081 19.6C7.74081 20.99 9.83081 21.75 12.0008 21.75C14.1708 21.75 16.2608 20.99 17.9208 19.6C17.7408 18.99 17.2608 18.4 16.5508 17.92C14.0908 16.28 9.92081 16.28 7.44081 17.92C6.73081 18.4 6.26081 18.99 6.08081 19.6Z"
                  fill="#797979"
                />
                <path
                  d="M12 23.25C6.07 23.25 1.25 18.43 1.25 12.5C1.25 6.57 6.07 1.75 12 1.75C17.93 1.75 22.75 6.57 22.75 12.5C22.75 18.43 17.93 23.25 12 23.25ZM12 3.25C6.9 3.25 2.75 7.4 2.75 12.5C2.75 17.6 6.9 21.75 12 21.75C17.1 21.75 21.25 17.6 21.25 12.5C21.25 7.4 17.1 3.25 12 3.25Z"
                  fill="#797979"
                />
              </svg>
            </AvatarFallback>
          </Avatar>
        </label>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <span className="flex flex-col gap-1">
          <span className="text-sm font-medium">نام و نام خانوادگی</span>
          <div className="flex items-center bg-white rounded-md ring-1 p-2">
            <span className="grow text-black">{data.user.name || ""}</span>
            <Dialog
              title="edit-info"
              description="edit name and image of user"
              data={data }
            >
              <img
                src="/assets/images/profile/edit.svg"
                alt="edit-icon"
                className="cursor-pointer"
              />
            </Dialog>
          </div>
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-sm font-medium">شماره موبایل</span>
          <div className="flex bg-gray-400 ring-1 ring-gray-300 rounded-md items-center px-2">
            <span className="grow text-gray-200 py-2">
              {data.user.phone || ""}
            </span>
          </div>
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-sm font-medium">رمز عبور</span>
          <div className="flex items-center bg-white rounded-md ring-1 p-2">
            <span className="grow text-black font-bold text-2xl leading-4">
              {data.passwordMessage ? "......." : ""}
            </span>
            <Dialog
              title="edit-password"
              description="edit password"
              data={data}
            >
              <img
                src="/assets/images/profile/edit.svg"
                alt="edit-icon"
                className="cursor-pointer"
              />
            </Dialog>
          </div>
        </span>
      </div>
    </div>
  );
};

export default EditUserInfo;
