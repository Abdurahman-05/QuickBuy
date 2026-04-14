import { orderItems } from "./ProfileData";
import { HomeIcon } from "./ProfileIcons";

export default function ProfileOrdersAndAddress() {
  return (
    <section className="grid gap-5 md:gap-6 xl:flex xl:items-start xl:justify-between xl:gap-6 lg:max-w-full">
      <RecentOrders />
      <PrimaryAddress />
    </section>
  );
}

function RecentOrders() {
  return (
    <section className="flex flex-col items-stretch gap-5 pb-[20.5px] md:gap-6 xl:min-w-0 xl:flex-1">
      <div className="flex w-full items-end justify-between gap-4">
        <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] text-[#1a1a1a]">
          Recent Orders
        </h2>
        <button
          type="button"
          className="inline-flex h-5 cursor-pointer items-center border-b-2 border-[#E31E24] pb-[2px] text-[12px] font-bold uppercase leading-[16px] tracking-[0px] text-[#E31E24] transition-opacity hover:opacity-80"
        >
          View All
        </button>
      </div>

      <div className="w-full space-y-3 md:hidden">
        {orderItems.map((order) => (
          <article
            key={order.id}
            className="w-full rounded-[14px] bg-[#ececec] p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold text-[#292929]">
                  {order.id}
                </p>
                <p className="mt-1 text-[13px] text-[#666666]">{order.date}</p>
              </div>
              <span className="inline-flex rounded-full bg-[#202020] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#f6f6f6]">
                {order.status}
              </span>
            </div>
            <p className="mt-2 text-right text-[14px] font-semibold text-[#292929]">
              {order.total}
            </p>
          </article>
        ))}
      </div>

      <div className="hidden w-full overflow-x-auto md:block">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="text-[12px] font-bold uppercase leading-[16px] tracking-[-0.6px] text-[#5E5E5E]">
              <th className="px-[1px] pb-6 pt-[1px] pr-4">Order ID</th>
              <th className="px-4 pb-6 pt-[1px]">Date</th>
              <th className="px-4 pb-6 pt-[1px]">Status</th>
              <th className="px-[1px] pb-6 pt-[1px] pl-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((order) => (
              <tr key={order.id}>
                <td className="border-t border-[#EEEEEE] px-[1px] py-5 pr-4 text-[14px] font-medium leading-[20px] text-[#1B1B1B]">
                  {order.id}
                </td>
                <td className="border-t border-[#EEEEEE] px-4 py-5 text-[14px] font-medium leading-[20px] text-[#5E5E5E]">
                  {order.date}
                </td>
                <td className="border-t border-[#EEEEEE] px-4 py-5">
                  <span
                    className={`inline-flex h-5 items-center rounded-full px-3 text-[10px] font-black uppercase leading-[20px] ${
                      order.status === "Delivered"
                        ? "bg-[#1B1B1B] text-[#FFFFFF]"
                        : "bg-[#E8E8E8] text-[#1B1B1B]"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border-t border-[#EEEEEE] px-[1px] py-5 pl-4 text-right text-[14px] font-bold leading-[20px] text-[#1B1B1B]">
                  {order.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PrimaryAddress() {
  return (
    <section className="flex w-full flex-col items-start gap-6 xl:w-[320.67px] xl:flex-none">
      <h2 className="mb-4 whitespace-nowrap text-[20px] font-bold leading-[28px] tracking-[-0.5px] text-[#1a1a1a]">
        Primary Address
      </h2>
      <article className="relative min-h-[240px] w-full rounded-[28px] bg-[#F3F3F3] p-6 sm:rounded-[32px] sm:px-8 sm:pb-[29px] sm:pt-8">
        <div className="flex flex-col items-start gap-[15px]">
          <p className="flex items-center gap-2 text-[12px] font-bold uppercase leading-[16px] tracking-[1.2px] text-[#5E5E5E]">
            <HomeIcon /> Home
          </p>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[18px] font-bold leading-[22px] text-[#1B1B1B]">
              Alex Johnson
            </p>
            <address className="not-italic text-[16px] leading-[26px] text-[#5E5E5E]">
              482 Tech Valley Boulevard
              <br />
              Suite 405
              <br />
              San Francisco, CA 94103
            </address>
          </div>
        </div>
        <button
          type="button"
          className="mt-6 inline-flex h-5 items-center border-b-2 border-[#E31E24] pb-[2px] text-[12px] font-bold uppercase leading-[16px] text-[#E31E24] transition-opacity hover:opacity-80"
        >
          Edit Address
        </button>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-24px] top-[-24px] h-24 w-24 rounded-full bg-[rgba(232,232,232,0.3)] blur-[20px]"
        />
      </article>
    </section>
  );
}
