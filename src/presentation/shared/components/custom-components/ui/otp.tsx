import { FC } from "react";
import { InputChangeEvent } from "@/presentation/shared/types";

type PropsOtp = {
  length: number;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  pattern?: string;
};
const Otp: FC<PropsOtp> = ({ length = 4, otp, setOtp, className, pattern }) => {
  const changeInputhandler = (e: InputChangeEvent) => {
    setOtp(e.target.value);
  };
  return (
    <div
      className={`flex flex-row-reverse justify-center gap-2 h-10 relative ${className}`}
    >
      <input
        id="otp"
        type="text"
        maxLength={length}
        value={otp || ""}
        onChange={changeInputhandler}
        className="absolute w-full z-[-10] opacity-0  peer"
        placeholder=" "
        autoFocus
        pattern={pattern}
        required
      />
      {Array(length)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center h-10 w-10 border rounded border-gray-300 ${
                index <= otp.length
                  ? "peer-focus:border-accent-400"
                  : "border-gray-300"
              } `}
            >
              {otp[index] || ""}
            </div>
          ))}
      <label htmlFor="otp" className="absolute w-full h-full"></label>
    </div>
  );
};

export default Otp;
