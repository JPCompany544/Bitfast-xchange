export default function HeroTitle() {
  return (
    <div className="flex items-center flex-col mx-4 mt-12 mb-8">
      <div className="flex flex-col items-center m-0 text-center text-4xl sm:text-[42px] sm:leading-[50px] lg:text-[54px] lg:leading-[62px] text-content-primary">
        <h1 data-tnav="title-section-title" className="font-bold text-gray-900 tracking-tight">Buy any crypto</h1>
        <span className="font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#9fcf00] via-[#00d44b] to-[#009be3] inline mt-1">
          securely
        </span>
      </div>
      <p data-tnav="title-section-description" className="text-[18px] sm:text-[20px] font-normal text-center text-gray-500 mt-6 max-w-[500px] leading-relaxed">
        Choose the offer that suits you best and buy cryptocurrency in just a few clicks.
      </p>
    </div>
  );
}
