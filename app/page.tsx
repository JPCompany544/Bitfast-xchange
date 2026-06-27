import Link from "next/link";
import WalletLogos from "./components/WalletLogos";
import ReviewsSlider from "./components/ReviewsSlider";
import SubscribeForm from "./components/SubscribeForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-gradient-to-br from-[#e6faef] via-[#f2fafe] to-[#fcfcfc]">
      <main className="flex w-full flex-col items-center justify-center">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10 pt-16 sm:pt-24 px-4">
          <div className="border border-black/10 rounded-full mb-[24px] flex items-center space-x-[8px] pl-[12px] pr-[4px] py-[4px] font-medium text-[10px] sm:text-[12px] leading-[100%] bg-white/40 backdrop-blur-sm shadow-sm">
            <p className="text-gray-700">Trusted by millions of customers</p>
            <div className="py-[8px] px-[10px] rounded-full bg-black/5 text-gray-800">
              <p>Since 2015</p>
            </div>
          </div>
          
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
            Buy and sell crypto with confidence.
          </h1>
          
          <p className="text-[16px] sm:text-[18px] text-gray-600 leading-[1.6] max-w-[640px] mb-10">
            Buy and sell Bitcoin, Ethereum, XRP, Solana, and more in minutes using your preferred payment method. Fast, secure, and designed for everyone, from first-time buyers to experienced investors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-[#b1ff8c] hover:bg-[#a4f77d] text-gray-900 font-bold rounded-full transition-all text-[16px] flex items-center justify-center gap-2 shadow-sm"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900 font-bold rounded-full transition-all text-[16px] flex items-center justify-center gap-2 shadow-sm"
            >
              P2P Market
            </Link>
          </div>
        </div>

        {/* Supported Payment Methods */}
        <div className="max-w-[1440px] px-[16px] tabletLarge:px-[48px] desktop:!px-[64px] desktopExtraLarge:!px-0 mx-auto pb-6 tablet:pb-[48px] desktop:pb-[96px] pt-12 desktop:pt-[32px] w-full">
          <div className="flex items-center space-x-[14px] overflow-hidden mx-auto relative w-full mb-[48px] tabletHorizontal:mb-[82px] max-w-full">
            <div className="absolute left-0 top-0 bottom-0 w-[50px] bg-gradient-to-r from-[#fdfdfe] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-[50px] bg-gradient-to-l from-[#fdfdfe] to-transparent z-10"></div>
            {[1, 2, 3].map((idx) => (
              <ul key={idx} className="flex items-center space-x-[24px] desktopSmall:space-x-[27px] flex-shrink-0 animate-marquee">
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/mc-1.png" alt="mc" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/visa-2.png" alt="visa" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/apple-pay-1.png" alt="applepay" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/google-pay-1.png" alt="googlepay" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/paypal-5.png" alt="paypal" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/venmo-4.png" alt="venmo" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/faster-payments.png" alt="faster payments" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/revolut-pay.png" alt="revolut" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/interact.png" alt="interact" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/paysafe-2.png" alt="paysafe" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/yellow-card.png" alt="yellowcard" className="w-auto h-[50px] object-contain" /></li>
                <li className="flex-shrink-0 text-center"><img src="https://payload-marketing.moonpay.com/api/media/file/sepa.png" alt="sepa" className="w-auto h-[50px] object-contain" /></li>
              </ul>
            ))}
          </div>
          <div className="grid w-full gap-2 grid-cols-1">
            <div className="flex bg-base-card rounded-[32px] overflow-hidden flex-col h-full">
              <div className="w-full relative desktop:aspect-[432/324]">
                <video className="overflow-hidden mx-auto w-full" autoPlay loop muted playsInline>
                  <source src="https://payload-marketing.moonpay.com/api/media/file/MP_Consumer_UIAnims_Mobile-Buy-HBC.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="flex flex-col flex-grow justify-between px-6 py-6 md:py-8 bg-[#F9F8FB]">
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-[20px] leading-[26px] font-medium tracking-[-0.2px] tabletHorizontal:text-[32px] tabletHorizontal:leading-[38px] tabletHorizontal:font-medium tabletHorizontal:tracking-[-0.48px] desktopLarge:text-[32px] desktopLarge:leading-[38px] desktopLarge:font-medium desktopLarge:tracking-[-0.48px] text-base-black leading-[130%] !text-[24px] desktop:whitespace-nowrap">Buy</h3>
                  <p className="text-[16px] tabletHorizontal:text-[20px] text-black/75">Buy crypto instantly with Apple Pay, Google Pay or your card. PayPal, Venmo and bank transfers are also available in select regions.</p>
                </div>
                <div className="w-full flex flex-row justify-start items-center mt-6">
                  <Link href="/buy-crypto" className="flex flex-row gap-1 justify-center items-center whitespace-nowrap text-ellipsis border rounded-full py-0 sm:px-4 px-3 min-h-[38px] leading-[38px] font-medium sm:text-[16px] text-[12px] tracking-[-0.08px] bg-base-black text-neutral-solid-50 hover:shadow-[inset_0_0_0_1000px_rgba(115,115,115,0.3)] active:shadow-[inset_0_0_0_1000px_rgba(115,115,115,0.2)] focus:bg-base-black disabled:opacity-20 border-transparent !text-[14px] !px-[24px] !py-[16px] !leading-[100%]">Buy Crypto</Link>
                </div>
              </div>
            </div>
            <div className="flex bg-base-card rounded-[32px] overflow-hidden flex-col h-full">
              <div className="w-full relative desktop:aspect-[432/324]">
                <video className="overflow-hidden mx-auto w-full" autoPlay loop muted playsInline>
                  <source src="https://payload-marketing.moonpay.com/api/media/file/MP_Consumer_UIAnims_Mobile-Sell-HBC.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="flex flex-col flex-grow justify-between px-6 py-6 md:py-8 bg-[#F9F8FB]">
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-[20px] leading-[26px] font-medium tracking-[-0.2px] tabletHorizontal:text-[32px] tabletHorizontal:leading-[38px] tabletHorizontal:font-medium tabletHorizontal:tracking-[-0.48px] desktopLarge:text-[32px] desktopLarge:leading-[38px] desktopLarge:font-medium desktopLarge:tracking-[-0.48px] text-base-black leading-[130%] !text-[24px] desktop:whitespace-nowrap">Sell</h3>
                  <p className="text-[16px] tabletHorizontal:text-[20px] text-black/75">Sell crypto instantly at the best available rate directly to your bank, card or Bit-Fast Balance.</p>
                </div>
                <div className="w-full flex flex-row justify-start items-center mt-6">
                  <Link href="/sell-crypto" className="flex flex-row gap-1 justify-center items-center whitespace-nowrap text-ellipsis border rounded-full py-0 sm:px-4 px-3 min-h-[38px] leading-[38px] font-medium sm:text-[16px] text-[12px] tracking-[-0.08px] bg-base-black text-neutral-solid-50 hover:shadow-[inset_0_0_0_1000px_rgba(115,115,115,0.3)] active:shadow-[inset_0_0_0_1000px_rgba(115,115,115,0.2)] focus:bg-base-black disabled:opacity-20 border-transparent !text-[14px] !px-[24px] !py-[16px] !leading-[100%]">Sell Crypto</Link>
                </div>
              </div>
            </div>
            <div className="flex bg-base-card rounded-[32px] overflow-hidden flex-col h-full">
              <div className="w-full relative desktop:aspect-[432/324]">
                <video className="overflow-hidden mx-auto w-full" autoPlay loop muted playsInline>
                  <source src="https://payload-marketing.moonpay.com/api/media/file/MP_Consumer_UIAnims_Mobile-SendReceive-HBC.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="flex flex-col flex-grow justify-between px-6 py-6 md:py-8 bg-[#F9F8FB]">
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-[20px] leading-[26px] font-medium tracking-[-0.2px] tabletHorizontal:text-[32px] tabletHorizontal:leading-[38px] tabletHorizontal:font-medium tabletHorizontal:tracking-[-0.48px] desktopLarge:text-[32px] desktopLarge:leading-[38px] desktopLarge:font-medium desktopLarge:tracking-[-0.48px] text-base-black leading-[130%] !text-[24px] desktop:whitespace-nowrap">Send &amp; Receive </h3>
                  <p className="text-[16px] tabletHorizontal:text-[20px] text-black/75">Send &amp; receive crypto instantly with Bit-Fast Tags — no wallet addresses, no complications. </p>
                </div>
                <div className="w-full flex flex-row justify-start items-center mt-6">
                  <Link href="/p2p" className="flex flex-row gap-1 justify-center items-center whitespace-nowrap text-ellipsis border rounded-full py-0 sm:px-4 px-3 min-h-[38px] leading-[38px] font-medium sm:text-[16px] text-[12px] tracking-[-0.08px] bg-base-black text-neutral-solid-50 hover:shadow-[inset_0_0_0_1000px_rgba(115,115,115,0.3)] active:shadow-[inset_0_0_0_1000px_rgba(115,115,115,0.2)] focus:bg-base-black disabled:opacity-20 border-transparent !text-[14px] !px-[24px] !py-[16px] !leading-[100%]">Send and Receive</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="max-w-[100%] mx-auto px-0 py-0 w-full relative overflow-x-hidden pt-[65px] desktop:pt-[96px] bg-[#000] -mb-[1px]" data-testid="block-container">
          <div className="px-[16px] tabletLarge:px-[48px] desktop:!px-[64px] flex flex-col">
            <p className="text-[14px] desktop:!text-[20px] text-center text-[#FAF9F9BF] font-medium leading-[130%]">Trusted by millions of users across 180 countries.</p>
            <p className="w-full my-[16px] desktop:my-[32px] text-[#FAF9F9] text-center text-[61px] leading-[110%] font-medium tracking-[-1.225px] desktop:text-[184px] desktop:leading-[110%] desktop:tracking-[-3.689px]">35,000,000+</p>
            <p className="text-[14px] desktop:!text-[20px] text-center text-[#FAF9F9BF] font-medium leading-[130%] mb-[16px] desktop:mb-0 pb-16 desktop:pb-24">Verified accounts</p>
          </div>
        </section>

        {/* Globe Video Section */}
        <section className="relative w-full bg-[#000] flex flex-col items-center overflow-x-hidden">
          <video autoPlay loop muted playsInline className="w-full h-auto object-cover max-w-[1440px] mx-auto">
            <track kind="captions" srcLang="en" label="English" />
            <source src="/trusted.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </section>

        {/* Reviews Section */}
        <section className="w-full bg-[#f9f8f5] py-16 sm:py-24 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-[16px] tabletLarge:px-[48px] desktop:!px-[64px]">
            <div className="lg:hidden flex flex-col items-center mb-8">
              <h3 className="text-[28px] font-bold text-gray-900">Excellent since 2015</h3>
            </div>
            <div className="relative flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[32px] lg:text-[40px] font-bold hidden lg:flex relative text-gray-900 items-center">
                  💚 Users choose us
                </h2>
                {/* Arrow Controls (Visual only, native scroll manages actual movement) */}
                <div className="hidden lg:flex gap-2">
                  <div className="flex items-center justify-center w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-full transition-colors text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m11.3 4.3-7 7c-.1.1-.2.2-.2.3-.1.2-.1.5 0 .8.1.1.1.2.2.3l7 7c.4.4 1 .4 1.4 0s.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1H7.4l5.3-5.3c.2-.2.3-.4.3-.7s-.1-.5-.3-.7c-.4-.4-1-.4-1.4 0"></path></svg>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-full transition-colors text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="rotate-180"><path fill="currentColor" d="m11.3 4.3-7 7c-.1.1-.2.2-.2.3-.1.2-.1.5 0 .8.1.1.1.2.2.3l7 7c.4.4 1 .4 1.4 0s.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1H7.4l5.3-5.3c.2-.2.3-.4.3-.7s-.1-.5-.3-.7c-.4-.4-1-.4-1.4 0"></path></svg>
                  </div>
                </div>
              </div>
              
              <ReviewsSlider />
            </div>
          </div>
        </section>

        {/* Crypto Widgets Section */}
        <section className="w-full bg-[#f9f8f5] py-16 sm:py-24 pb-32">
          <div className="flex flex-row gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">

            {/* Popular Crypto Card */}
            <div className="px-4 py-6 rounded-[16px] border border-gray-200 min-w-[280px] w-[280px] sm:w-[340px] flex-none bg-white shadow-sm" data-tnav="Popular crypto">
              <div className="flex items-center place-content-between mb-5">
                <h2 className="text-[18px] font-bold text-gray-900 overflow-hidden" data-tnav="coin-section-title">Popular crypto</h2>
                <span className="text-[12px] text-gray-500 font-semibold">for 24h</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "BTC", src: "https://cdn.changelly.com/icons-colored/btc.png", price: "$60,646.06", change: "2.8%" },
                  { name: "XRPBSC", src: "https://cdn.changelly.com/icons-colored/xrpbsc.png", price: "$1.07", change: "3.29%" },
                  { name: "SOLBSC", src: "https://cdn.changelly.com/icons-colored/solbsc.png", price: "$67.24", change: "2.39%" },
                  { name: "HYPE", src: "https://cdn.changelly.com/icons-colored/hype.png", price: "$61.55", change: "1.55%" }
                ].map(coin => (
                  <div key={coin.name} className="flex place-content-between items-center h-10">
                    <div className="flex gap-2 items-center">
                      <img width="24" height="24" alt={coin.name} src={coin.src} loading="lazy" />
                      <span className="text-gray-900 text-[14px] font-bold">{coin.name}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[13px] text-gray-500">{coin.price}</span>
                      <div className="text-[13px] font-semibold flex items-center text-[#d91834]">
                        <span className="min-w-[52px] text-end">{coin.change}</span>
                        <div className="w-5 h-5 flex items-center justify-center rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" fill="none" viewBox="0 0 6 12"><path fill="currentColor" fillRule="evenodd" d="M3 .25a.75.75 0 0 1 .559.25l1.998 2.22a.75.75 0 0 1-1.114 1.004l-.693-.77V11a.75.75 0 0 1-1.5 0V2.954l-.693.77A.75.75 0 0 1 .443 2.72L2.44.502A.75.75 0 0 1 3 .25" clipRule="evenodd" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Gainers Card */}
            <div className="px-4 py-6 rounded-[16px] border border-gray-200 min-w-[280px] w-[280px] sm:w-[340px] flex-none bg-white shadow-sm" data-tnav="Top gainers">
              <div className="flex items-center place-content-between mb-5">
                <h2 className="text-[18px] font-bold text-gray-900 overflow-hidden" data-tnav="coin-section-title">Top gainers</h2>
                <span className="text-[12px] text-gray-500 font-semibold">for 24h</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "SLX", src: "https://cdn.changelly.com/icons-colored/slx.png", price: "$0.27027973", change: "34.95%" },
                  { name: "ATM", src: "https://cdn.changelly.com/icons-colored/atm.png", price: "$1.83", change: "31.48%" },
                  { name: "QUICK", src: "https://cdn.changelly.com/icons-colored/quick.png", price: "$0.00846407", change: "20.76%" },
                  { name: "GAIB", src: "https://cdn.changelly.com/icons-colored/gaib.png", price: "$0.0150201", change: "19.96%" }
                ].map(coin => (
                  <div key={coin.name} className="flex place-content-between items-center h-10">
                    <div className="flex gap-2 items-center">
                      <img width="24" height="24" alt={coin.name} src={coin.src} loading="lazy" />
                      <span className="text-gray-900 text-[14px] font-bold">{coin.name}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[13px] text-gray-500">{coin.price}</span>
                      <div className="text-[13px] font-semibold flex items-center text-[#1f9854]">
                        <span className="min-w-[52px] text-end">{coin.change}</span>
                        <div className="w-5 h-5 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" fill="none" viewBox="0 0 6 12"><path fill="currentColor" fillRule="evenodd" d="M3 .25a.75.75 0 0 1 .559.25l1.998 2.22a.75.75 0 0 1-1.114 1.004l-.693-.77V11a.75.75 0 0 1-1.5 0V2.954l-.693.77A.75.75 0 0 1 .443 2.72L2.44.502A.75.75 0 0 1 3 .25" clipRule="evenodd" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers Card */}
            <div className="px-4 py-6 rounded-[16px] border border-gray-200 min-w-[280px] w-[280px] sm:w-[340px] flex-none bg-white shadow-sm" data-tnav="Top losers">
              <div className="flex items-center place-content-between mb-5">
                <h2 className="text-[18px] font-bold text-gray-900 overflow-hidden" data-tnav="coin-section-title">Top losers</h2>
                <span className="text-[12px] text-gray-500 font-semibold">for 24h</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "MDAO", src: "https://cdn.changelly.com/icons-colored/mdao.png", price: "$0.01870107", change: "54.2%" },
                  { name: "IKA", src: "https://cdn.changelly.com/icons-colored/ika.png", price: "$0.00183485", change: "26.68%" },
                  { name: "BEAT", src: "https://cdn.changelly.com/icons-colored/beat.png", price: "$1.73", change: "25.94%" },
                  { name: "SKYAI", src: "https://cdn.changelly.com/icons-colored/skyai.png", price: "$0.25919347", change: "21.35%" }
                ].map(coin => (
                  <div key={coin.name} className="flex place-content-between items-center h-10">
                    <div className="flex gap-2 items-center">
                      <img width="24" height="24" alt={coin.name} src={coin.src} loading="lazy" />
                      <span className="text-gray-900 text-[14px] font-bold">{coin.name}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[13px] text-gray-500">{coin.price}</span>
                      <div className="text-[13px] font-semibold flex items-center text-[#d91834]">
                        <span className="min-w-[52px] text-end">{coin.change}</span>
                        <div className="w-5 h-5 flex items-center justify-center rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" fill="none" viewBox="0 0 6 12"><path fill="currentColor" fillRule="evenodd" d="M3 .25a.75.75 0 0 1 .559.25l1.998 2.22a.75.75 0 0 1-1.114 1.004l-.693-.77V11a.75.75 0 0 1-1.5 0V2.954l-.693.77A.75.75 0 0 1 .443 2.72L2.44.502A.75.75 0 0 1 3 .25" clipRule="evenodd" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Subscribe Section */}
        <section className="w-full bg-[#f9f8f5] pb-24 px-4">
          <SubscribeForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
