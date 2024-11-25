import ShowNotification from "../components/show-notification";
import { useContext } from "react";
import ProfileContext from "../context/context";


const Notification = () => {
  const { notifications, setTypeNotification } = useContext(ProfileContext);

  const inputChangeHandler = ()=>{
    const readInput = document.getElementById("read-notif") as HTMLInputElement;
    const unreadInput = document.getElementById("unread-notif") as HTMLInputElement;

    if((readInput.checked && unreadInput.checked) || (!readInput.checked && !unreadInput.checked)){
      setTypeNotification("")
    }else if(readInput.checked){
      setTypeNotification("read");
    }else if(unreadInput.checked){
      setTypeNotification("unread");
    }
  }

  return (
    <>
      <div className="max-w-full md:max-w-[90%] mx-auto h-[calc(100vh-50px)] bg-accent-200 rounded-xl flex flex-col overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-3 px-3 py-5 border-b border-b-gray-400">
          <div>
            <h2 className="text-xl font-bold mb-2">اعلان های من</h2>
            <p className="text-base">
              اعلان های شما فقط تا 30 روز نگه داری و بعد از آن خودکار حذف خواهد
              شد.
            </p>
          </div>
          <div className="flex flex-col min-[400px]:flex-row-reverse items-end md:items-center gap-2 mt-3 lg:m-0">
            <div className="flex gap-3">
              <div className="flex gap-2 items-center">
              <input type="checkbox" id="read-notif" name="notification"  className="radio-input cursor-pointer" onChange={inputChangeHandler} />
                <label htmlFor="read-notif" className="text-sm font-bold cursor-pointer">
                  خوانده شده ها
                </label>
              </div>

              <div className="flex gap-2 items-center cursor-pointer">
                <input type="checkbox" id="unread-notif" name="notification"  className="radio-input cursor-pointer" onChange={inputChangeHandler} />
                <label htmlFor="unread-notif" className="text-sm font-bold cursor-pointer">
                  خوانده نشده ها
                </label>
              </div>
            </div>

          </div>
        </div>
        <div className="bg-[#cde7f3] grow overflow-y-auto scrollbar-thin ">
          <ShowNotification notifications={notifications} />
        </div>
      </div>
    </>
  );
};

export default Notification;
