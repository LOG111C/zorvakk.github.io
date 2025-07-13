"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Twitch,
  Youtube,
  Twitter,
  Instagram,
  DiscIcon as Discord,
  Heart,
  Clock,
  Users,
  Gamepad2,
  Monitor,
  Headphones,
  Keyboard,
  Mouse,
  Mail,
  MapPin,
  Phone,
  Play,
  Eye,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      schedule: "Schedule",
      highlights: "Highlights",
      setup: "Setup",
      contact: "Contact",
    },
    hero: {
      title: "ZorvaKK's",
      subtitle: "Gaming Hub",
      description:
        "Join me for epic gaming adventures, pro tips, and an amazing community. Streaming daily with the best gameplay and entertainment!",
      viewers: "viewers",
      followers: "followers",
      watchLive: "Watch Live",
      support: "Support",
      currentlyPlaying: "Currently Playing: Cyberpunk 2077",
      epicFight: "Epic boss fight incoming!",
    },
    about: {
      title: "About Me",
      subtitle: "Professional gamer and content creator with over 5 years of streaming experience",
      greeting: "Hey, I'm ZorvaKK!",
      description1:
        "Welcome to my gaming universe! I'm ZorvaKK, a passionate gamer who loves sharing epic moments, teaching strategies, and building an amazing community. Join me on Twitch for incredible gaming sessions!",
      description2:
        "When I'm not streaming, you'll find me exploring new games, working on my setup, or hanging out with the community on Discord. Let's game together!",
      yearsStreaming: "Years Streaming",
      totalViews: "Total Views",
      gamesPlayed: "Games Played",
      followers: "Followers",
    },
    schedule: {
      title: "Stream Schedule",
      subtitle: "Catch me live at these times (EST)",
    },
    highlights: {
      title: "Stream Highlights",
      subtitle: "Check out some epic moments from recent streams",
      views: "views",
    },
    setup: {
      title: "Gaming Setup",
      subtitle: "The gear that powers my streams",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Business inquiries, collaborations, or just want to say hi?",
      email: "Email",
      discordServer: "Discord Server",
      location: "Location",
      businessPhone: "Business Phone",
      followMe: "Follow Me",
      sendMessage: "Send a Message",
      getBack: "I'll get back to you as soon as possible!",
      firstName: "First Name",
      lastName: "Last Name",
      subject: "Subject",
      message: "Message",
      messagePlaceholder: "Tell me about your project or collaboration idea...",
      sendBtn: "Send Message",
    },
    footer: {
      description: "Epic gaming streams, amazing community, and unforgettable moments. Join the adventure!",
      quickLinks: "Quick Links",
      games: "Games",
      support: "Support",
      copyright: "© 2024 ZorvaKK Website. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
  hu: {
    nav: {
      home: "Főoldal",
      about: "Rólam",
      schedule: "Menetrend",
      highlights: "Kiemelések",
      setup: "Felszerelés",
      contact: "Kapcsolat",
    },
    hero: {
      title: "ZorvaKK",
      subtitle: "Gaming Központ",
      description:
        "Csatlakozz hozzám epikus gaming kalandokhoz, profi tippekhez és egy fantasztikus közösséghez. Napi streamelés a legjobb játékélménnyel!",
      viewers: "néző",
      followers: "követő",
      watchLive: "Élő Nézés",
      support: "Támogatás",
      currentlyPlaying: "Jelenleg játszik: Cyberpunk 2077",
      epicFight: "Epikus boss harc közeleg!",
    },
    about: {
      title: "Rólam",
      subtitle: "Professzionális gamer és tartalomkészítő több mint 5 év streaming tapasztalattal",
      greeting: "Szia, ZorvaKK vagyok!",
      description1:
        "Üdvözöllek a gaming univerzumomban! ZorvaKK vagyok, egy szenvedélyes gamer, aki szeret epikus pillanatokat megosztani, stratégiákat tanítani és fantasztikus közösséget építeni. Csatlakozz hozzám a Twitch-en hihetetlen gaming sessionökre!",
      description2:
        "Amikor nem streamelok, új játékokat fedezek fel, a felszerelésemen dolgozom, vagy a közösséggel lógok a Discord-on. Gameljünk együtt!",
      yearsStreaming: "Év Streaming",
      totalViews: "Összes Nézettség",
      gamesPlayed: "Játszott Játékok",
      followers: "Követők",
    },
    schedule: {
      title: "Stream Menetrend",
      subtitle: "Nézz élőben ezekben az időpontokban (EST)",
    },
    highlights: {
      title: "Stream Kiemelések",
      subtitle: "Nézd meg a legutóbbi streamek epikus pillanatait",
      views: "nézettség",
    },
    setup: {
      title: "Gaming Felszerelés",
      subtitle: "A felszerelés, ami hajtja a streamjeimet",
    },
    contact: {
      title: "Vedd Fel a Kapcsolatot",
      subtitle: "Üzleti megkeresések, együttműködések, vagy csak köszönni szeretnél?",
      email: "Email",
      discordServer: "Discord Szerver",
      location: "Helyszín",
      businessPhone: "Üzleti Telefon",
      followMe: "Kövess",
      sendMessage: "Üzenet Küldése",
      getBack: "A lehető leghamarabb válaszolok!",
      firstName: "Keresztnév",
      lastName: "Vezetéknév",
      subject: "Tárgy",
      message: "Üzenet",
      messagePlaceholder: "Mesélj a projektedről vagy együttműködési ötletedről...",
      sendBtn: "Üzenet Küldése",
    },
    footer: {
      description:
        "Epikus gaming streamek, fantasztikus közösség és felejthetetlen pillanatok. Csatlakozz a kalandhoz!",
      quickLinks: "Gyors Linkek",
      games: "Játékok",
      support: "Támogatás",
      copyright: "© 2024 ZorvaKK Website. Minden jog fenntartva.",
      privacy: "Adatvédelmi Irányelvek",
      terms: "Felhasználási Feltételek",
    },
  },
}

export default function StreamingWebsite() {
  const [isLive, setIsLive] = useState(true)
  const [viewers, setViewers] = useState(1247)
  const [language, setLanguage] = useState<"en" | "hu">("en")
  const t = translations[language]

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 10) - 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ZorvaKK Website
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { key: "home", label: t.nav.home },
                { key: "about", label: t.nav.about },
                { key: "schedule", label: t.nav.schedule },
                { key: "highlights", label: t.nav.highlights },
                { key: "setup", label: t.nav.setup },
                { key: "contact", label: t.nav.contact },
              ].map((item) => (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-400 group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`flex items-center space-x-1 px-2 py-1 rounded transition-all ${
                    language === "en" ? "bg-purple-500/20 text-purple-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="text-lg">🇬🇧</span>
                  <span className="text-xs font-medium">EN</span>
                </button>
                <button
                  onClick={() => setLanguage("hu")}
                  className={`flex items-center space-x-1 px-2 py-1 rounded transition-all ${
                    language === "hu" ? "bg-purple-500/20 text-purple-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="text-lg">🇭🇺</span>
                  <span className="text-xs font-medium">HU</span>
                </button>
              </div>

              {/* Live Status with Icon */}
              {isLive && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 text-red-400">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-red-400">LIVE</span>
                </div>
              )}

              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                {t.nav.home === "Home" ? "Follow" : "Követés"}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {t.hero.title}
                  </span>
                  <br />
                  <span className="text-white">{t.hero.subtitle}</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">{t.hero.description}</p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <span className="text-lg font-semibold">{viewers.toLocaleString()}</span>
                  <span className="text-gray-400">{t.hero.viewers}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  <span className="text-lg font-semibold">25.4K</span>
                  <span className="text-gray-400">{t.hero.followers}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                  <Link href="https://www.twitch.tv/zorvakk_">
                    <Play className="w-5 h-5 mr-2" />
                    {t.hero.watchLive}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {t.hero.support}
                </Button>
              </div>

              <div className="flex items-center space-x-6">
                {[
                  { icon: Twitch, color: "text-purple-500", href: "https://www.twitch.tv/zorvakk_" },
                  { icon: Youtube, color: "text-red-500", href: "#" },
                  { icon: Twitter, color: "text-blue-400", href: "#" },
                  { icon: Instagram, color: "text-pink-500", href: "#" },
                  { icon: Discord, color: "text-indigo-400", href: "https://discord.gg/CpDgMyRJSd" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`${social.color} hover:scale-110 transition-transform`}
                  >
                    <social.icon className="w-6 h-6" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl overflow-hidden border border-purple-500/20">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Live Stream"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                {isLive && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 bg-red-500 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">LIVE</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white font-medium">{t.hero.currentlyPlaying}</p>
                  <p className="text-gray-300 text-sm">{t.hero.epicFight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.about.title}
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.about.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">{t.about.greeting}</h3>
                <p className="text-gray-300 leading-relaxed">{t.about.description1}</p>
                <p className="text-gray-300 leading-relaxed">{t.about.description2}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">5+</div>
                  <div className="text-gray-400">{t.about.yearsStreaming}</div>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-pink-400">1M+</div>
                  <div className="text-gray-400">{t.about.totalViews}</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">50+</div>
                  <div className="text-gray-400">{t.about.gamesPlayed}</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">25K</div>
                  <div className="text-gray-400">{t.about.followers}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl overflow-hidden border border-purple-500/20">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Streamer Profile"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.schedule.title}
              </span>
            </h2>
            <p className="text-gray-400">{t.schedule.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { day: "Monday", time: "7:00 PM - 11:00 PM", game: "Valorant Ranked", status: "live" },
              { day: "Tuesday", time: "7:00 PM - 11:00 PM", game: "Cyberpunk 2077", status: "upcoming" },
              { day: "Wednesday", time: "7:00 PM - 11:00 PM", game: "Apex Legends", status: "upcoming" },
              { day: "Thursday", time: "7:00 PM - 11:00 PM", game: "New Game Friday", status: "upcoming" },
              { day: "Friday", time: "6:00 PM - 12:00 AM", game: "Community Choice", status: "upcoming" },
              { day: "Saturday", time: "2:00 PM - 8:00 PM", game: "Variety Stream", status: "upcoming" },
            ].map((schedule, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{schedule.day}</CardTitle>
                    {schedule.status === "live" && <Badge className="bg-red-500 text-white">LIVE</Badge>}
                  </div>
                  <CardDescription className="flex items-center text-purple-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {schedule.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{schedule.game}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.highlights.title}
              </span>
            </h2>
            <p className="text-gray-400">{t.highlights.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Insane Valorant Ace",
                views: "125K",
                duration: "0:45",
                thumbnail: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Cyberpunk Boss Fight",
                views: "89K",
                duration: "2:15",
                thumbnail: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Apex Legends Win",
                views: "156K",
                duration: "1:30",
                thumbnail: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Funny Moments Compilation",
                views: "203K",
                duration: "5:20",
                thumbnail: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "New Game First Look",
                views: "78K",
                duration: "3:45",
                thumbnail: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Community Game Night",
                views: "92K",
                duration: "2:00",
                thumbnail: "/placeholder.svg?height=200&width=300",
              },
            ].map((highlight, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105 cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={highlight.thumbnail || "/placeholder.svg"}
                    alt={highlight.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {highlight.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-medium mb-2">{highlight.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {highlight.views} {t.highlights.views}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Setup Section */}
      <section id="setup" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.setup.title}
              </span>
            </h2>
            <p className="text-gray-400">{t.setup.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: "PC",
                icon: Monitor,
                items: ["RTX 4090", "Intel i9-13900K", "32GB DDR5", "2TB NVMe SSD"],
              },
              {
                category: "Audio",
                icon: Headphones,
                items: ["Audio-Technica AT2020", "Focusrite Scarlett Solo", "Sony WH-1000XM4", "Acoustic Treatment"],
              },
              {
                category: "Peripherals",
                icon: Keyboard,
                items: ["Logitech G Pro X", "Razer DeathAdder V3", "Elgato Stream Deck", "Blue Yeti Microphone"],
              },
              {
                category: "Streaming",
                icon: Mouse,
                items: ["Elgato Cam Link", "Sony A7III", "OBS Studio", "Multiple Monitors"],
              },
            ].map((setup, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <CardHeader className="text-center">
                  <setup.icon className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                  <CardTitle className="text-white">{setup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {setup.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 text-sm flex items-center">
                        <Star className="w-3 h-3 text-purple-400 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.contact.title}
              </span>
            </h2>
            <p className="text-gray-400">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{t.contact.email}</h3>
                    <p className="text-gray-400">business@streamerpro.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <Discord className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{t.contact.discordServer}</h3>
                    <p className="text-gray-400">discord.gg/CpDgMyRJSd</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{t.contact.location}</h3>
                    <p className="text-gray-400">Los Angeles, CA</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{t.contact.businessPhone}</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">{t.contact.followMe}</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Twitch, color: "hover:text-purple-500", href: "https://www.twitch.tv/zorvakk_" },
                    { icon: Youtube, color: "hover:text-red-500", href: "#" },
                    { icon: Twitter, color: "hover:text-blue-400", href: "#" },
                    { icon: Instagram, color: "hover:text-pink-500", href: "#" },
                    { icon: Discord, color: "hover:text-indigo-400", href: "https://discord.gg/CpDgMyRJSd" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">{t.contact.sendMessage}</CardTitle>
                <CardDescription className="text-gray-400">{t.contact.getBack}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">{t.contact.firstName}</label>
                    <Input className="bg-gray-800 border-gray-700 text-white" placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">{t.contact.lastName}</label>
                    <Input className="bg-gray-800 border-gray-700 text-white" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email</label>
                  <Input className="bg-gray-800 border-gray-700 text-white" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">{t.contact.subject}</label>
                  <Input className="bg-gray-800 border-gray-700 text-white" placeholder="Business Inquiry" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">{t.contact.message}</label>
                  <Textarea
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  {t.contact.sendBtn}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ZorvaKK Website
                </span>
              </div>
              <p className="text-gray-400 text-sm">{t.footer.description}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">{t.footer.quickLinks}</h3>
              <ul className="space-y-2 text-sm">
                {["Home", "About", "Schedule", "Highlights"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">{t.footer.games}</h3>
              <ul className="space-y-2 text-sm">
                {["Valorant", "Cyberpunk 2077", "Apex Legends", "New Releases"].map((game) => (
                  <li key={game}>
                    <span className="text-gray-400">{game}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">{t.footer.support}</h3>
              <ul className="space-y-2 text-sm">
                {["Donations", "Merchandise", "Sponsorships", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                {t.footer.privacy}
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                {t.footer.terms}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
