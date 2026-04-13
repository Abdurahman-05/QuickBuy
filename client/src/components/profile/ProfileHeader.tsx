export default function ProfileHeader() {
  return (
    <section className="mb-2 flex flex-col items-start gap-3 sm:mb-3 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#f15a30] sm:h-[88px] sm:w-[88px]">
        <span
          className="text-[24px] font-bold tracking-[-0.02em] text-white sm:text-[30px]"
          aria-label="User avatar initials"
        >
          AJ
        </span>
      </div>
      <div>
        <h1 className="text-[30px] font-bold leading-[34px] tracking-[-0.7px] text-[#161616] sm:text-[36px] sm:leading-[40px] sm:tracking-[-0.9px]">
          Alex Johnson
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-[15px] font-medium leading-[22px] tracking-[0.2px] text-[#737373] sm:text-[16px] sm:leading-[24px] sm:tracking-[0.4px]">
          <span>Member since 2023</span>
          <span
            className="h-1 w-1 rounded-full bg-[#E31E24]"
            aria-hidden="true"
          />
          <span>Premium Tier</span>
        </p>
      </div>
    </section>
  );
}
