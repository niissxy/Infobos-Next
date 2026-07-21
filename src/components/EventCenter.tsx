import React, { useState } from 'react';
import { 
  Calendar, MapPin, User, Tag, Clock, Ticket, Check, X, 
  ChevronRight, RefreshCw, Star, Share2, Award 
} from 'lucide-react';
import { IntegrationWidget } from './IntegrationEngine';

interface EventItem {
  id: string;
  title: string;
  type: 'Seminar' | 'Workshop' | 'Conference' | 'Expo' | 'Festival';
  date: string;
  time: string;
  venue: string;
  speaker: string;
  price: string;
  image: string;
  spotsLeft: number;
  description: string;
}

export default function EventCenter() {
  const [activeType, setActiveType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Ticket booking states
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingEmail, setBookingEmail] = useState<string>('');
  const [bookingSeatClass, setBookingSeatClass] = useState<'VIP' | 'Regular'>('Regular');
  const [bookedTicket, setBookedTicket] = useState<any>(null);
  const [loadingBooking, setLoadingBooking] = useState<boolean>(false);

  const events: EventItem[] = [
    {
      id: 'ev-1',
      title: 'Kongres Akselerasi Startup Digital & Sosialisasi Pajak PMK-2026',
      type: 'Conference',
      date: '10 Juli 2026',
      time: '09:00 - 15:00 WIB',
      venue: 'Aula Candi Gedung Sate, Bandung',
      speaker: 'Kemenkeu RI, Diskominfo Jabar, & Bappeda',
      price: 'Gratis (Registrasi Terbuka)',
      spotsLeft: 45,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
      description: 'Pertemuan akbar inkubator bisnis, pembuat kebijakan, dan ratusan pendiri startup lokal Jawa Barat untuk membedah panduan teknis pelaporan pajak ditanggung pemerintah (DTP) triwulanan.'
    },
    {
      id: 'ev-2',
      title: 'Workshop Pemrograman LLM Korpus Bahasa Daerah Sunda-Melayu',
      type: 'Workshop',
      date: '15 Juli 2026',
      time: '13:00 - 17:00 WIB',
      venue: 'Lab Komputasi Gedung Sate, Lantai 3',
      speaker: 'Tim Peneliti MIT Linguistics & AI Lab ITB',
      price: 'Rp 150.000 (Sertifikat Dewan Riset)',
      spotsLeft: 12,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
      description: 'Pelatihan hands-on penyusunan datasets ucapan rural, teknik masking token daerah, dan integrasi API asisten medis pedesaan berskala komputasi tinggi.'
    },
    {
      id: 'ev-3',
      title: 'Bandung Smart City Expo 2026: Showcase Augmented Reality & IoT',
      type: 'Expo',
      date: '22 Juli 2026',
      time: '09:00 - 18:00 WIB',
      venue: 'Bandung Convention Center, Buahbatu',
      speaker: 'Asosiasi Teknologi Kota Cerdas & Industri Swasta',
      price: 'Gratis (Terbuka untuk Umum)',
      spotsLeft: 120,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      description: 'Pameran inovasi sensor meteorologi BMKG, pedestrial cerdas Gasibu, kendaran otonom pariwisata heritage, serta visualisasi asisten kearifan lokal Jabar.'
    },
    {
      id: 'ev-4',
      title: 'Festival Musik Klasik Priangan & Heritage Gastronomy Culinary',
      type: 'Festival',
      date: '02 Agustus 2026',
      time: '15:00 - 22:00 WIB',
      venue: 'Halaman Belakang Cagar Budaya Gedung Sate',
      speaker: 'Seniman Angklung Mang Udjo & Kurator Kuliner Jabar',
      price: 'Rp 50.000 (Terbuka Terbatas)',
      spotsLeft: 80,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
      description: 'Perayaan luhur perpaduan musik tradisional angklung priangan, kriya bersejarah, dan sajian kuliner resep kolonial 1920 yang dilestarikan.'
    }
  ];

  const filteredEvents = events.filter(ev => 
    activeType === 'all' || ev.type === activeType
  );

  const handleBookTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingEmail.trim() || !selectedEvent) return;

    setLoadingBooking(true);
    
    // Simulate API reservation call delay
    setTimeout(() => {
      const ticketNum = `INF-${selectedEvent.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const seatNo = `${bookingSeatClass === 'VIP' ? 'A' : 'B'}-${Math.floor(1 + Math.random() * 30)}`;
      
      setBookedTicket({
        ticketNumber: ticketNum,
        eventName: selectedEvent.title,
        venue: selectedEvent.venue,
        date: selectedEvent.date,
        time: selectedEvent.time,
        name: bookingName,
        email: bookingEmail,
        seatClass: bookingSeatClass,
        seatNo: seatNo
      });

      setLoadingBooking(false);
      // Deduct spots left locally
      selectedEvent.spotsLeft = Math.max(0, selectedEvent.spotsLeft - 1);
    }, 1200);
  };

  const closeBookingFlow = () => {
    setSelectedEvent(null);
    setBookedTicket(null);
    setBookingName('');
    setBookingEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-left space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-indigo-500" />
            <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B]">EVENTS & SEMINARS PANEL</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">Registrasi konferensi kebijakan fiskal, pelatihan teknologi komputasi bahasa besar, pameran kota cerdas, dan festival heritage.</p>
        </div>

        {/* Categories toggles */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            { id: 'all', label: 'Semua Agenda' },
            { id: 'Conference', label: 'Konferensi' },
            { id: 'Workshop', label: 'Workshop / Pelatihan' },
            { id: 'Expo', label: 'Pameran / Expo' },
            { id: 'Festival', label: 'Festival Heritage' }
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                activeType === type.id 
                  ? 'bg-[#002B5B] text-[#FFD700] border-[#002B5B] shadow-xs' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Official Press Calendar Embed - Google Calendar */}
      <IntegrationWidget widgetId="widget-calendar-press" className="mb-6" />

      {/* Events Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(ev => (
          <div 
            key={ev.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[16/9] overflow-hidden bg-slate-100 relative">
                <img src={ev.image} alt={ev.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-101 transition duration-500" />
                <span className="absolute top-3 left-3 bg-[#002B5B] text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {ev.type}
                </span>
                
                {ev.spotsLeft <= 15 && ev.spotsLeft > 0 && (
                  <span className="absolute top-3 right-3 bg-rose-600 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wide animate-pulse shadow-sm">
                    Sisa {ev.spotsLeft} Kursi!
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3.5">
                <div className="space-y-1">
                  <span className="text-[9px] text-[#2B7A78] font-bold font-mono uppercase tracking-wide flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    Speaker: {ev.speaker.split(' & ')[0]}
                  </span>
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#002B5B] leading-snug line-clamp-2">
                    {ev.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {ev.description}
                </p>

                <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-mono text-slate-600 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate">{ev.venue.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-bold text-[#002B5B] font-mono">{ev.price}</span>
              
              <button 
                onClick={() => setSelectedEvent(ev)}
                className="px-3.5 py-1.5 bg-[#2B7A78] hover:bg-[#1f5a58] text-white text-[11px] font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <Ticket className="h-3.5 w-3.5" />
                Daftar Sekarang &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ==========================================
          TICKET BOOKING DIALOG FLOW (HIGH FIDELITY)
          ========================================== */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 text-left shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-3.5 mb-5 flex items-center justify-between">
              <h3 className="font-display font-black text-sm sm:text-base text-[#002B5B] uppercase tracking-wider flex items-center gap-1.5">
                <Ticket className="h-5 w-5 text-indigo-500" />
                Registrasi Delegasi Resmi
              </h3>
              <button 
                onClick={closeBookingFlow}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {bookedTicket ? (
              // EXTREMELY BEAUTIFUL BOARDING PASS DIGITAL TICKET
              <div className="space-y-5">
                <div className="p-3 bg-emerald-500/10 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-500/25 text-center flex items-center justify-center gap-1.5">
                  <Check className="h-4 w-4" /> Reservasi Sukses! E-Tiket Anda telah terdaftar di Puslitbang Jabar.
                </div>

                {/* Printable boarding pass design */}
                <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-indigo-950 text-white p-5 space-y-4 font-mono relative overflow-hidden">
                  <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>
                  
                  {/* Ticket Header */}
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <div className="text-left">
                      <span className="text-[8px] tracking-widest text-[#FFD700] uppercase font-bold">Official Invitation Boarding Pass</span>
                      <h4 className="font-display font-bold text-xs text-white truncate max-w-xs">{bookedTicket.eventName}</h4>
                    </div>
                    <span className="text-xs bg-[#FFD700] text-slate-950 font-sans font-black px-2 py-0.5 rounded uppercase">
                      {bookedTicket.seatClass}
                    </span>
                  </div>

                  {/* Body grid */}
                  <div className="grid grid-cols-2 gap-4 text-[10px]">
                    <div>
                      <span className="text-slate-400 block font-semibold">DELEGASI / NAMA:</span>
                      <span className="text-white font-bold">{bookedTicket.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">NOMOR TIKET:</span>
                      <span className="text-[#FFD700] font-bold">{bookedTicket.ticketNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">TANGGAL & WAKTU:</span>
                      <span className="text-white">{bookedTicket.date} ({bookedTicket.time.split(' ')[0]})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">ALOKASI KURSI:</span>
                      <span className="text-[#FFD700] font-bold">SEAT {bookedTicket.seatNo}</span>
                    </div>
                  </div>

                  {/* QR Code section & footer */}
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between gap-4">
                    <div className="text-left font-sans">
                      <span className="text-[8px] text-slate-500 block uppercase font-mono">LOKASI EVENT:</span>
                      <p className="text-[10px] text-slate-300 leading-tight">{bookedTicket.venue}</p>
                    </div>

                    {/* Simple mock QR Code */}
                    <div className="w-12 h-12 bg-white p-1 rounded-md shrink-0 flex flex-col justify-between">
                      <div className="grid grid-cols-4 gap-0.5 h-full">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className={`h-full w-full ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-white'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                <div className="flex gap-2.5">
                  <button 
                    onClick={() => window.print()}
                    className="flex-grow py-2 bg-[#002B5B] text-[#FFD700] text-xs font-bold rounded-xl hover:bg-[#001f42] transition shadow-sm text-center"
                  >
                    Cetak / Simpan E-Tiket PDF
                  </button>
                  <button 
                    onClick={closeBookingFlow}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            ) : (
              // ACTIVE BOOKING REGISTRATION FORM
              <form onSubmit={handleBookTicket} className="space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="text-[8px] text-slate-400 font-mono block uppercase font-bold">Agenda Terpilih:</span>
                  <h4 className="text-xs font-bold text-[#002B5B] mt-0.5">{selectedEvent.title}</h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Delegasi (Sesuai ID/KTP):</label>
                    <input 
                      type="text" 
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                      placeholder="e.g. Ir. H. Ahmad Fauzi"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Resmi (Untuk Pengiriman PDF):</label>
                    <input 
                      type="email" 
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                      placeholder="e.g. ahmad.fauzi@instansi.go.id"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kelas Kursi Undangan:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`p-2.5 border rounded-xl flex items-center gap-2 cursor-pointer transition ${
                        bookingSeatClass === 'Regular' ? 'border-teal-500 bg-teal-50/50 font-bold' : 'border-slate-200'
                      }`}>
                        <input 
                          type="radio" 
                          name="seatClass" 
                          value="Regular" 
                          checked={bookingSeatClass === 'Regular'}
                          onChange={() => setBookingSeatClass('Regular')}
                        />
                        <span>Regular Class</span>
                      </label>
                      <label className={`p-2.5 border rounded-xl flex items-center gap-2 cursor-pointer transition ${
                        bookingSeatClass === 'VIP' ? 'border-indigo-500 bg-indigo-50/50 font-bold' : 'border-slate-200'
                      }`}>
                        <input 
                          type="radio" 
                          name="seatClass" 
                          value="VIP" 
                          checked={bookingSeatClass === 'VIP'}
                          onChange={() => setBookingSeatClass('VIP')}
                        />
                        <span>VIP / Undangan Utama</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex gap-2.5">
                  <button 
                    type="submit"
                    disabled={loadingBooking}
                    className="flex-grow py-2.5 bg-[#2B7A78] hover:bg-[#1f5a58] disabled:opacity-45 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {loadingBooking ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Mendaftarkan Delegasi...</span>
                      </>
                    ) : (
                      <>
                        <Ticket className="h-4 w-4" />
                        <span>Konfirmasi & Cetak E-Tiket Saya</span>
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={closeBookingFlow}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
