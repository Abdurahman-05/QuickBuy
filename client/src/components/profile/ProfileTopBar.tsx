import { useState } from "react";
import { Link } from "react-router-dom";
import { headerLinks } from "./ProfileData";
import { BagLogoIcon, CartIcon, UserIcon } from "./ProfileIcons";

export default function ProfileTopBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#e2e2e2] bg-white">
      <div className="mx-auto flex h-[58px] w-full max-w-[1280px] items-center justify-between px-4 sm:h-[62px] sm:px-6 lg:px-7">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[20px] font-black leading-[28px] tracking-[-0.8px] text-[#111111] sm:text-[24px] sm:leading-[32px] sm:tracking-[-1.2px]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="text-[#FF0000]">
            <BagLogoIcon />
          </span>
          <span>
            <span className="text-[#FF0000]">Quick</span>Buy
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 text-[16px] font-medium leading-[24px] tracking-[0px] text-[#575757] lg:flex"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {headerLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="transition-colors hover:text-[#1f1f1f]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-[#111111]">
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="profile-mobile-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-5 rounded-full bg-[#1f1f1f] transition-transform duration-200 ${
                  isMobileMenuOpen
                    ? "translate-y-0 rotate-45"
                    : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-5 rounded-full bg-[#1f1f1f] transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-5 rounded-full bg-[#1f1f1f] transition-transform duration-200 ${
                  isMobileMenuOpen
                    ? "translate-y-0 -rotate-45"
                    : "translate-y-[6px]"
                }`}
              />
            </span>
          </button>
          <button
            type="button"
            aria-label="Account profile"
            className="hidden lg:inline-flex"
          >
            <UserIcon />
          </button>
          <button
            type="button"
            aria-label="Shopping cart"
            className="hidden lg:inline-flex"
          >
            <CartIcon />
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          id="profile-mobile-menu"
          className="border-t border-[#e2e2e2] bg-[#e9e9e9] px-4 pb-5 pt-4 shadow-[0_16px_30px_rgba(0,0,0,0.08)] sm:px-6 lg:hidden"
        >
          <nav
            className="grid gap-3 text-[15px] font-medium leading-[22px] text-[#575757]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {headerLinks.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`flex h-14 items-center justify-between rounded-[22px] bg-[#f5f5f5] px-5 text-[18px] transition-colors sm:text-[20px] ${
                  index === 0 ? "text-[#ff0000]" : "text-[#1f1f1f]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
                {index === 0 ? (
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-[#ff0000]"
                    aria-hidden="true"
                  />
                ) : null}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              aria-label="Cart"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#f5f5f5] shadow-sm"
            >
              <CartIcon />
            </button>
            <button
              type="button"
              aria-label="Profile"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#f5f5f5] text-[#ff0000] shadow-sm"
            >
              <UserIcon />
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
