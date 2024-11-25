import { readNotification } from "@/infrastructure/api/notificationServices";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/presentation/shared/components/shadcn-components/components/ui/accordion";
import { MainContext } from "@/presentation/shared/context/context";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useContext } from "react";

interface INotif {
  data: { message: string };
  id: string;
  read_at: string | null;
}
type TData = INotif[];

interface IPropsComponent {
  notifications: TData;
}

const ShowNotification: FC<IPropsComponent> = ({ notifications }) => {
  const { token } = useContext(MainContext);
  const queryClient = useQueryClient();
  const { mutate } = useCustomizedMutation(
    ["read-notification"],
    readNotification
  );

  const readNotificationHandler = (
    notificationId: string,
    isReadNotif: null | string
  ) => {
    if(!isReadNotif) {
      mutate(
        { token, id: notificationId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification"] });
          },
        }
      );
    }
  };

  return (
    <section className="h-full px-3">
      <Accordion type="single" collapsible>
        {notifications.map((notif) => (
          <AccordionItem value={notif.id} key={notif.id}>
            <AccordionTrigger className="py-3">
              <span
                className="w-full flex items-center justify-between gap-3 overflow-x-hidden"
                onClick={() => readNotificationHandler(notif.id, notif.read_at)}
              >
                <span className="max-w-[500px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {notif.data.message.slice(0, 300)}
                </span>
                <span className="flex min-w-[28px]">
                  {notif.read_at ? (
                    <img
                      src="/assets/images/profile/envelope-open.svg"
                      alt="envelope-open"
                    />
                  ) : (
                    <img
                      src="/assets/images/profile/envelope-close.svg"
                      alt="envelope-closed"
                    />
                  )}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>{notif.data.message}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default ShowNotification;
