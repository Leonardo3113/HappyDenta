"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  Search, Sparkles, Heart, Scissors, Sun,
  Activity, Smile, Star, Baby, Clock,
  MapPin, Phone, Menu, X
} from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useState, useCallback, useEffect } from "react"

const services = [
  {
    icon: Search,
    title: "Pemeriksaan dan Konsultasi Gigi",
    description: "Konsultasi dengan dokter gigi profesional untuk mengetahui kondisi kesehatan gigi Anda."
  },
  {
    icon: Sparkles,
    title: "Pembersihan Karang Gigi (Scaling)",
    description: "Menghilangkan karang gigi untuk mencegah masalah gusi dan menjaga kebersihan mulut."
  },
  {
    icon: Heart,
    title: "Penambalan Gigi",
    description: "Memperbaiki gigi berlubang dengan bahan tambalan berkualitas tinggi."
  },
  {
    icon: Scissors,
    title: "Pencabutan Gigi",
    description: "Prosedur pencabutan gigi yang aman dan nyaman."
  },
  {
    icon: Sun,
    title: "Pemutihan Gigi (Teeth Whitening)",
    description: "Memutihkan gigi secara profesional untuk senyum yang lebih cerah."
  },
  {
    icon: Activity,
    title: "Perawatan Saluran Akar (Root Canal Treatment)",
    description: "Menyelamatkan gigi yang terinfeksi dengan perawatan saluran akar."
  },
  {
    icon: Smile,
    title: "Pemasangan Gigi Tiruan (Gigi Palsu)",
    description: "Solusi pengganti gigi yang hilang dengan gigi tiruan yang nyaman."
  },
  {
    icon: Star,
    title: "Orthodonti (Behel/Gigi Kawat)",
    description: "Merapikan susunan gigi dengan perawatan orthodonti modern."
  },
  {
    icon: Baby,
    title: "Perawatan Gigi Anak",
    description: "Perawatan khusus untuk kesehatan gigi anak-anak."
  }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (isExpanded && currentScrollY > lastScrollY + 10) {
        setIsExpanded(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isExpanded])

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
<div className="min-h-screen bg-white relative">
  {/* Fixed Chat Button */}
  <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-2">
    {/* Mobile: phone icon toggle button */}
    {!isExpanded && (
      <button
        onClick={() => setIsExpanded(true)}
        aria-expanded={isExpanded}
        aria-label="Toggle Hubungi Sekarang"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00B6D6] text-white shadow-xl hover:bg-[#0095b0] transition-all hover:scale-105 md:hidden"
      >
        <Phone className="w-6 h-6" />
      </button>
    )}

    {/* Mobile: expanded text link */}
    {isExpanded && (
      <a
        href="https://wa.me/62811726242?text=Halo%20HappyDenta%2C%20saya%20ingin%20konsultasi%20mengenai%20perawatan%20gigi."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 font-semibold text-base bg-[#00B6D6] text-white rounded-full shadow-xl px-6 py-4 md:hidden"
        onClick={() => setIsExpanded(false)}
      >
        <Phone className="w-6 h-6" />
        Hubungi Sekarang
      </a>
    )}

    {/* Desktop: combined phone icon and text link */}
    <a
      href="https://wa.me/62811726242?text=Halo%20HappyDenta%2C%20saya%20ingin%20konsultasi%20mengenai%20perawatan%20gigi."
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex items-center justify-center gap-3 bg-[#00B6D6] text-white rounded-full shadow-xl px-6 py-4 hover:bg-[#0095b0] transition-all hover:scale-105"
    >
      <Phone className="w-6 h-6" />
      <span className="font-semibold text-base">Hubungi Sekarang</span>
    </a>
  </div>
  {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-[#00B6D6]">Happy</span>
                <span className="text-black">Denta</span>
              </Link>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-[#00B6D6] transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <div 
              className={`
                fixed md:relative inset-x-0 top-16 md:top-0 
                ${isMenuOpen ? 'translate-y-0 opacity-100 flex' : '-translate-y-full md:translate-y-0 opacity-0 md:opacity-100 hidden md:flex'} 
                transition-all duration-300 ease-in-out
                flex-col md:flex-row items-center 
                bg-white/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none
                py-6 md:py-0 space-y-4 md:space-y-0 md:space-x-8 
                shadow-lg md:shadow-none
                z-50
              `}
            >
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const yOffset = -80; // height of fixed header
                  const element = document.getElementById('about');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-[#00B6D6] transition-colors w-full md:w-auto text-center px-6 md:px-0"
              >
                About
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const yOffset = -80;
                  const element = document.getElementById('doctors');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-[#00B6D6] transition-colors w-full md:w-auto text-center px-6 md:px-0"
              >
                Doctors
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const yOffset = -80;
                  const element = document.getElementById('services');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-[#00B6D6] transition-colors w-full md:w-auto text-center px-6 md:px-0"
              >
                Service
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const yOffset = -80;
                  const element = document.getElementById('faq');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-[#00B6D6] transition-colors w-full md:w-auto text-center px-6 md:px-0"
              >
                FAQ
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const yOffset = -80;
                  const element = document.getElementById('contact');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-[#00B6D6] transition-colors w-full md:w-auto text-center px-6 md:px-0"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Memperbaiki{" "}
                  <span className="text-[#00B6D6] inline-block hover:scale-105 transition-transform">
                    Gigi
                  </span>{" "}
                  Dan
                  <br />
                  <span className="text-[#00B6D6] inline-block hover:scale-105 transition-transform">
                    Senyum Kamu
                  </span>
                </h1>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
                  Gigi rapi dan senyum menawan bikin kamu lebih percaya diri dalam setiap momen.
                  Kami siap membantu kamu mencapai itu dengan perawatan terbaik!
                </p>
                <a 
                  href="https://wa.me/62811726242?text=Halo%20HappyDenta%2C%20saya%20ingin%20konsultasi%20mengenai%20perawatan%20gigi." 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    className="bg-[#00B6D6] text-white px-8 py-6 text-lg rounded-xl hover:bg-[#0095b0] 
                      hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                  >
                    Contact Now
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2 relative h-[500px]">
              <div className="absolute inset-0 bg-[#B7E8F0] rounded-tl-[100px] rounded-br-[100px] shadow-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg"
                  alt="Doctor"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center rounded-tl-[100px] rounded-br-[100px] opacity-90 hover:opacity-100 
                    transition-opacity"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Memilih Kami?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kami berkomitmen untuk memberikan perawatan gigi terbaik dengan teknologi modern dan tim dokter gigi berpengalaman.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#00B6D6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tim Dokter Berpengalaman</h3>
                <p className="text-gray-600">Ditangani oleh dokter gigi profesional dengan pengalaman bertahun-tahun.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#00B6D6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Peralatan Modern</h3>
                <p className="text-gray-600">Menggunakan teknologi dan peralatan dental terkini untuk hasil terbaik.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#00B6D6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Perawatan Nyaman</h3>
                <p className="text-gray-600">Mengutamakan kenyamanan pasien dengan pelayanan yang ramah dan profesional.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Section */}
        <div id="doctors" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Drg. Aprilia Denta", 
                  title: "Dentist",
                  image: "https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg"
                },
                { 
                  name: "Drg. Michael Chen", 
                  title: "Dentist",
                  image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg"
                },
                { 
                  name: "Drg. Emily Rodriguez", 
                  title: "Dentist",
                  image: "https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg"
                }
              ].map((doctor, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="w-40 h-40 mx-auto mb-4 relative rounded-full overflow-hidden">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kami menyediakan berbagai layanan perawatan gigi berkualitas untuk membantu Anda mencapai senyum yang sehat dan indah.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#00B6D6]/10 text-[#00B6D6] group-hover:bg-[#00B6D6] group-hover:text-white transition-colors">
                      {service.icon && <service.icon size={24} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-[#00B6D6] group-hover:text-[#00B6D6]/90 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Fasilitas Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dilengkapi dengan peralatan modern dan ruangan yang nyaman untuk pengalaman perawatan gigi terbaik.
              </p>
            </div>
            <div className="w-full max-w-5xl mx-auto">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                  dragFree: true,
                  containScroll: "trimSnaps",
                }}
                setApi={setApi}
                className="w-full"
              >
              <CarouselContent>
                {[
                  {
                    title: "Ruang Konsultasi",
                    image: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg"
                  },
                  {
                    title: "Ruang Perawatan Modern",
                    image: "https://images.pexels.com/photos/3845767/pexels-photo-3845767.jpeg"
                  },
                  {
                    title: "Ruang Tunggu",
                    image: "https://images.pexels.com/photos/3845632/pexels-photo-3845632.jpeg"
                  },
                  {
                    title: "Area Sterilisasi",
                    image: "https://images.pexels.com/photos/3845731/pexels-photo-3845731.jpeg"
                  },
                  {
                    title: "Laboratorium Gigi",
                    image: "https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg"
                  }
                ].map((facility, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <div className="p-1 h-full">
                      <div className="overflow-hidden rounded-xl bg-[#B7E8F0]">
                        <div className="h-[350px] relative group rounded-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 group-hover:from-black/20 group-hover:to-black/80 transition-all duration-300" />
                          <Image
                            src={facility.image}
                            alt={facility.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            priority
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white text-xl font-semibold mb-2">{facility.title}</h3>
                            <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Dilengkapi dengan peralatan modern untuk pelayanan terbaik
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 bg-[#00B6D6] hover:bg-[#00B6D6]/90 text-white border-none" />
                <CarouselNext className="hidden md:flex -right-12 h-12 w-12 bg-[#00B6D6] hover:bg-[#00B6D6]/90 text-white border-none" />
              </Carousel>
              {/* Mobile Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeSlide 
                        ? 'w-6 bg-[#00B6D6]' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "Klinik Happy Denta buka jam berapa?",
                  answer: "Klinik buka setiap hari Senin - Sabtu: 15:30 - 19:30 WIB. Hari Minggu dan libur nasional tutup."
                },
                {
                  question: "Apakah bisa datang tanpa janji (walk-in)?",
                  answer: "Bisa, tapi kami sarankan untuk melakukan reservasi terlebih dahulu agar tidak menunggu terlalu lama."
                },
                {
                  question: "Bagaimana cara membuat janji temu?",
                  answer: "Anda bisa reservasi melalui WhatsApp di +62 811 7262 423, DM Instagram kami @klinikgigilampung, atau langsung datang ke klinik."
                },
                {
                  question: "Apakah bisa perawatan behel di Happy Denta?",
                  answer: "Bisa! Kami menyediakan konsultasi dan pemasangan behel dengan berbagai pilihan sesuai kebutuhan."
                },
                {
                  question: "Apakah aman membawa anak-anak ke klinik ini?",
                  answer: "Sangat aman. Klinik kami ramah anak dan menyediakan layanan khusus untuk gigi anak."
                },
                {
                  question: "Di mana lokasi Klinik Happy Denta?",
                  answer: "Kami beralamat di Jl. Teuku Umar No.67, Sidodadi, Kec. Kedaton, Kota Bandar Lampung, Lampung. Lokasi mudah dijangkau dan tersedia parkir kendaraan."
                }
              ].map(({ question, answer }, index) => (
                <details key={index} className="border border-gray-300 rounded-lg group">
                  <summary className="cursor-pointer font-semibold text-lg text-black list-none group-open:text-black flex justify-between items-center p-4 hover:bg-[#e0f7fb]">
                    {question}
                    <svg
                      className="w-6 h-6 text-[#00B6D6] group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </summary>
                  <p className="px-4 pb-4 text-gray-700">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Maps Section */}
        <div className="relative bg-gray-50">
          <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-2 overflow-hidden">
                <div className="px-6 py-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Lokasi Kami</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-[#00B6D6] flex-shrink-0 mt-1" />
                      <div className="ml-3">
                        <p className="text-base text-gray-700">
                          Jl. Teuku Umar No.67<br />
                          Sidodadi, Kec. Kedaton<br />
                          Kota Bandar Lampung, Lampung 35123
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-[#00B6D6] flex-shrink-0 mt-1" />
                      <div className="ml-3">
                        <p className="text-base text-gray-700">
                          Senin - Sabtu: 15:30 - 19:30 WIB<br />
                          Minggu: Tutup
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-[#00B6D6] flex-shrink-0 mt-1" />
                      <div className="ml-3">
                        <p className="text-base text-gray-700">
                          +62 811 7262 423
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-96 sm:h-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2834772147342!2d105.2598011!3d-5.3928682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40db00511cbe15%3A0xb291a9b22000cff9!2sKlinik%20HappydentA%20%2F%20Drg%20Aprillia%20Denta!5e0!3m2!1sen!2sid!4v1708472431651!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div id="contact" className="bg-[#00B6D6] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Jadwalkan Konsultasi Sekarang
                </h2>
                <p className="text-white/90 text-lg max-w-xl">
                  Langkah pertama menuju senyum sehat dan menawan. Tim dokter gigi kami siap membantu Anda.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/62811726242?text=Halo%20HappyDenta%2C%20saya%20ingin%20konsultasi%20mengenai%20perawatan%20gigi." 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    className="bg-white text-[#00B6D6] hover:bg-white/90 px-8 py-6 text-lg rounded-xl 
                      transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Hubungi Kami
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                <span className="text-[#00B6D6]">Happy</span>
                <span className="text-white">Denta</span>
              </h3>
              <p className="text-gray-400 mb-6">
                Klinik gigi modern dengan layanan perawatan gigi berkualitas untuk senyum sehat dan menawan Anda.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Kontak</h4>
              <div className="space-y-4">
                <p className="flex items-center text-gray-400 hover:text-[#00B6D6] transition-colors">
                  <Clock className="w-5 h-5 mr-3 text-[#00B6D6]" />
                  Senin - Sabtu: 15:30 - 19:30 WIB
                </p>
                <p className="flex items-center text-gray-400 hover:text-[#00B6D6] transition-colors">
                  <MapPin className="w-8 h-8 mr-3 text-[#00B6D6]" />
                  Jl. Teuku Umar No.67, Sidodadi, Kec. Kedaton, Kota Bandar Lampung, Lampung
                </p>
                <p className="flex items-center text-gray-400 hover:text-[#00B6D6] transition-colors">
                  <Phone className="w-5 h-5 mr-3 text-[#00B6D6]" />
                  +62 811 7262 423
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Layanan</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-[#00B6D6] transition-colors">
                  <Link href="/services">Pemeriksaan Gigi</Link>
                </li>
                <li className="hover:text-[#00B6D6] transition-colors">
                  <Link href="/services">Pembersihan Karang Gigi</Link>
                </li>
                <li className="hover:text-[#00B6D6] transition-colors">
                  <Link href="/services">Penambalan Gigi</Link>
                </li>
                <li className="hover:text-[#00B6D6] transition-colors">
                  <Link href="/services">Orthodonti</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HappyDenta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
