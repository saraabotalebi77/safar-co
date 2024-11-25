import { FC } from "react";
import { Link } from "react-router-dom";

interface ITicket {
  created_at: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}
interface IPropsComponent{
  tickets : ITicket[]
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


const ShowTickets:FC<IPropsComponent> = ({tickets})=>{
  
  return (
    <div className="grow overflow-auto scrollbar-thin px-3 py-5">
      {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="w-full bg-accent-600 overflow-x-auto mb-4 p-3 rounded-lg"
            style={{
              scrollbarColor: "#ffab16 #ffc478",
            }}
          >
            <table className="w-full min-w-[500px] text-white">
              <thead className="w-full">
                <tr>
                  <th className="p-1 px-2 whitespace-nowrap text-sm">
                    شماره تیکت
                  </th>
                  <th className="p-1 px-2 w whitespace-nowrap max-w-44 text-sm">
                    عنوان تیکت
                  </th>
                  <th className="p-1 px-2 w whitespace-nowrap text-sm">
                    تاریخ
                  </th>
                  <th className="p-1 px-2 w whitespace-nowrap text-sm">
                    وضعیت
                  </th>
                  <th className="p-1 px-2 w whitespace-nowrap text-sm">
                    مشاهده
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-1 px-2 w whitespace-nowrap text-center font-light">
                    {ticket.id}
                  </td>
                  <td className="p-1 px-2 w whitespace-nowrap overflow-hidden text-ellipsis max-w-44 text-center font-light">
                    {ticket.title}
                  </td>
                  <td className="p-1 px-2 w whitespace-nowrap text-center font-light">
                    {showDate(ticket.created_at)}
                  </td>
                  <td className="p-1 px-2 w whitespace-nowrap text-center font-light">
                    {ticket.status=="open" ? "در حال بررسی" : "بسته شده"}
                  </td>
                  <td className="p-1 px-2 w whitespace-nowrap flex justify-center font-light">
                    <Link to={`/profile/tickets/${ticket.id}`}>
                      <img src="/assets/images/profile/eye.svg" alt="eye" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}

export default ShowTickets;