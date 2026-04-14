export default function ProfileFooterBar() {
  return (
    <footer className="bg-[#F5F5F5]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:min-h-[216px] lg:px-10 lg:py-12">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start lg:justify-between">
          <section className="flex flex-col items-start gap-4 lg:w-[584px]">
            <h3 className="text-[18px] font-bold leading-[28px] text-[#000000]">
              QuickBuy
            </h3>
            <p className="max-w-[320px] text-[14px] font-normal leading-[20px] text-[#737373]">
              Curating the finest in modern electronics. Experience the future
              of technology, simplified.
            </p>
            <p className="text-[14px] font-medium leading-[20px] text-[#525252]">
              © 2024 QuickBuy. All rights reserved.
            </p>
          </section>

          <div className="grid w-full gap-8 sm:grid-cols-2 lg:w-[584px] lg:gap-4">
            <section className="flex flex-col items-start gap-3 lg:w-[284px] lg:pb-9">
              <h4 className="text-[12px] font-black uppercase leading-[16px] tracking-[-0.6px] text-[#000000]">
                Legal
              </h4>
              <ul className="space-y-2 text-[14px] font-medium leading-[20px] text-[#525252]">
                <li className="py-[2px]">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="py-[2px]">
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </section>

            <section className="flex flex-col items-start gap-3 lg:w-[284px] lg:pb-9">
              <h4 className="text-[12px] font-black uppercase leading-[16px] tracking-[-0.6px] text-[#000000]">
                Support
              </h4>
              <ul className="space-y-2 text-[14px] font-medium leading-[20px] text-[#525252]">
                <li className="py-[2px]">
                  <a href="#">Contact Us</a>
                </li>
                <li className="py-[2px]">
                  <a href="#">Support Center</a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </footer>
  );
}
