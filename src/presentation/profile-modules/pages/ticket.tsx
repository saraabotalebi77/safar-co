import { useParams } from "react-router-dom";
import ShowTicket from "../components/show-ticket";
import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";
import { getTicket } from "@/infrastructure/api/ticketServices";
import { useContext } from "react";
import { MainContext } from "@/presentation/shared/context/context";

export default function Ticket() {
  const {token} = useContext(MainContext);
  const {ticketId} = useParams();
  const {data:ticket} = useCustomizedQuery(["ticket"],()=>getTicket({token,id:ticketId}))

  return (
    <>
    {
      ticket && <ShowTicket ticket = {ticket.data} />
    }
    </>
  );
}
