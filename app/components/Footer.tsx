import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[240px]">
            <img src="/Company-logo.jpg" alt="Bit-Fast xchange" className="h-10 w-auto object-contain" />
            <p className="text-sm text-gray-500 leading-relaxed">
              Fast, secure, and transparent crypto exchange. Built for individuals and institutions.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-gray-900 uppercase text-xs tracking-widest">Platform</span>
              <Link href="/buy-crypto" className="text-gray-500 hover:text-gray-900 transition-colors">Buy Crypto</Link>
              <Link href="/sell-crypto" className="text-gray-500 hover:text-gray-900 transition-colors">Sell Crypto</Link>
              <Link href="/p2p" className="text-gray-500 hover:text-gray-900 transition-colors">P2P Market</Link>
              <Link href="/become-vendor" className="text-gray-500 hover:text-gray-900 transition-colors">Become a Vendor</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-semibold text-gray-900 uppercase text-xs tracking-widest">Company</span>
              <Link href="/aml-kyc" className="text-gray-500 hover:text-gray-900 transition-colors">AML / KYC</Link>
              <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-use" className="text-gray-500 hover:text-gray-900 transition-colors">Terms of Use</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-semibold text-gray-900 uppercase text-xs tracking-widest">Support</span>
              <a href="mailto:support@bit-fastxchange.com" className="text-gray-500 hover:text-gray-900 transition-colors">Contact Us</a>
              <Link href="/buy-crypto#faq" className="text-gray-500 hover:text-gray-900 transition-colors">FAQ</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <p>© {currentYear} Bit-Fast xchange. All rights reserved.</p>
          <p>Crypto services may be subject to regulatory restrictions in your jurisdiction.</p>
        </div>
      </div>
    </footer>
  );
}
