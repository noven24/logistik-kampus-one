import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Home, PlusSquare, MessageSquare, User, MapPin, 
  ChevronLeft, Building2, CheckCircle2, Package, LockKeyhole, 
  AlertCircle, Clock, ArrowRightLeft, BoxSelect, X, AlertTriangle, 
  BellRing, Menu, Grid, List, Users, Calendar, Shield, FileText,
  Truck, RotateCcw, Eye, Star, Download, Upload, Handshake, Phone, Mail, Globe,
  LogIn, Lock, ArrowRight, Loader2, Check, XCircle, LogOut, Settings, MoreVertical, Send, Paperclip
} from 'lucide-react';

const SistemPeminjamanLogistikKampus = () => {
  // --- STATE AUTHENTICATION ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // --- STATE UTAMA APLIKASI ---
  const [activePage, setActivePage] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [showReminder, setShowReminder] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [loanStep, setLoanStep] = useState(1);
  const [returnStep, setReturnStep] = useState(1);

  // --- STATE HALAMAN AKTIVITAS (New Feature) ---
  const [activityTab, setActivityTab] = useState('borrowing'); // 'borrowing' | 'lending'

  // --- DATA DUMMY NOTIFIKASI ---
  const notifications = [
    { id: 1, title: "Peminjaman Disetujui", message: "Permintaan peminjaman 'Sound System 500W' telah disetujui oleh BEM Universitas.", time: "10 menit yang lalu", type: "success", read: false },
    { id: 2, title: "Pengingat Pengembalian", message: "Jangan lupa kembalikan 'Tenda Regu' besok sebelum pukul 16.00 WIB.", time: "1 jam yang lalu", type: "warning", read: false },
    { id: 3, title: "Permintaan Masuk Baru", message: "UKM Paduan Suara mengajukan peminjaman alat musik.", time: "2 jam yang lalu", type: "info", read: true },
    { id: 4, title: "Maintenance Sistem", message: "Sistem akan mengalami maintenance pada hari Sabtu pukul 00.00 - 04.00 WIB.", time: "1 hari yang lalu", type: "system", read: true },
  ];

  // --- DATA DUMMY CHAT ---
  const [chats, setChats] = useState([
    { id: 1, name: "Admin Logistik BEM", message: "Halo, untuk pengambilan barang bisa dilakukan jam 9 ya kak.", time: "09:41", unread: 2, avatar: "A", status: "online" },
    { id: 2, name: "Ketua Himpunan Komputer", message: "Siap, terima kasih banyak atas bantuannya!", time: "Kemarin", unread: 0, avatar: "H", status: "offline" },
    { id: 3, name: "Sekretaris UKM Olahraga", message: "Apakah tenda masih tersedia untuk tanggal 25?", time: "Kemarin", unread: 0, avatar: "S", status: "online" },
  ]);
  const [activeChat, setActiveChat] = useState(1); // Default chat open

  // --- HANDLER LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!loginForm.username || !loginForm.password) {
      setLoginError('Harap isi NIM/Email dan Password');
      return;
    }

    setLoginLoading(true);

    // Simulasi API Call
    setTimeout(() => {
      setLoginLoading(false);
      setIsLoggedIn(true);
      // Reset scroll saat masuk
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setActivePage('home');
      setLoginForm({ username: '', password: '' });
  };

  // --- DETEKSI SCROLL UNTUK NAVBAR ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- SIMULASI NOTIFIKASI (Hanya jalan setelah login) ---
  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => setShowReminder(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  // --- DATA DUMMY ---
  const organizations = [
    { 
      id: 1, 
      name: "BEM Universitas", 
      type: "BEM", 
      members: 150, 
      rating: 4.9, 
      description: "Badan Eksekutif Mahasiswa tingkat Universitas yang menaungi seluruh kegiatan kemahasiswaan.",
      contact: "0812-3456-7890",
      email: "bem@univ.ac.id",
      image: "🏛️",
      joined: "2018"
    },
    { 
      id: 2, 
      name: "UKM Seni Budaya", 
      type: "UKM", 
      members: 80, 
      rating: 4.7, 
      description: "Unit Kegiatan Mahasiswa yang berfokus pada pelestarian dan pengembangan seni budaya tradisional maupun modern.",
      contact: "0813-4567-8901",
      email: "senibudaya@univ.ac.id",
      image: "🎭",
      joined: "2019"
    },
    { 
      id: 3, 
      name: "Himpunan Mahasiswa Teknik", 
      type: "Himpunan", 
      members: 200, 
      rating: 4.8, 
      description: "Himpunan mahasiswa fakultas teknik yang aktif dalam pengembangan riset dan teknologi tepat guna.",
      contact: "0814-5678-9012",
      email: "hmt@univ.ac.id",
      image: "⚙️",
      joined: "2018"
    },
    { 
      id: 4, 
      name: "UKM Olahraga", 
      type: "UKM", 
      members: 120, 
      rating: 4.6, 
      description: "Wadah bagi mahasiswa untuk mengembangkan minat dan bakat di bidang olahraga prestasi.",
      contact: "0815-6789-0123",
      email: "sports@univ.ac.id",
      image: "⚽",
      joined: "2020"
    }
  ];

  const [transactions, setTransactions] = useState([
    {
      id: 'TRX-2023-0012',
      itemName: "Sound System Portable 500W",
      items: [{ name: "Sound System Portable 500W", quantity: 1 }],
      price: 75000,
      owner: "BEM Universitas",
      status: "active",
      type: "item",
      image: "🔊",
      startDate: "2023-11-15",
      endDate: "2023-11-22",
      duration: 7,
      timeLeft: "2 hari",
      progress: 85,
      handshakeSteps: [
        { step: 1, name: "Pengajuan Dikirim", status: "completed", date: "2023-11-14 10:30" },
        { step: 2, name: "Persetujuan Admin", status: "completed", date: "2023-11-14 14:15" },
        { step: 3, name: "Konfirmasi Peminjam", status: "completed", date: "2023-11-14 16:45" },
        { step: 4, name: "Barang Diambil", status: "completed", date: "2023-11-15 09:00" }
      ]
    },
    {
      id: 'TRX-2023-0015',
      itemName: "Paket Seminar & Workshop",
      items: [
        { name: "Sound System Portable", quantity: 2 },
        { name: "Mikrofon Wireless", quantity: 2 },
        { name: "Proyektor", quantity: 1 },
        { name: "Layar Proyeksi", quantity: 1 },
        { name: "Kursi Plastik", quantity: 50 }
      ],
      price: 600000,
      owner: "BEM Universitas",
      status: "active",
      type: "bundle",
      image: "📦",
      startDate: "2023-11-18",
      endDate: "2023-11-21",
      duration: 3,
      timeLeft: "5 hari",
      progress: 40,
      handshakeSteps: [
        { step: 1, name: "Pengajuan Dikirim", status: "completed", date: "2023-11-17 11:20" },
        { step: 2, name: "Persetujuan Admin", status: "completed", date: "2023-11-17 15:30" },
        { step: 3, name: "Konfirmasi Peminjam", status: "completed", date: "2023-11-17 17:00" },
        { step: 4, name: "Barang Diambil", status: "completed", date: "2023-11-18 10:15" }
      ]
    },
    {
      id: 'TRX-2023-0018',
      itemName: "Tenda Besar 4x6m",
      items: [{ name: "Tenda Besar 4x6m", quantity: 1 }],
      price: 100000,
      owner: "UKM Olahraga",
      status: "waiting_approval",
      type: "item",
      image: "⛺",
      startDate: "2023-11-25",
      endDate: "2023-11-30",
      duration: 5,
      timeLeft: "Menunggu",
      progress: 0,
      handshakeSteps: [
        { step: 1, name: "Pengajuan Dikirim", status: "completed", date: "2023-11-20 09:15" },
        { step: 2, name: "Persetujuan Admin", status: "pending", date: null },
        { step: 3, name: "Konfirmasi Peminjam", status: "pending", date: null },
        { step: 4, name: "Barang Diambil", status: "pending", date: null }
      ]
    }
  ]);

  // --- DATA PERMINTAAN MASUK (ADMIN MODE) ---
  const [incomingTransactions, setIncomingTransactions] = useState([
    {
        id: 'REQ-2023-0055',
        borrower: "Himpunan Mahasiswa Komputer",
        itemName: "Kostum Tari Tradisional",
        items: [{ name: "Kostum Tari Tradisional", quantity: 4 }],
        price: 400000,
        status: "waiting_approval",
        image: "👘",
        startDate: "2023-12-01",
        endDate: "2023-12-03",
        duration: 2,
        handshakeSteps: [
          { step: 1, name: "Pengajuan Dikirim", status: "completed", date: "2023-11-28 09:00" },
          { step: 2, name: "Persetujuan Admin", status: "pending", date: null },
          { step: 3, name: "Konfirmasi Peminjam", status: "pending", date: null },
          { step: 4, name: "Barang Diambil", status: "pending", date: null }
        ]
      },
      {
        id: 'REQ-2023-0056',
        borrower: "UKM Paduan Suara",
        itemName: "Set Alat Musik Tradisional",
        items: [{ name: "Gamelan Mini", quantity: 1 }, { name: "Angklung Set", quantity: 1 }],
        price: 250000,
        status: "active",
        image: "🎭",
        startDate: "2023-11-25",
        endDate: "2023-11-28",
        duration: 3,
        handshakeSteps: [
          { step: 1, name: "Pengajuan Dikirim", status: "completed", date: "2023-11-24 10:00" },
          { step: 2, name: "Persetujuan Admin", status: "completed", date: "2023-11-24 11:00" },
          { step: 3, name: "Konfirmasi Peminjam", status: "completed", date: "2023-11-24 13:00" },
          { step: 4, name: "Barang Diambil", status: "completed", date: "2023-11-25 09:00" }
        ]
      }
  ]);

  const items = [
    {
      id: 1,
      name: "Proyektor Epson EB-X500",
      category: "Elektronik",
      price: 150000,
      originalPrice: null,
      owner: "BEM Universitas",
      isOrg: true,
      isBundle: false,
      rating: 4.8,
      location: "Gedung Rektorat Lt. 2",
      image: "📽️",
      status: "Tersedia",
      quantity: 8,
      available: 5,
      description: "Proyektor resolusi tinggi 1080p dengan brightness 3000 lumens. Cocok untuk presentasi kelas, rapat, atau acara seminar. Dilengkapi dengan kabel HDMI dan remote control.",
      reviews: 45,
      requirements: [
        "Pemakaian maksimal 6 jam berturut-turut",
        "Tidak boleh terkena cairan",
        "Harus didinginkan 30 menit sebelum dimatikan"
      ],
      guarantee: "KTM Asli + Deposit Rp 500.000",
      maxDuration: 5,
      specifications: {
        merk: "Epson",
        model: "EB-X500",
        resolusi: "1920x1080",
        brightness: "3000 lumens",
        berat: "2.8 kg"
      },
      maintenanceSchedule: "Setiap 3 bulan",
      locationDetails: "Ruang Logistik BEM, Gedung Rektorat Lt. 2"
    },
    {
      id: 2,
      name: "Sound System Portable 500W",
      category: "Audio",
      price: 75000,
      originalPrice: null,
      owner: "BEM Universitas",
      isOrg: true,
      isBundle: false,
      rating: 4.9,
      location: "Gedung Rektorat Lt. 2",
      image: "🔊",
      status: "Tersedia",
      quantity: 10,
      available: 7,
      description: "Speaker portable dengan output 500W, dilengkapi dengan 2 microphone wireless. Cocok untuk acara indoor dan outdoor dengan jangkauan suara yang jelas.",
      reviews: 32,
      requirements: [
        "Volume maksimal 80% untuk penggunaan >4 jam",
        "Microphone harus dimatikan saat tidak digunakan",
        "Kabel power harus digulung rapi saat pengembalian"
      ],
      guarantee: "KTM Asli + Deposit Rp 750.000",
      maxDuration: 7,
      specifications: {
        daya: "500W",
        input: "Bluetooth, AUX, USB",
        baterai: "6 jam",
        berat: "8.5 kg"
      },
      maintenanceSchedule: "Setiap 2 bulan",
      locationDetails: "Ruang Logistik BEM, Gedung Rektorat Lt. 2"
    },
    {
      id: 3,
      name: "Tenda Regu Pramuka",
      category: "Event",
      price: 50000,
      originalPrice: null,
      owner: "UKM Olahraga",
      isOrg: true,
      isBundle: false,
      rating: 4.5,
      location: "Gedung PKM Lt. 1",
      image: "⛺",
      status: "Tersedia",
      quantity: 5,
      available: 5,
      description: "Tenda regu kapasitas 8-10 orang. Bahan waterproof dan frame alumunium yang kokoh.",
      reviews: 12,
      requirements: [
        "Bersihkan sebelum dikembalikan",
        "Pastikan pasak lengkap"
      ],
      guarantee: "KTM Asli",
      maxDuration: 7,
      specifications: {
        kapasitas: "10 Orang",
        bahan: "Polyester",
        berat: "12 kg"
      },
      maintenanceSchedule: "Setiap 6 bulan",
      locationDetails: "Sekretariat UKM Olahraga"
    },
    {
      id: 4,
      name: "Kostum Tari Tradisional",
      category: "Event",
      price: 100000,
      originalPrice: 150000,
      owner: "UKM Seni Budaya",
      isOrg: true,
      isBundle: false,
      rating: 4.8,
      location: "Gedung PKM Lt. 2",
      image: "👘",
      status: "Tersedia",
      quantity: 20,
      available: 18,
      description: "Satu set kostum tari tradisional lengkap dengan aksesoris kepala dan selendang.",
      reviews: 25,
      requirements: [
        "Wajib dry clean sebelum dikembalikan",
        "Jangan terkena makeup"
      ],
      guarantee: "KTM + Deposit Rp 200.000",
      maxDuration: 3,
      specifications: {
        ukuran: "All Size",
        bahan: "Satin & Songket",
        aksesoris: "Lengkap"
      },
      maintenanceSchedule: "Setiap pemakaian",
      locationDetails: "Sekretariat UKM Seni Budaya"
    }
  ];

  const bundles = [
    {
      id: 101,
      name: "Paket Seminar & Workshop",
      category: "Bundling",
      price: 600000,
      originalPrice: 750000,
      owner: "BEM Universitas",
      isOrg: true,
      isBundle: true,
      rating: 4.9,
      location: "Gedung Rektorat Lt. 2",
      image: "📦",
      bundleItems: [
        { name: "Sound System Portable", quantity: 2, available: 7 },
        { name: "Mikrofon Wireless", quantity: 2, available: 15 },
        { name: "Proyektor", quantity: 1, available: 5 },
        { name: "Layar Proyeksi", quantity: 1, available: 8 },
        { name: "Kursi Plastik", quantity: 50, available: 45 }
      ],
      status: "Tersedia",
      description: "Paket lengkap untuk acara seminar dan workshop. Semua peralatan sudah terintegrasi dan siap pakai. Hemat 20% dibanding sewa terpisah.",
      reviews: 15,
      requirements: [
        "Konfirmasi H-1 untuk pengecekan kelengkapan",
        "Tim teknis minimal 2 orang",
        "Kabel harus digulung rapi saat pengembalian"
      ],
      guarantee: "KTM Asli + Deposit Rp 1.500.000",
      maxDuration: 3,
      savings: 150000,
      popularity: "High"
    }
  ];

  const categories = ["Semua", "Bundling", "Elektronik", "Audio", "Event", "Furnitur"];
   
  const filteredItems = categoryFilter === "Semua" 
    ? items 
    : categoryFilter === "Bundling" 
      ? bundles 
      : items.filter(item => item.category === categoryFilter);

  const filteredBySearch = filteredItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- HANDLERS ---

  const handleRentRequest = (item) => {
    const newTrx = {
      id: `TRX-${Date.now()}`,
      itemName: item.name,
      items: item.isBundle ? item.bundleItems : [{ name: item.name, quantity: 1 }],
      price: item.price,
      owner: item.owner,
      status: "waiting_approval",
      type: item.isBundle ? "bundle" : "item",
      image: item.image,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + item.maxDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration: item.maxDuration,
      timeLeft: "Menunggu",
      progress: 0,
      handshakeSteps: [
        { step: 1, name: "Pengajuan Dikirim", status: "completed", date: new Date().toISOString() },
        { step: 2, name: "Persetujuan Admin", status: "pending", date: null },
        { step: 3, name: "Konfirmasi Peminjam", status: "pending", date: null },
        { step: 4, name: "Barang Diambil", status: "pending", date: null }
      ]
    };
    setTransactions([newTrx, ...transactions]);
    setSelectedItem(null);
    setSelectedBundle(null);
    setActivePage('activity');
    setLoanStep(1);
  };

  const updateStatus = (id, newStatus) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ));
  };

  const handleReturnRequest = (transaction) => {
    setTransactions(transactions.map(t => 
      t.id === transaction.id ? { 
        ...t, 
        status: "return_pending",
        handshakeSteps: [
          ...t.handshakeSteps,
          { step: 5, name: "Pengajuan Pengembalian", status: "completed", date: new Date().toISOString() },
          { step: 6, name: "Verifikasi Admin", status: "pending", date: null },
          { step: 7, name: "Konfirmasi Penerimaan", status: "pending", date: null }
        ]
      } : t
    ));
    setReturnStep(1);
  };

  // --- ADMIN HANDLERS (New) ---
  const handleApproveRequest = (id) => {
    setIncomingTransactions(prev => prev.map(trx => 
        trx.id === id ? {
            ...trx,
            status: 'active',
            handshakeSteps: trx.handshakeSteps.map(step => 
                step.step === 2 ? { ...step, status: 'completed', date: new Date().toISOString() } : step
            )
        } : trx
    ));
  };

  const handleRejectRequest = (id) => {
    setIncomingTransactions(prev => prev.map(trx => 
        trx.id === id ? { ...trx, status: 'rejected' } : trx
    ));
  };

  // --- HALAMAN LOGIN ---
  const LoginPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 font-sans p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row h-full md:h-[600px] animate-in fade-in zoom-in duration-500">
        
        {/* Left Side: Illustration / Branding */}
        <div className="md:w-1/2 bg-blue-50 p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-blue-950 mb-2">
              Peminjaman<span className="text-blue-600">Kampus</span>
            </h1>
            <p className="text-gray-500 text-sm">Sistem Terintegrasi Logistik Mahasiswa</p>
          </div>

          <div className="relative z-10 text-center my-8 md:my-0">
             <div className="text-8xl mb-4 animate-bounce-slow inline-block">🎓</div>
             <h2 className="text-2xl font-bold text-gray-800 mb-2">Kebutuhan Acara?</h2>
             <p className="text-gray-600 px-8">Pinjam sound system, tenda, hingga proyektor untuk kegiatan UKM dan Himpunan dengan mudah.</p>
          </div>

          <div className="relative z-10 flex gap-2 justify-center">
             <div className="w-2 h-2 rounded-full bg-blue-600"></div>
             <div className="w-2 h-2 rounded-full bg-blue-200"></div>
             <div className="w-2 h-2 rounded-full bg-blue-200"></div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang! 👋</h2>
              <p className="text-gray-500">Silakan login menggunakan akun SSO Kampus.</p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2 animate-pulse">
                <AlertCircle size={18} /> {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NIM / Email Kampus</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Contoh: 12345678"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="password" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">Lupa Password?</a>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Masuk Sekarang <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              Belum punya akun organisasi? <a href="#" className="font-bold text-blue-600 hover:underline">Daftar disini</a>
            </div>
          </div>
          
          <div className="mt-auto pt-6 text-center text-xs text-gray-400">
            © 2023 Sistem Peminjaman Logistik Kampus v1.0
          </div>
        </div>
      </div>
    </div>
  );

  // --- COMPONENT HALAMAN PROFILE ---
  const ProfilePage = () => (
    <div className="pt-28 container mx-auto px-6 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
                  US
                </div>
              </div>
            </div>
          </div>
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">UKM Seni Budaya</h2>
                <p className="text-gray-500">Unit Kegiatan Mahasiswa • Terverifikasi</p>
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                <Settings size={16} /> Edit Profil
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">NIM / ID Organisasi</h3>
                <p className="font-bold text-gray-800">ORG-2023-002</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Email</h3>
                <p className="font-bold text-gray-800">senibudaya@univ.ac.id</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Kontak</h3>
                <p className="font-bold text-gray-800">0813-4567-8901</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Statistik Organisasi</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
              <div className="text-xs text-gray-500">Peminjaman Aktif</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-1">45</div>
              <div className="text-xs text-gray-500">Total Peminjaman</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 mb-1">0</div>
              <div className="text-xs text-gray-500">Pelanggaran</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 mb-1">4.8</div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-2xl border border-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Keluar dari Akun
        </button>
      </div>
    </div>
  );

  // --- COMPONENT HALAMAN NOTIFIKASI ---
  const NotificationPage = () => (
    <div className="pt-28 container mx-auto px-6 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Notifikasi</h2>
          <button className="text-sm text-blue-600 font-bold hover:underline">Tandai semua dibaca</button>
        </div>

        <div className="space-y-4">
          {notifications.map(notif => (
            <div key={notif.id} className={`p-5 rounded-2xl border transition-all hover:shadow-md cursor-pointer flex gap-4 ${
              notif.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-100'
            }`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                notif.type === 'success' ? 'bg-green-100 text-green-600' :
                notif.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                notif.type === 'info' ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {notif.type === 'success' ? <CheckCircle2 size={24} /> :
                 notif.type === 'warning' ? <AlertTriangle size={24} /> :
                 notif.type === 'info' ? <BellRing size={24} /> :
                 <Settings size={24} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold ${notif.read ? 'text-gray-800' : 'text-gray-900'}`}>{notif.title}</h4>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- COMPONENT HALAMAN CHAT ---
  const ChatPage = () => {
    const currentChat = chats.find(c => c.id === activeChat);

    return (
      <div className="pt-24 container mx-auto px-4 pb-10 h-screen flex flex-col">
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex">
          {/* Sidebar List Chat */}
          <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="font-bold text-lg text-gray-800 mb-4">Pesan</h2>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Cari kontak..." 
                  className="w-full bg-gray-100 text-sm px-4 py-2 pl-9 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {chats.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                    activeChat === chat.id ? 'bg-white border-l-4 border-blue-600 shadow-sm' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {chat.avatar}
                    </div>
                    {chat.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-sm text-gray-900 truncate">{chat.name}</h4>
                      <span className="text-[10px] text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{chat.message}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="flex items-center">
                      <span className="w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                        {chat.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Header Chat */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {currentChat.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{currentChat.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${currentChat.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-xs text-gray-500 capitalize">{currentChat.status}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              <div className="flex justify-center mb-4">
                <span className="text-[10px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Hari ini</span>
              </div>
              
              {/* Pesan Lawan */}
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                  {currentChat.avatar}
                </div>
                <div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 border border-gray-100">
                    {currentChat.message}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 ml-1">{currentChat.time}</span>
                </div>
              </div>

              {/* Pesan Sendiri */}
              <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold flex-shrink-0 mt-1">
                  US
                </div>
                <div>
                  <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-md text-sm text-white">
                    Baik, terima kasih informasinya kak.
                  </div>
                  <div className="flex justify-end gap-1 mt-1 mr-1">
                    <span className="text-[10px] text-gray-400">09:42</span>
                    <Check size={12} className="text-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Paperclip size={20} />
                </button>
                <input 
                  type="text" 
                  placeholder="Ketik pesan..." 
                  className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700"
                />
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- MAIN COMPONENTS ---

  const Navbar = () => (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-md py-5 border-b border-gray-100'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex flex-col cursor-pointer" onClick={() => setActivePage('home')}>
            <h1 className="text-2xl font-extrabold text-blue-950 tracking-tight leading-none">
              Peminjaman<span className="text-blue-600">Kampus</span>
            </h1>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
              Sistem Peminjaman Terpadu
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <button 
              onClick={() => setActivePage('home')} 
              className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${activePage === 'home' ? 'text-blue-600 font-bold' : ''}`}
            >
              <Home size={16} />
              Beranda
            </button>
            <button 
              onClick={() => setActivePage('activity')} 
              className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${activePage === 'activity' ? 'text-blue-600 font-bold' : ''}`}
            >
              <Calendar size={16} />
              Aktivitas Saya
            </button>
            <button 
                onClick={() => {
                    setActivePage('organizations');
                    setSelectedOrg(null);
                }} 
                className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${activePage === 'organizations' ? 'text-blue-600 font-bold' : ''}`}
            >
              <Building2 size={16} />
              Organisasi
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <input 
              type="text" 
              placeholder="Cari barang atau paket..." 
              className="bg-gray-100 text-sm px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActivePage('notifications')}
              className={`p-2 rounded-full relative transition-colors ${activePage === 'notifications' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <BellRing size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => setActivePage('chat')}
              className={`p-2 rounded-full transition-colors ${activePage === 'chat' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <MessageSquare size={20} />
            </button>
            <div 
              className={`flex items-center gap-2 rounded-full px-3 py-1 cursor-pointer transition-colors border ${activePage === 'profile' ? 'bg-blue-50 border-blue-200' : 'bg-gray-100 border-transparent hover:bg-gray-200'}`} 
              onClick={() => setActivePage('profile')}
            >
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm border border-blue-200">
                UKM
              </div>
              <span className="text-sm font-medium text-gray-700">UKM Seni Budaya</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white pt-32 pb-24 px-6 rounded-b-[3rem] shadow-2xl mb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-bold text-blue-100 mb-2">
              <Shield size={16} />
              Terverifikasi Kampus • Aman & Terpercaya
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Pinjam Logistik <br />
              <span className="text-blue-300">Kampus Lebih Mudah</span>
            </h2>
            <p className="text-blue-100 text-lg md:w-4/5 leading-relaxed">
              Sistem peminjaman terintegrasi untuk UKM, himpunan, dan organisasi kampus. 
              Dengan fitur Double Handshake Protocol dan notifikasi real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/50 transition-all transform hover:-translate-y-1 flex items-center gap-2">
                <Package size={20} />
                Jelajahi Katalog
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold border border-white/20 transition-all flex items-center gap-2">
                <Handshake size={20} />
                Cara Peminjaman
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="text-4xl mb-3">📦</div>
                <h3 className="font-bold text-white mb-1">Paket Bundling</h3>
                <p className="text-blue-100 text-sm">Hemat hingga 30% dengan paket event lengkap</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 mt-8">
                <div className="text-4xl mb-3">⏰</div>
                <h3 className="font-bold text-white mb-1">Notifikasi Real-time</h3>
                <p className="text-blue-100 text-sm">Pengingat pengembalian otomatis</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-bold text-white mb-1">Double Handshake</h3>
                <p className="text-blue-100 text-sm">Konfirmasi 2 arah yang aman</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500 mt-8">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-bold text-white mb-1">Tracking Real-time</h3>
                <p className="text-blue-100 text-sm">Pantau status peminjaman live</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StatsSection = () => (
    <div className="container mx-auto px-6 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600 text-sm">Barang Tersedia</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">1.2K+</div>
          <div className="text-gray-600 text-sm">Peminjaman/Bulan</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
          <div className="text-gray-600 text-sm">Organisasi</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
          <div className="text-gray-600 text-sm">Kepuasan Pengguna</div>
        </div>
      </div>
    </div>
  );

  const ItemCard = ({ item }) => (
    <div 
      onClick={() => item.isBundle ? setSelectedBundle(item) : setSelectedItem(item)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className={`h-48 flex items-center justify-center text-6xl relative ${
        item.isBundle ? 'bg-gradient-to-br from-purple-50 to-blue-50' : 'bg-gradient-to-br from-gray-50 to-blue-50'
      } group-hover:bg-opacity-80 transition-colors`}>
        <div className="transform group-hover:scale-110 transition-transform duration-300">{item.image}</div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isBundle && (
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
              🎯 PAKET HEMAT
            </div>
          )}
          <div className={`text-xs font-bold px-2 py-1 rounded-full ${
            item.status === 'Tersedia' ? 'bg-green-100 text-green-700' :
            item.status === 'Terbatas' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {item.status}
          </div>
        </div>
        
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-1">
          ⭐ {item.rating}
        </div>

        {/* Quantity Indicator */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
            <span>Ketersediaan:</span>
            <span className="font-bold">{item.available}/{item.quantity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                item.available > item.quantity * 0.3 ? 'bg-green-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${(item.available / item.quantity) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.category}</span>
          {item.isOrg && (
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-100 flex items-center gap-1">
              <Building2 size={10} /> Official
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{item.description}</p>
        
        {/* Specifications Preview */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            Maks: {item.maxDuration} hari
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {item.location}
          </span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-xs font-bold text-blue-600 border border-white shadow-sm">
              {item.isOrg ? <Building2 size={14} /> : item.owner.charAt(0)}
            </div>
            <span className="text-xs text-gray-500 truncate max-w-[100px]">{item.owner}</span>
          </div>
          <div className="text-right">
            {item.originalPrice && (
              <div className="text-xs text-gray-400 line-through">Rp{item.originalPrice.toLocaleString()}</div>
            )}
            <span className="text-blue-600 font-bold text-lg">Rp{item.price.toLocaleString()}</span>
            <span className="text-gray-400 text-xs font-normal">/hari</span>
          </div>
        </div>
      </div>
    </div>
  );

  const BundleModal = () => {
    if (!selectedBundle) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
          {/* Kiri: Gambar dan Info Utama */}
          <div className="md:w-2/5 bg-gradient-to-br from-purple-50 to-blue-100 p-8 flex flex-col justify-between">
            <div>
              <button onClick={() => setSelectedBundle(null)} className="mb-6 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-8xl text-center mb-6 animate-bounce-slow">{selectedBundle.image}</div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                    {selectedBundle.category}
                  </span>
                  {selectedBundle.isOrg && (
                    <span className="flex items-center gap-1 text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-full">
                      <CheckCircle2 size={12} /> Verified Organization
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900">{selectedBundle.name}</h2>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {selectedBundle.location}
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ {selectedBundle.rating} ({selectedBundle.reviews} Review)
                  </span>
                </div>
              </div>
            </div>

            {/* Savings Box */}
            <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Total Hemat</span>
                <span className="text-lg font-bold text-green-600">Rp{selectedBundle.savings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Harga Normal:</span>
                <span className="text-gray-400 line-through">Rp{selectedBundle.originalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Kanan: Detail */}
          <div className="md:w-3/5 p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Pricing Box */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Harga Paket</span>
                    <div className="text-3xl font-bold text-blue-600">Rp{selectedBundle.price.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Maks. Peminjaman</span>
                    <div className="font-bold text-gray-700">{selectedBundle.maxDuration} Hari</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleRentRequest(selectedBundle)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Ajukan Peminjaman Paket
                </button>
              </div>

              {/* Bundle Items */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <Package size={20} className="text-purple-500" />
                  Isi Paket Bundling
                </h3>
                <div className="space-y-3">
                  {selectedBundle.bundleItems.map((bundleItem, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span className="font-medium text-gray-800">{bundleItem.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">
                          {bundleItem.quantity}x
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          bundleItem.available > 2 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {bundleItem.available} tersedia
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements & Guarantee */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                    <FileText size={16} className="text-orange-500" />
                    Persyaratan
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {selectedBundle.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                    <Shield size={16} className="text-green-500" />
                    Jaminan & Keamanan
                  </h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800 font-medium">{selectedBundle.guarantee}</p>
                    <p className="text-xs text-green-600 mt-2">Jaminan akan dikembalikan setelah barang diverifikasi</p>
                  </div>
                </div>
              </div>

              {/* Popularity */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Star size={16} className="fill-yellow-500" />
                  <span className="font-bold text-sm">Paket Populer</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  {selectedBundle.popularity === 'High' 
                    ? 'Paket ini sering dipinjam. Disarankan booking 3-5 hari sebelumnya.'
                    : 'Tersedia dengan fleksibilitas waktu peminjaman.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ItemModal = () => {
    if (!selectedItem) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
          {/* Kiri: Gambar dan Info Utama */}
          <div className="md:w-2/5 bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex flex-col justify-between">
            <div>
              <button onClick={() => setSelectedItem(null)} className="mb-6 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-8xl text-center mb-6 animate-bounce-slow">{selectedItem.image}</div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                    {selectedItem.category}
                  </span>
                  {selectedItem.isOrg && (
                    <span className="flex items-center gap-1 text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-full">
                      <CheckCircle2 size={12} /> Verified Organization
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {selectedItem.location}
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ {selectedItem.rating} ({selectedItem.reviews} Review)
                  </span>
                </div>
              </div>
            </div>

            {/* Availability Box */}
            <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Ketersediaan</span>
                <span className={`font-bold ${
                  selectedItem.available > 5 ? 'text-green-600' : 
                  selectedItem.available > 2 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {selectedItem.available} dari {selectedItem.quantity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    selectedItem.available > selectedItem.quantity * 0.3 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${(selectedItem.available / selectedItem.quantity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Kanan: Detail */}
          <div className="md:w-3/5 p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Pricing Box */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Harga Sewa</span>
                    <div className="text-3xl font-bold text-blue-600">Rp{selectedItem.price.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Maks. Peminjaman</span>
                    <div className="font-bold text-gray-700">{selectedItem.maxDuration} Hari</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleRentRequest(selectedItem)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Ajukan Peminjaman
                </button>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Deskripsi Barang</h3>
                <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Spesifikasi Teknis</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(selectedItem.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500 capitalize">{key}:</span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements & Guarantee */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                    <FileText size={16} className="text-orange-500" />
                    Persyaratan
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {selectedItem.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                    <Shield size={16} className="text-green-500" />
                    Jaminan & Keamanan
                  </h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800 font-medium">{selectedItem.guarantee}</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <Clock size={12} />
                      Maintenance: {selectedItem.maintenanceSchedule}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />
                  Lokasi Pengambilan
                </h4>
                <p className="text-sm text-gray-600">{selectedItem.locationDetails}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HandshakeProtocol = ({ transaction }) => (
    <div className="mt-6">
      <h4 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-2">
        <Handshake size={16} className="text-blue-500" />
        Proses Double Handshake Protocol
      </h4>
      <div className="space-y-3">
        {transaction.handshakeSteps.map((step, idx) => (
          <div key={step.step} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              step.status === 'completed' ? 'bg-green-100 text-green-600 border border-green-200' :
              step.status === 'pending' ? 'bg-gray-100 text-gray-400 border border-gray-200' :
              'bg-yellow-100 text-yellow-600 border border-yellow-200'
            }`}>
              {step.status === 'completed' ? '✓' : step.step}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className={`font-medium text-sm ${
                  step.status === 'completed' ? 'text-green-700' :
                  step.status === 'pending' ? 'text-gray-500' : 'text-yellow-700'
                }`}>
                  {step.name}
                </span>
                {step.date && (
                  <span className="text-xs text-gray-400">
                    {new Date(step.date).toLocaleDateString('id-ID')} {new Date(step.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              {step.status === 'completed' && step.date && (
                <p className="text-xs text-gray-500 mt-1">Selesai pada {new Date(step.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ReminderToast = () => (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right duration-500">
      <div className="bg-white rounded-xl shadow-2xl shadow-orange-900/20 border-l-4 border-orange-500 p-4 w-80 relative overflow-hidden">
        <button onClick={() => setShowReminder(false)} className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors">
          <X size={16} />
        </button>
        <div className="flex gap-3">
          <div className="bg-orange-100 p-2 rounded-full text-orange-600 h-fit">
            <BellRing size={20} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-1">Pengingat Pengembalian</h4>
            <p className="text-xs text-gray-600 mb-2">
              Sewa <span className="font-bold">Sound System Portable 500W</span> berakhir dalam <span className="text-red-600 font-bold">2 hari</span>.
            </p>
            <button 
              onClick={() => { setShowReminder(false); setActivePage('activity'); }}
              className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded font-bold transition-colors"
            >
              Cek Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- HALAMAN ORGANISASI BARU ---
   
  const OrganizationPage = () => {
    // Tampilan Detail Organisasi
    if (selectedOrg) {
        const orgItems = items.filter(item => item.owner === selectedOrg.name);
        const orgBundles = bundles.filter(bundle => bundle.owner === selectedOrg.name);

        return (
            <div className="pt-28 container mx-auto px-6 pb-20 min-h-screen animate-in fade-in duration-300">
                <button 
                    onClick={() => setSelectedOrg(null)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium"
                >
                    <ChevronLeft size={20} /> Kembali ke Daftar Organisasi
                </button>

                {/* Header Profil Organisasi */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-12">
                    <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-800 relative">
                        <div className="absolute -bottom-16 left-8 p-1 bg-white rounded-2xl shadow-lg">
                            <div className="w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center text-6xl border border-gray-100">
                                {selectedOrg.image}
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 px-8 pb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-3xl font-extrabold text-gray-900">{selectedOrg.name}</h2>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <CheckCircle2 size={12} /> Verified
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                        <Users size={14} /> {selectedOrg.members} Anggota
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                        ⭐ {selectedOrg.rating} Rating
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                        🗓️ Bergabung {selectedOrg.joined}
                                    </span>
                                </div>
                                <p className="text-gray-600 max-w-2xl leading-relaxed">
                                    {selectedOrg.description}
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-auto">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                                    <MessageSquare size={18} /> Hubungi Admin
                                </button>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone size={14} /> {selectedOrg.contact}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail size={14} /> {selectedOrg.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Inventory */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Package size={24} className="text-blue-600" />
                        Katalog Inventaris {selectedOrg.name}
                    </h3>
                    
                    {orgItems.length === 0 && orgBundles.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                            <p className="text-gray-500">Organisasi ini belum memiliki barang yang disewakan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* Render Bundles First */}
                            {orgBundles.map(bundle => (
                                <ItemCard key={bundle.id} item={bundle} />
                            ))}
                            {/* Render Items */}
                            {orgItems.map(item => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Tampilan List Organisasi
    return (
        <div className="pt-32 container mx-auto px-6 pb-20 min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-16">
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Direktori Kampus</span>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Organisasi & UKM Terdaftar
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Temukan profil lengkap, kontak, dan inventaris logistik dari berbagai organisasi mahasiswa di kampus.
                </p>
            </div>

            {/* Organization Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {organizations.map((org) => (
                    <div 
                        key={org.id}
                        onClick={() => setSelectedOrg(org)}
                        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                    >
                        <div className="h-24 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
                            <div className="absolute -bottom-10 left-6">
                                <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center text-4xl border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                                    {org.image}
                                </div>
                            </div>
                        </div>
                        <div className="pt-12 px-6 pb-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    org.type === 'BEM' ? 'bg-orange-100 text-orange-700' :
                                    org.type === 'Himpunan' ? 'bg-purple-100 text-purple-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                    {org.type}
                                </span>
                                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                                    ⭐ {org.rating}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {org.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                                {org.description}
                            </p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Users size={14} /> {org.members} Anggota
                                </span>
                                <span className="text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                    Lihat Profil <ChevronLeft size={12} className="rotate-180" />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  // --- MAIN RENDER ---
  // Jika belum login, tampilkan LoginPage
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // Jika sudah login, tampilkan aplikasi utama
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans text-gray-800 animate-in fade-in duration-500">
      <Navbar />
      
      {showReminder && <ReminderToast />}
      <ItemModal />
      <BundleModal />

      {activePage === 'home' && (
        <>
          <HeroSection />
          <StatsSection />
          
          <main className="container mx-auto px-6 pb-20">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Katalog Logistik Kampus
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Temukan berbagai kebutuhan logistik untuk acara UKM, himpunan, dan organisasi kampus lainnya
              </p>
            </div>

            {/* Filters and Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-8 sticky top-20 z-30 bg-gray-50/90 backdrop-blur py-4 rounded-2xl">
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide mb-4 lg:mb-0">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setCategoryFilter(cat)} 
                    className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap border transition-all ${
                      categoryFilter === cat 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-4 w-full lg:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 lg:flex-none">
                  <input 
                    type="text" 
                    placeholder="Cari barang atau paket..." 
                    className="bg-white text-sm px-4 py-3 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full lg:w-64 border border-gray-200 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                
                {/* View Toggle */}
                <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }`}>
              {filteredBySearch.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>

            {filteredBySearch.length === 0 && (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">Barang tidak ditemukan</h3>
                <p className="text-gray-500">
                  Coba ubah kata kunci pencarian atau filter kategori
                </p>
              </div>
            )}
          </main>
        </>
      )}

      {/* RENDER HALAMAN LAINNYA */}
      {activePage === 'organizations' && <OrganizationPage />}
      {activePage === 'profile' && <ProfilePage />}
      {activePage === 'notifications' && <NotificationPage />}
      {activePage === 'chat' && <ChatPage />}

      {activePage === 'activity' && (
        <div className="pt-32 container mx-auto px-6 pb-20 min-h-screen">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Aktivitas Logistik</h2>
                <p className="text-gray-500">Pantau peminjaman dan kelola permintaan masuk.</p>
            </div>
            {/* Tab Switcher */}
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex">
                <button 
                    onClick={() => setActivityTab('borrowing')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        activityTab === 'borrowing' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    Peminjaman Saya
                </button>
                <button 
                    onClick={() => setActivityTab('lending')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                        activityTab === 'lending' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    Kelola Peminjaman
                    {incomingTransactions.filter(t => t.status === 'waiting_approval').length > 0 && (
                        <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                            {incomingTransactions.filter(t => t.status === 'waiting_approval').length}
                        </span>
                    )}
                </button>
            </div>
          </div>

          {/* CONTENT: PEMINJAMAN SAYA */}
          {activityTab === 'borrowing' && (
            <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {transactions.map((trx) => (
                    <div key={trx.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex gap-6 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center text-3xl border border-gray-100 flex-shrink-0">
                            {trx.image}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{trx.itemName}</h3>
                                <p className="text-sm text-gray-500">
                                Milik: <span className="font-bold">{trx.owner}</span> • ID: {trx.id}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                trx.status === 'active' ? 'bg-green-100 text-green-700' :
                                trx.status === 'waiting_approval' ? 'bg-yellow-100 text-yellow-700' :
                                trx.status === 'return_pending' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-500'
                            }`}>
                                {trx.status === 'active' ? 'Sedang Dipinjam' : 
                                trx.status === 'waiting_approval' ? 'Menunggu Persetujuan' : 
                                trx.status === 'return_pending' ? 'Pengembalian Diproses' : 'Selesai'}
                            </span>
                            </div>
                            
                            {/* Progress Bar */}
                            {trx.status === 'active' && (
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Waktu Peminjaman</span>
                                <span>{trx.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full ${
                                    trx.progress > 80 ? 'bg-red-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${trx.progress}%` }}
                                ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{new Date(trx.startDate).toLocaleDateString('id-ID')}</span>
                                <span>{new Date(trx.endDate).toLocaleDateString('id-ID')}</span>
                                </div>
                            </div>
                            )}
                        </div>
                        </div>

                        {/* Items List */}
                        <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm">Detail Barang:</h4>
                        <div className="space-y-2">
                            {trx.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg">
                                <span className="text-gray-700">{item.name}</span>
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
                                {item.quantity}x
                                </span>
                            </div>
                            ))}
                        </div>
                        </div>

                        {/* Handshake Protocol */}
                        <HandshakeProtocol transaction={trx} />

                        {/* Action Buttons */}
                        {trx.status === 'active' && (
                        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                            <button 
                            onClick={() => handleReturnRequest(trx)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                            <RotateCcw size={16} />
                            Ajukan Pengembalian
                            </button>
                            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                            Perpanjang
                            </button>
                        </div>
                        )}

                        {trx.status === 'waiting_approval' && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">
                            Batalkan Pengajuan
                            </button>
                        </div>
                        )}
                    </div>
                    ))}
                </div>

                {transactions.length === 0 && (
                    <div className="text-center py-20">
                    <div className="text-8xl mb-6">📦</div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-2">Belum ada transaksi</h3>
                    <p className="text-gray-500 mb-6">Mulai pinjam barang untuk melihat aktivitas di sini</p>
                    <button 
                        onClick={() => setActivePage('home')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
                    >
                        Jelajahi Katalog
                    </button>
                    </div>
                )}
            </>
          )}

          {/* CONTENT: KELOLA PEMINJAMAN (ADMIN) */}
          {activityTab === 'lending' && (
            <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {incomingTransactions.map((trx) => (
                    <div key={trx.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex gap-6 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl flex items-center justify-center text-3xl border border-gray-100 flex-shrink-0">
                            {trx.image}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{trx.itemName}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                    <User size={14} /> Peminjam: <span className="font-bold text-blue-600">{trx.borrower}</span>
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                trx.status === 'active' ? 'bg-green-100 text-green-700' :
                                trx.status === 'waiting_approval' ? 'bg-orange-100 text-orange-700' :
                                trx.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-500'
                            }`}>
                                {trx.status === 'active' ? 'Disetujui' : 
                                trx.status === 'waiting_approval' ? 'Perlu Persetujuan' : 
                                trx.status === 'rejected' ? 'Ditolak' : 'Selesai'}
                            </span>
                            </div>
                            
                            <div className="flex justify-between text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg">
                                <span className="flex items-center gap-1"><Clock size={12}/> Durasi: {trx.duration} Hari</span>
                                <span>{new Date(trx.startDate).toLocaleDateString('id-ID')} - {new Date(trx.endDate).toLocaleDateString('id-ID')}</span>
                            </div>
                        </div>
                        </div>

                        {/* Items List */}
                        <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm">Detail Permintaan:</h4>
                        <div className="space-y-2">
                            {trx.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg">
                                <span className="text-gray-700">{item.name}</span>
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
                                {item.quantity}x
                                </span>
                            </div>
                            ))}
                        </div>
                        </div>

                        {/* Handshake Protocol */}
                        <HandshakeProtocol transaction={trx} />

                        {/* Action Buttons for Admin */}
                        {trx.status === 'waiting_approval' && (
                        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                            <button 
                                onClick={() => handleApproveRequest(trx.id)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <Check size={18} />
                                Setujui (ACC)
                            </button>
                            <button 
                                onClick={() => handleRejectRequest(trx.id)}
                                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <XCircle size={18} />
                                Tolak
                            </button>
                        </div>
                        )}

                        {trx.status === 'active' && (
                            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                <p className="text-green-600 text-sm font-bold flex items-center justify-center gap-2">
                                    <CheckCircle2 size={16} /> Barang sedang dipinjam
                                </p>
                            </div>
                        )}
                        
                        {trx.status === 'rejected' && (
                            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                <p className="text-red-500 text-sm font-bold flex items-center justify-center gap-2">
                                    <XCircle size={16} /> Permintaan ditolak
                                </p>
                            </div>
                        )}
                    </div>
                    ))}
                </div>

                {incomingTransactions.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-bold text-gray-400">Tidak ada permintaan masuk</h3>
                        <p className="text-gray-500 text-sm">Semua aman terkendali!</p>
                    </div>
                )}
            </>
          )}
        </div>
      )}

      {/* Footer */}
      {/* Jangan tampilkan footer di halaman chat agar full height */}
      {activePage !== 'chat' && (
        <footer className="bg-white border-t border-gray-200 py-16 mt-20">
            <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                <h4 className="font-extrabold text-xl text-blue-950 mb-4">
                    Logistik<span className="text-blue-600">Kampus</span>
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Sistem peminjaman logistik terintegrasi untuk lingkungan kampus. 
                    Mendukung UKM, himpunan, dan organisasi lainnya dengan teknologi terdepan.
                </p>
                </div>
                <div>
                <h5 className="font-bold text-gray-800 mb-4">Fitur Utama</h5>
                <ul className="text-sm text-gray-500 space-y-2">
                    <li className="hover:text-blue-600 cursor-pointer transition-colors">Paket Bundling</li>
                    <li className="hover:text-blue-600 cursor-pointer transition-colors">Double Handshake Protocol</li>
                    <li className="hover:text-blue-600 cursor-pointer transition-colors">Notifikasi Real-time</li>
                    <li className="hover:text-blue-600 cursor-pointer transition-colors">Tracking Peminjaman</li>
                </ul>
                </div>
                <div>
                <h5 className="font-bold text-gray-800 mb-4">Bantuan</h5>
                <ul className="text-sm text-gray-500 space-y-2">
                    <li className="hover:text-blue-600 cursor-pointer transition-colors">Pusat Bantuan</li>
                    <li className="hover:text-blue-600 cursor-pointer transition-colors">Syarat & Ketentuan</li>
                    <li className="hover:text-blue-600 cursor-pointer transition-colors">Kebijakan Privasi</li>
                    <li className="hover:text-blue-600 cursor-pointer transition-colors">FAQ</li>
                </ul>
                </div>
                <div>
                <h5 className="font-bold text-gray-800 mb-4">Kontak</h5>
                <p className="text-sm text-gray-500 mb-2">logistik@kampus.ac.id</p>
                <p className="text-sm text-gray-500 mb-2">(021) 1234-5678</p>
                <p className="text-sm text-gray-500">Gedung Rektorat Lt. 2</p>
                <div className="flex gap-4 mt-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    <span className="text-xs font-bold text-gray-600">f</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    <span className="text-xs font-bold text-gray-600">in</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    <span className="text-xs font-bold text-gray-600">ig</span>
                    </div>
                </div>
                </div>
            </div>
            <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400">
                © 2023 Sistem Peminjaman Logistik Kampus. All rights reserved.
            </div>
            </div>
        </footer>
      )}
    </div>
  );
};

export default SistemPeminjamanLogistikKampus;