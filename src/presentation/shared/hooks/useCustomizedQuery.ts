import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/presentation/shared/components/shadcn-components/hooks/use-toast";
import { deleteCookie } from "../utils/cookie";
import { useContext } from "react";
import { MainContext } from "../context/context";
import { useLocation , useNavigate } from "react-router-dom";

type TOwnError = Error & {
  detail: {
    message: string;
    status: string;
    data?: null;
  };
};

const useCustomizedQuery = <TOutputData>(
  queryKey: (string|undefined)[],
  queryFn: () => Promise<TOutputData>,
  option ?: {[key:string] : unknown}
) => {
  const {setToken} = useContext(MainContext);
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const { data, error } = useQuery<TOutputData,TOwnError>({
    queryFn,
    queryKey,
    notifyOnChangeProps: ["data", "error"],
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...option,
  });

  const { toast } = useToast();
  if(error){
    toast({
      title: error?.detail?.message || error.message,
      variant : "error"
    });
    if(error?.detail?.status=="401"){
      setToken(undefined);
      deleteCookie("safarCo:user_key");
      if(pathname.includes("/profile")){
        navigate("/");
      }
    }
  }

  return { data };
};

export { useCustomizedQuery };

