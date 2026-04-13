import { statItems } from "./ProfileData";

export default function ProfileStatsGrid() {
  return (
    <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3 lg:max-w-full">
      {statItems.map((item) => (
        <article
          key={item.label}
          className="flex min-h-[132px] flex-col items-start gap-3 rounded-[24px] bg-[#F3F3F3] p-5 sm:min-h-[140px] sm:rounded-[28px] sm:p-6 lg:min-h-[150px] lg:rounded-[32px] lg:p-8"
        >
          <span className="text-[#E31E24]">{item.icon}</span>
          <p className="text-[12px] font-bold uppercase leading-[16px] tracking-[1.2px] text-[#5E5E5E]">
            {item.label}
          </p>
          <p className="text-[30px] font-bold leading-[36px] text-[#1B1B1B]">
            {item.value}
          </p>
        </article>
      ))}
    </section>
  );
}
