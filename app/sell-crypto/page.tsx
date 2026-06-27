import CalculatorModal from "../components/CalculatorModal";
import WalletLogos from "../components/WalletLogos";
import HowToBuy from "../components/HowToBuy";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

export default function SellCryptoPage() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-gradient-to-br from-[#fff0f0] via-[#f2fafe] to-[#fcfcfc]">
      <main className="flex w-full flex-col items-center justify-start pt-8 pb-24 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sell Crypto</h1>
          <p className="text-gray-500">Fast, secure, and simple.</p>
        </div>
        <CalculatorModal defaultMode="sell" />
        <WalletLogos />
        <HowToBuy />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
