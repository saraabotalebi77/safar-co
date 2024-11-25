import { Outlet } from "react-router-dom";
import { useState } from "react";
import { InputChangeEvent } from "@/presentation/shared/types";
import Menu from "../components/menu";
import ProfileContext from "../context/context";
import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";
import { getUser, getUserImage } from "@/infrastructure/api/userServices";
import { useContext } from "react";
import { MainContext } from "@/presentation/shared/context/context";
import { getNotification } from "@/infrastructure/api/notificationServices";

const Profile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [typeNotification,setTypeNotification] = useState("");
  const { token } = useContext(MainContext);

  const { data: user } = useCustomizedQuery(
    ["user"],
    () => getUser({ token })
  );

  const { data: userImage } = useCustomizedQuery(
    ["user-img"],
    () => getUserImage({ token })
  );

  const { data: notification } = useCustomizedQuery(
    ["notification", token,typeNotification],
    () => getNotification({ token,typeNotification }),
    {
      staleTime: 1000 * 60 * 3,
    }
  );


  //the number of unread notification
  const unreadNotificationsCount =
    notification && notification.data && notification.data.filter((notif) => !notif.read_at).length;

  const activateMenu = (e: InputChangeEvent) => {
    if (e.target.checked) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        userImage,
        notifications: notification ? notification.data : [],
        unreadNotificationsCount: unreadNotificationsCount
          ? unreadNotificationsCount
          : 0,
        setTypeNotification,
      }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <Menu
          openMenu={openMenu}
          activateMenu={activateMenu}
          userName={user?.data?.user?.name || ""}
          userImage={userImage?.data || ""}
        />
        <div
          className={`w-full transition-[width] duration-500 mt-5 md:m-0 ${
            openMenu ? "md:w-[calc(100%-250px)]" : "md:w-[calc(100%-70px)]"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default Profile;
