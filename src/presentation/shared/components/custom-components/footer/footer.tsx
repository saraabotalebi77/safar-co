import Button from "@/presentation/shared/components/custom-components/ui/button";
const Footer = () => {
  return (
    <footer className="bg-green text-white text-xs xs:text-sm font-light">
      <div className="container mx-auto px-3 py-8 sm:px-1 ">
        <div
          className="aspect-[2/1] lg:aspect-[5/2] grid grid-cols-3 grid-rows-3 gap-0 relative rounded-[12px] overflow-hidden after:content-[attr(data-content)] after:w-full after:h-full after:absolute after:bg-[#8D8D8DA1] after:flex after:items-center after:justify-center after:text-white after:font-nastaliq after:text-[min(calc(4vw+5px),40px)]"
          data-content="همه جای ایران سرای من است."
        >
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-3.svg"
              alt="bg-1"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-2.svg"
              alt="bg-2"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-1.svg"
              alt="bg-3"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-6.svg"
              alt="bg-4"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-5.svg"
              alt="bg-5"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-4.svg"
              alt="bg-6"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-9.svg"
              alt="bg-7"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-8.svg"
              alt="bg-8"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="/assets/images/footer/bg-7.svg"
              alt="bg-9"
            />
          </div>
        </div>
        <div className="mt-8 grid lg:grid-cols-2">
          <div className="flex justify-between items-center lg:items-start lg:flex-col  xs:px-4">
            <div className="flex items-center gap-2">
              <img src="/assets/images/Logo.svg" className="w-10 h-10 lg:w-14 lg:h-14" />
              <p className="text-[13px] lg:text-sm hidden xs:block">کشف کنید ، تجربه کنید</p>
            </div>
            <p className="hidden lg:block lg:mb-14">
              (<span className="text-primary-400 font-normal">سفرکو</span>) یک پلتفرم بزرگ شناخت جاذبه های گردشگری است .
              هدف ما از این کار شناخت تمامی نقاط گردشگری ایران و معرفی آن به
              تمام مردم ایران و حتی جهان است ، تا به صنعت گردشگری ایران کمک
              کنیم.
            </p>
            <div>
              <h5 className="text-primary-400 font-normal mb-[10px]">شبکه های اجتماعی ما</h5>
              <div className="flex gap-3 justify-center lg:justify-start">
                <a href="">
                  <img className="w-5 h-5 xs:w-8 xs:h-8 " src="/assets/images/footer/Telegram.svg" alt="" />
                </a>
                <a href="">
                  <img className="w-5 h-5 xs:w-8 xs:h-8" src="/assets/images/footer/Linkedin.svg" alt="" />
                </a>
                <a href="">
                  <img className="w-5 h-5 xs:w-8 xs:h-8" src="/assets/images/footer/Instagram.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 xs:px-4 mt-5 xs:mt-10 lg:m-0">
            <div className="xs:px-1">
              <h5 className="text-primary-400 font-normal text-center mb-6">پروفایل کاربری</h5>
              <ul className="flex flex-col items-center gap-6 text-[10px] xs:text-sm">
                <li>ویرایش پروفایل</li>
                <li>اعلان ها</li>
                <li>تیکت های من</li>
              </ul>
            </div>
            <div className="xs:px-1">
              <h5 className="text-primary-400 font-normal text-center mb-6">ارتباط با ما</h5>
              <ul className="flex flex-col items-center gap-6 text-[10px] xs:text-sm">
                <li>تماس با پشتیبانی</li>
                <li>موقعیت مکانی ما</li>
                <li>حریم خصوصی</li>
                <li>ارسال تیکت</li>
                <li>درباره ما</li>
                <li>کوکی ها</li>
              </ul>
            </div>
            <div className="xs:px-1">
              <h5 className="text-primary-400 font-normal text-center mb-6">خدمات سریع</h5>
              <ul className="flex flex-col items-center gap-6 text-[10px] xs:text-sm">
                <li>بازگشت به صفحه اصلی</li>
                <li>دانلود نسخه اپلیکیشن</li>
                <li>مقالات گردشگری</li>
                <li>تجربه های سفر</li>
                <li>برنامه ریزی سفر</li>
                <li>ایران شناسی</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 mt-6 xs:px-4">
          <div>
            <h5 className="text-primary-400 font-normal mb-1">عضویت در خبرنامه ما</h5>
            <p className="text-gray-400">با عضو شدن در خبرنامه از اخبار گردشگری ما جا نمون:)</p>
          </div>
          <form noValidate className="flex items-center rounded-[8px] border border-gray-400 border-solid" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" placeholder="ایمیل خود را وارد کنید" className="bg-transparent p-2 grow" />
            <Button className="bg-transparent p-0">
              <img src="/assets/images/footer/send.svg" alt="" className="p-1"/>
            </Button>
          </form>
        </div>
        <div className="flex flex-col xs:flex-row justify-between items-center gap-3 mt-6 xs:px-4">
          <div className="text-gray-400">
            <p>تمامی حقوق این وبسایت متعلق به سفرکو است</p>
            <p>و هرگونه کپی برداری مطالب با ذکر منبع بلامانع است.</p>
          </div>
          <div className="flex gap-2">
            <a href="">
                <img src="/assets/images/footer/e-nemad.svg" alt="" className="w-10 h-10 lg:w-12 lg:h-12"/>
            </a>
            <a href="">
                <img src="/assets/images/footer/environmental-protection.svg" alt="" className="w-10 h-10 lg:w-12 lg:h-12" />
            </a>
            <a href="">
                <img src="/assets/images/footer/cultural-heritage.svg" alt="" className="w-10 h-10 lg:w-12 lg:h-12" />
            </a>
            <a href="">
                <img src="/assets/images/footer/samandehi.svg" alt="" className="w-10 h-10 lg:w-12 lg:h-12" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
