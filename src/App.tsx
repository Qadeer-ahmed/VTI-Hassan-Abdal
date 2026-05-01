import React, { useState, useEffect } from 'react';
import { Menu, X, Clock, Phone, Mail, MapPin, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: CONTENT.nav.home },
    { id: 'about', label: CONTENT.nav.about },
    { id: 'courses', label: CONTENT.nav.courses },
    { id: 'fees', label: CONTENT.nav.fees },
    { id: 'contact', label: CONTENT.nav.contact },
  ];

  return (
    <div className="min-h-screen font-sans bg-slate-50" dir="rtl">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary shadow-lg py-3' : 'bg-primary py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-white p-2 rounded-full flex items-center justify-center text-primary font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block urdu-text truncate max-w-[250px]">
                {CONTENT.hero.title}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`urdu-text text-lg transition-colors hover:text-emerald-300 ${activeTab === item.id ? 'text-emerald-300 font-bold underline underline-offset-4' : 'text-white/90'}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setActiveTab('admission')}
                className="bg-white text-primary px-6 py-2 rounded-full urdu-text text-lg font-bold transition-all hover:bg-emerald-50 transform hover:scale-105 shadow-md"
              >
                {CONTENT.nav.apply}
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-t border-slate-100 shadow-xl"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`urdu-text text-xl px-4 py-2 rounded-lg ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'text-slate-600'}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setActiveTab('admission');
                    setIsMenuOpen(false);
                  }}
                  className="bg-accent text-white px-6 py-3 rounded-xl urdu-text text-xl font-medium text-center"
                >
                  {CONTENT.nav.apply}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <Home key="home" onApply={() => setActiveTab('admission')} />}
          {activeTab === 'about' && <About key="about" />}
          {activeTab === 'courses' && <Courses key="courses" />}
          {activeTab === 'fees' && <Fees key="fees" />}
          {activeTab === 'contact' && <Contact key="contact" />}
          {activeTab === 'admission' && <Admission key="admission" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800 pb-12 mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-accent w-8 h-8" />
                <h3 className="text-2xl font-bold urdu-text text-white">{CONTENT.hero.title}</h3>
              </div>
              <p className="urdu-text text-lg opacity-80 leading-relaxed">
                {CONTENT.about.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-xl font-bold urdu-text text-white">نیویگیشن</h4>
              <div className="grid grid-cols-2 gap-3">
                {navItems.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)}
                    className="urdu-text text-right text-lg hover:text-accent transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-xl font-bold urdu-text text-white">{CONTENT.contact.title}</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-accent w-5 h-5 mt-1 shrink-0" />
                  <span className="urdu-text text-lg">{CONTENT.contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-accent w-5 h-5 shrink-0" />
                  <span className="urdu-text text-lg" dir="ltr">{CONTENT.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-accent w-5 h-5 shrink-0" />
                  <span className="text-lg">{CONTENT.contact.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center urdu-text text-lg opacity-60">
            {CONTENT.footer.rights} © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Section Components
function Home({ onApply }: { onApply: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary/95">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-right">
          <div className="max-w-2xl mr-auto">
            <motion.h1
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight urdu-text tracking-tight"
            >
              ہنر مند نوجوان، خوشحال پاکستان
            </motion.h1>
            <motion.p
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-3xl text-slate-200 mb-8 urdu-text opacity-90"
            >
              اپنے مستقبل کو محفوظ بنائیں، آج ہی داخلہ لیں
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onApply}
              className="bg-white text-primary px-10 py-4 rounded-full text-2xl font-bold urdu-text shadow-2xl hover:bg-emerald-50 transition-all border-none"
            >
              {CONTENT.hero.cta}
            </motion.button>
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 urdu-text">{CONTENT.courses.title}</h2>
          <button className="text-primary font-bold urdu-text text-xl flex items-center gap-2 hover:gap-3 transition-all">
            تمام کورسز دیکھیں <ArrowRight className="rotate-180" size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CONTENT.courses.list.slice(0, 4).map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all overflow-hidden border border-slate-200 group flex flex-col h-full"
            >
              <div className="h-48 bg-slate-100 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${idx === 0 ? '1586717791821-3f44a563cc4c' : idx === 1 ? '1626814026160-2237a95fc5a0' : idx === 2 ? '1517694712202-14dd9538aa97' : '1507238691740-187a5b1d37b8'}?q=80&w=1000&auto=format&fit=crop`}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-slate-50 group-hover:bg-emerald-50 transition-colors flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-1 urdu-text text-primary">{course.name}</h3>
                <p className="text-xs text-slate-500 mb-4 italic font-sans">{course.outline.slice(0, 2).join(', ')}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold urdu-text">{course.duration}</span>
                  <span className="text-lg font-bold text-slate-800 urdu-text">{course.fee}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats / Why Us */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "کامیاب طلباء", value: "500+" },
            { label: "تجربہ کار اساتذہ", value: "15+" },
            { label: "ڈپلومہ کورسز", value: "10+" },
            { label: "ملازمت کی شرح", value: "85%" },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-3xl md:text-5xl font-bold font-sans">{stat.value}</span>
              <span className="text-lg md:text-xl urdu-text opacity-80">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl font-bold text-primary mb-8 urdu-text">{CONTENT.about.title}</h1>
          <p className="text-xl text-slate-600 mb-8 urdu-text leading-loose">
            {CONTENT.about.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-accent mb-4 urdu-text">{CONTENT.about.mission}</h3>
              <p className="urdu-text text-lg text-slate-600 font-sans leading-relaxed">{CONTENT.about.missionText}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-accent mb-4 urdu-text">{CONTENT.about.vision}</h3>
              <p className="urdu-text text-lg text-slate-600 font-sans leading-relaxed">{CONTENT.about.visionText}</p>
            </div>
          </div>

          <ul className="space-y-4">
            {CONTENT.about.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 urdu-text text-xl text-slate-700">
                <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
            alt="About VTI"
            className="rounded-3xl shadow-2xl w-full aspect-square object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.div>
  );
}

function Courses() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4 urdu-text">{CONTENT.courses.title}</h1>
        <p className="text-xl text-slate-600 urdu-text">{CONTENT.about.visionText}</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {CONTENT.courses.list.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-shadow`}
          >
            <div className="lg:w-1/3 h-64 lg:h-auto overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-${idx === 0 ? '1586717791821-3f44a563cc4c' : idx === 1 ? '1626814026160-2237a95fc5a0' : idx === 2 ? '1517694712202-14dd9538aa97' : '1507238691740-187a5b1d37b8'}?q=80&w=1000&auto=format&fit=crop`}
                alt={course.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 p-8 lg:p-12">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-2 urdu-text">{course.name}</h2>
                  <div className="flex flex-wrap gap-4 text-slate-500 urdu-text text-lg">
                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold"><Clock size={16} /> {course.duration}</span>
                    <span className="flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold"><GraduationCap size={16} /> {course.eligibility}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-emerald-800 urdu-text bg-emerald-50 px-6 py-2 rounded-2xl border border-emerald-100">
                  {course.fee}
                </div>
              </div>
              
              <p className="text-xl text-slate-600 mb-8 urdu-text leading-relaxed">
                {course.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 urdu-text">کورس آؤٹ لائن:</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {course.outline.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 urdu-text text-lg text-slate-700">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end justify-end">
                   <button className="bg-primary text-white px-8 py-3 rounded-xl urdu-text text-xl font-bold hover:bg-secondary transition-colors w-full md:w-auto">
                    داخلہ کی تفصیلات
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Fees() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4 urdu-text">{CONTENT.fees.title}</h1>
        <p className="text-xl text-slate-600 urdu-text">{CONTENT.fees.description}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-right urdu-text">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-8 py-6 text-2xl font-bold">کورس کا نام</th>
                <th className="px-8 py-6 text-2xl font-bold">دورانیہ</th>
                <th className="px-8 py-6 text-2xl font-bold">ماہانہ فیس</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-slate-50">
              {CONTENT.courses.list.map((course) => (
                <tr key={course.id} className="hover:bg-emerald-50 transition-colors">
                  <td className="px-8 py-6 text-xl font-bold text-emerald-900 border-l border-slate-100">{course.name}</td>
                  <td className="px-8 py-6 text-xl text-slate-600 font-sans">{course.duration}</td>
                  <td className="px-8 py-6 text-xl font-bold text-emerald-800">{course.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <p className="urdu-text text-lg text-slate-500">
            نوٹ: مستحق اور محنتی طلباء کے لیے خصوصی رعایت اور اسکالرشپ کی سہولت بھی موجود ہے۔
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold text-primary mb-12 text-center urdu-text">{CONTENT.contact.title}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
               <div className="bg-primary/10 p-4 rounded-2xl shrink-0"><MapPin className="text-primary w-8 h-8" /></div>
               <div>
                  <h4 className="text-xl font-bold urdu-text mb-2">ایڈریس</h4>
                  <p className="urdu-text text-lg text-slate-600">{CONTENT.contact.address}</p>
               </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
               <div className="bg-green-100 p-4 rounded-2xl shrink-0"><Phone className="text-green-600 w-8 h-8" /></div>
               <div>
                  <h4 className="text-xl font-bold urdu-text mb-2">فون نمبر</h4>
                  <p className="urdu-text text-lg text-slate-600" dir="ltr">{CONTENT.contact.phone}</p>
                  <p className="urdu-text text-sm text-slate-400 mt-1">واٹس ایپ بھی دستیاب ہے</p>
               </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
               <div className="bg-amber-100 p-4 rounded-2xl shrink-0"><Mail className="text-amber-600 w-8 h-8" /></div>
               <div>
                  <h4 className="text-xl font-bold urdu-text mb-2">ای میل</h4>
                  <p className="text-lg text-slate-600">{CONTENT.contact.email}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="h-[500px] bg-slate-200 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13271.782068936998!2d72.6796349!3d33.8247071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa0e44f0b2f83%3A0x6a1f0a53eb5c5571!2sHasan%20Abdal%2C%20Attock%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1714545405405!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
}

function Admission() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (submitted) {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto px-4 py-32 text-center"
      >
        <div className="bg-white p-12 rounded-3xl shadow-2xl border border-green-100">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-green-600 w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 urdu-text">
            {CONTENT.admission.success}
          </h2>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 text-primary font-bold urdu-text text-xl hover:underline"
          >
            واپس ہوم پیج پر جائیں
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4 urdu-text">{CONTENT.admission.title}</h1>
        <p className="text-xl text-slate-600 urdu-text">{CONTENT.admission.subtitle}</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-emerald-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-500 urdu-text">{CONTENT.admission.form.name}</label>
              <input required type="text" placeholder="نام درج کریں" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg outline-none focus:border-primary transition-all urdu-text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-500 urdu-text">{CONTENT.admission.form.fatherName}</label>
              <input required type="text" placeholder="والد کا نام" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg outline-none focus:border-primary transition-all urdu-text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-500 urdu-text">{CONTENT.admission.form.course}</label>
              <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg outline-none focus:border-primary transition-all urdu-text">
                <option value="">کورس منتخب کریں...</option>
                {CONTENT.courses.list.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-500 urdu-text">{CONTENT.admission.form.phone}</label>
              <input required type="tel" placeholder="03XX-XXXXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg outline-none focus:border-primary transition-all text-left" dir="ltr" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-slate-500 urdu-text">{CONTENT.admission.form.address}</label>
            <textarea required rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg outline-none focus:border-primary transition-all urdu-text resize-none"></textarea>
          </div>
          <div className="mt-4">
            <button
              disabled={loading}
              type="submit"
              className={`w-full bg-primary text-white font-bold py-4 rounded-xl shadow-xl shadow-emerald-100 hover:bg-secondary transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : null}
              {CONTENT.admission.form.submit}
            </button>
            <p className="text-xs text-center text-slate-400 mt-4 urdu-text">آپ کی تمام معلومات محفوظ ہیں</p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
