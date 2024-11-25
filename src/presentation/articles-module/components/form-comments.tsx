import Button from "@/presentation/shared/components/custom-components/ui/button";

const CommentForm = () => {
  return (
    <form className="my-[80px] flex flex-col items-start">
      <div className="w-full flex gap-3 mb-3">
        <input type="text" placeholder="نام" className="w-full grow p-2 rounded-md border border-gray-300 focus:border-accent-400 placeholder:text-gray-200" />
        <input type="text" placeholder="ایمیل" className="w-full grow p-2 rounded-md border border-gray-300 focus:border-accent-400 placeholder:text-gray-200"  />
      </div>
      <textarea
        name=""
        id=""
        placeholder="بازخورد شما برای ما ارزشمند است و به بهبود ما کمک می‌کند."
        className="resize-none w-full h-[200px] p-2 border border-gray-300 focus:border-accent-400 rounded-md outline-none placeholder:text-gray-200"
      ></textarea>
      <Button className="mr-auto mt-3 bg-accent-400">ارسال نظر</Button>
    </form>
  );
};
export default CommentForm;
