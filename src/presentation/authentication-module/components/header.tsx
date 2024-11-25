import { InputChangeEvent } from "@/presentation/shared/types";
import Button from "@/presentation/shared/components/custom-components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Dialog from "./dialog";
import { useContext } from "react";
import { MainContext } from "@/presentation/shared/context/context";
import { useState } from "react";


const Header = () => {
  const [operation, setOperation] = useState("login");
  const { token } = useContext(MainContext);
  const {pathname} = useLocation();
  //If the menu is open in responsive mode, set the overflow property of the body element to hidden.
  const changeInputHandler = (e: InputChangeEvent) => {
    if (e.target.checked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  //Close menu in responsive mode when list item is clicked
  const clickListItemHandler = () => {
    const labelElement = document.getElementById(
      "label-checkbox-input"
    ) as HTMLElement | null;
    if (window.innerWidth < 896) {
      labelElement?.click();
    }
  };
  return (
    <>
      <header className="bg-white relative z-10 container mx-auto p-3 pb-0 sm:px-1">
        <div className="bg-accent-300 rounded-[12px] flex gap-1 items-center justify-between p-3 lg:p-2 lg:relative">
          <input
            type="checkbox"
            id="menu-icon"
            className="peer/menu hidden"
            onChange={changeInputHandler}
          />
          <label
            id="label-checkbox-input"
            htmlFor="menu-icon"
            className="cursor-pointer lg:hidden after:content-[''] after:w-full after:h-screen after:fixed after:top-0 after:left-0 after:pointer-events-none peer-checked/menu:after:pointer-events-auto peer-checked/menu:after:backdrop-blur-xs"
          >
            <img src="/assets/images/header/menu.svg" alt="menu-ion" />
          </label>
          <nav className="flex gap-4 lg:gap-2 flex-col lg:flex-row lg:grow bg-white lg:bg-transparent w-[max(20%,250px)] lg:w-auto h-screen lg:h-auto  fixed lg:static top-0 right-[min(-260px,-21%)] p-2 lg:p-0 shadow-gray-400 shadow-lg lg:shadow-none transition-[right] duration-300 peer-checked/menu:right-0">
            <div className="flex items-center justify-between lg:ml-3">
              <Link to="/" onClick={clickListItemHandler}>
                <img
                  src="/assets/images/Logo.svg"
                  alt="logo"
                  className="w-12 h-12 xl:w-14 xl:h-14 "
                />
              </Link>

              <label htmlFor="menu-icon" className="cursor-pointer lg:hidden">
                <img
                  src="/assets/images/header/close-square.svg"
                  alt="menu-icon"
                  className="w-7 h-7"
                />
              </label>
            </div>
            <input type="checkbox" id="search" className="hidden peer/search" />
            <div className="lg:absolute lg:w-full lg:z-[-1] lg:p-3 lg:top-[20%] lg:right-0 lg:peer-checked/search:top-full lg:transition-[top] duration-300 lg:after:content-[''] lg:after:absolute lg:after:top-0 lg:after:left-0 lg:after:w-full lg:after:h-full lg:after:bg-white lg:after:z-[-1] lg:after:rounded-md before:content-[''] before:w-full before:h-screen before:fixed before:top-0 before:left-0 before:z-[-5] before:pointer-events-none peer-checked/search:before:pointer-events-auto peer-checked/search:before:backdrop-blur-xs">
              <input
                type="text"
                placeholder="جستجو کنید..."
                className="w-full text-sm text-gray-100 border-[0.5px] border-secondary-400 rounded-md bg-[url('/assets/images/header/search.svg')] bg-no-repeat bg-right bg-[length:18px_18px] placeholder:text-gray-300 placeholder:text-xs ps-5 py-[6px] pe-2"
              />
            </div>
            <ul className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
              <li
                className="text-[0px] lg:hidden"
                onClick={clickListItemHandler}
              >
                <span className="inline-flex gap-1 cursor-pointer">
                  <svg
                    className="fill-black lg:fill-white"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 22.75H9C4.59 22.75 3.25 21.41 3.25 17V7C3.25 2.59 4.59 1.25 9 1.25H15C19.41 1.25 20.75 2.59 20.75 7V17C20.75 21.41 19.41 22.75 15 22.75ZM9 2.75C5.42 2.75 4.75 3.43 4.75 7V17C4.75 20.57 5.42 21.25 9 21.25H15C18.58 21.25 19.25 20.57 19.25 17V7C19.25 3.43 18.58 2.75 15 2.75H9Z"
                      fill="inherit"
                    />
                    <path
                      d="M14 6.25H10C9.59 6.25 9.25 5.91 9.25 5.5C9.25 5.09 9.59 4.75 10 4.75H14C14.41 4.75 14.75 5.09 14.75 5.5C14.75 5.91 14.41 6.25 14 6.25Z"
                      fill="inherit"
                    />
                    <path
                      d="M12.0031 19.86C10.7331 19.86 9.70312 18.83 9.70312 17.56C9.70312 16.29 10.7331 15.26 12.0031 15.26C13.2731 15.26 14.3031 16.29 14.3031 17.56C14.3031 18.83 13.2731 19.86 12.0031 19.86ZM12.0031 16.75C11.5631 16.75 11.2031 17.11 11.2031 17.55C11.2031 17.99 11.5631 18.35 12.0031 18.35C12.4431 18.35 12.8031 17.99 12.8031 17.55C12.8031 17.11 12.4431 16.75 12.0031 16.75Z"
                      fill="inherit"
                    />
                  </svg>
                  <span className="text-sm font-medium lg:text-white">
                    دانلود اپلیکیشن سفرکو
                  </span>
                </span>
              </li>
              <li
                className="text-[0px] lg:relative lg:after:content[''] lg:after:absolute lg:after:w-0 lg:after:h-[2px] lg:after:rounded-sm lg:after:bg-secondary-500 lg:after:-bottom-2 lg:after:right-1/2 lg:hover:after:w-full lg:hover:after:right-0 lg:after:transition-all lg:after:duration-300"
                onClick={clickListItemHandler}
              >
                <Link to="/articles" className="inline-flex gap-1">
                  <svg
                    className="fill-black lg:fill-white"
                    width="22"
                    height="22" 
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
                      fill="inherit"
                    />
                    <path
                      d="M22 10.75H18C14.58 10.75 13.25 9.41999 13.25 5.99999V1.99999C13.25 1.69999 13.43 1.41999 13.71 1.30999C13.99 1.18999 14.31 1.25999 14.53 1.46999L22.53 9.46999C22.74 9.67999 22.81 10.01 22.69 10.29C22.57 10.57 22.3 10.75 22 10.75ZM14.75 3.80999V5.99999C14.75 8.57999 15.42 9.24999 18 9.24999H20.19L14.75 3.80999Z"
                      fill="inherit"
                    />
                    <path
                      d="M13 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H13C13.41 12.25 13.75 12.59 13.75 13C13.75 13.41 13.41 13.75 13 13.75Z"
                      fill="inherit"
                    />
                    <path
                      d="M11 17.75H7C6.59 17.75 6.25 17.41 6.25 17C6.25 16.59 6.59 16.25 7 16.25H11C11.41 16.25 11.75 16.59 11.75 17C11.75 17.41 11.41 17.75 11 17.75Z"
                      fill="inherit"
                    />
                  </svg>
                  <span className="text-sm font-medium lg:text-white">
                    مقالات گردشگری
                  </span>
                </Link>
              </li>
              <li
                className="text-[0px] lg:relative lg:after:content[''] lg:after:absolute lg:after:w-0 lg:after:h-[2px] lg:after:rounded-sm lg:after:bg-secondary-500 lg:after:-bottom-2 lg:after:right-1/2 lg:hover:after:w-full lg:hover:after:right-0 lg:after:transition-all lg:after:duration-300"
                onClick={clickListItemHandler}
              >
                <Link to="#" className="inline-flex gap-1">
                  <svg
                    className="fill-black lg:fill-white"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.3775 21.13C20.1775 21.13 19.9875 21.05 19.8475 20.91L13.4675 14.53C13.1775 14.24 13.1775 13.76 13.4675 13.47L21.1975 5.74001C21.3875 5.55001 21.6775 5.48001 21.9375 5.55001C22.1975 5.63001 22.3975 5.84001 22.4575 6.10001C22.6475 6.95001 22.7475 7.90001 22.7475 9.00001V15C22.7475 17.77 22.1675 19.64 20.9075 20.91C20.7675 21.05 20.5575 21.08 20.3775 21.13ZM15.0575 14L20.3175 19.26C20.9475 18.29 21.2475 16.91 21.2475 15V9.00001C21.2475 8.59001 21.2375 8.21001 21.2075 7.85001L15.0575 14Z"
                      fill="inherit"
                    />
                    <path
                      d="M6.26999 22.48C6.20999 22.48 6.16001 22.47 6.10001 22.46C2.79001 21.7 1.25 19.33 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C19.33 1.25 21.7 2.79001 22.46 6.10001C22.52 6.35001 22.44 6.62 22.26 6.8L6.79999 22.26C6.65999 22.4 6.46999 22.48 6.26999 22.48ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 18.47 3.71001 20.21 6.04001 20.9L20.89 6.05C20.21 3.72 18.46 2.75999 14.99 2.75999H9V2.75Z"
                      fill="inherit"
                    />
                    <path
                      d="M14.9965 22.7499H8.99647C7.89647 22.7499 6.95647 22.6599 6.09647 22.4599C5.82647 22.3999 5.61646 22.1999 5.54646 21.9399C5.46646 21.6799 5.54646 21.3999 5.73646 21.1999L13.4665 13.4699C13.7565 13.1799 14.2365 13.1799 14.5265 13.4699L20.9065 19.8499C21.0465 19.9899 21.1265 20.1799 21.1265 20.3799C21.1265 20.5799 21.0465 20.7699 20.9065 20.9099C19.6365 22.1699 17.7665 22.7499 14.9965 22.7499ZM7.84647 21.2099C8.20647 21.2399 8.58647 21.2499 8.99647 21.2499H14.9965C16.9165 21.2499 18.2865 20.9499 19.2565 20.3199L13.9965 15.0599L7.84647 21.2099Z"
                      fill="inherit"
                    />
                    <path
                      d="M9.12287 13.31C8.49287 13.31 7.86286 13.08 7.36286 12.61C5.77286 11.1 5.13289 9.44005 5.51289 7.82005C5.89289 6.16005 7.34287 5.04004 9.12287 5.04004C10.9029 5.04004 12.3529 6.16005 12.7329 7.82005C13.1029 9.45005 12.4629 11.1 10.8729 12.61C10.3829 13.07 9.75287 13.31 9.12287 13.31ZM6.97288 8.15004C6.65288 9.51004 7.57287 10.7301 8.40287 11.5201C8.81287 11.91 9.44287 11.91 9.84287 11.5201C10.6629 10.7401 11.5829 9.52004 11.2729 8.15004C11.0029 6.96004 9.94287 6.53004 9.12287 6.53004C8.30287 6.53004 7.25288 6.96004 6.97288 8.15004Z"
                      fill="inherit"
                    />
                    <path
                      d="M9.14844 9.48999C8.59844 9.48999 8.14844 9.03999 8.14844 8.48999C8.14844 7.93999 8.58844 7.48999 9.14844 7.48999H9.15845C9.70845 7.48999 10.1584 7.93999 10.1584 8.48999C10.1584 9.03999 9.69844 9.48999 9.14844 9.48999Z"
                      fill="inherit"
                    />
                  </svg>
                  <span className="text-sm font-medium lg:text-white">
                    ایران شناسی
                  </span>
                </Link>
              </li>
              <li
                className="text-[0px] lg:relative lg:after:content[''] lg:after:absolute lg:after:w-0 lg:after:h-[2px] lg:after:rounded-sm lg:after:bg-secondary-500 lg:after:-bottom-2 lg:after:right-1/2 lg:hover:after:w-full lg:hover:after:right-0 lg:after:transition-all lg:after:duration-300"
                onClick={clickListItemHandler}
              >
                <Link to="#" className="inline-flex gap-1">
                  <svg
                    className="fill-black lg:fill-white"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z"
                      fill="inherit"
                    />
                    <path
                      d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z"
                      fill="inherit"
                    />
                    <path
                      d="M8.5 14.5001C8.37 14.5001 8.24 14.4801 8.12 14.4201C8 14.3701 7.88999 14.3001 7.78999 14.2101C7.60999 14.0201 7.5 13.7601 7.5 13.5001C7.5 13.3701 7.53 13.2401 7.58 13.1201C7.63 13.0001 7.69999 12.8901 7.78999 12.7901C7.88999 12.7001 8 12.6301 8.12 12.5801C8.48 12.4301 8.93001 12.5101 9.21001 12.7901C9.30001 12.8901 9.37 13.0001 9.42 13.1201C9.47 13.2401 9.5 13.3701 9.5 13.5001C9.5 13.7601 9.39001 14.0201 9.21001 14.2101C9.02001 14.3901 8.76 14.5001 8.5 14.5001Z"
                      fill="inherit"
                    />
                    <path
                      d="M12 14.5C11.74 14.5 11.48 14.39 11.29 14.21C11.2 14.11 11.13 14 11.08 13.88C11.03 13.76 11 13.63 11 13.5C11 13.24 11.11 12.98 11.29 12.79C11.57 12.51 12.01 12.42 12.38 12.58C12.5 12.63 12.61 12.7 12.71 12.79C12.89 12.98 13 13.24 13 13.5C13 13.63 12.98 13.76 12.92 13.88C12.87 14 12.8 14.11 12.71 14.21C12.61 14.3 12.5 14.37 12.38 14.42C12.26 14.48 12.13 14.5 12 14.5Z"
                      fill="inherit"
                    />
                    <path
                      d="M8.5 18C8.37 18 8.24 17.97 8.12 17.92C8 17.87 7.88999 17.8 7.78999 17.71C7.60999 17.52 7.5 17.27 7.5 17C7.5 16.87 7.53 16.74 7.58 16.62C7.63 16.49 7.69999 16.39 7.78999 16.29C7.88999 16.2 8 16.13 8.12 16.08C8.48 15.92 8.93001 16.01 9.21001 16.29C9.30001 16.39 9.37 16.49 9.42 16.62C9.47 16.74 9.5 16.87 9.5 17C9.5 17.27 9.39001 17.52 9.21001 17.71C9.02001 17.89 8.76 18 8.5 18Z"
                      fill="inherit"
                    />
                    <path
                      d="M20.5 9.83997H3.5C3.09 9.83997 2.75 9.49997 2.75 9.08997C2.75 8.67997 3.09 8.33997 3.5 8.33997H20.5C20.91 8.33997 21.25 8.67997 21.25 9.08997C21.25 9.49997 20.91 9.83997 20.5 9.83997Z"
                      fill="inherit"
                    />
                    <path
                      d="M18 23.75C15.38 23.75 13.25 21.62 13.25 19C13.25 16.38 15.38 14.25 18 14.25C20.62 14.25 22.75 16.38 22.75 19C22.75 21.62 20.62 23.75 18 23.75ZM18 15.75C16.21 15.75 14.75 17.21 14.75 19C14.75 20.79 16.21 22.25 18 22.25C19.79 22.25 21.25 20.79 21.25 19C21.25 17.21 19.79 15.75 18 15.75Z"
                      fill="inherit"
                    />
                    <path
                      d="M19.49 19.7999H16.5C16.09 19.7999 15.75 19.4599 15.75 19.0499C15.75 18.6399 16.09 18.2999 16.5 18.2999H19.49C19.9 18.2999 20.24 18.6399 20.24 19.0499C20.24 19.4599 19.91 19.7999 19.49 19.7999Z"
                      fill="inherit"
                    />
                    <path
                      d="M18 21.33C17.59 21.33 17.25 20.99 17.25 20.58V17.59C17.25 17.18 17.59 16.84 18 16.84C18.41 16.84 18.75 17.18 18.75 17.59V20.58C18.75 20.99 18.41 21.33 18 21.33Z"
                      fill="inherit"
                    />
                    <path
                      d="M15.37 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V16.36C21.75 16.67 21.56 16.95 21.26 17.06C20.97 17.17 20.64 17.09 20.43 16.85C19.81 16.15 18.92 15.75 17.99 15.75C16.2 15.75 14.74 17.21 14.74 19C14.74 19.59 14.9 20.17 15.21 20.67C15.38 20.97 15.6 21.22 15.84 21.43C16.08 21.63 16.17 21.96 16.06 22.26C15.97 22.55 15.69 22.75 15.37 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H13.82C13.45 20.57 13.25 19.8 13.25 19C13.25 16.38 15.38 14.25 18 14.25C18.79 14.25 19.57 14.45 20.25 14.82V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z"
                      fill="inherit"
                    />
                  </svg>
                  <span className="text-sm font-medium lg:text-white">
                    برنامه ریزی سفر
                  </span>
                </Link>
              </li>
              <li
                className="text-[0px] lg:relative lg:after:content[''] lg:after:absolute lg:after:w-0 lg:after:h-[2px] lg:after:rounded-sm lg:after:bg-secondary-500 lg:after:-bottom-2 lg:after:right-1/2 lg:hover:after:w-full lg:hover:after:right-0 lg:after:transition-all lg:after:duration-300"
                onClick={clickListItemHandler}
              >
                <Link to="#" className="inline-flex gap-1">
                  <svg
                    className="fill-black lg:fill-white"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 14.75H6.2C2.78 14.75 1.25 13.22 1.25 9.80005V6.19995C1.25 2.77995 2.78 1.25 6.2 1.25H9.8C13.22 1.25 14.75 2.77995 14.75 6.19995V10C14.75 10.41 14.42 10.74 14.01 10.75C11.61 10.79 10.79 11.62 10.75 14.01C10.74 14.42 10.41 14.75 10 14.75ZM6.2 2.75C3.62 2.75 2.75 3.61995 2.75 6.19995V9.80005C2.75 12.38 3.62 13.25 6.2 13.25H9.29C9.53 10.81 10.81 9.54004 13.25 9.29004V6.19995C13.25 3.61995 12.38 2.75 9.8 2.75H6.2Z"
                      fill="inherit"
                    />
                    <path
                      d="M5.20147 6.63002C4.97147 6.63002 4.73147 6.52007 4.59147 6.31007C4.35147 5.97007 4.43147 5.50002 4.77147 5.26002C5.55147 4.71002 6.60147 4.7 7.39147 5.24C7.73147 5.47 7.82147 5.94004 7.59147 6.28004C7.36147 6.62004 6.89147 6.70999 6.55147 6.47999C6.28147 6.29999 5.92147 6.3 5.65147 6.49C5.50147 6.59 5.35147 6.63002 5.20147 6.63002Z"
                      fill="inherit"
                    />
                    <path
                      d="M9.20147 6.63002C8.97147 6.63002 8.73147 6.52007 8.59147 6.31007C8.35147 5.97007 8.43147 5.50002 8.77147 5.26002C9.55147 4.71002 10.6015 4.7 11.3915 5.24C11.7315 5.47 11.8215 5.94004 11.5915 6.28004C11.3615 6.62004 10.8915 6.70999 10.5515 6.47999C10.2815 6.29999 9.92147 6.3 9.65147 6.49C9.50147 6.59 9.35147 6.63002 9.20147 6.63002Z"
                      fill="inherit"
                    />
                    <path
                      d="M8.15688 12.17H5.83688C5.12688 12.17 4.54688 11.59 4.54688 10.88C4.54688 8.98 6.09688 7.43005 7.99688 7.43005C8.77688 7.43005 9.54688 7.69994 10.1569 8.18994C10.4769 8.44994 10.5369 8.91999 10.2769 9.23999C10.0169 9.55999 9.54688 9.60999 9.22688 9.35999C8.87688 9.07999 8.45687 8.93005 8.00687 8.93005C7.00687 8.93005 6.17688 9.69004 6.06688 10.67H8.16687C8.57687 10.67 8.91687 11.01 8.91687 11.42C8.91687 11.83 8.56688 12.17 8.15688 12.17Z"
                      fill="inherit"
                    />
                    <path
                      d="M17.8 22.75H14.2C10.78 22.75 9.25 21.22 9.25 17.8V14C9.31 10.81 10.81 9.31 13.99 9.25H17.8C21.22 9.25 22.75 10.78 22.75 14.2V17.8C22.75 21.22 21.22 22.75 17.8 22.75ZM14 10.75C11.62 10.79 10.79 11.62 10.75 14.01V17.8C10.75 20.38 11.62 21.25 14.2 21.25H17.8C20.38 21.25 21.25 20.38 21.25 17.8V14.2C21.25 11.62 20.38 10.75 17.8 10.75H14Z"
                      fill="inherit"
                    />
                    <path
                      d="M14.0915 14.63C13.6215 14.63 13.1615 14.49 12.7715 14.21C12.4315 13.97 12.3515 13.5001 12.5915 13.1601C12.8315 12.8201 13.3015 12.74 13.6415 12.98C13.9115 13.17 14.2715 13.17 14.5415 12.99C14.8815 12.76 15.3515 12.84 15.5815 13.19C15.8115 13.53 15.7315 14 15.3815 14.23C14.9915 14.5 14.5415 14.63 14.0915 14.63Z"
                      fill="inherit"
                    />
                    <path
                      d="M18.0915 14.63C17.6215 14.63 17.1615 14.49 16.7715 14.21C16.4315 13.97 16.3515 13.5001 16.5915 13.1601C16.8315 12.8201 17.3015 12.74 17.6415 12.98C17.9115 13.17 18.2715 13.17 18.5415 12.99C18.8815 12.76 19.3515 12.84 19.5815 13.19C19.8115 13.53 19.7315 14 19.3815 14.23C18.9915 14.5 18.5415 14.63 18.0915 14.63Z"
                      fill="inherit"
                    />
                    <path
                      d="M15.9969 20.17C14.0969 20.17 12.5469 18.62 12.5469 16.72C12.5469 16.01 13.1269 15.4301 13.8369 15.4301H18.1569C18.8669 15.4301 19.4469 16.01 19.4469 16.72C19.4469 18.62 17.8969 20.17 15.9969 20.17ZM14.0569 16.9301C14.1569 17.9101 14.9869 18.67 15.9969 18.67C17.0069 18.67 17.8269 17.9101 17.9369 16.9301H14.0569Z"
                      fill="inherit"
                    />
                  </svg>
                  <span className="text-sm font-medium lg:text-white">
                    تجربه های سفر
                  </span>
                </Link>
              </li>
              <li
                className="text-[0px] hidden lg:block  lg:relative lg:after:content[''] lg:after:absolute lg:after:w-0 lg:after:h-[2px] lg:after:rounded-sm lg:after:bg-secondary-500 lg:after:-bottom-2 lg:after:right-1/2 lg:hover:after:w-full lg:hover:after:right-0 lg:after:transition-all lg:after:duration-300"
                onClick={clickListItemHandler}
              >
                <label
                  htmlFor="search"
                  className="inline-flex gap-1 cursor-pointer"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Interface / Search_Magnifying_Glass">
                      <path
                        id="Vector"
                        d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  <span className="text-sm font-medium lg:text-white">
                    جستجو
                  </span>
                </label>
              </li>
            </ul>
          </nav>
          <div className="flex gap-1 items-start">
            {(token && operation!=="change-password") ? (
              !pathname.includes("/profile") && <Link to="/profile" className="bg-secondary-500 text-white text-[12px] p-2 rounded-[8px] flex gap-1">
                <img src="/assets/images/header/user.svg" alt="user" />
                <span>
                  پروفایل
                </span>
              </Link>
            ) : (
              <Dialog operation={operation} setOperation={setOperation}>
                <Button variant="contained">ورود | ثبت نام</Button>
              </Dialog>
            )}
            <Button variant="contained" className="hidden lg:block">
              دانلود اپلیکیشن
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
