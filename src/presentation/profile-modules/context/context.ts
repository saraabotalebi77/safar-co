import { setState } from "@/presentation/shared/types";
import { createContext } from "react";
interface INotif {
  data: { message: string };
  id: string;
  read_at: null | string;
};


interface IProfileContext {
  user: undefined |  {
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
  userImage: undefined | {
    data: string;
  };
  notifications : INotif[];
  unreadNotificationsCount : number;
  setTypeNotification : setState<string>
}

const ProfileContext = createContext({} as IProfileContext);

export default ProfileContext;
