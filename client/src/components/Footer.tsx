import { Link } from "react-router-dom";

type FooterLink = {
  label: string;
  to: string;
};

const companyLinks: FooterLink[] = [
  { label: "About us", to: "/about" },
  { label: "carriers", to: "/careers" },
  { label: "locations", to: "/locations" },
  { label: "blog", to: "/blog" },
];

const customerCareLinks: FooterLink[] = [
  { label: "size guide", to: "/size-guide" },
  { label: "Help and FAQs", to: "/help" },
  { label: "return a order", to: "/returns" },
  { label: "refer a friend", to: "/refer" },
];

const socialLinks: FooterLink[] = [
  { label: "Instagram", to: "https://instagram.com" },
  { label: "Facebook", to: "https://facebook.com" },
  { label: "tiktok", to: "https://tiktok.com" },
  { label: "twitter", to: "https://x.com" },
];

export default function Footer() {
  return (
    <footer className="mt-16 rounded-t-[40px] bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-6 pb-16 pt-20 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr] lg:gap-0">
          <section className="lg:pr-14">
            <h2
              className="max-w-[460px] text-[36px] font-bold leading-[100%] tracking-[0%] text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Recieve an exclusive
              <br />
              <span className="text-[#ff0000]">20%</span> discount code
              <br />
              when you signup.
            </h2>

            <form
              className="mt-16 max-w-[340px] border-b border-zinc-500 pb-4 sm:mt-20"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex items-center justify-between gap-4">
                <input
                  type="email"
                  placeholder="enter your email"
                  aria-label="Enter your email"
                  className="w-[205px] bg-transparent text-[20px] font-semibold leading-[100%] tracking-[0%] text-zinc-500 outline-none placeholder:text-[20px] placeholder:font-semibold placeholder:leading-[100%] placeholder:tracking-[0%] placeholder:text-zinc-500 sm:w-[225px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  type="submit"
                  className="shrink-0 text-[20px] font-semibold leading-[100%] tracking-[0%] text-zinc-100"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </section>

          <FooterColumn title="company" links={companyLinks} bordered />
          <FooterColumn
            title="customer care"
            links={customerCareLinks}
            bordered
          />
          <FooterExternalColumn
            title="Follow us on"
            links={socialLinks}
            bordered
            rightBorder
          />
        </div>

        <div className="mt-24 flex flex-col gap-8 sm:mt-32 sm:flex-row sm:items-center sm:justify-between lg:mt-44">
          <Link
            to="/"
            className="inline-flex h-[36px] w-[142px] items-center gap-2 text-[46px] font-semibold leading-none tracking-tight text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <svg
              width="22"
              height="26"
              viewBox="0 0 22 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-[26px] w-[22px] shrink-0"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.0009 23.4923C21.0609 24.1336 20.846 24.7744 20.411 25.2506C19.9762 25.7265 19.3565 25.9997 18.7106 25.9997H2.30017C1.65426 25.9997 1.03462 25.7265 0.59978 25.2506C0.164751 24.7744 -0.0501556 24.1335 0.0099147 23.4923L1.71856 5.24314C1.74296 4.98108 1.96349 4.7809 2.22737 4.7809H4.90809C4.90345 4.87363 4.90103 4.96717 4.90103 5.06111V6.65065C4.59482 6.93832 4.41883 7.33805 4.41883 7.76644C4.41883 8.61434 5.11046 9.30416 5.96058 9.30416C6.8109 9.30416 7.50254 8.61434 7.50254 7.76644C7.50254 7.30258 7.2951 6.87282 6.94575 6.58433V5.06111C6.94575 4.96657 6.95039 4.87343 6.95785 4.7809H14.0156C14.0228 4.87343 14.0277 4.96657 14.0277 5.06111V6.61716C13.7017 6.90624 13.5082 7.32412 13.5082 7.76644C13.5082 8.61434 14.1998 9.30416 15.05 9.30416C15.9003 9.30416 16.5919 8.61434 16.5919 7.76644C16.5919 7.32415 16.3984 6.90626 16.0724 6.61716V5.06111C16.0724 4.96717 16.07 4.87363 16.0654 4.7809H18.7832C19.0471 4.7809 19.2676 4.98108 19.2922 5.24314L21.0009 23.4923ZM15.561 6.87495C15.8708 7.05235 16.0805 7.38517 16.0805 7.76635C16.0805 8.3332 15.6182 8.79425 15.0497 8.79425C14.4814 8.79425 14.0192 8.33322 14.0192 7.76635C14.0192 7.38515 14.2288 7.05232 14.5387 6.87495V5.06107C14.5387 2.83249 12.7207 1.01965 10.4863 1.01965C8.25193 1.01965 6.43418 2.83254 6.43418 5.06107V6.85441C6.76458 7.02596 6.99097 7.37007 6.99097 7.7664C6.99097 8.33325 6.52872 8.79431 5.96022 8.79431C5.39193 8.79431 4.92948 8.33327 4.92948 7.7664C4.92948 7.40072 5.12261 7.07998 5.41189 6.89755V5.06107C5.41189 2.27028 7.68821 0 10.4863 0C13.2843 0 15.5609 2.27028 15.5609 5.06107L15.561 6.87495Z"
                fill="white"
              />
            </svg>
            <span>
              Quick<span className="text-[#ff0000]">Buy</span>
            </span>
          </Link>

          <p
            className="text-[20px] font-bold leading-[100%] tracking-[0%] text-zinc-100 lg:mr-24"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2025. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  bordered,
}: {
  title: string;
  links: FooterLink[];
  bordered?: boolean;
}) {
  return (
    <section
      className={`${bordered ? "border-l-2 border-zinc-500 pl-8 lg:mr-8 lg:pl-12" : ""} lg:pb-[8px]`}
    >
      <h3
        className="whitespace-nowrap text-[32px] font-semibold capitalize leading-[100%] tracking-[0%] text-zinc-100"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {title}
      </h3>
      <ul
        className="mt-6 space-y-2 text-[20px] font-semibold leading-[100%] tracking-[0%] text-zinc-400 lg:mt-8 lg:space-y-3"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="transition-colors duration-200 hover:text-zinc-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FooterExternalColumn({
  title,
  links,
  bordered,
  rightBorder,
}: {
  title: string;
  links: FooterLink[];
  bordered?: boolean;
  rightBorder?: boolean;
}) {
  return (
    <section
      className={`${bordered ? "border-l-2 border-zinc-500 pl-8 lg:pl-12" : ""} ${rightBorder ? "lg:mr-24 lg:border-r-2 lg:border-zinc-500 lg:pr-12" : ""} lg:pb-[8px]`}
    >
      <h3
        className="whitespace-nowrap text-[32px] font-semibold leading-[100%] tracking-[0%] text-zinc-100 lg:text-center"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {title}
      </h3>
      <ul
        className="mt-6 space-y-2 text-[20px] font-semibold leading-[100%] tracking-[0%] text-zinc-400 lg:mt-8 lg:space-y-3"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.to}
              className="transition-colors duration-200 hover:text-zinc-200"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
