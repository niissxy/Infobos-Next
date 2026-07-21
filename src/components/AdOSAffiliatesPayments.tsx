import React, { useState } from 'react';
import { Target, Layers, Database, ShieldCheck, Mail, Sparkles, RefreshCw, BarChart2, DollarSign, ArrowUpRight, Globe, Percent, Send } from 'lucide-react';

export default function AdOSAffiliatesPayments() {
  const [activeTab, setActiveTab] = useState<'affiliate' | 'payments' | 'programmatic'>('affiliate');
  const [selectedGateway, setSelectedGateway] = useState<string>('QRIS');
  const [invoiceAmount, setInvoiceAmount] = useState<number>(15000000);
  const [invoicePaid, setInvoicePaid] = useState<boolean>(false);

  const affiliateNetworks = [
    { niche: 'Travel & Hotels', brand: 'Agoda Affiliate Network', rate: '5% - 8% Commission', clicks: 12400, sales: 340, conversion: '2.74%', earnings: 45000000 },
    { niche: 'Cloud Hosting', brand: 'Niagahoster Cloud Referrals', rate: 'Rp 250.000 Flat rate', clicks: 8200, sales: 112, conversion: '1.36%', earnings: 28000000 },
    { niche: 'Finance & Stocks', brand: 'Ajaib Sekuritas Referral', rate: 'Rp 50.000 / verified lead', clicks: 15400, sales: 480, conversion: '3.11%', earnings: 24000000 },
    { niche: 'Marketplaces', brand: 'Shopee Affiliate Platform', rate: 'Up to 10% per transaction', clicks: 42000, sales: 1980, conversion: '4.71%', earnings: 62000000 },
    { niche: 'Education & Courses', brand: 'Udemy Partners Network', rate: '15% per registration', clicks: 6500, sales: 98, conversion: '1.50%', earnings: 14700000 }
  ];

  const futureConnectors = [
    { name: 'Google Ad Manager (GAM)', type: 'Header Bidding API', status: 'Ready for Connection', icon: Globe },
    { name: 'Google AdSense & AdExchange', type: 'Fallback Programmatic Fill', status: 'Active (Mirror)', icon: Globe },
    { name: 'Prebid.js Wrapper Engine', type: 'Client-Side Real-Time Auction', status: 'Disabled (Manual Selection prioritized)', icon: Layers },
    { name: 'Taboola Content Recommendation', type: 'After Content Widgets', status: 'Ready for Integration', icon: Globe },
    { name: 'Outbrain Smartfeed Connector', type: 'Sidebar Native Feed', status: 'Ready for Integration', icon: Globe },
    { name: 'OpenRTB Enterprise Supply-Side', type: 'Server-to-Server Auction Bid', status: 'Configured (SSP Protocol)', icon: Database }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Subtab menu */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'affiliate', name: 'Affiliate & Referral Engine' },
          { id: 'payments', name: 'Simulated Billing & Payments' },
          { id: 'programmatic', name: 'Future Programmatic Connectors' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition ${
              activeTab === tab.id 
                ? 'border-[#2B7A78] text-[#2B7A78]' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* SUBTAB 1: Affiliate Engine */}
      {activeTab === 'affiliate' && (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-4">
            <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">Earning Dashboard</span>
            <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200">Dynamic Affiliate Conversion Metrics</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Track referrals generated dynamically when users buy flights, reserve hotel rooms, register domain servers, or open investing portfolios directly from INFOBOS guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {affiliateNetworks.map((net, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-3 hover:border-[#2B7A78] dark:hover:border-[#2B7A78] transition">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="bg-teal-100 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">
                    {net.niche}
                  </span>
                  <span className="text-emerald-600 font-bold font-mono text-xs">{net.rate}</span>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm font-display">{net.brand}</h5>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-slate-600 dark:text-slate-400 pt-1">
                  <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-100 dark:border-slate-850">
                    <span className="text-[8px] text-slate-400 dark:text-slate-500 block uppercase font-mono">Clicks</span>
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{net.clicks.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-100 dark:border-slate-850">
                    <span className="text-[8px] text-slate-400 dark:text-slate-500 block uppercase font-mono">Conversions</span>
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{net.sales}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-100 dark:border-slate-850">
                    <span className="text-[8px] text-slate-400 dark:text-slate-500 block uppercase font-mono">Conv. Rate</span>
                    <span className="font-mono text-xs font-bold text-teal-600 mt-0.5 block">{net.conversion}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  <span>Gross Earnings:</span>
                  <span className="text-[#2B7A78] dark:text-teal-400">Rp {net.earnings.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: Billing & Payments */}
      {activeTab === 'payments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
            <div>
              <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-teal-400">Payment Gateways Integration Portal</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-sans">
                Configure your Stripe, Midtrans, PayPal, or Xendit merchant accounts for self-service billing.
              </p>
            </div>

            <div className="space-y-2">
              {['QRIS (GoPay/OVO/Dana)', 'Bank Mandiri Virtual Account', 'Bank BJB Virtual Account', 'Credit Card Secure Gateway (Stripe/Midtrans)', 'PayPal Merchant API'].map((gate) => (
                <button
                  key={gate}
                  onClick={() => setSelectedGateway(gate)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition ${
                    selectedGateway === gate 
                      ? 'border-[#2B7A78] bg-teal-50/50 dark:bg-teal-950/20 text-[#2B7A78]' 
                      : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {gate}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">Simulated Invoicing Desk</h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Invoice ID:</span>
                <span className="font-mono">INV-2026-09482</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Selected Gateway:</span>
                <span className="text-[#2B7A78] dark:text-teal-400">{selectedGateway}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Billed Amount:</span>
                <span className="text-slate-950 dark:text-slate-100 font-mono">Rp {invoiceAmount.toLocaleString('id-ID')}</span>
              </div>

              {invoicePaid ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl p-4 text-center space-y-1.5 py-6">
                  <span className="font-bold text-sm block">Invoice Paid Successfully! ✓</span>
                  <span className="text-[10px] block leading-relaxed text-emerald-700 dark:text-emerald-400 font-sans">
                    Sistem otomatis mengaktifkan campaign di penempatan ad server setelah menerima notifikasi callback IPN dari gateway.
                  </span>
                  <button
                    onClick={() => setInvoicePaid(false)}
                    className="text-[10px] text-teal-600 font-bold underline block mt-2 mx-auto"
                  >
                    Reset Invoice State
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-center p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl">
                    {/* Simulated QRIS code */}
                    <div className="text-center space-y-1.5">
                      <div className="h-28 w-28 bg-slate-800 text-white font-black flex items-center justify-center rounded-lg text-xs tracking-wider border-4 border-white shadow-sm">
                        QRIS CODE
                      </div>
                      <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase">ASYNCHRONOUS DEPOSIT GATEWAY</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setInvoicePaid(true)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-center font-bold rounded-xl transition"
                  >
                    Simulate Payment Complete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Programmatic Future Connectors */}
      {activeTab === 'programmatic' && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-2xs space-y-4">
            <h4 className="font-display font-bold text-sm text-teal-400">Future Programmatic Ad Connectors Suite</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enable real-time auctioning (OpenRTB, Prebid.js) or premium programmatic content integration (Taboola, Google Ad Manager) as fallbacks when direct campaigns are fully served.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {futureConnectors.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex gap-3.5 items-start">
                    <div className="p-2 bg-slate-900 text-teal-400 rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between items-center gap-2">
                        <h5 className="font-bold text-white text-xs">{item.name}</h5>
                        <span className="bg-slate-800 text-slate-300 font-mono text-[8px] font-bold px-1.5 py-0.2 rounded uppercase">
                          {item.status}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[10px] block">{item.type}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
