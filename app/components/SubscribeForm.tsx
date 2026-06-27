"use client";

export default function SubscribeForm() {
  return (
    <div
      data-tnav="subscribe-section"
      className="rounded-[12px] border border-[#d3d5de] py-6 sm:px-6 px-4 max-w-[970px] mx-auto lg:flex lg:items-center lg:gap-6 bg-white"
    >
      <section className="flex gap-3 lg:items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" className="text-[#93acff] flex-shrink-0 w-7 h-7 lg:w-10 lg:h-10">
          <path fill="currentColor" d="M22.167 4.666H5.834c-1.983 0-3.5 1.517-3.5 3.5v11.667c0 1.983 1.517 3.5 3.5 3.5h16.333c1.984 0 3.5-1.517 3.5-3.5V8.166c0-1.983-1.516-3.5-3.5-3.5m0 2.333c.234 0 .35 0 .467.117l-7.817 6.883c-.466.35-1.166.35-1.516 0L5.717 7h16.45m0 14H5.834c-.7 0-1.167-.466-1.167-1.166V9.216l7 6.533c.7.584 1.517.934 2.45.934.817 0 1.634-.35 2.334-.934l7-6.183v10.267c-.117.7-.584 1.166-1.284 1.166" />
        </svg>
        <h3 className="text-[24px] font-bold text-[#0a0a0a] leading-[32px] tracking-[-0.02em]" data-tnav="title">
          Subscribe for crypto updates
        </h3>
      </section>
      <form
        className="mt-6 lg:mt-0 lg:flex lg:gap-4 lg:items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <section className="relative">
          <div className="relative">
            <label
              htmlFor="subscribe-email"
              className="absolute left-3 transition-all duration-200 ease-in-out text-[#4c5167] hover:cursor-text text-[16px] top-1/2 -translate-y-1/2 pointer-events-none"
            >
              Email
            </label>
            <input
              data-tnav="email-input"
              id="subscribe-email"
              className="pl-3 pr-3 h-14 pt-4 w-full outline-none bg-white placeholder-[#4c5167] text-[#0a0a0a] text-[16px] rounded-[12px] ring-1 ring-[#b9bbc6] focus:ring-2 focus:ring-[#363a49] hover:ring-[#73788c] transition-all duration-200 ease-in-out lg:w-80"
              autoComplete="off"
              type="email"
              name="email"
            />
          </div>
        </section>
        <button
          className="w-full lg:w-auto lg:mt-0 mt-4 inline-flex items-center justify-center border rounded-full cursor-pointer font-semibold gap-2 h-12 text-[14px] lg:text-[16px] min-w-[144px] px-4 text-[#0a0a0a] bg-[#b1ff8c] border-[#b1ff8c] hover:bg-[#a4f77d] hover:border-[#a4f77d] transition-colors duration-200"
          data-tnav="subscribe-button"
          type="submit"
        >
          <span className="inline-flex">Subscribe</span>
        </button>
      </form>
    </div>
  );
}
