import { sidebarItems } from "./ProfileData";

export default function ProfileSidebar() {
  return (
    <aside className="h-fit overflow-x-auto border-b border-[#e5e5e5] pb-4 md:overflow-visible md:border-b-0 md:border-r md:pb-0 md:pr-6">
      <div className="flex min-w-max gap-5 pr-2 sm:gap-6 md:block md:min-w-0 md:space-y-2 md:pr-0">
        {sidebarItems.map((item, index) => (
          <div key={item.label} className="shrink-0 md:shrink">
            <button
              type="button"
              className={`flex w-full items-start gap-2.5 py-2 text-left text-[14px] font-normal leading-[20px] tracking-[0px] transition-colors sm:text-[15px] sm:leading-[22px] lg:text-[16px] lg:leading-[24px] ${
                item.active
                  ? "font-bold text-[#1a1a1a]"
                  : item.muted
                    ? "text-[#A3A3A3]"
                    : "text-[#737373]"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
              aria-current={item.active ? "page" : undefined}
            >
              <span className="pt-[2px]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
            {item.active ? (
              <div className="w-full border-b-2 border-[#DC2626]" />
            ) : null}
            {index === 4 ? (
              <div className="mt-2 hidden border-t border-[#e7e7e7] md:block" />
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
