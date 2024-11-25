import ShowTickets from "../components/show-tickets";
import { Link } from "react-router-dom";
import { getAllTickets } from "@/infrastructure/api/ticketServices";
import { MainContext } from "@/presentation/shared/context/context";
import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";
import { useContext } from "react";

export function Tickets() {
  const { token } = useContext(MainContext);
  const { data: tickets } = useCustomizedQuery(
    ["all-tickets", token],
    () => getAllTickets({ token }),
    {
      staleTime: 1000 * 60 * 2,
    }
  );

  return (
    <div className="max-w-full md:max-w-[90%] mx-auto h-[calc(100vh-50px)] flex flex-col bg-accent-200 rounded-xl ">
      <div className="flex flex-col gap-8 md:gap-5 px-3 py-5 border-b border-b-gray-400">
        <div className="flex flex-col lg:flex-row justify-between gap-3 ">
          <div className="">
            <h2 className="text-xl font-bold mb-2">تیکت های من</h2>
            <span className="text-base">
              تیکت های ارسالی شما در اسرع وقت پاسخ داده خواهد شد، ساعت پاسخگویی
              شنبه تا پنجشنبه از ساعت ۹ صبح الی ۹شب خواهد بود.(به غیر از روزهای
              تعطیل رسمی)
            </span>
          </div>
          
        </div>
        <Link
          to="/profile/add-ticket"
          className="self-end inline-flex gap-1 bg-secondary-400 text-white rounded-sm p-2"
        >
          <img src="/assets/images/profile/add-circle-white.svg" className="w-5" />
          <span className="text-sm font-bold">تیکت جدید</span>
        </Link>
      </div>
      <ShowTickets tickets={tickets?.data ? tickets.data :[]}/>
    </div>
  );
}

export default Tickets;
