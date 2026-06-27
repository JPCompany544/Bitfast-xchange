export default function HowToBuy() {
  return (
    <div className="w-full lg:mx-auto max-w-[1248px] px-6 mt-24 mb-16 font-sans">
      <h3 className="text-3xl lg:text-[40px] font-bold text-gray-900 mb-2 text-center sm:text-left" data-tnav="how-to-section-title">
        How to buy cryptocurrency
      </h3>

      <div className="pt-10 grid gap-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="pb-4 flex flex-col items-center text-center sm:items-start sm:text-left">
          <h2 className="pb-2 text-5xl font-bold text-base-blue mb-2">1</h2>
          <h3 className="text-[22px] font-bold text-gray-900 mb-3" data-tnav="how-to-card-title">Set the pair to buy</h3>
          <p className="text-[16px] leading-[26px] text-gray-500" data-tnav="how-to-card-description">
            Select the crypto you would like to buy and the fiat currency you want to purchase crypto with.
          </p>
        </div>

        <div className="pb-4 flex flex-col items-center text-center sm:items-start sm:text-left">
          <h2 className="pb-2 text-5xl font-bold text-base-blue mb-2">2</h2>
          <h3 className="text-[22px] font-bold text-gray-900 mb-3" data-tnav="how-to-card-title">Enter your wallet address</h3>
          <p className="text-[16px] leading-[26px] text-gray-500" data-tnav="how-to-card-description">
            Enter your crypto wallet address to which your cryptocurrency will be sent
          </p>
        </div>

        <div className="pb-4 flex flex-col items-center text-center sm:items-start sm:text-left">
          <h2 className="pb-2 text-5xl font-bold text-base-blue mb-2">3</h2>
          <h3 className="text-[22px] font-bold text-gray-900 mb-3" data-tnav="how-to-card-title">Make payment</h3>
          <p className="text-[16px] leading-[26px] text-gray-500" data-tnav="how-to-card-description">
            You will be redirected to our partner’s website, where you can review all the details and proceed with the payment
          </p>
        </div>
      </div>
    </div>
  );
}
