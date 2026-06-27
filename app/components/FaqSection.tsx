"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How to buy cryptocurrency?",
    a: "BitFast Xchange makes it easy to buy crypto instantly. Users can buy crypto with a credit card (Visa, Mastercard), bank transfer, or Apple Pay. Our marketplace partners with the leading fiat gateways to offer deep liquidity and the best execution prices on the market. Can't decide which cryptocurrency to buy? BitFast Xchange supports a wide range of crypto assets, including the most popular ones. Buy Bitcoin, Ethereum, Ripple, and other cryptos with ease. Just sign up for a BitFast Xchange account, choose the cryptocurrency you would like to purchase, select the best offer provided, enter the address of your digital wallet, and voilà! Now, you are a proud crypto owner.",
  },
  {
    q: "Who are BitFast Xchange's payment partners?",
    a: "BitFast Xchange supports over 100 fiat currencies. So, if you would like to purchase crypto with fiat, you can buy crypto online with your native currency at any time. We work closely with the leading fiat-to-crypto providers to offer you a range of execution prices that will suit you the most. We are constantly monitoring the market to extend our partner list.",
  },
  {
    q: "What is the minimum order amount I can purchase crypto with?",
    a: "The minimum order amount may vary since it depends on the chosen fiat gateway. Usually, the minimum order starts at $20 (or the equivalent amount in your local fiat currency).",
  },
  {
    q: "How long does it take to receive my cryptocurrency?",
    a: "Transactions made with a credit card (Visa, Mastercard), bank transfer, or Apple Pay usually take several minutes. However, sometimes the transaction might be processed for a few hours. The time estimation of the particular transaction depends on several factors, including the number of orders at the exchange, additional security checks, a chosen payment method, blockchain congestion, etc.",
  },
  {
    q: "How long does the KYC verification take?",
    a: "Since most verifications are processed automatically, it might take several minutes to pass the KYC procedure. However, if a user submits a document that does not meet the requirements, the verification process might take longer since the verification will be processed manually.",
  },
  {
    q: "What are your supported countries, states, and territories?",
    a: "Please refer to clause 5 (Eligibility) of the Terms of Use for more details.",
  },
  {
    q: "How can I contact you?",
    a: (<>You can contact us at any time via the Live chat below. Both the Support team and the BitFast Xchange platform work 24/7 and will be glad to help. You can also send us an email at <a className="underline text-content-link" href="mailto:support@bitfast-xchange.com">support@bitfast-xchange.com</a>.</>),
  },
];

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white text-[14px] text-gray-900 p-6 rounded-[20px] transition-shadow hover:shadow-sm">
      <div
        role="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="group w-full flex gap-4 items-center text-left cursor-pointer font-semibold"
        data-tnav="faq-section-question"
      >
        <h3 className="m-0 p-0 text-[16px] font-semibold text-gray-900">{q}</h3>
        <div className="lg:group-hover:bg-gray-100 p-2 rounded-[4px] ml-auto shrink-0 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className={`text-gray-400 transform-gpu transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
          >
            <path
              fill="currentColor"
              d="M19 11h-6V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1"
            />
          </svg>
        </div>
      </div>

      <div
        data-tnav="faq-section-answer"
        aria-hidden={!open}
        className={`text-gray-500 grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="text-[14px] leading-[22px] text-gray-500 mt-5 font-normal">{a}</div>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <div className="w-full max-w-[1248px] px-6 mt-24 mb-16">
      <h3
        className="text-[28px] lg:text-[34px] font-bold text-gray-900 mb-6"
        data-tnav="faq-section-title"
      >
        FAQ Buy
      </h3>
      <div className="flex flex-col gap-3">
        {faqs.map((item, i) => (
          <FaqItem key={i} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  );
}
