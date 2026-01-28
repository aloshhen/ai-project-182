import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, Home, User, Folder, Mail, ChevronRight, 
  ExternalLink, Github, Linkedin, Globe, 
  Smartphone, Monitor, Tablet, ArrowRight,
  CheckCircle, Send
} from 'lucide-react'

// Lazy Image Component with blur placeholder
function LazyImage({ src, alt, className, placeholderSrc }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 blur-placeholder"
          aria-hidden="true"
        />
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  )
}

// Project Card Component
function ProjectCard({ title, description, image, tags, link, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
    >
      <div className="relative h-64 overflow-hidden">
        <LazyImage
          src={image}
          alt={title}
          className="w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-300 mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          aria-label={`Посмотреть проект ${title}`}
        >
          Посмотреть проект
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.article>
  )
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFormSuccess, setIsFormSuccess] = useState(false)

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Современная платформа электронной коммерции с интеграцией платежных систем, корзиной покупок и панелью администратора.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      title: "Corporate Website",
      description: "Корпоративный сайт с адаптивным дизайном, анимациями и системой управления контентом для легкого обновления.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["React", "Tailwind", "CMS"],
      link: "#"
    },
    {
      title: "Mobile App Landing",
      description: "Landing page для мобильного приложения с интерактивными элементами, демонстрацией функций и формой регистрации.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      tags: ["React", "Framer Motion", "API"],
      link: "#"
    },
    {
      title: "Portfolio Dashboard",
      description: "Интерактивная панель управления портфолио с графиками, аналитикой и возможностью экспорта данных в различных форматах.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["React", "Chart.js", "REST API"],
      link: "#"
    },
    {
      title: "Social Media App",
      description: "Социальная платформа с профилями пользователей, лентой новостей, системой лайков и комментариев в реальном времени.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      tags: ["React", "Firebase", "Real-time"],
      link: "#"
    },
    {
      title: "Booking System",
      description: "Система бронирования с календарем, управлением доступностью, уведомлениями и интеграцией с платежными системами.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      tags: ["React", "Node.js", "PostgreSQL"],
      link: "#"
    }
  ]

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsFormSuccess(true)
      e.target.reset()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl z-50 border-b border-slate-800" role="banner">
        <nav className="container mx-auto px-6 py-4" role="navigation" aria-label="Главная навигация">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Globe className="w-8 h-8 text-blue-500" aria-hidden="true" />
              <span className="text-2xl font-bold text-white">DevPortfolio</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                aria-label="Перейти на главную"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                Главная
              </a>
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, 'about')}
                className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                aria-label="Перейти к разделу о нас"
              >
                <User className="w-4 h-4" aria-hidden="true" />
                О нас
              </a>
              <a 
                href="#projects" 
                onClick={(e) => handleNavClick(e, 'projects')}
                className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                aria-label="Перейти к проектам"
              >
                <Folder className="w-4 h-4" aria-hidden="true" />
                Проекты
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                aria-label="Перейти к контактам"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Контакты
              </a>
            </div>

            <button 
              className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Начать проект"
            >
              Начать проект
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-slate-800"
              >
                <div className="flex flex-col space-y-4 pt-4">
                  <a 
                    href="#home" 
                    onClick={(e) => handleNavClick(e, 'home')}
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                  >
                    <Home className="w-4 h-4" />
                    Главная
                  </a>
                  <a 
                    href="#about" 
                    onClick={(e) => handleNavClick(e, 'about')}
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                  >
                    <User className="w-4 h-4" />
                    О нас
                  </a>
                  <a 
                    href="#projects" 
                    onClick={(e) => handleNavClick(e, 'projects')}
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                  >
                    <Folder className="w-4 h-4" />
                    Проекты
                  </a>
                  <a 
                    href="#contact" 
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                  >
                    <Mail className="w-4 h-4" />
                    Контакты
                  </a>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Начать проект
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="pt-32 pb-20 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                  Создаем <span className="text-blue-500">современные</span> веб-решения
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                  Разработка адаптивных и производительных веб-сайтов с фокусом на пользовательский опыт
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={(e) => handleNavClick(e, 'projects')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Смотреть проекты
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Связаться
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                    alt="Разработка веб-приложений"
                    className="rounded-2xl shadow-2xl shadow-blue-500/20 border border-slate-700"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 px-6 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Почему <span className="text-blue-500">выбирают нас?</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Мы создаем веб-решения, которые работают на всех устройствах и превосходят ожидания клиентов
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all transform hover:scale-105"
              >
                <div className="bg-blue-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Monitor className="w-8 h-8 text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Адаптивный дизайн</h3>
                <p className="text-slate-300 leading-relaxed">
                  Сайты идеально отображаются на desktop, tablet и mobile устройствах с оптимальным пользовательским опытом
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all transform hover:scale-105"
              >
                <div className="bg-blue-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">SEO оптимизация</h3>
                <p className="text-slate-300 leading-relaxed">
                  Семантическая разметка, правильная структура и мета-теги для высоких позиций в поисковых системах
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all transform hover:scale-105"
              >
                <div className="bg-blue-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Smartphone className="w-8 h-8 text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Mobile First</h3>
                <p className="text-slate-300 leading-relaxed">
                  Разработка начинается с мобильных устройств, обеспечивая отличную работу на всех экранах
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Наши <span className="text-blue-500">проекты</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Портфолио успешно реализованных проектов с использованием современных технологий
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 px-6 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Свяжитесь <span className="text-blue-500">с нами</span>
              </h2>
              <p className="text-xl text-slate-300">
                Готовы начать ваш проект? Напишите нам!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-12 rounded-2xl border border-slate-700"
            >
              <AnimatePresence mode="wait">
                {!isFormSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="name" className="block text-slate-300 mb-2 font-semibold">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                        placeholder="Иван Иванов"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-slate-300 mb-2 font-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                        placeholder="ivan@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-slate-300 mb-2 font-semibold">
                        Сообщение
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                        placeholder="Расскажите о вашем проекте..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Send className="w-5 h-5" />
                      Отправить сообщение
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-slate-300 mb-8 max-w-md mx-auto">
                      Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                    </p>
                    <button
                      onClick={() => setIsFormSuccess(false)}
                      className="text-blue-400 hover:text-blue-300 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2"
                    >
                      Отправить еще одно сообщение
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 text-center">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-slate-300 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2"
                aria-label="GitHub профиль"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-slate-300 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2"
                aria-label="LinkedIn профиль"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-6" role="contentinfo">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-blue-500" aria-hidden="true" />
              <span className="text-xl font-bold text-white">DevPortfolio</span>
            </div>
            
            <div className="text-slate-400 text-sm text-center">
              © 2024 DevPortfolio. Все права защищены.
            </div>

            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App