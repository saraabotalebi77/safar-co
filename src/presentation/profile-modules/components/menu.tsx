import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { InputChangeEvent } from "@/presentation/shared/types";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/presentation/shared/components/shadcn-components/components/ui/avatar";
import Logout from "./logout";
import ProfileContext from "../context/context";

type PropsMenu = {
  openMenu: boolean;
  activateMenu: (e: InputChangeEvent) => void;
  userName: string;
  userImage: string;
};

const Menu: FC<PropsMenu> = ({
  openMenu,
  activateMenu,
  userName,
  userImage,
}) => {
  const { unreadNotificationsCount } = useContext(ProfileContext);

  return (
    <>
      <input type="checkbox" id="profile-menu" hidden onChange={activateMenu} />
      <div
        className={`inline-flex flex-col items-center gap-2 bg-white w-5/6 ${
          openMenu ? "md:w-[250px]" : "md:w-[70px]"
        } transition-[width] duration-500 p-[6px] rounded-lg shadow-md md:overflow-hidden`}
      >
        <div className="hidden w-[56px] ml-auto my-5 md:flex justify-center">
          <label htmlFor="profile-menu" className="profile--hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <Avatar className="hidden md:block w-[55px] h-[55px]">
          <AvatarImage className="object-cover" src={userImage} />
          <AvatarFallback>
            <svg
              width="80%"
              height="80%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                fill="#797979"
              />
            </svg>
          </AvatarFallback>
        </Avatar>
        <span
          className={`hidden md:block relative w-[200px] text-center text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-[right] duration-500 ${
            openMenu ? "right-0" : "right-[-150px]"
          }`}
        >
          {userName}
        </span>

        <ul className="flex bg-white w-full justify-between items-center md:items-stretch md:flex-col md:gap-2 md:mt-6 md:overflow-hidden">
          <li>
            <NavLink
              to="/profile"
              end
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "active-profileLink group/first-link flex relative rounded-lg hover:bg-[#e8f8ff] transition-colors duration-300"
                  : "group/first-link flex relative rounded-lg bg-gray-400 md:bg-white text-gray-100 hover:bg-[#e8f8ff] transition-colors duration-300"
              }
            >
              <span
                className={`text-[inherit] absolute left-1/2 md:left-0 top-1/3 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 whitespace-nowrap text-xs md:text-sm font-medium opacity-0 transition-all md:transition-[right] duration-500 md:duration-500 group-hover/first-link:opacity-100 group-hover/first-link:-top-3  md:opacity-100 md:top-1/2 md:group-hover/first-link:top-1/2
                  ${openMenu ? "md:right-[58px]" : "md:right-[-100%]"}`}
              >
                ویرایش پروفایل
              </span>
              <span className="flex justify-center py-1 md:py-2 w-[38px] md:w-[56px] relative z-[1] bg-[inherit] rounded-lg">
                <svg
                  width="24"
                  height="25"
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
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/notification"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "active-profileLink group/second-link flex relative rounded-lg hover:bg-[#e8f8ff] transition-colors duration-300 relative"
                  : "group/second-link flex relative rounded-lg bg-gray-400 md:bg-white text-gray-100 hover:bg-[#e8f8ff] transition-colors duration-300 relative"
              }
            >
              <span
                className={`text-[inherit] absolute left-1/2 md:left-0 top-1/3 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 whitespace-nowrap text-xs md:text-sm font-medium opacity-0 transition-all md:transition-[right] duration-500 md:duration-500 group-hover/second-link:opacity-100 group-hover/second-link:-top-3  md:opacity-100 md:top-1/2 md:group-hover/second-link:top-1/2 
                ${openMenu ? "md:right-[58px]" : "md:right-[-100%]"}`}
              >
                اعلان ها
              </span>
              <span className="flex justify-center py-1 md:py-2 w-[38px] md:w-[56px] relative z-[1] bg-[inherit] rounded-lg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0199 20.53C9.68987 20.53 7.35987 20.16 5.14987 19.42C4.30987 19.13 3.66987 18.54 3.38987 17.77C3.09987 17 3.19987 16.15 3.65987 15.39L4.80987 13.48C5.04987 13.08 5.26987 12.28 5.26987 11.81V8.91998C5.26987 5.19998 8.29987 2.16998 12.0199 2.16998C15.7399 2.16998 18.7699 5.19998 18.7699 8.91998V11.81C18.7699 12.27 18.9899 13.08 19.2299 13.49L20.3699 15.39C20.7999 16.11 20.8799 16.98 20.5899 17.77C20.2999 18.56 19.6699 19.16 18.8799 19.42C16.6799 20.16 14.3499 20.53 12.0199 20.53ZM12.0199 3.66998C9.12987 3.66998 6.76987 6.01998 6.76987 8.91998V11.81C6.76987 12.54 6.46987 13.62 6.09987 14.25L4.94987 16.16C4.72987 16.53 4.66987 16.92 4.79987 17.25C4.91987 17.59 5.21987 17.85 5.62987 17.99C9.80987 19.39 14.2399 19.39 18.4199 17.99C18.7799 17.87 19.0599 17.6 19.1899 17.24C19.3199 16.88 19.2899 16.49 19.0899 16.16L17.9399 14.25C17.5599 13.6 17.2699 12.53 17.2699 11.8V8.91998C17.2699 6.01998 14.9199 3.66998 12.0199 3.66998Z"
                    fill="#797979"
                  />
                  <path
                    d="M13.8806 3.93999C13.8106 3.93999 13.7406 3.92999 13.6706 3.90999C13.3806 3.82999 13.1006 3.76999 12.8306 3.72999C11.9806 3.61999 11.1606 3.67999 10.3906 3.90999C10.1106 3.99999 9.8106 3.90999 9.6206 3.69999C9.4306 3.48999 9.3706 3.18999 9.4806 2.91999C9.8906 1.86999 10.8906 1.17999 12.0306 1.17999C13.1706 1.17999 14.1706 1.85999 14.5806 2.91999C14.6806 3.18999 14.6306 3.48999 14.4406 3.69999C14.2906 3.85999 14.0806 3.93999 13.8806 3.93999Z"
                    fill="#797979"
                  />
                  <path
                    d="M12.0195 22.81C11.0295 22.81 10.0695 22.41 9.36953 21.71C8.66953 21.01 8.26953 20.05 8.26953 19.06H9.76953C9.76953 19.65 10.0095 20.23 10.4295 20.65C10.8495 21.07 11.4295 21.31 12.0195 21.31C13.2595 21.31 14.2695 20.3 14.2695 19.06H15.7695C15.7695 21.13 14.0895 22.81 12.0195 22.81Z"
                    fill="#797979"
                  />
                </svg>
              </span>
              {unreadNotificationsCount ? (
                <span className="unread-notif w-4 h-4 bg-[#1eb5ff] text-white absolute z-10 right-[15px] top-[5px] rounded-full text-xs  transition-colors duration-300 flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              ) : ""}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/tickets"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "active-profileLink group/third-link flex relative rounded-lg hover:bg-[#e8f8ff] transition-colors duration-300"
                  : "group/third-link flex relative rounded-lg bg-gray-400 md:bg-white text-gray-100 hover:bg-[#e8f8ff] transition-colors duration-300"
              }
            >
              <span
                className={`text-[inherit] absolute left-1/2 md:left-0 top-1/3 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 whitespace-nowrap text-xs md:text-sm font-medium opacity-0 transition-all md:transition-[right] duration-500 md:duration-500 group-hover/third-link:opacity-100 group-hover/third-link:-top-3  md:opacity-100 md:top-1/2 md:group-hover/third-link:top-1/2 
                  ${openMenu ? "md:right-[58px]" : "md:right-[-100%]"}`}
              >
                تیکت ها
              </span>
              <span className="flex justify-center py-1 md:py-2 w-[38px] md:w-[56px] relative z-[1] bg-[inherit] rounded-lg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 20.75H7C2.59 20.75 1.25 19.41 1.25 15V14.5C1.25 14.09 1.59 13.75 2 13.75C2.96 13.75 3.75 12.96 3.75 12C3.75 11.04 2.96 10.25 2 10.25C1.59 10.25 1.25 9.91 1.25 9.5V9C1.25 4.59 2.59 3.25 7 3.25H17C21.41 3.25 22.75 4.59 22.75 9V10C22.75 10.41 22.41 10.75 22 10.75C21.04 10.75 20.25 11.54 20.25 12.5C20.25 13.46 21.04 14.25 22 14.25C22.41 14.25 22.75 14.59 22.75 15C22.75 19.41 21.41 20.75 17 20.75ZM2.75 15.16C2.77 18.6 3.48 19.25 7 19.25H17C20.34 19.25 21.15 18.66 21.24 15.66C19.81 15.32 18.75 14.03 18.75 12.5C18.75 10.97 19.82 9.68 21.25 9.34V9C21.25 5.43 20.58 4.75 17 4.75H7C3.48 4.75 2.77 5.4 2.75 8.84C4.18 9.18 5.25 10.47 5.25 12C5.25 13.53 4.18 14.82 2.75 15.16Z"
                    fill="#797979"
                  />
                  <path
                    d="M10 7.25C9.59 7.25 9.25 6.91 9.25 6.5V4C9.25 3.59 9.59 3.25 10 3.25C10.41 3.25 10.75 3.59 10.75 4V6.5C10.75 6.91 10.41 7.25 10 7.25Z"
                    fill="#797979"
                  />
                  <path
                    d="M10 14.58C9.59 14.58 9.25 14.24 9.25 13.83V10.16C9.25 9.75003 9.59 9.41003 10 9.41003C10.41 9.41003 10.75 9.75003 10.75 10.16V13.83C10.75 14.25 10.41 14.58 10 14.58Z"
                    fill="#797979"
                  />
                  <path
                    d="M10 20.75C9.59 20.75 9.25 20.41 9.25 20V17.5C9.25 17.09 9.59 16.75 10 16.75C10.41 16.75 10.75 17.09 10.75 17.5V20C10.75 20.41 10.41 20.75 10 20.75Z"
                    fill="#797979"
                  />
                </svg>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/articles"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "active-profileLink group/third-link flex relative rounded-lg hover:bg-[#e8f8ff] transition-colors duration-300"
                  : "group/third-link flex relative rounded-lg bg-gray-400 md:bg-white text-gray-100 hover:bg-[#e8f8ff] transition-colors duration-300"
              }
            >
              <span
                className={`text-[inherit] absolute left-1/2 md:left-0 top-1/3 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 whitespace-nowrap text-xs md:text-sm font-medium opacity-0 transition-all md:transition-[right] duration-500 md:duration-500 group-hover/third-link:opacity-100 group-hover/third-link:-top-3  md:opacity-100 md:top-1/2 md:group-hover/third-link:top-1/2 
                  ${openMenu ? "md:right-[58px]" : "md:right-[-100%]"}`}
              >
                افزودن مقاله
              </span>
              <span className="flex justify-center py-1 md:py-2 w-[38px] md:w-[56px] relative z-[1] bg-[inherit] rounded-lg">
                <svg
                  fill="#797979"
                  width="24px"
                  height="24px"
                  version="1.1"
                  id="_x31_"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 128"
                >
                  <g>
                    <rect
                      x="29.6"
                      y="25.8"
                      width="28.8"
                      height="34.6"
                      fill="#797979"
                    />
                    <rect
                      x="69.9"
                      y="25.8"
                      width="23"
                      height="5.8"
                      fill="#797979"
                    />
                    <rect
                      x="69.9"
                      y="54.6"
                      width="23"
                      height="5.8"
                      fill="#797979"
                    />
                    <rect
                      x="69.9"
                      y="40.2"
                      width="23"
                      height="5.8"
                      fill="#797979"
                    />
                    <rect
                      x="29.6"
                      y="69.2"
                      width="63.4"
                      height="5.8"
                      fill="#797979"
                    />
                    <rect
                      x="29.6"
                      y="97.3"
                      width="63.4"
                      height="5.8"
                      fill="#797979"
                    />
                    <rect
                      x="29.6"
                      y="82.9"
                      width="63.4"
                      height="5.8"
                      fill="#797979"
                    />
                    <path d="M15.2,7.3V123H109V7.3H15.2z M103.2,117.2H20.9V13.1h82.3V117.2z" />
                  </g>
                </svg>
              </span>
            </NavLink>
          </li>
          <Logout>
            <li>
              <span className="group/forth-link flex relative cursor-pointer rounded-lg bg-gray-400 md:bg-white text-gray-100 hover:bg-[#e8f8ff] transition-colors duration-300">
                <span
                  className={`text-[inherit] absolute left-1/2 md:left-0 top-1/3 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 whitespace-nowrap text-xs md:text-sm font-medium opacity-0 transition-all md:transition-[right] duration-500 md:duration-500 group-hover/forth-link:opacity-100 group-hover/forth-link:-top-3  md:opacity-100 md:top-1/2 md:group-hover/forth-link:top-1/2 
                  ${openMenu ? "md:right-[58px]" : "md:right-[-200%]"}`}
                >
                  خروج از حساب کاربری
                </span>
                <span className="flex justify-center py-1 md:py-2 w-[38px] md:w-[56px] relative z-[1] bg-[inherit]  rounded-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2405 22.27H15.1105C10.6705 22.27 8.5305 20.52 8.1605 16.6C8.1205 16.19 8.4205 15.82 8.8405 15.78C9.2405 15.74 9.6205 16.05 9.6605 16.46C9.9505 19.6 11.4305 20.77 15.1205 20.77H15.2505C19.3205 20.77 20.7605 19.33 20.7605 15.26V8.73998C20.7605 4.66998 19.3205 3.22998 15.2505 3.22998H15.1205C11.4105 3.22998 9.9305 4.41998 9.6605 7.61998C9.6105 8.02998 9.2605 8.33998 8.8405 8.29998C8.4205 8.26998 8.1205 7.89998 8.1505 7.48998C8.4905 3.50998 10.6405 1.72998 15.1105 1.72998H15.2405C20.1505 1.72998 22.2505 3.82998 22.2505 8.73998V15.26C22.2505 20.17 20.1505 22.27 15.2405 22.27Z"
                      fill="#797979"
                    />
                    <path
                      d="M15.0011 12.75H3.62109C3.21109 12.75 2.87109 12.41 2.87109 12C2.87109 11.59 3.21109 11.25 3.62109 11.25H15.0011C15.4111 11.25 15.7511 11.59 15.7511 12C15.7511 12.41 15.4111 12.75 15.0011 12.75Z"
                      fill="#797979"
                    />
                    <path
                      d="M5.85141 16.1C5.66141 16.1 5.47141 16.03 5.32141 15.88L1.97141 12.53C1.68141 12.24 1.68141 11.76 1.97141 11.47L5.32141 8.11997C5.61141 7.82997 6.09141 7.82997 6.38141 8.11997C6.67141 8.40997 6.67141 8.88997 6.38141 9.17997L3.56141 12L6.38141 14.82C6.67141 15.11 6.67141 15.59 6.38141 15.88C6.24141 16.03 6.04141 16.1 5.85141 16.1Z"
                      fill="#797979"
                    />
                  </svg>
                </span>
              </span>
            </li>
          </Logout>
        </ul>
      </div>
    </>
  );
};

export default Menu;
