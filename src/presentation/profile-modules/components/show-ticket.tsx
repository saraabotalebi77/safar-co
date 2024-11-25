import { formatTime } from "@/presentation/shared/utils/date";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FormElementEvent } from "@/presentation/shared/types";
import { MainContext } from "@/presentation/shared/context/context";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { sendMessage } from "@/infrastructure/api/ticketServices";
import { useQueryClient } from "@tanstack/react-query";

interface ITicket {
  created_at: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}

interface TicketConversation {
  content: string;
  created_at: string;
  sender_type: string;
}

interface IPropsComponent {
  ticket: {
    conversations: TicketConversation[];
    ticket: ITicket;
    user: {
      name: string;
      avatar: string;
    };
  };
}

const showDate = (isoDateString: string) => {
  const dateObject = new Date(isoDateString);
  const persianYear = dateObject.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
  return persianYear;
};

const ShowTicket: FC<IPropsComponent> = ({ ticket }) => {
  const [content, setContent] = useState("");
  const { token } = useContext(MainContext);
  const queryClient = useQueryClient();
  const { mutate } = useCustomizedMutation(["add-message"], sendMessage);

  const submitHandler = (e: FormElementEvent) => {
    e.preventDefault();
    if (!content) return;
    mutate(
      {
        token,
        data: {
          ticket_id: ticket.ticket.id,
          content,
        },
      },
      {
        onSuccess: () => {
          setContent("");
          queryClient.refetchQueries({ queryKey: ["ticket"] });
        },
      }
    );
  };

  return (
    <div className="max-w-full md:max-w-[90%] mx-auto h-[calc(100vh-50px)] flex flex-col bg-accent-200 rounded-xl overflow-hidden">
      <div className="flex flex-col gap-3 px-3 py-5 border-b border-b-gray-400">
        <div className="flex justify-between gap-3">
          <h2 className="font-bold mb-2">{ticket.ticket.title || ""}</h2>
          <Link to="/profile/tickets">
            <img src="/assets/images/profile/left-arrow.svg" className="w-7" />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-3 text-sm">
          <span>
            <span className="font-bold">وضعیت : </span>
            <span>
              {ticket.ticket.status == "open" ? "در حال بررسی" : "بسته شده"}
            </span>
          </span>
          <span>
            <span className="font-bold">تاریخ ارسال : </span>
            <span>{showDate(ticket.ticket.created_at)}</span>
          </span>
          <span>
            <span className="font-bold">شماره تیکت : </span>
            <span>{ticket.ticket.id}</span>
          </span>
        </div>
      </div>

      <div className="grow flex flex-col gap-4 overflow-auto scrollbar-thin px-3 py-5">
        {ticket.conversations.map((converse, index) => (
          <div
            key={index}
            className={`${
              converse.sender_type == "user" ? "self-start" : "self-end"
            } bg-accent-500 p-5 text-white rounded-lg max-w-[600px] w-full`}
          >
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border-[0.5px] border-accent-200 bg-white flex items-center justify-center">
                  <img
                    src={converse.sender_type == "user" ? (ticket.user.avatar ? ticket.user.avatar : "/assets/images/profile/profile-circle.svg") : "/assets/images/profile/profile-circle.svg"}
                    className="w-100 h-100 rounded-full"
                  />
                </div>
                <span className="text-sm font-bold">
                  {converse.sender_type == "user" ? ticket.user.name : "ادمین"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <img src="/assets/images/profile/clock.svg" alt="clock" />
                  <span>{formatTime(converse.created_at)}</span>
                </div>
                <div className="flex gap-1">
                  <img
                    src="/assets/images/profile/calendar.svg"
                    alt="calendar"
                  />
                  <span>{showDate(converse.created_at)}</span>
                </div>
              </div>
            </div>
            <p className="font-light text-sm md:text-base">
              {converse.content}
            </p>
          </div>
        ))}
      </div>

      <form
        className="bg-accent-500 flex items-center gap-2 p-3"
        onSubmit={submitHandler}
      >
        <button type="submit">
          <img
            src="/assets/images/footer/send.svg"
            alt="telegram"
            className="rotate-180"
          />
        </button>
        <textarea
          className="resize-none max-h-16 w-full outline-none rounded-lg p-2 px-3"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </form>
    </div>
  );
};

export default ShowTicket;
