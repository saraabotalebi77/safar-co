import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/presentation/shared/components/shadcn-components/hooks/use-toast";
import { useContext } from "react";
import { MainContext } from "../context/context";
import { deleteCookie } from "../utils/cookie";
import { useLocation, useNavigate } from "react-router-dom";


type TOwnError = Error & {
  detail: {
    message: string;
    status : string;
    data ?: null;
  };
};

const useCustomizedMutation = <TInputData, TOutputData>(
  mutationKey: string[],
  mutationFn: (
    data: TInputData
  ) => Promise<TOutputData>
) => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {setToken} = useContext(MainContext);
  const { toast } = useToast();
  const { mutate, isPending, data } = useMutation({
    mutationFn,
    mutationKey,
    onError: (err: TOwnError) => {
      toast({
        title: err.detail.message || err.message,
        variant : "error"
      });
      if(err.detail.status=="401"){
        setToken(undefined);
        deleteCookie("safarCo:user_key");
        if(pathname.includes("/profile")){
          navigate("/");
        }
      }
    },
  });

  return { mutate, isPending, data };
};

export { useCustomizedMutation };
