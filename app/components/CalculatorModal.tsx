"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CalculatorModal({ defaultMode = "buy" }: { defaultMode?: "buy" | "sell" }) {
  const [mode, setMode] = useState<"buy" | "sell">(defaultMode);
  const [sendAmount, setSendAmount] = useState<string>(defaultMode === "sell" ? "0.01" : "500");
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [step, setStep] = useState<number>(1);
  const [address, setAddress] = useState<string>("");
  const [isCheckingAddress, setIsCheckingAddress] = useState<boolean>(false);
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string>("");
  const [paymentOption, setPaymentOption] = useState<string>("cashapp");
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const data = await res.json();
        if (data && data.bitcoin && data.bitcoin.usd) {
          setBtcPrice(data.bitcoin.usd);
        }
      } catch (error) {
        console.error("Failed to fetch price", error);
      }
    }
    fetchPrice();
    // Optional: Refresh price every 60 seconds
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleModeChange = (newMode: "buy" | "sell") => {
    setMode(newMode);
    setSendAmount(newMode === "buy" ? "500" : "0.01");
    setAddress("");
    setIsAddressValid(false);
    setAddressError("");
    setStep(1);
  };

  useEffect(() => {
    if (!address) {
      setIsCheckingAddress(false);
      setIsAddressValid(false);
      setAddressError("");
      return;
    }

    setIsCheckingAddress(true);
    setIsAddressValid(false);
    setAddressError("");

    const timer = setTimeout(() => {
      setIsCheckingAddress(false);
      if (mode === "buy") {
        // Validates P2PKH (1...), P2SH (3...), and Bech32 (bc1...)
        const isValidBtc = /^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/.test(address);
        if (isValidBtc) {
          setIsAddressValid(true);
        } else {
          setIsAddressValid(false);
          setAddressError("Invalid BTC address format");
        }
      } else {
        // Sell mode: Validate that receiving details are provided
        const isValid = address.trim().length >= 3;
        if (isValid) {
          setIsAddressValid(true);
        } else {
          setIsAddressValid(false);
          setAddressError("Please enter valid payment details");
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [address, mode]);

  const parsedAmount = parseFloat(sendAmount);
  const receiveAmount = !isNaN(parsedAmount) && btcPrice 
    ? (mode === "buy" ? (parsedAmount / btcPrice).toFixed(8) : (parsedAmount * btcPrice).toFixed(2))
    : "0.00";

  return (
    <div className="w-full max-w-[480px] font-sans">
      <div className="flex mb-[-8px] relative z-0">
        <button 
          onClick={() => handleModeChange("buy")}
          className={`flex-1 py-4 pt-5 pb-6 text-center text-sm font-medium rounded-tl-[16px] transition-all duration-200 ${
            mode === "buy" 
              ? "text-gray-900 bg-white relative z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]" 
              : "text-gray-500 hover:text-gray-900 bg-[#f0f2f7]"
          }`}
        >
          Buy
        </button>
        <button 
          onClick={() => handleModeChange("sell")}
          className={`flex-1 py-4 pt-5 pb-6 text-center text-sm font-medium rounded-tr-[16px] transition-all duration-200 ${
            mode === "sell" 
              ? "text-gray-900 bg-white relative z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]" 
              : "text-gray-500 hover:text-gray-900 bg-[#f0f2f7]"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 pt-8 flex flex-col gap-6 relative z-10">

        {step === 1 && (
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-0 sm:gap-1">
              <div className="flex items-center gap-1 sm:gap-2 min-h-[46px] sm:min-h-[50px] pt-1.5 sm:pt-2.5" data-tnav="processing-progress">
                <div className="flex items-center gap-2 text-xl font-bold sm:text-[22px] text-content-primary">
                  <span className="text-interactive-accent" data-tnav="step-counter">1/3</span>
                  <span data-tnav="step-name">Select pair</span>
                </div>
                <button onClick={() => setShowHelp(true)} data-tnav="processing-steps-button" className="w-6 h-6 p-2 box-content text-content-secondary hover:text-icon-active ml-auto" title="Info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13 15.998a1 1 0 1 1-2 0 1 1 0 0 1 2 0M13 14h-2c0-1.702.625-2.43 2.053-3.144.822-.411.947-.558.947-1.356 0-.944-.723-1.5-2-1.5a2 2 0 0 0-2 2 1 1 0 1 1-2 0 4 4 0 0 1 4-4c2.284 0 4 1.32 4 3.5 0 1.702-.625 2.43-2.053 3.144-.822.411-.947.558-.947 1.356"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11m0-2a9 9 0 1 0 0-18 9 9 0 0 0 0 18" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <div className="pb-1.5 flex gap-1 w-full mt-2">
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-interactive-accent">
                  <div className="transform-gpu transition-transform ease-in duration-200 w-full h-full bg-interactive-accent translate-x-0"></div>
                </div>
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-interactive-accent opacity-20">
                  <div className="transform-gpu transition-transform ease-in duration-200 w-full h-full bg-interactive-accent -translate-x-full"></div>
                </div>
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-interactive-accent opacity-20"></div>
              </div>
            </div>

            <div className="Form_wrapper__Ascg_ flex flex-col gap-4 mt-2" data-tnav="calculator-form">
              <div className="Form_root__g17x4">
                <div className="CurrencyAmountInput_wrapper__r7pj0 border border-gray-200 hover:border-gray-300 transition-colors rounded-[12px] bg-[#f8f9fa]">
                  <span className="CurrencyAmountInput_border__PUypv"></span>
                  <div className="CurrencyAmountInput_root__Yd4Uk p-4 relative rounded-8" data-tnav="input-amount-from">
                    <p className="text-content-secondary text-[13px] mb-2" data-tnav="input-amount-main-label">You send</p>
                    <div className="CurrencyAmountInput_input-with-logo__RmtJY flex items-center gap-3">
                      <img 
                        src={mode === "buy" ? "https://cdn.changelly.com/icons-colored/usd.png" : "https://cdn.changelly.com/icons-colored/btc.png"} 
                        alt={mode === "buy" ? "usd logo" : "btc logo"} 
                        aria-hidden="true" 
                        className="w-10 h-10 object-contain Currency_ticker-img__FonRQ CurrencyAmountInput_logo__W968X" 
                      />
                      <div className="CurrencyAmountInput_currency-input-wrp__o9iIl flex-1 flex flex-col justify-center">
                        <div className="CurrencyAmountInput_ticker-amount-wrp___zMWo flex justify-between items-center w-full">
                          <div className="Currency_pointer__2u9oi CurrencyAmountInput_ticker__JOguU flex items-center cursor-pointer" data-tnav="currency-ticker">
                            <p className="text-xl font-semibold CurrencyAmountInput_ticker-text__F8zKa calculator-ticker overflow-ellipsis whitespace-nowrap">
                              {mode === "buy" ? "USD" : "BTC"}
                            </p>
                            <i className="inline-flex items-center justify-center ml-1 text-icon-default">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeLinejoin="round" d="M12.138 5.862a.667.667 0 0 0-.943 0L8 9.057 4.805 5.862a.667.667 0 1 0-.943.943l3.667 3.666a.667.667 0 0 0 .942 0l3.667-3.666a.667.667 0 0 0 0-.943Z" clipRule="evenodd"></path>
                              </svg>
                            </i>
                          </div>
                          <input
                            placeholder="You send"
                            className="bg-transparent text-right text-2xl font-semibold outline-none w-1/2 CurrencyAmountInput_amount__L46MZ CurrencyAmountInput_ticker-text__F8zKa cursor-text text-content-primary"
                            readOnly={false}
                            data-tnav="input-amount"
                            type="text"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                          />
                        </div>
                        <div className="CurrencyAmountInput_label-wrp__Bh4ew mt-0.5">
                          <div className="flex items-center w-full overflow-hidden">
                            <p className="text-[13px] overflow-hidden overflow-ellipsis whitespace-normal text-content-secondary" data-tnav="currency-fullname">
                              {mode === "buy" ? "US Dollar" : "Bitcoin"}
                            </p>
                            {mode === "sell" && (
                              <span data-component="blockchain-tag" data-tnav="currency-protocol" className="ml-2 bg-[#fdf3e8] text-[#f7931a] inline-flex text-nowrap text-[11px] font-semibold px-1.5 py-0.5 rounded-sm">BTC</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="CurrencyAmountInput_wrapper__r7pj0 CurrencyAmountInput_readonly__yrYGA border border-gray-200 rounded-[12px] bg-white">
                  <span className="CurrencyAmountInput_border__PUypv"></span>
                  <div className="CurrencyAmountInput_root__Yd4Uk p-4 relative rounded-8" data-tnav="input-amount-to">
                    <p className="text-content-secondary text-[13px] mb-2" data-tnav="input-amount-main-label">You get</p>
                    <div className="CurrencyAmountInput_input-with-logo__RmtJY flex items-center gap-3">
                      <img 
                        src={mode === "buy" ? "https://cdn.changelly.com/icons-colored/btc.png" : "https://cdn.changelly.com/icons-colored/usd.png"} 
                        alt={mode === "buy" ? "btc logo" : "usd logo"} 
                        aria-hidden="true" 
                        className="w-10 h-10 object-contain Currency_ticker-img__FonRQ CurrencyAmountInput_logo__W968X" 
                      />
                      <div className="CurrencyAmountInput_currency-input-wrp__o9iIl flex-1 flex flex-col justify-center">
                        <div className="CurrencyAmountInput_ticker-amount-wrp___zMWo flex justify-between items-center w-full">
                          <div className="Currency_pointer__2u9oi CurrencyAmountInput_ticker__JOguU flex items-center cursor-pointer" data-tnav="currency-ticker">
                            <p className="text-xl font-semibold CurrencyAmountInput_ticker-text__F8zKa calculator-ticker overflow-ellipsis whitespace-nowrap">
                              {mode === "buy" ? "BTC" : "USD"}
                            </p>
                            <i className="inline-flex items-center justify-center ml-1 text-icon-default">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeLinejoin="round" d="M12.138 5.862a.667.667 0 0 0-.943 0L8 9.057 4.805 5.862a.667.667 0 1 0-.943.943l3.667 3.666a.667.667 0 0 0 .942 0l3.667-3.666a.667.667 0 0 0 0-.943Z" clipRule="evenodd"></path>
                              </svg>
                            </i>
                          </div>
                          {btcPrice ? (
                            <input
                              placeholder="You get"
                              className="bg-transparent text-right text-xl font-semibold outline-none w-[60%] CurrencyAmountInput_amount__L46MZ CurrencyAmountInput_ticker-text__F8zKa cursor-not-allowed text-content-primary"
                              readOnly={true}
                              data-tnav="input-amount"
                              type="text"
                              value={`~ ${receiveAmount}`}
                            />
                          ) : (
                            <div className="w-1/2 h-8 bg-gray-100 rounded-md animate-pulse"></div>
                          )}
                        </div>
                        <div className="CurrencyAmountInput_label-wrp__Bh4ew mt-0.5">
                          <div className="flex items-center w-full overflow-hidden">
                            <p className="text-[13px] overflow-hidden overflow-ellipsis whitespace-normal text-content-secondary" data-tnav="currency-fullname">
                              {mode === "buy" ? "Bitcoin" : "US Dollar"}
                            </p>
                            {mode === "buy" && (
                              <span data-component="blockchain-tag" data-tnav="currency-protocol" className="ml-2 bg-[#fdf3e8] text-[#f7931a] inline-flex text-nowrap text-[11px] font-semibold px-1.5 py-0.5 rounded-sm">BTC</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)} 
              className={`mt-4 relative inline-flex box-border items-center justify-center rounded-full appearance-none cursor-pointer select-none align-middle whitespace-nowrap font-semibold gap-2 outline-offset-[-2px] h-14 text-[16px] px-4 w-full transition-colors ${
                mode === "buy" 
                  ? "text-button-primary-content bg-button-primary border border-button-primary hover:bg-button-primary-hover"
                  : "text-white bg-[#ff8c8c] border border-[#ff8c8c] hover:bg-[#ff7373]"
              }`} 
              data-tnav="next-step-button" 
              role="button"
            >
              <span className="inline-flex">Next step</span>
            </button>

          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-stretch w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 min-h-[50px] pt-1" data-tnav="processing-progress">
                <button onClick={() => setStep(1)} className="w-6 h-6 p-2 -ml-2 box-content text-gray-500 hover:text-gray-900 transition-colors" data-tnav="back-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m11.3 4.3-7 7c-.1.1-.2.2-.2.3-.1.2-.1.5 0 .8.1.1.1.2.2.3l7 7c.4.4 1 .4 1.4 0s.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1H7.4l5.3-5.3c.2-.2.3-.4.3-.7s-.1-.5-.3-.7c-.4-.4-1-.4-1.4 0"></path>
                  </svg>
                </button>
                <div className="flex items-center gap-2 text-[22px] font-bold text-gray-900">
                  <span className="text-[#7592f0]" data-tnav="step-counter">2/3</span>
                  <span data-tnav="step-name">Enter details</span>
                </div>
                <button onClick={() => setShowHelp(true)} data-tnav="processing-steps-button" className="w-6 h-6 p-2 box-content text-gray-500 hover:text-gray-900 ml-auto" title="Info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13 15.998a1 1 0 1 1-2 0 1 1 0 0 1 2 0M13 14h-2c0-1.702.625-2.43 2.053-3.144.822-.411.947-.558.947-1.356 0-.944-.723-1.5-2-1.5a2 2 0 0 0-2 2 1 1 0 1 1-2 0 4 4 0 0 1 4-4c2.284 0 4 1.32 4 3.5 0 1.702-.625 2.43-2.053 3.144-.822.411-.947.558-.947 1.356"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11m0-2a9 9 0 1 0 0-18 9 9 0 0 0 0 18" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <div className="pb-1.5 flex gap-1 w-full mt-2">
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-[#7592f0]">
                  <div className="transform-gpu transition-transform ease-in duration-200 w-full h-full bg-[#7592f0] translate-x-0"></div>
                </div>
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-[#7592f0]">
                  <div className="transform-gpu transition-transform ease-in duration-200 w-full h-full bg-[#7592f0] translate-x-0"></div>
                </div>
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-[#7592f0] opacity-20">
                  <div className="transform-gpu transition-transform ease-in duration-200 w-full h-full bg-[#7592f0] -translate-x-full"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-6">
              <div className="flex gap-2 items-center" data-tnav="transaction-summary">
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-row gap-1 text-[14px] text-gray-500 font-medium mb-1 whitespace-nowrap">
                    <span>You send</span><span>{mode === "buy" ? "USD" : "BTC"}</span>
                  </div>
                  <div className="text-[20px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{sendAmount}</div>
                  <div className="flex items-center w-full mt-1">
                    <p className="text-[12px] text-gray-500 whitespace-nowrap">{mode === "buy" ? "US Dollar" : "Bitcoin"}</p>
                    {mode === "sell" && (
                      <span className="ml-2 bg-[#fdf3e8] text-[#f7931a] inline-flex text-nowrap text-[10px] font-semibold px-1 rounded-[2px]">BTC</span>
                    )}
                  </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="w-5 h-5 text-gray-400 rotate-180 flex-shrink-0 mx-2">
                  <path fill="currentColor" d="m11.3 4.3-7 7c-.1.1-.2.2-.2.3-.1.2-.1.5 0 .8.1.1.1.2.2.3l7 7c.4.4 1 .4 1.4 0s.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1H7.4l5.3-5.3c.2-.2.3-.4.3-.7s-.1-.5-.3-.7c-.4-.4-1-.4-1.4 0"></path>
                </svg>

                <div className="flex flex-col min-w-0">
                  <div className="flex flex-row gap-1 text-[14px] text-gray-500 font-medium mb-1 whitespace-nowrap">
                    <span>You get</span><span>{mode === "buy" ? "BTC" : "USD"}</span>
                  </div>
                  <div className="text-[20px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">~ {receiveAmount}</div>
                  <div className="flex items-center w-full mt-1">
                    <p className="text-[12px] text-gray-500 whitespace-nowrap">{mode === "buy" ? "Bitcoin" : "US Dollar"}</p>
                    {mode === "buy" && (
                      <span className="ml-2 bg-[#fdf3e8] text-[#f7931a] inline-flex text-nowrap text-[10px] font-semibold px-1 rounded-[2px]">BTC</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center" data-tnav="fiat-provider">
                <div className="relative">
                  <div className="h-5 w-5 rounded-full overflow-hidden">
                    <img src={mode === "buy" ? "https://cdn.changelly.com/icons-colored/usd.png" : "https://cdn.changelly.com/icons-colored/btc.png"} alt="logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 border-2 rounded-full border-white h-5 w-5 overflow-hidden">
                    <img src={mode === "buy" ? "https://cdn.changelly.com/icons-colored/btc.png" : "https://cdn.changelly.com/icons-colored/usd.png"} alt="logo" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex items-center gap-1 pl-3 text-[14px] font-medium text-gray-700">
                  <span>via Switchere</span>
                  <div className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">S</div>
                </div>
                <div className="flex gap-1 items-center ml-2">
                  <div className="text-[#1a1f71] font-bold italic text-[12px]">VISA</div>
                  <div className="w-4 h-4 rounded-full bg-[#ff5f00] relative"><div className="w-4 h-4 rounded-full bg-[#eb001b] absolute -left-2 opacity-80 mix-blend-multiply"></div></div>
                </div>
              </div>

              <div className="cursor-pointer flex gap-2 items-center mt-2">
                <span className="text-[14px] font-semibold text-gray-900">Transaction details</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="w-5 h-5 text-gray-900">
                  <path fill="currentColor" fillRule="evenodd" d="M5.793 9.793a1 1 0 0 1 1.414 0L12 14.586l4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-5.5-5.5a1 1 0 0 1 0-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>

              <div className="relative mt-2">
                <div className={`absolute -top-3 left-3 text-[11px] font-semibold px-2 rounded-[4px] z-10 ${
                  mode === "buy" ? "bg-[#fdf3e8] text-[#f7931a]" : "bg-blue-50 text-blue-600"
                }`}>
                  {mode === "buy" ? "BTC" : "USD"}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={mode === "buy" ? "Destination address (BTC)" : "Your Cash App tag, Zelle email/phone, or bank details"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full h-14 pl-4 pr-12 rounded-[12px] border ${addressError && !isCheckingAddress ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500 focus:ring-gray-500'} text-[16px] text-gray-900 placeholder-gray-400 outline-none focus:ring-1 transition-colors`}
                  />
                  {mode === "buy" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M2.83 6.03a.83.83 0 0 0 .84-.83l-.04-1.32a.2.2 0 0 1 .21-.21H5.2A.83.83 0 1 0 5.2 2H3.63A1.63 1.63 0 0 0 2 3.63V5.2a.83.83 0 0 0 .83.83m2.37 14.3-1.32.03a.2.2 0 0 1-.21-.2V18.8a.83.83 0 0 0-1.67 0v1.57A1.63 1.63 0 0 0 3.63 22H5.2a.83.83 0 1 0 0-1.67M18.8 2h1.57A1.63 1.63 0 0 1 22 3.63V5.2a.83.83 0 1 1-1.67 0V3.84a.2.2 0 0 0-.13-.19.2.2 0 0 0-.08-.01l-1.32.03a.83.83 0 1 1 0-1.67m2.37 15.97a.83.83 0 0 0-.84.83l.04 1.32a.21.21 0 0 1-.21.21H18.8a.83.83 0 1 0 0 1.67h1.57A1.63 1.63 0 0 0 22 20.37V18.8a.83.83 0 0 0-.83-.83M6.58 5.75h2.09c.23 0 .41.19.41.42v2.08c0 .23-.18.42-.41.42H6.58a.42.42 0 0 1-.41-.42V6.17c0-.23.18-.42.41-.42m10.84 0h-2.09a.42.42 0 0 0-.41.42v2.08c0 .23.18.42.41.42h2.09c.23 0 .41-.19.41-.42V6.17a.42.42 0 0 0-.41-.42m-2.09 9.58h2.09c.23 0 .41.19.41.42v2.08c0 .23-.18.42-.41.42h-2.09a.42.42 0 0 1-.41-.42v-2.08c0-.23.18-.42.41-.42m-6.66 0H6.58a.42.42 0 0 0-.41.42v2.08c0 .23.18.42.41.42h2.09c.23 0 .41-.19.41-.42v-2.08a.42.42 0 0 0-.41-.42m2.52-6.63a.63.63 0 0 1-1.06-.44V6.38a.63.63 0 0 1 .62-.63h2.44a.62.62 0 0 1 0 1.25h-1.6a.2.2 0 0 0-.21.2v1.06c0 .16-.07.32-.19.44m2.06-.76a.62.62 0 0 0-.63.63v2.79a.63.63 0 0 0 1.26 0v-2.8a.62.62 0 0 0-.63-.62m-2.06 5.96a.63.63 0 0 1-.44.18H6.58a.63.63 0 0 1 0-1.25h3.34a.2.2 0 0 0 .2-.2v-1.18a.62.62 0 1 1 1.26 0v2c0 .17-.07.33-.19.45m2 3.1h-1.6a.2.2 0 0 1-.21-.2v-1.2a.62.62 0 1 0-1.26 0v2.02a.63.63 0 0 0 .63.62h2.44a.62.62 0 1 0 0-1.25Zm-4.94-5.83H6.58a.63.63 0 0 1 0-1.25h1.67a.63.63 0 1 1 0 1.25m7.08 0h2.09a.63.63 0 0 0 0-1.25h-2.09a.63.63 0 0 0 0 1.25m-2.5 1.66h4.59a.63.63 0 0 1 0 1.25h-4.59a.62.62 0 1 1 0-1.25" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {addressError && !isCheckingAddress && (
                  <p className="text-red-500 text-[13px] mt-1.5 font-medium ml-1 animate-fadeIn">{addressError}</p>
                )}
                {isAddressValid && !isCheckingAddress && (
                  <p className="text-green-600 text-[13px] mt-1.5 font-medium ml-1 flex items-center gap-1 animate-fadeIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {mode === "buy" ? "Valid BTC Address" : "Payment details entered"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-10">
              <p className="text-[14px] text-gray-600">
                By clicking the button below, I agree to the <a className="border-b border-b-[#4159aa] font-semibold text-[#4159aa] hover:text-[#2b3a6e] transition-colors whitespace-nowrap" target="_blank" rel="noreferrer" href="/terms-of-use">Terms of Use</a>, <a className="border-b border-b-[#4159aa] font-semibold text-[#4159aa] hover:text-[#2b3a6e] transition-colors whitespace-nowrap" target="_blank" rel="noreferrer" href="/privacy-policy">Privacy Policy</a> and <a className="border-b border-b-[#4159aa] font-semibold text-[#4159aa] hover:text-[#2b3a6e] transition-colors whitespace-nowrap" target="_blank" rel="noreferrer" href="/aml-kyc">AML/KYC</a>
              </p>

              <button
                onClick={() => setStep(3)}
                className={`relative inline-flex box-border items-center justify-center rounded-full font-semibold h-14 text-[16px] px-4 w-full transition-all ${
                  isAddressValid
                    ? (mode === "buy" ? "bg-[#b1ff8c] text-[#0a0a0a] hover:bg-[#a4f77d] cursor-pointer" : "bg-[#ff8c8c] text-white hover:bg-[#ff7373] cursor-pointer")
                    : (mode === "buy" ? "bg-[#b1ff8c] text-[#0a0a0a] opacity-40 cursor-not-allowed" : "bg-[#ff8c8c] text-white opacity-40 cursor-not-allowed")
                }`}
                disabled={!isAddressValid || isCheckingAddress}
              >
                {isCheckingAddress ? (
                  <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${mode === "buy" ? "border-gray-600" : "border-white"}`}></div>
                ) : (
                  "Next step"
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-stretch w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 min-h-[50px] pt-1" data-tnav="processing-progress">
                <button onClick={() => setStep(2)} className="w-6 h-6 p-2 -ml-2 box-content text-gray-500 hover:text-gray-900 transition-colors" data-tnav="back-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m11.3 4.3-7 7c-.1.1-.2.2-.2.3-.1.2-.1.5 0 .8.1.1.1.2.2.3l7 7c.4.4 1 .4 1.4 0s.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1H7.4l5.3-5.3c.2-.2.3-.4.3-.7s-.1-.5-.3-.7c-.4-.4-1-.4-1.4 0"></path>
                  </svg>
                </button>
                <div className="flex items-center gap-2 text-[22px] font-bold text-gray-900">
                  <span className="text-[#7592f0]" data-tnav="step-counter">3/3</span>
                  <span data-tnav="step-name">Make payment</span>
                </div>
                <button onClick={() => setShowHelp(true)} data-tnav="processing-steps-button" className="w-6 h-6 p-2 box-content text-gray-500 hover:text-gray-900 ml-auto" title="Info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13 15.998a1 1 0 1 1-2 0 1 1 0 0 1 2 0M13 14h-2c0-1.702.625-2.43 2.053-3.144.822-.411.947-.558.947-1.356 0-.944-.723-1.5-2-1.5a2 2 0 0 0-2 2 1 1 0 1 1-2 0 4 4 0 0 1 4-4c2.284 0 4 1.32 4 3.5 0 1.702-.625 2.43-2.053 3.144-.822.411-.947.558-.947 1.356"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11m0-2a9 9 0 1 0 0-18 9 9 0 0 0 0 18" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <div className="pb-1.5 flex gap-1 w-full mt-2">
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-[#7592f0]">
                  <div className="transform-gpu transition-transform ease-in duration-200 w-full h-full bg-[#7592f0] translate-x-0"></div>
                </div>
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-[#7592f0]">
                  <div className="transform-gpu transition-transform ease-in duration-200 w-full h-full bg-[#7592f0] translate-x-0"></div>
                </div>
                <div className="h-[3px] rounded-full relative w-full overflow-hidden bg-[#7592f0]">
                  <div className="transform-gpu transition-transform ease-in duration-200 w-full h-full bg-[#7592f0] translate-x-0"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-2">
              <h3 className="text-[18px] font-semibold text-gray-900">{mode === "buy" ? "Transaction in progress" : "Payout options"}</h3>
              <p className="text-[14px] text-gray-500">{mode === "buy" ? "Complete your payment on the provider's side" : "Choose where you want to receive your fiat funds"}</p>
            </div>

            <div className="border border-gray-200 rounded-[12px] p-4 flex flex-col gap-5 mt-2">
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-[13px] text-gray-500 mb-2">{mode === "buy" ? "Select payment method" : "Select receiving method"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { id: "cashapp", label: "Cashapp", icon: "/cashapp.svg" },
                  { id: "zelle", label: "Zelle", icon: "/zelle.svg" },
                  { id: "wire", label: "Wire Transfer", icon: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png" }
                ].map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-3 rounded-[12px] border cursor-pointer transition-all ${paymentOption === option.id
                        ? "border-[#7592f0] bg-[#f0f4ff]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center p-1">
                        <img src={option.icon} alt={option.label} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[15px] font-semibold text-gray-900">{option.label}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentOption === option.id ? "border-[#7592f0]" : "border-gray-300"
                      }`}>
                      {paymentOption === option.id && <div className="w-2.5 h-2.5 rounded-full bg-[#7592f0]"></div>}
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      className="hidden"
                      checked={paymentOption === option.id}
                      onChange={() => setPaymentOption(option.id)}
                    />
                  </label>
                ))}
              </div>

              <div className="flex justify-between items-center w-full mt-2 pt-4 border-t border-gray-100">
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-row gap-1 text-[13px] text-gray-500 font-medium mb-1 whitespace-nowrap">
                    <span>You send</span>
                  </div>
                  <div className="flex items-center gap-1 text-[16px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    <img 
                      src={mode === "buy" ? "https://cdn.changelly.com/icons-colored/usd.png" : "https://cdn.changelly.com/icons-colored/btc.png"} 
                      alt="send logo" 
                      className="w-4 h-4 object-cover" 
                    />
                    {sendAmount} {mode === "buy" ? "USD" : "BTC"}
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex flex-row gap-1 text-[13px] text-gray-500 font-medium mb-1 whitespace-nowrap">
                    <span>You get</span>
                  </div>
                  <div className="flex items-center gap-1 text-[16px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    <img 
                      src={mode === "buy" ? "https://cdn.changelly.com/icons-colored/btc.png" : "https://cdn.changelly.com/icons-colored/usd.png"} 
                      alt="get logo" 
                      className="w-4 h-4 object-cover" 
                    />
                    ~ {receiveAmount} {mode === "buy" ? "BTC" : "USD"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const finalAmount = mode === "buy" ? sendAmount : receiveAmount;
                  router.push(`/p2p?amount=${finalAmount}&fiat=USD&crypto=BTC&method=${paymentOption}&mode=${mode}`);
                }}
                className={`mt-2 relative inline-flex box-border items-center justify-center border rounded-full appearance-none cursor-pointer select-none align-middle whitespace-nowrap font-semibold gap-2 outline-offset-[-2px] h-14 text-[16px] px-4 w-full transition-colors ${
                  mode === "buy"
                    ? "text-button-primary-content bg-button-primary border-button-primary hover:bg-button-primary-hover"
                    : "text-white bg-[#ff8c8c] border-[#ff8c8c] hover:bg-[#ff7373]"
                }`}
              >
                <span className="inline-flex">{mode === "buy" ? "Proceed to payment" : "Find P2P Buyers"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full sm:max-w-[440px] rounded-t-[24px] sm:rounded-[24px] shadow-2xl flex flex-col transform-gpu">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-gray-900">{mode === "buy" ? "Crypto purchase steps" : "Crypto selling steps"}</h2>
              <button onClick={() => setShowHelp(false)} className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 pb-8 flex flex-col gap-6">

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#eafdf0] text-[#00d44b] font-bold flex items-center justify-center flex-shrink-0">1</div>
                  <div className="w-[2px] h-full bg-gray-100 my-1"></div>
                </div>
                <div className="pb-4">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">{mode === "buy" ? "Set the pair to buy" : "Set the pair to sell"}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {mode === "buy" 
                      ? "Select the crypto you would like to buy and the fiat currency you want to purchase crypto with."
                      : "Select the crypto you want to sell and the fiat currency you want to receive."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#eafdf0] text-[#00d44b] font-bold flex items-center justify-center flex-shrink-0">2</div>
                  <div className="w-[2px] h-full bg-gray-100 my-1"></div>
                </div>
                <div className="pb-4">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">{mode === "buy" ? "Enter your wallet address" : "Enter receiving details"}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {mode === "buy"
                      ? "Enter your crypto wallet address to which your cryptocurrency will be sent"
                      : "Enter your Cash App tag, Zelle details or bank accounts to receive payments"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#eafdf0] text-[#00d44b] font-bold flex items-center justify-center flex-shrink-0">3</div>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">{mode === "buy" ? "Make payment" : "Submit order"}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {mode === "buy"
                      ? "You will be redirected to our P2P marketplace to match with a seller and pay."
                      : "You will be redirected to our P2P marketplace to match with a buyer and lock your BTC in escrow."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
