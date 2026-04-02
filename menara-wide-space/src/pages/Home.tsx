import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Trash2, Wind, Leaf, Megaphone, CheckCircle2, MapPin, Phone, Mail,
  ArrowRight, ArrowUp, ChevronRight, Send
} from "lucide-react";
import heroImg from "/images/hero-waste.png";
import binsImg from "@assets/Capture_d'écran_2026-03-31_152611_1774967226230.png";
import casablancaImg from "/images/casablanca.png";
import truckImg from "/images/truck.png";
import placeImg from "/images/place.jpg";
import greenImg from "/images/green.jpg";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* ── NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black" style={{ fontSize: "11px", letterSpacing: "0.12em" }}>MWS</span>
            </div>
            <div className="leading-tight">
              <div className={`font-bold text-sm ${scrolled ? "text-gray-900" : "text-white"}`}>Menara Wide Space</div>
              <div className={`text-xs ${scrolled ? "text-orange-500" : "text-orange-400"}`}>Gestion des Déchets</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Accueil", "À Propos", "Nos Services", "Réalisations"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-").replace(/à/g, "a").replace(/é/g, "e")}`}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  scrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contactez-Nous
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 rounded-lg ${scrolled ? "text-gray-700" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5" />
            <div className="w-6 h-0.5 bg-current mb-1.5" />
            <div className="w-6 h-0.5 bg-current" />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {["Accueil", "À Propos", "Nos Services", "Réalisations", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-").replace(/à/g, "a").replace(/é/g, "e")}`}
                className="block text-gray-700 font-medium py-1 hover:text-orange-500"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>
      {/* ── HERO ── */}
      <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Gestion des déchets Maroc" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20 mb-6">
                <Leaf className="w-4 h-4 text-orange-400" />
                Excellence en Environnement
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Votre Partenaire de Confiance pour la{" "}
              <span className="text-orange-500">Gestion des Déchets</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/80 mb-8 leading-relaxed">
              Menara Wide Space s'engage au quotidien pour des villes marocaines
              plus propres.{" "}
              <span className="text-orange-400 font-medium">Un espace propre, c'est notre mission.</span>
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="#nos-services"
                data-testid="button-decouvrir"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors"
              >
                Découvrir nos solutions <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#realisations"
                data-testid="button-realisations"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-7 py-3.5 rounded-lg border border-white/30 transition-colors"
              >
                Nos Réalisations
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── SERVICES ── */}
      <section id="nos-services" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
              Notre Expertise
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto">
              Des solutions sur mesure pour répondre aux exigences environnementales des collectivités
              et des entreprises.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Trash2,
                title: "Transport des ordures ménagères",
                desc: "Transport des ordures ménagères vers la décharge publique avec une flotte de camions bennes de dernière génération.",
              },
              {
                icon: Wind,
                title: "Transport des déchets verts",
                desc: "Transport de toute sorte de déchets verts issus des parcs, jardins et espaces naturels vers les centres de traitement.",
              },
              {
                icon: Leaf,
                title: "Gestion & valorisation des ordures",
                desc: "Gestion et valorisation des ordures ménagères pour un environnement urbain plus propre et durable.",
              },
              {
                icon: Megaphone,
                title: "Entretien des espaces verts",
                desc: "Entretien et traitement des espaces verts : tonte, taille, arrosage et aménagement paysager professionnel.",
              },
            ].map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                data-testid={`card-service-${service.title.substring(0, 10)}`}
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                  <service.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 leading-snug">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── À PROPOS ── */}
      <section id="a-propos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src={binsImg}
                alt="Bacs de collecte colorés"
                className="w-full rounded-2xl object-contain h-[420px] bg-white"
              />
            </motion.div>

            {/* Text side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
                À Propos de Nous
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                L'Excellence au Service de l'Environnement
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-6">
                Menara Wide Space est une entreprise leader dans la gestion des déchets. Nous transportons
                les déchets vers les décharges publiques, collectons les déchets verts et gérons efficacement
                les ordures ménagères. Nos services comprennent également l'entretien et le traitement des
                espaces verts, l'amélioration de la santé environnementale et de l'esthétique. Engagés envers
                l'excellence et la durabilité, nous proposons des solutions complètes de gestion des déchets.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3 mb-10">
                {[
                  "Professionnalisme et rigueur opérationnelle",
                  "Flotte de camions bennes, amplirol et tasseuses",
                  "Engagement fort pour le développement durable",
                  "Un staff bien qualifié et matériel de jardinage professionnel",
                ].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Stats */}
              <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value: 10, suffix: "+", label: "Années d'expérience" },
                  { value: 15, suffix: "", label: "Villes desservies" },
                  { value: 500, suffix: "+", label: "Collaborateurs" },
                  { value: 1, suffix: "M+", label: "Tonnes collectées/an" },
                ].map((stat) => (
                  <motion.div key={stat.label} variants={fadeUp} className="text-center sm:text-left">
                    <div className="text-2xl font-black text-gray-900">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── RÉALISATIONS ── */}
      <section id="realisations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
                Nos Réalisations
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Des Résultats Concrets <span className="text-orange-500">sur</span>
                <br />
                <span className="text-orange-500">le Terrain</span>
              </motion.h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-500 md:max-w-xs text-sm"
            >
              Chaque jour, nos équipes transforment positivement l'environnement urbain des villes marocaines.
            </motion.p>
          </div>

          {/* Gallery grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Large left */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden h-[420px] group">
              <img src={casablancaImg} alt="Nettoyage Urbain Casablanca" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">Propreté</span>
                <h3 className="text-white font-black text-2xl leading-tight">Nettoyage Urbain</h3>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-1 font-medium">Casablanca</p>
              </div>
            </motion.div>

            {/* Right column: 2 stacked */}
            <motion.div variants={fadeUp} className="grid grid-rows-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden h-[200px] group">
                <img src={truckImg} alt="Flotte Écologique Marrakech" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-1.5">Équipement</span>
                  <h3 className="text-white font-black text-lg leading-tight">Flotte Écologique</h3>
                  <p className="text-white/60 text-xs uppercase tracking-widest mt-0.5 font-medium">Marrakech</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden h-[200px] group">
                  <img src={placeImg} alt="Nettoyage Place Publique Rabat" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">Urbain</span>
                    <h3 className="text-white font-black text-sm leading-tight">Nettoyage Place<br />Publique</h3>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest mt-0.5 font-medium">Rabat</p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden h-[200px] group">
                  <img src={greenImg} alt="Espaces Verts Fès" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">Environnement</span>
                    <h3 className="text-white font-black text-sm leading-tight">Espaces Verts</h3>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest mt-0.5 font-medium">Fès</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12"
          >
            Parlons de vos besoins
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-6">Informations</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Adresse</p>
                    <p className="text-gray-500 text-sm">Av Abdelkrim El Khattabi,<br />Maroc</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Téléphone</p>
                    <p className="text-gray-500 text-sm">+212-661-219-814<br />+212-669-300-989</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Email</p>
                    <p className="text-gray-500 text-sm">contact@menarawidespace.ma<br />commercial@menarawidespace.ma</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nom &amp; Prénom</label>
                  <input
                    type="text"
                    placeholder="Votre nom complet"
                    data-testid="input-nom"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    data-testid="input-email"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Téléphone</label>
                  <input
                    type="tel"
                    placeholder="+212 6..."
                    data-testid="input-tel"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Sujet</label>
                  <input
                    type="text"
                    placeholder="De quoi s'agit-il ?"
                    data-testid="input-sujet"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Détaillez votre demande ici..."
                  data-testid="input-message"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition resize-none"
                />
              </div>
              <button
                type="submit"
                data-testid="button-submit"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-lg transition-colors"
              >
                Envoyer le message <Send className="w-4 h-4" />
              </button>
            </motion.form>
          </div>
        </div>
      </section>
      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black" style={{ fontSize: "11px", letterSpacing: "0.12em" }}>MWS</span>
                </div>
                <div>
                  <div className="font-bold text-sm text-white">Menara Wide Space</div>
                  <div className="text-xs text-orange-400">Gestion des Déchets</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Votre partenaire de confiance pour la propreté urbaine et la gestion
                environnementale à travers le Maroc.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-5">Navigation</h4>
              <ul className="space-y-3">
                {["Accueil", "À Propos", "Nos Services", "Réalisations"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-5">Services</h4>
              <ul className="space-y-3">
                {[
                  "Transport des ordures ménagères",
                  "Transport des déchets verts",
                  "Gestion & valorisation",
                  "Entretien des espaces verts",
                ].map((s) => (
                  <li key={s}>
                    <a href="#nos-services" className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engagements */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-5">Engagements</h4>
              <div className="flex gap-3">
                <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                  <div className="text-white font-bold text-sm">ISO 9001</div>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                  <div className="text-white font-bold text-sm">ISO 14001</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              © 2026 Menara Wide Space. Tous droits réservés.
            </p>
            <button
              onClick={scrollTop}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 text-sm transition-colors"
            >
              Retour en haut <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
