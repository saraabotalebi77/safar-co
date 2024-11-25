import handleError from "../utils/handle-error";
import http from "../utils/httpService";

interface INotif {
    data: { message: string };
    id: string;
    read_at: null | string;
};
type TData = {
  data : INotif[]
};

export function getNotification({
  token,
  typeNotification
}: {
  token: undefined | string;
  typeNotification:string
}): Promise<TData> {
  let path = "";
  if(typeNotification){
    path = `api/auth/user/notifications?read=${typeNotification=="read"}`;
  }else{
    path = `api/auth/user/notifications`;
  }

  return handleError(() =>
    http.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
}

export function readNotification({
  token,
  id,
}: {
  token: string | undefined;
  id: string;
}) {
  return handleError(() =>
    http.post(
      `api/auth/user/notifications/mark-as-read`,
      {
        id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
  );
}
