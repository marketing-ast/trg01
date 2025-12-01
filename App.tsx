import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Settings, 
  Target, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

import GeometricBackground from './components/GeometricBackground';
import { ScrollReveal, StaticReveal } from './components/ScrollReveal';
import { CaseStudy, FaqItem } from './types';

// --- DATA CONSTANTS ---

const cases: CaseStudy[] = [
  {
    id: 1,
    title: "АВТОЦЕНТР (ДЕТЕЙЛИНГ/СЕРВИС)",
    category: "Auto Service",
    problem: "Жесткий демпинг со стороны конкурентов. Реклама «в лоб» стала слишком дорогой.",
    solution: "Нашли продукт «вне конкуренции». Упаковали услуги в пакетное предложение с высокой ценностью, которое невозможно сравнить по цене с конкурентами.",
    stats: [
      { label: "Цена за результат", value: "$0.76" },
      { label: "Лидов", value: "1441", subtext: "начатых переписок" }
    ]
  },
  {
    id: 2,
    title: "БУХГАЛТЕРСКИЕ УСЛУГИ",
    category: "B2B Finance",
    problem: "Высокая конкуренция среди «бухгалтеров-отчетников», низкий чек.",
    solution: "Полная смена позиционирования. Ушли от «сдачи отчетов» к «партнерам по финансам». Основным продуктом сделали управленческий учет.",
    stats: [
      { label: "Цена за результат", value: "$2.60" },
      { label: "Лидов", value: "391" }
    ]
  },
  {
    id: 3,
    title: "СТОМАТОЛОГИЯ",
    category: "Medical",
    problem: "Баннерная слепота у аудитории. Обычные фото «до/после» перестали работать.",
    solution: "Выявили и внедрили формат видео-кейсов, который ранее не использовался конкурентами в этой локации.",
    stats: [
      { label: "Цена за результат", value: "$1.61" },
      { label: "Лидов", value: "93", subtext: "при тесте $150" }
    ]
  },
  {
    id: 4,
    title: "ПРОИЗВОДСТВО ОКОН (GOOGLE ADS)",
    category: "Construction",
    problem: "Конкуренты предлагают «широкий профиль» услуг. Клиент теряется.",
    solution: "Сделали сужение ниши. Создали простейший сайт, где 80% контента посвящено сервису (боли клиента), а не просто окнам.",
    stats: [
      { label: "Процент показов", value: "55.39%", subtext: "1-е место в аукционе" }
    ]
  },
  {
    id: 5,
    title: "НАРУЖНАЯ РЕКЛАМА И ВЫВЕСКИ",
    category: "B2B Service",
    problem: "Низкая конверсия сайтов «все обо всем». Клиенты боялись штрафов от города.",
    solution: "Создали посадочную страницу, посвященную согласованию вывесок с госорганами (сняли главный страх). Это дало базу для доверия.",
    stats: [
      { label: "Процент показов", value: "58.33%", subtext: "Доминирование над конкурентами" }
    ]
  }
];

const faqs: FaqItem[] = [
  {
    question: "Почему вы называете себя инженером, а не маркетологом?",
    answer: "Потому что я строю системы, а не рисую картинки. Моя работа опирается на формулы, цифры (ROI, CPL, CTR) и анализ данных, а не на «творческое вдохновение». Вы платите за предсказуемость."
  },
  {
    question: "А если в моей нише это не сработает?",
    answer: "Мой метод начинается с этапа «Точка 0». Если ваши конкуренты уже рекламируются — значит, это работает. Я найду их рабочие связки. Если конкурентов нет или реклама не работает — я скажу вам об этом на этапе аудита, и мы не будем тратить бюджет."
  },
  {
    question: "Какой нужен бюджет для старта?",
    answer: "Мы начинаем с MVP-тестов. Нам не нужны миллионы. Достаточно минимального бюджета, чтобы получить первые статистически значимые данные, отсеять нерабочие гипотезы и найти ту самую связку, которую мы будем масштабировать."
  },
  {
    question: "Вы даете гарантии лидов?",
    answer: "Я даю гарантию качественного процесса, основанного на данных. Никто не может гарантировать действия людей. Но я гарантирую, что не буду тратить ваш бюджет на гипотезы, которые не имеют под собой аналитического обоснования."
  },
  {
    question: "Что значит «запускаю на данных конкурентов»?",
    answer: "Это значит, что мы смотрим, какие объявления ваши конкуренты крутят дольше 3-х месяцев. Это «золотой актив» рынка. Мы адаптируем их лучшие решения под ваш бизнес, экономя вам месяцы тестов и тысячи долларов."
  },
  {
    question: "Как быстро будут результаты?",
    answer: "Поскольку мы пропускаем этап «слепых тестов» и изобретения велосипеда, первые целевые заявки часто приходят в первые дни после запуска MVP."
  },
  {
    question: "Чем вы отличаетесь от агентств?",
    answer: "Агентства часто ставят работу на поток, отдавая вас стажерам. Я лично погружаюсь в ваш бизнес, смотрю на задачи глазами собственника и партнера, который считает деньги, а не просто выполняет KPI по кликам."
  }
];

// --- SUB-COMPONENTS ---

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
      
      <ScrollReveal direction="up" className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
          <Cpu size={14} className="text-amber-500" />
          <span className="text-xs font-mono text-amber-500 tracking-wider">SYSTEM_STATUS: ONLINE</span>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="max-w-4xl" delay={0.2}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-white mb-8 leading-tight">
          ЗАПУСКАЮ РЕКЛАМУ ТОЛЬКО НА <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">ОСНОВЕ ДАННЫХ</span>, ЗА КОТОРЫЕ УЖЕ ЗАПЛАТИЛИ ВАШИ КОНКУРЕНТЫ.
        </h1>
      </ScrollReveal>

      <ScrollReveal direction="up" className="max-w-2xl" delay={0.4}>
        <p className="text-lg md:text-xl text-stone-300 mb-10 font-light border-l-2 border-amber-600 pl-6 text-left">
          Маркетинг — это не искусство. Это инженерия. 90% бюджета вы сливаете на "творческие тесты" и обучение алгоритмов. Я исключаю этот этап. Мы стартуем с моделей, которые уже приносят прибыль лидерам вашей ниши.
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.6}>
        <a 
          href="#contact"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-amber-600 font-mono rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 ring-offset-stone-900"
        >
          <span>[ПОЛУЧИТЬ АУДИТ "ТОЧКА 0"]</span>
          <div className="absolute inset-0 rounded-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
        </a>
      </ScrollReveal>
      
      <motion.div 
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-amber-500/50" size={32} />
      </motion.div>
    </div>
  </section>
);

const PhilosophySection = () => (
  <section className="py-24 relative z-10 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="left" className="space-y-6">
          <h2 className="text-amber-500 font-mono text-sm tracking-widest mb-2">/ PHILOSOPHY</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ПОЧЕМУ ВАМ НУЖЕН <span className="border-b-4 border-amber-600">ИНЖЕНЕР</span>, А НЕ ХУДОЖНИК?
          </h3>
          <p className="text-stone-300 text-lg leading-relaxed">
            Большинство таргетологов играют в "казино" на ваши деньги: запускают креативы наугад и ждут чуда. Результат: слитый бюджет и отсутствие понимания, что делать дальше.
          </p>
          <p className="text-stone-300 text-lg font-semibold">
            Мой подход — это холодный расчет и аналитика.
          </p>
        </ScrollReveal>

        <div className="grid gap-6">
          <ScrollReveal direction="right" delay={0.2}>
            <div className="p-6 bg-stone-900/50 border border-stone-800 backdrop-blur-md rounded-xl hover:border-amber-500/50 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-stone-800 rounded-lg text-amber-500">
                  <BarChart size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Думаю как собственник</h4>
                  <p className="text-stone-400 text-sm">Меня не волнуют лайки. Меня волнует, какую стоимость клиента (CAC) ваш бизнес может себе позволить и как удержать эту цифру.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.4}>
            <div className="p-6 bg-stone-900/50 border border-stone-800 backdrop-blur-md rounded-xl hover:border-amber-500/50 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-stone-800 rounded-lg text-amber-500">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Не верю в "чуйку"</h4>
                  <p className="text-stone-400 text-sm">Я верю в цифры, статистику рекламных кабинетов и особенности алгоритмов.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.6}>
            <div className="p-6 bg-stone-900/50 border border-stone-800 backdrop-blur-md rounded-xl hover:border-amber-500/50 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-stone-800 rounded-lg text-amber-500">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Собственные проекты</h4>
                  <p className="text-stone-400 text-sm">У нас есть свои проекты, поэтому я понимаю боль потери собственных денег. Я не играюсь в кабинетах, я строю систему окупаемости.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);

const MethodologySection = () => (
  <section className="py-24 bg-stone-900 relative z-10 overflow-hidden">
     {/* Geometric Divider */}
     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-900 to-transparent"></div>
    
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <StaticReveal>
          <h2 className="text-amber-500 font-mono text-sm tracking-widest mb-4">/ METHODOLOGY</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            ТЕХНОЛОГИЯ РЕВЕРС-ИНЖИНИРИНГА УСПЕХА
          </h3>
          <p className="mt-4 text-stone-400">Как мы добиваемся результата без "слепых тестов"</p>
        </StaticReveal>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            num: "01",
            title: "АНАЛИЗ (ТОЧКА 0)",
            icon: <Search className="text-stone-900" size={32} />,
            desc: "Мы не изобретаем велосипед. Мы используем платные инструменты аналитики, чтобы найти рекламу конкурентов, которая крутится дольше 3-х месяцев. Если они платят за нее так долго — значит, она приносит прибыль. Мы забираем эту рабочую модель."
          },
          {
            num: "02",
            title: "ПАРСИНГ СМЫСЛОВ",
            subtitle: "(JTBD & SOSTAC)",
            icon: <Layers className="text-stone-900" size={32} />,
            desc: "Никакого «творчества». Мы анализируем рынок, выявляем потребности, которые плохо закрывают конкуренты, и пишем сценарии на основе реальных слов клиентов. Ваше предложение становится для них естественным решением."
          },
          {
            num: "03",
            title: "MVP-ЗАПУСК И ЦИФРЫ",
            icon: <Target className="text-stone-900" size={32} />,
            desc: "Мы не запускаем дорогую рекламу сразу. Мы делаем MVP (минимально жизнеспособный продукт) — простые форматы, чтобы дешево подтвердить гипотезу. Мы управляем ценой лида через формулу: CPM (Алгоритм) + CTR (Психология)."
          }
        ].map((item, idx) => (
          <ScrollReveal key={idx} direction={idx === 0 ? 'left' : idx === 2 ? 'right' : 'up'} delay={idx * 0.2}>
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-amber-500 rounded-lg transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
              <div className="relative h-full bg-stone-950 border border-stone-800 p-8 rounded-lg overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="text-6xl font-black text-amber-500">{item.num}</span>
                </div>
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                {item.subtitle && <span className="block text-xs text-amber-500 font-mono mb-3">{item.subtitle}</span>}
                <p className="text-stone-400 text-sm leading-relaxed border-t border-stone-800 pt-4">
                  {item.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CasesSection = () => (
  <section className="py-24 relative z-10 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-800 pb-8">
        <StaticReveal>
          <h2 className="text-amber-500 font-mono text-sm tracking-widest mb-4">/ CASES</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white max-w-2xl">
            ИНЖЕНЕРНЫЕ КЕЙСЫ. ЦИФРЫ ГОВОРЯТ ГРОМЧЕ СЛОВ.
          </h3>
        </StaticReveal>
        <StaticReveal delay={0.2} className="mt-6 md:mt-0">
          <p className="text-stone-400 text-right">Реальные отчеты из проектов</p>
        </StaticReveal>
      </div>

      <div className="space-y-12">
        {cases.map((project, index) => (
          <ScrollReveal 
            key={project.id} 
            direction={index % 2 === 0 ? 'left' : 'right'}
            className="group"
          >
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 md:p-10 hover:bg-stone-900/80 transition-all duration-300">
              <div className="grid md:grid-cols-12 gap-8">
                {/* Header & Content */}
                <div className="md:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-mono rounded-full border border-amber-500/20">
                      CASE #{project.id.toString().padStart(2, '0')}
                    </span>
                    <span className="text-stone-500 text-xs font-mono uppercase">{project.category}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white">{project.title}</h4>
                  
                  <div className="grid gap-4">
                    <div className="bg-red-900/10 p-4 rounded-lg border-l-2 border-red-500/50">
                      <p className="text-sm text-stone-300"><span className="text-red-400 font-bold uppercase text-xs block mb-1">Проблема:</span> {project.problem}</p>
                    </div>
                    <div className="bg-green-900/10 p-4 rounded-lg border-l-2 border-green-500/50">
                      <p className="text-sm text-stone-300"><span className="text-green-400 font-bold uppercase text-xs block mb-1">Инженерное Решение:</span> {project.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Data Visual */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <div className="bg-stone-950 rounded-xl p-6 border border-stone-800 relative overflow-hidden group-hover:border-amber-500/30 transition-colors">
                     <div className="absolute top-0 right-0 p-2">
                        <TrendingUp className="text-amber-500 opacity-20" size={48} />
                     </div>
                     <div className="space-y-6 relative z-10">
                        {project.stats.map((stat, i) => (
                          <div key={i}>
                            <p className="text-stone-500 text-xs font-mono uppercase mb-1">{stat.label}</p>
                            <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">{stat.value}</p>
                            {stat.subtext && <p className="text-amber-500/80 text-xs mt-1">{stat.subtext}</p>}
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="py-24 bg-stone-900/50 relative z-10">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <StaticReveal>
          <h2 className="text-amber-500 font-mono text-sm tracking-widest mb-4">/ SERVICES</h2>
          <h3 className="text-3xl font-bold text-white">ИНСТРУМЕНТАРИЙ</h3>
          <p className="mt-4 text-stone-400 max-w-2xl mx-auto">Я не просто "настраиваю таргет". Я закрываю весь технический цикл привлечения клиента.</p>
        </StaticReveal>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Маркетинговый анализ", desc: "Глубокий ресерч рынка, конкурентов и Unit-экономики.", icon: <Search /> },
          { title: "Таргетированная реклама", desc: "Работа с холодной аудиторией через боли и сценарии (Instagram/FB).", icon: <Target /> },
          { title: "Контекстная реклама", desc: "Перехват горячего спроса с хирургической точностью (Google Ads).", icon: <Database /> },
          { title: "Сайты и Landing Page", desc: "Создание конверсионных страниц, которые продолжают логику рекламы.", icon: <Layers /> }
        ].map((service, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 0.1}>
            <div className="h-full p-6 bg-stone-950 border border-stone-800 hover:border-amber-500 transition-colors duration-300 rounded-lg group">
              <div className="w-12 h-12 bg-stone-900 rounded-lg flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{service.title}</h4>
              <p className="text-stone-400 text-sm">{service.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
           <StaticReveal>
            <h2 className="text-amber-500 font-mono text-sm tracking-widest mb-4">/ FAQ</h2>
            <h3 className="text-3xl font-bold text-white">7 ОТВЕТОВ ДЛЯ ТЕХ, КТО БОИТСЯ РИСКОВАТЬ</h3>
           </StaticReveal>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.05}>
              <div className="border border-stone-800 rounded-lg bg-stone-900/30 overflow-hidden">
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg transition-colors ${activeIndex === index ? 'text-amber-500' : 'text-stone-200'}`}>
                    <span className="mr-3 text-stone-600 font-mono text-sm">0{index + 1}</span>
                    {faq.question}
                  </span>
                  {activeIndex === index ? <ChevronUp className="text-amber-500" /> : <ChevronDown className="text-stone-500" />}
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-stone-400 border-t border-stone-800/50 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-24 relative z-10 bg-gradient-to-b from-stone-900 to-stone-950">
    <div className="container mx-auto px-4 text-center">
      <ScrollReveal direction="up">
        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
          <MessageCircle size={32} className="text-white" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
          Хватит тратить часы на рекламу. <br/>
          <span className="text-amber-500">Займитесь ростом бизнеса.</span>
        </h2>
        <p className="text-stone-400 text-xl mb-12">Передайте привлечение клиентов инженеру.</p>

        <div className="inline-block p-8 bg-stone-900 border border-stone-800 rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-amber-900/10 blur-xl group-hover:bg-amber-900/20 transition-all"></div>
          <div className="relative z-10">
            <p className="text-2xl font-bold text-white mb-2">T.ODD Marketing</p>
            <p className="text-stone-400 font-mono mb-8">+7 778 525 21 62</p>
            
            <a 
              href="https://wa.me/77785252162" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-lg shadow-green-900/20"
            >
              <MessageCircle size={20} />
              НАПИСАТЬ В WHATSAPP
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 border-t border-stone-900 bg-stone-950 relative z-10 text-center">
    <p className="text-stone-600 font-mono text-sm">© {new Date().getFullYear()} T.ODD Marketing Engineering. All systems operational.</p>
  </footer>
);

// --- MAIN APP COMPONENT ---

function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <GeometricBackground />
      
      {/* Navigation (Simple) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-stone-950/80 backdrop-blur-md border-b border-stone-800/50">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-bold font-mono text-white tracking-tighter">
            T<span className="text-amber-500">.ODD</span>
          </span>
          <a href="#contact" className="hidden md:flex items-center gap-2 text-xs font-mono text-stone-400 hover:text-amber-500 transition-colors">
            START_PROJECT <ArrowRight size={12} />
          </a>
        </div>
      </nav>

      <main>
        <HeroSection />
        <PhilosophySection />
        <MethodologySection />
        <CasesSection />
        <ServicesSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;