import AddNewTicket from "../components/add-new-ticket";
import { Link } from "react-router-dom";
export default function AddTicket() {
  return (
    <div className="max-w-full md:max-w-[90%] mx-auto flex flex-col bg-accent-200 rounded-xl ">
      <div className="flex flex-col gap-3 px-3 py-5 border-b border-b-gray-400">
        <div className="flex justify-between gap-3">
          <h2 className="font-bold mb-2">ایجاد تیکت</h2>
          <Link to="/profile/tickets">
            <img src="/assets/images/profile/left-arrow.svg" className="w-7" />
          </Link>
        </div>
        <div className="text-sm">
          <p>تیکت های ارسالی شما در اسرع وقت پاسخ داده خواهد شد.</p>
          <p>
            ساعت پاسخگویی شنبه تا پنجشنبه از ساعت ۹ صبح الی ۹شب خواهد بود.(به
            غیر از روزهای تعطیل رسمی)
          </p>
        </div>
      </div>
      <AddNewTicket />
    </div>
  );
}
