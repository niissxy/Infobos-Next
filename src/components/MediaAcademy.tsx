import React, { useState } from 'react';
import { 
  BookOpen, Award, CheckCircle2, Play, ChevronRight, Bookmark, 
  Sparkles, RefreshCw, HelpCircle, Trophy, FileText, Share2 
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  content: string;
}

interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Pemula' | 'Menengah' | 'Mahir';
  enrolledCount: number;
  rating: number;
  lessonsCount: number;
  icon: any;
  color: string;
  description: string;
  lessons: Lesson[];
}

export default function MediaAcademy() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'course-1',
      title: 'Jurnalisme Data & Geo-Spatial Jabar',
      category: 'Data Journalism',
      level: 'Menengah',
      enrolledCount: 1240,
      rating: 4.8,
      lessonsCount: 4,
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      description: 'Pelajari dasar analisis statistik, pemetaan data demografi Jawa Barat, dan cara menceritakan kisah yang kuat menggunakan data spasial.',
      lessons: [
        { id: '1-1', title: 'Pengenalan Jurnalisme Data Daerah', duration: '12 menit', isCompleted: true, content: 'Jurnalisme data adalah praktik memproduksi berita berdasarkan analisis kuantitatif. Di Jawa Barat, ketersediaan portal data terbuka seperti Jabar Digital Service memberikan peluang besar bagi jurnalis warga untuk memvalidasi kebijakan publik menggunakan angka riil.' },
        { id: '1-2', title: 'Navigasi Peta & Koordinat GIS GeoOS', duration: '15 menit', isCompleted: false, content: 'Sistem Informasi Geografis (GIS) memungkinkan kita memetakan kejadian seperti longsor, tingkat kemacetan, atau penyebaran UMKM. Pada modul ini kita mempelajari cara membaca layer shapefile dan mengintegrasikannya ke artikel.' },
        { id: '1-3', title: 'Membuat Visualisasi Grafik Interaktif', duration: '18 menit', isCompleted: false, content: 'Gunakan library visualisasi data seperti D3.js atau Recharts untuk menampilkan data tren inflasi atau APBD Jabar. Grafik yang baik haruslah komunikatif, beresolusi tinggi, dan responsif di berbagai perangkat.' },
        { id: '1-4', title: 'Etika & Validasi Sumber Data Publik', duration: '10 menit', isCompleted: false, content: 'Tidak semua data itu akurat. Selalu lakukan cek silang antara data rilisan pemerintah, laporan independen LSM, dan temuan fisik kontributor lapangan untuk menghindari misinformasi statistik.' }
      ]
    },
    {
      id: 'course-2',
      title: 'Verifikasi Berita & Strategi Fact-Checking',
      category: 'Fact Checking',
      level: 'Pemula',
      enrolledCount: 1850,
      rating: 4.9,
      lessonsCount: 3,
      icon: Award,
      color: 'from-emerald-500 to-teal-600',
      description: 'Langkah taktis mendeteksi hoaks, melakukan audit metadata foto/video, serta memvalidasi pernyataan pejabat publik secara real-time.',
      lessons: [
        { id: '2-1', title: 'Anatomi Disinformasi Lokal', duration: '10 menit', isCompleted: false, content: 'Memahami perbedaan misinformasi, disinformasi, dan malinformasi yang sering menyebar di grup percakapan warga Jawa Barat perihal isu kesehatan dan bansos.' },
        { id: '2-2', title: 'Alat Audit Metadata Foto & Video', duration: '15 menit', isCompleted: false, content: 'Praktik langsung menggunakan reverse image search (Google, TinEye) dan ekstraktor EXIF guna melacak lokasi orisinal serta waktu pengambilan suatu foto bukti kejadian.' },
        { id: '2-3', title: 'Menulis Laporan Fact-Check Standar IFCN', duration: '20 menit', isCompleted: false, content: 'Format penulisan artikel cek fakta yang obyektif. Menggunakan rujukan bukti primer, pelabelan status (Benar, Salah, Menyesatkan), serta penjelasan alur verifikasi.' }
      ]
    },
    {
      id: 'course-3',
      title: 'Penulisan Berita Regional & Teknik Wawancara',
      category: 'Writing',
      level: 'Pemula',
      enrolledCount: 940,
      rating: 4.7,
      lessonsCount: 3,
      icon: FileText,
      color: 'from-purple-500 to-pink-600',
      description: 'Kuasai formula piramida terbalik, teknik menyusun daftar pertanyaan sensitif untuk pejabat, dan taktik pelaporan langsung dari lapangan.',
      lessons: [
        { id: '3-1', title: 'Prinsip Piramida Terbalik', duration: '8 menit', isCompleted: false, content: 'Letakkan informasi paling krusial (5W+1H) di paragraf pertama (lead). Paragraf berikutnya berisi konteks pendukung dan kutipan dari narasumber.' },
        { id: '3-2', title: 'Taktik Wawancara Menembus Barikade', duration: '15 menit', isCompleted: false, content: 'Cara melakukan pendekatan persuasif kepada saksi mata di lapangan dan merumuskan pertanyaan tajam namun tetap mematuhi kode etik jurnalistik.' },
        { id: '3-3', title: 'Menyusun Lead yang Menjual & Akurat', duration: '12 menit', isCompleted: false, content: 'Menulis judul dan lead berita regional yang memikat pembaca tanpa terjebak dalam perangkap jurnalisme clickbait murahan.' }
      ]
    }
  ]);

  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-1');
  const [activeLessonId, setActiveLessonId] = useState<string>('1-1');
  const [userName, setUserName] = useState<string>('');
  const [certificateDownloaded, setCertificateDownloaded] = useState<boolean>(false);
  
  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizError, setQuizError] = useState<string | null>(null);

  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const activeLesson = activeCourse.lessons.find(l => l.id === activeLessonId) || activeCourse.lessons[0];

  const quizQuestions = [
    {
      q: 'Apa fungsi utama jurnalisme data di era keterbukaan informasi saat ini?',
      options: [
        'Meningkatkan jumlah klik iklan (clickbait)',
        'Membantu menganalisis data publik secara kuantitatif untuk memvalidasi kebijakan publik',
        'Menulis fiksi yang menarik berdasarkan tebakan pribadi',
        'Menyebarkan gosip selebritis daerah'
      ],
      correct: 1
    },
    {
      q: 'Manakah tindakan pertama yang tepat jika Anda menerima kiriman foto berita bencana yang mencurigakan di grup chat?',
      options: [
        'Langsung menyebarkannya ke grup lain agar warga waspada',
        'Mengubah warna foto agar lebih dramatis',
        'Melakukan reverse image search (pencarian gambar terbalik) untuk melacak sumber asli foto',
        'Menghapus foto tanpa mempedulikannya'
      ],
      correct: 2
    },
    {
      q: 'Dalam teknik penulisan berita, apa yang dimaksud dengan prinsip Piramida Terbalik?',
      options: [
        'Meletakkan informasi paling penting dan inti berita (5W+1H) di bagian paling awal',
        'Menulis cerita dari akhir peristiwa lalu ke awal mula',
        'Menyembunyikan fakta penting hingga paragraf terakhir',
        'Menyusun kalimat dengan huruf terbalik'
      ],
      correct: 0
    }
  ];

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    const course = courses.find(c => c.id === courseId);
    if (course && course.lessons.length > 0) {
      setActiveLessonId(course.lessons[0].id);
    }
    setQuizSubmitted(false);
    setQuizAnswers({});
    setCertificateDownloaded(false);
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === selectedCourseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, isCompleted: !lesson.isCompleted };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  const handleQuizOptionSelect = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
    setQuizError(null);
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(quizAnswers).length < quizQuestions.length) {
      setQuizError('Silakan jawab semua pertanyaan kuis terlebih dahulu!');
      return;
    }

    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        score += 1;
      }
    });

    const finalScore = Math.round((score / quizQuestions.length) * 100);
    setQuizScore(finalScore);
    setQuizSubmitted(true);
  };

  const handleDownloadCertificate = () => {
    setCertificateDownloaded(true);
    setTimeout(() => {
      setCertificateDownloaded(false);
    }, 4500);
  };

  const completedCount = activeCourse.lessons.filter(l => l.isCompleted).length;
  const progressPercent = Math.round((completedCount / activeCourse.lessons.length) * 100);

  return (
    <div id="media-academy-page" className="max-w-6xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6 animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-[#0c2340] via-[#0f172a] to-slate-900 border border-slate-200/10 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg transition-all duration-300">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10 relative text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500 text-[#002B5B] text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                E-CLASS PLATFORM
              </span>
              <span className="text-slate-300 text-xs font-semibold">Biro Pendidikan Jurnalisme Warga Jabar</span>
            </div>
            <h1 className="text-2xl sm:text-3.5xl font-display font-black tracking-tight leading-none text-white">
              INFOBOS Media Academy 🎓
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Tingkatkan keahlian jurnalisme investigasi, analisis infografis, dan verifikasi berita siber. Selesaikan kurikulum kuis, lalu cetak sertifikasi keahlian orisinal Anda secara instan.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shrink-0 text-center space-y-2 max-w-xs w-full lg:w-auto shadow-inner">
            <Trophy className="h-8 w-8 text-[#FFD700] mx-auto animate-bounce" />
            <span className="text-xs font-bold text-[#FFD700] block">Citizen Journalism Board</span>
            <span className="text-[10px] text-slate-300 block leading-snug">Dapatkan predikat kontributor terverifikasi nasional.</span>
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: COURSE SELECTOR AND ACTIVE LESSON READER */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* COURSE SELECTOR CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {courses.map((course) => {
              const isSelected = course.id === selectedCourseId;
              const IconComp = course.icon;
              return (
                <div 
                  key={course.id}
                  onClick={() => handleSelectCourse(course.id)}
                  className={`p-4.5 rounded-2xl border transition-all duration-250 cursor-pointer flex flex-col justify-between text-left h-full transform hover:-translate-y-1 ${
                    isSelected 
                      ? 'bg-blue-500/[0.03] border-blue-500 shadow-sm ring-1 ring-blue-400/20' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/30 hover:border-slate-300 dark:hover:border-slate-700 shadow-3xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-[9px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                        {course.category}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        course.level === 'Pemula' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : course.level === 'Menengah' 
                          ? 'bg-blue-500/10 text-blue-500' 
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {course.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl bg-gradient-to-tr ${course.color} text-white shrink-0 shadow-sm`}>
                        <IconComp className="h-4.5 w-4.5" />
                      </div>
                      <h3 className={`text-xs sm:text-[13px] font-black leading-snug transition-colors ${
                        isSelected ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-slate-850 dark:text-slate-200'
                      }`}>
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-450 dark:text-slate-500 mt-4 border-t border-slate-100 dark:border-slate-800/60 pt-2.5">
                    <span>{course.enrolledCount} Alumni</span>
                    <span className="font-bold text-amber-500">★ {course.rating}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE COURSE LESSON VIEWER */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left">
            
            {/* Progress Status Bar */}
            <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-3xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider">Progres Materi:</span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {completedCount} dari {activeCourse.lessons.length} Selesai ({progressPercent}%)
                </span>
              </div>
              <div className="w-full sm:w-56 h-2 bg-slate-200/65 dark:bg-slate-800 rounded-full overflow-hidden shrink-0 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Lesson Nav Items List (4 of 12) */}
              <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/60 pb-5 md:pb-0 pr-0 md:pr-5">
                <span className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block pl-1">
                  Daftar Silabus Kelas
                </span>
                <div className="space-y-2">
                  {activeCourse.lessons.map((lesson, idx) => {
                    const isActive = lesson.id === activeLessonId;
                    return (
                      <div 
                        key={lesson.id}
                        className={`p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer space-y-1.5 ${
                          isActive 
                            ? 'bg-blue-500/[0.02] border-blue-500/50 shadow-3xs ring-1 ring-blue-500/5' 
                            : 'bg-slate-50 dark:bg-slate-950/30 border-transparent hover:bg-slate-100/70 dark:hover:bg-slate-955'
                        }`}
                        onClick={() => setActiveLessonId(lesson.id)}
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-[10px] font-bold text-slate-400 font-mono">0{idx + 1}.</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleLessonComplete(lesson.id);
                            }}
                            className={`p-0.5 rounded transition cursor-pointer ${
                              lesson.isCompleted 
                                ? 'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20' 
                                : 'text-slate-300 hover:text-slate-450 bg-slate-200/50 dark:bg-slate-800'
                            }`}
                            title={lesson.isCompleted ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        </div>
                        <h4 className={`text-xs font-black leading-snug transition-colors ${
                          isActive ? 'text-blue-500 dark:text-blue-400 font-extrabold' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {lesson.title}
                        </h4>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 block font-mono">⌛ {lesson.duration}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Lesson Content Body (8 of 12) */}
              <div className="md:col-span-8 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2.5 flex-wrap gap-2">
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    Membaca Modul Belajar
                  </span>
                  <button 
                    onClick={() => handleToggleLessonComplete(activeLesson.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition duration-200 flex items-center gap-1.5 cursor-pointer shadow-3xs ${
                      activeLesson.isCompleted 
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-450' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-3xs'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{activeLesson.isCompleted ? 'Selesai Belajar ✓' : 'Tandai Selesai'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-display font-black text-slate-900 dark:text-white leading-tight">
                    {activeLesson.title}
                  </h3>
                  <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800/80 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium whitespace-pre-line shadow-inner">
                    {activeLesson.content}
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/15 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/40">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Tekan tombol tanda selesai untuk merekam progress belajar Anda.</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-650 dark:hover:text-white cursor-pointer transition-colors">
                    <Bookmark className="h-4 w-4 text-amber-500" />
                    <span>Bookmark Modul</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE QUIZ & CERTIFICATE GENERATOR */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* INTERACTIVE KNOWLEDGE QUIZ */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-left space-y-4">
            
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/40 pb-3">
              <div className="p-1 rounded-lg bg-blue-500/10 text-blue-500">
                <HelpCircle className="h-4.5 w-4.5 text-blue-500" />
              </div>
              <h3 className="font-display font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                Uji Kompetensi Cepat (Quiz)
              </h3>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2.5 bg-slate-50/70 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-150 dark:border-slate-800/40">
                  <span className="text-[10px] font-mono font-black text-blue-500 uppercase tracking-wider">Pertanyaan {qIdx + 1}</span>
                  <h4 className="text-xs font-black text-slate-850 dark:text-slate-100 leading-snug font-sans">
                    {q.q}
                  </h4>
                  
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = optIdx === q.correct;
                      let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:bg-slate-50';
                      
                      if (isSelected) {
                        if (quizSubmitted) {
                          optionStyle = isCorrect 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold ring-1 ring-emerald-500/20' 
                            : 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold ring-1 ring-rose-500/20';
                        } else {
                          optionStyle = 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold';
                        }
                      } else if (quizSubmitted && isCorrect) {
                        optionStyle = 'bg-emerald-500/5 border-emerald-500/40 text-emerald-500 font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleQuizOptionSelect(qIdx, optIdx)}
                          className={`w-full p-2.5 text-left text-[11px] rounded-lg border transition-all flex items-start gap-2 cursor-pointer ${optionStyle}`}
                        >
                          <span className="w-4.5 h-4.5 rounded-full border border-current text-[9px] font-mono font-black flex items-center justify-center shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {quizError && (
              <p className="text-[10px] font-mono font-black text-rose-500 text-center animate-pulse">{quizError}</p>
            )}

            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md cursor-pointer transform hover:-translate-y-0.5"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Jawaban Kuis</span>
              </button>
            ) : (
              <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Hasil Evaluasi:</span>
                  <span className={`text-sm font-mono font-black ${quizScore >= 70 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {quizScore} / 100
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-450 leading-relaxed text-center font-medium font-sans">
                  {quizScore >= 70 
                    ? 'Selamat! Anda lulus kuis dengan predikat memuaskan. Silakan ketik nama Anda di bawah untuk mengklaim sertifikat kelulusan.' 
                    : 'Skor Anda di bawah Kriteria Ketuntasan Minimal (70). Silakan baca kembali materi dan coba lagi kuisnya.'}
                </p>
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                    setQuizScore(0);
                    setCertificateDownloaded(false);
                  }}
                  className="w-full py-2 border border-slate-250 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-300 transition text-center cursor-pointer"
                >
                  Ulangi Kuis ↺
                </button>
              </div>
            )}

          </div>

          {/* DYNAMIC CERTIFICATE GENERATOR */}
          {quizSubmitted && quizScore >= 70 && (
            <div className="bg-gradient-to-tr from-amber-500/10 to-yellow-500/5 border border-amber-500/30 rounded-2xl p-5 shadow-sm text-left space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-spin" />
                <h3 className="font-display font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                  Cetak Sertifikat Kelulusan
                </h3>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 block">Nama Lengkap Penerima</label>
                <input 
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setCertificateDownloaded(false);
                  }}
                  placeholder="Ketik nama lengkap Anda..."
                  className="w-full text-xs font-bold px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Live Certificate Render Mock */}
              <div className="border border-amber-500/25 rounded-2xl bg-[#090f1d] text-white p-5 text-center space-y-3.5 relative overflow-hidden font-serif shadow-lg">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
                
                <span className="text-[8px] tracking-widest font-sans font-black text-amber-400 uppercase block">
                  SERTIFIKAT KELULUSAN AKADEMI
                </span>
                
                <div className="space-y-1">
                  <span className="text-[10px] italic text-slate-450 block">Dengan bangga mempersembahkan predikat kepada:</span>
                  <span className="text-sm font-black font-sans text-white border-b border-white/10 pb-0.5 px-3 inline-block uppercase tracking-wide">
                    {userName.trim() || 'NAMA PESERTA'}
                  </span>
                </div>

                <p className="text-[8.5px] font-sans text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Telah menyelesaikan rangkaian kurikulum evaluasi modul data jurnalisme bersertifikat **INFOBOS Media Academy Jabar** dengan status kelulusan kompeten.
                </p>

                <div className="flex justify-between items-center text-[7px] font-sans border-t border-white/5 pt-2.5 text-slate-500">
                  <span>ID: CER-2026-F09X</span>
                  <span>Skor Kuis: {quizScore}%</span>
                  <span>Verifikasi: Digital Signed</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDownloadCertificate}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </button>

                {certificateDownloaded && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center text-[10.5px] text-emerald-500 font-mono font-bold animate-fade-in flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Sertifikat {userName || 'Peserta'} sukses terunduh dalam format PDF!</span>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
