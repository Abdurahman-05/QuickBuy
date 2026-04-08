import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryPillButtonProps = {
  label: string;
  icon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function PrimaryPillButton({
  label,
  icon,
  className = "",
  type = "button",
  ...buttonProps
}: PrimaryPillButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-[62px] w-[388px] items-center justify-center gap-4 rounded-[31px] bg-black px-8 text-white transition-opacity hover:opacity-90 ${className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
      {...buttonProps}
    >
      {icon ? (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="text-[30px] font-bold leading-none tracking-normal">
        {label}
      </span>
    </button>
  );
}
