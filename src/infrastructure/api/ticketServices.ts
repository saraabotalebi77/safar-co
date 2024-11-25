import http from "../utils/httpService";
import handleError from "../utils/handle-error";

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

interface SelectedTicket {
  data: {
    conversations: TicketConversation[];
    ticket: ITicket;
  };
}

export function createTicket({
  token,
  data,
}: {
  token: undefined | string;
  data: {
    title: string;
    message: string;
    priority: string;
  };
}) {
  return handleError(() =>
    http.post("api/auth/user/tickets/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
}

export function getAllTickets({
  token,
}: {
  token: undefined | string;
}): Promise<{ data: ITicket[] }> {
  return handleError(() =>
    http.get("api/auth/user/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
}

export function getTicket({
  token,
  id,
}: {
  token: string | undefined;
  id: string | undefined;
}): Promise<SelectedTicket> {
  return handleError(() =>
    http.get(`api/auth/user/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
}
export function sendMessage({
  token,
  data,
}: {
  token: string | undefined;
  data: {
    ticket_id: number;
    content: string;
  };
}){
  return handleError(()=>http.post("api/auth/user/conversations",data,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }))
}
