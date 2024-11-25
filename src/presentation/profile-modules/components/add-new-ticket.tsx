import { createTicket } from "@/infrastructure/api/ticketServices";
import Button from "@/presentation/shared/components/custom-components/ui/button";
import { MainContext } from "@/presentation/shared/context/context";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { FormElementEvent } from "@/presentation/shared/types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNewTicket() {
  const {token} = useContext(MainContext);
  const navigate = useNavigate();
  const [newTicket, setNewTicket] = useState({
    title: "",
    message: "",
    priority: "",
  });

  const {mutate,isPending} = useCustomizedMutation([],createTicket)

  const changeInputHandler = (key: string, value:string) => {
    setNewTicket({
      ...newTicket,
      [key]: value,
    });
  };
  const submitFormHandler = (e:FormElementEvent)=>{
    e.preventDefault();
    mutate({
      token,
      data :{
        ...newTicket,
      }
    },{
      onSuccess : ()=>{
        navigate("/profile/tickets");
      }
    })
  }

  return (
    <form className="group p-4 py-8 flex flex-col gap-4" onSubmit={submitFormHandler}>
      <div className="flex gap-2">
        <div className="grow flex flex-col gap-1">
          <label htmlFor="title-ticket">عنوان تیکت</label>
          <input
            type="text"
            placeholder="عنوان"
            className="rounded-lg p-2 text-gray-100 border border-gray-300 ring-1 ring-gray-300 focus:border-accent-300 focus:ring-accent-300 placeholder:text-gray-200 invalid:[&:not(:placeholder-shown)]:border-error invalid:[&:not(:placeholder-shown)]:ring-error" 
            onChange={(e) => changeInputHandler("title", e.target.value)}
            pattern=".{5,}"
            required
          />
        </div>
        <div className="grow flex flex-col gap-1">
          <label htmlFor="countries" className="text-sm text-gray-900">
            اولویت
          </label>
          <select
            id="countries"
            className="outline-none rounded-lg w-full p-2 text-gray-100 border border-gray-300 ring-1 ring-gray-300 focus:border-accent-300 focus:ring-accent-300"
            value={0}
            onChange={(e) => changeInputHandler("priority", e.target.value)}
          >
            <option value={0} disabled>
              کم ، زیاد ، متوسط؟
            </option>
            <option value="low">کم</option>
            <option value="high">زیاد</option>
            <option value="medium">متوسط</option>
          </select>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="text">توضیحات</label>
        <textarea
          id="text"
          placeholder="توضیحات"
          className="w-full h-48 resize-none outline-none text-sm rounded-lg p-2 border border-gray-300 ring-1 ring-gray-300 focus:border-accent-300 focus:ring-accent-300 placeholder:text-gray-200"
          onChange={(e) => changeInputHandler("message", e.target.value)}
        ></textarea>
      </div>
      <Button
          type="submit"
          className="flex items-center justify-center self-end h-9 w-28 text-base mt-7 !bg-accent-400 group-invalid:pointer-events-none group-invalid:opacity-40 transition-opacity duration-300"
        >
          {!isPending && <span>ارسال تیکت</span>}
          {isPending && <span className="loading"></span>}
        </Button>
    </form>
  );
}
