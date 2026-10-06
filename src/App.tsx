import { useState, useEffect } from "react"
import logo from "./assets/logo.png"

const NAV_LINKS = [
  "Inicio",
  "Misión",
  "Visión",
  "Características",
  "Encuesta",
  "Contacto",
]

const FEATURES = [
  {
    icon: "🧠",
    title: "Análisis Emocional",
    desc: "Registra y visualiza tus estados emocionales diarios con gráficas claras e intuitivas.",
  },
  {
    icon: "📊",
    title: "Reportes Visuales",
    desc: "Transforma tus datos en reportes comprensibles para tomar mejores decisiones cotidianas.",
  },
  {
    icon: "🌱",
    title: "Seguimiento de Hábitos",
    desc: "Monitorea tus rutinas y descubre patrones que impactan tu bienestar mental.",
  },
  {
    icon: "🔒",
    title: "Privacidad Total",
    desc: "Tus datos son solo tuyos. Seguridad y confidencialidad en cada interacción.",
  },
  {
    icon: "📱",
    title: "Multi-plataforma",
    desc: "Accede desde cualquier dispositivo — web o móvil — sin interrupciones.",
  },
  {
    icon: "💡",
    title: "Insights Inteligentes",
    desc: "Recomendaciones personalizadas basadas en tus propios datos y tendencias.",
  },
]

const STATS = [
  { value: "10K+", label: "Usuarios activos" },
  { value: "98%", label: "Satisfacción" },
  { value: "5M+", label: "Registros procesados" },
  { value: "2031", label: "Meta regional" },
]

const SURVEY_SECTIONS = [
  {
    title: "Estrés y trabajo/estudio",
    shortTitle: "Estrés",
    description: "Cuéntanos cómo te sientes durante tus actividades diarias.",
    questions: [
      {
        question:
          "¿Con qué frecuencia sientes que te estresas durante tu jornada diaria?",
        options: [
          "Casi nunca o nunca.",
          "Algunas veces a la semana.",
          "Casi todos los días.",
          "Todo el tiempo, de manera constante.",
        ],
      },
      {
        question:
          "Si tuvieras que medir tu nivel de estrés actual en una escala de 1 a 5, ¿en cuál te ubicas?",
        options: [
          "1 — Muy bajo (tranquilo/a).",
          "2 — Bajo.",
          "3 — Moderado.",
          "4 — Alto.",
          "5 — Crítico (al 100% / colapsado/a).",
        ],
      },
      {
        question:
          "Cuando estás trabajando o estudiando, ¿te sientes física o mentalmente agotado/a?",
        options: [
          "No, mantengo mi energía constante.",
          "Solo al final del día.",
          "Con frecuencia, a mitad de la jornada ya me siento cansado/a.",
          "Siempre me siento exhausto/a, incluso antes de empezar.",
        ],
      },
      {
        question:
          "¿Sientes que tus actividades diarias (estudio/trabajo) te sobrepasan o te generan ansiedad?",
        options: [
          "Rara vez o nunca.",
          "Ocasionalmente, cuando hay entregas o exámenes.",
          "Frecuentemente.",
          "Siempre.",
        ],
      },
    ],
  },
  {
    title: "Sueño y recuperación",
    shortTitle: "Descanso",
    description: "Revisemos cuánto y cómo estás descansando.",
    questions: [
      {
        question: "En promedio, ¿cuántas horas duermes por noche?",
        options: [
          "Más de 8 horas.",
          "Entre 6 y 8 horas.",
          "Entre 4 y 5 horas.",
          "Menos de 4 horas.",
        ],
      },
      {
        question: "¿Cómo calificas la calidad de tu descanso al despertar?",
        options: [
          "Excelente, me despierto con energía.",
          "Aceptable, pero a veces me cuesta levantarme.",
          "Mala, me despierto cansado/a como si no hubiera dormido.",
          "Pésima, sufro de insomnio o interrupciones constantes.",
        ],
      },
    ],
  },
  {
    title: "Hábitos de salud y bienestar",
    shortTitle: "Hábitos",
    description:
      "Para terminar, queremos conocer las rutinas que acompañan tu bienestar.",
    questions: [
      {
        question: "¿Realizas actividad física o ejercicio con regularidad?",
        options: [
          "Sí, 3 o más veces por semana.",
          "De 1 a 2 veces por semana.",
          "Solo ocasionalmente (1 o 2 veces al mes).",
          "No realizo ningún tipo de ejercicio.",
        ],
      },
      {
        question:
          "¿Cómo describirías tus hábitos de alimentación en un día normal?",
        options: [
          "Balanceados y saludables (como a horas fijas y de forma equilibrada).",
          "Moderados (intento comer bien, pero a veces consumo comida rápida).",
          "Irregulares (salto comidas u horarios por falta de tiempo).",
          "Poco saludables (alto consumo de ultraprocesados, azúcares o comida rápida).",
        ],
      },
      {
        question:
          "Durante un momento de alto estrés o saturación mental, ¿qué sueles hacer?",
        options: [
          "Hago una pausa, respiro o me distraigo un momento.",
          "Sigo trabajando/estudiando sin parar hasta terminar.",
          "Como en exceso o consumo bebidas con cafeína/energizantes.",
          "Me frustro o me bloqueo por completo.",
        ],
      },
      {
        question:
          "¿Te gustaría contar con una herramienta visual que mida tus datos emocionales y te ayude a saber cuándo hacer una pausa?",
        options: [
          "Sí, me sería de gran ayuda.",
          "Tal vez, me gustaría probarla.",
          "No estoy seguro/a.",
          "No lo considero necesario.",
        ],
      },
    ],
  },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("Inicio")
  const [surveyStep, setSurveyStep] = useState(0)
  const [surveyResponses, setSurveyResponses] =
    useState<Record<string, string>>({})
  const [surveySubmitted, setSurveySubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const sectionIds: Record<string, string> = {
    Inicio: "hero",
    Misión: "mision",
    Visión: "vision",
    Características: "caracteristicas",
    Encuesta: "encuesta",
    Contacto: "contacto",
  }

  const currentSurveySection = SURVEY_SECTIONS[surveyStep]
  const questionKey = (sectionIndex: number, questionIndex: number) =>
    `${sectionIndex}-${questionIndex}`
  const currentSectionComplete = currentSurveySection.questions.every(
    (_, questionIndex) =>
      surveyResponses[questionKey(surveyStep, questionIndex)],
  )

  const handleSurveyNext = () => {
    if (!currentSectionComplete) return
    if (surveyStep < SURVEY_SECTIONS.length - 1) {
      setSurveyStep((step) => step + 1)
      document
        .getElementById("encuesta")
        ?.scrollIntoView({ behavior: "smooth" })
    } else {
      setSurveySubmitted(true)
    }
  }

  const resetSurvey = () => {
    setSurveyResponses({})
    setSurveyStep(0)
    setSurveySubmitted(false)
  }

  return (
    <div className="min-h-screen bg-white font-body">
      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid #EFD4F3"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(120,60,146,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group"
          >
            <img src={logo} alt="Lumina Stats" className="h-12 w-auto" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => {
                  scrollTo(sectionIds[link])
                  setActiveSection(link)
                }}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: activeSection === link ? "#783C92" : "#555",
                  fontFamily: "Outfit, sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#783C92")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    activeSection === link ? "#783C92" : "#555")
                }
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacto")}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ background: "#783C92", color: "#fff" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#4A2260")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#783C92")
              }
            >
              Comenzar
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className="block w-6 h-0.5 transition-all duration-200"
                style={{
                  background: "#783C92",
                  transform: menuOpen
                    ? "rotate(45deg) translate(4px, 4px)"
                    : "none",
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-200"
                style={{ background: "#783C92", opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-200"
                style={{
                  background: "#783C92",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
            style={{ background: "rgba(255,255,255,0.98)" }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(sectionIds[link])}
                className="text-left text-base font-medium py-1 border-b"
                style={{ color: "#783C92", borderColor: "#EFD4F3" }}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at top right, #EFD4F3 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-1/3 h-2/3 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at bottom left, #C9B6D1 0%, transparent 70%)",
            }}
          />
          {/* Decorative circles */}
          <div
            className="absolute top-32 right-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: "#783C92" }}
          />
          <div
            className="absolute bottom-24 left-8 w-40 h-40 rounded-full opacity-8"
            style={{ background: "#EFD4F3" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-3 py-1 rounded-full"
              style={{ background: "#EFD4F3", color: "#783C92" }}
            >
              Bienestar · Datos · Claridad
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#783C92",
              }}
            >
              Tu mente,{" "}
              <em className="not-italic" style={{ color: "#C9B6D1" }}>
                iluminada
              </em>{" "}
              por datos.
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Lumina Stats convierte tus registros emocionales diarios en
              reportes visuales claros para que tomes decisiones con conciencia
              y tranquilidad.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contacto")}
                className="px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-200 shadow-lg"
                style={{ background: "#783C92" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4A2260"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#783C92"
                  e.currentTarget.style.transform = "none"
                }}
              >
                Empieza gratis
              </button>
              <button
                onClick={() => scrollTo("mision")}
                className="px-8 py-3.5 rounded-full font-semibold transition-all duration-200 border"
                style={{ color: "#783C92", borderColor: "#C9B6D1" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#EFD4F3"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.transform = "none"
                }}
              >
                Conocer más
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-25"
                style={{
                  background: "radial-gradient(circle, #EFD4F3, #C9B6D1)",
                }}
              />
              <img
                src={logo}
                alt="Lumina Stats — Bienestar emocional y datos"
                className="relative w-72 md:w-96 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div
            className="w-px h-12 animate-pulse"
            style={{ background: "#783C92" }}
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "#783C92" }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: "#783C92" }} className="py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#EFD4F3",
                }}
              >
                {s.value}
              </div>
              <div className="text-sm font-light" style={{ color: "#C9B6D1" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISIÓN */}
      <section id="mision" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div
              className="aspect-square max-w-sm mx-auto md:mx-0 rounded-3xl p-10 flex flex-col justify-center"
              style={{
                background: "linear-gradient(135deg, #EFD4F3 0%, #C9B6D1 100%)",
              }}
            >
              <div className="text-6xl mb-6">🌿</div>
              <p
                className="text-xl font-semibold leading-snug"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#783C92",
                }}
              >
                "Tecnología con empatía para promover la salud mental en el día
                a día."
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
              style={{ background: "#EFD4F3", color: "#783C92" }}
            >
              Misión
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#783C92",
              }}
            >
              Datos que acompañan tu bienestar
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              En Lumina Stats desarrollamos soluciones tecnológicas basadas en
              la programación y analítica de datos para acompañar el bienestar
              emocional de nuestras personas usuarias.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Transformamos datos diarios en reportes visuales claros y
              comprensibles, integrando la tecnología con la empatía para
              promover la salud mental y la tranquilidad en el día a día.
            </p>
          </div>
        </div>
      </section>

      {/* VISIÓN */}
      <section
        id="vision"
        className="py-24 md:py-32"
        style={{ background: "#f9f4fb" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
              style={{ background: "#EFD4F3", color: "#783C92" }}
            >
              Visión 2031
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#783C92",
              }}
            >
              Líderes en bienestar digital
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Para el año 2031, Lumina Stats será una plataforma líder y
              reconocida a nivel regional y nacional en el desarrollo de
              software aplicado al bienestar personal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏆",
                title: "Liderazgo Regional",
                desc: "Reconocidos como la plataforma de referencia en bienestar emocional digital en toda la región.",
              },
              {
                icon: "🔬",
                title: "Innovación en Datos Emocionales",
                desc: "Pioneros en el procesamiento e interpretación de datos emocionales aplicados a la salud mental.",
              },
              {
                icon: "🤝",
                title: "Impacto Social Positivo",
                desc: "Generando transformación real en la calidad de vida de miles de personas a través de la tecnología.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl border transition-all duration-200 group cursor-default"
                style={{ background: "#fff", borderColor: "#EFD4F3" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C9B6D1"
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(120,60,146,0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#EFD4F3"
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#783C92",
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section id="caracteristicas" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
              style={{ background: "#EFD4F3", color: "#783C92" }}
            >
              Características
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#783C92",
              }}
            >
              Todo lo que necesitas para tu bienestar
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="p-7 rounded-2xl transition-all duration-200 cursor-default"
                style={{
                  background: i % 3 === 1 ? "#783C92" : "#fff",
                  border: `1px solid ${i % 3 === 1 ? "#783C92" : "#EFD4F3"}`,
                }}
                onMouseEnter={(e) => {
                  if (i % 3 !== 1) {
                    e.currentTarget.style.borderColor = "#C9B6D1"
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(120,60,146,0.1)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (i % 3 !== 1) {
                    e.currentTarget.style.borderColor = "#EFD4F3"
                    e.currentTarget.style.transform = "none"
                    e.currentTarget.style.boxShadow = "none"
                  }
                }}
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: i % 3 === 1 ? "#EFD4F3" : "#783C92",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: i % 3 === 1 ? "#C9B6D1" : "#6b7280" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJETO GENERAL */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #EFD4F3 0%, #C9B6D1 60%, #EFD4F3 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <img
            src={logo}
            alt="Lumina Stats"
            className="h-24 mx-auto mb-8 opacity-80"
          />
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif", color: "#783C92" }}
          >
            Nuestra razón de ser
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#4A2260" }}
          >
            Desarrollar y comercializar una plataforma web y móvil especializada
            en la programación y analítica de datos orientada al bienestar
            emocional y la salud mental, ofreciendo a los usuarios herramientas
            digitales intuitivas que transformen hábitos e información personal
            en reportes visuales para la toma de decisiones cotidianas.
          </p>
        </div>
      </section>

      {/* ENCUESTA DE DIAGNÓSTICO */}
      <section
        id="encuesta"
        className="scroll-mt-16 bg-lumina-soft py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.8fr_1.7fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full bg-lumina-light text-lumina-purple">
                Diagnóstico personal
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5 text-lumina-purple">
                Estrés, descanso y estilo de vida
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Identifica hábitos diarios, niveles de agotamiento y factores
                que influyen en tu bienestar físico y emocional.
              </p>

              <div className="rounded-2xl border border-lumina-light bg-white p-5">
                <p className="text-sm font-semibold text-lumina-dark mb-4">
                  Tu recorrido
                </p>
                <div className="space-y-4">
                  {SURVEY_SECTIONS.map((section, index) => {
                    const isComplete = section.questions.every(
                      (_, questionIndex) =>
                        surveyResponses[questionKey(index, questionIndex)],
                    )
                    const isCurrent = index === surveyStep && !surveySubmitted

                    return (
                      <div
                        key={section.title}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                            isComplete
                              ? "bg-lumina-purple text-white"
                              : isCurrent
                                ? "bg-lumina-light text-lumina-purple ring-2 ring-lumina-purple/20"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {isComplete ? "✓" : index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-3">
                            <span
                              className={`text-sm font-medium ${
                                isCurrent
                                  ? "text-lumina-purple"
                                  : "text-gray-500"
                              }`}
                            >
                              {section.shortTitle}
                            </span>
                            <span className="text-xs text-gray-400">
                              {section.questions.length} preguntas
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-lumina-light/60">
                  <div
                    className="h-full rounded-full bg-lumina-purple transition-all duration-500"
                    style={{
                      width: `${
                        surveySubmitted
                          ? 100
                          : ((surveyStep + 1) / SURVEY_SECTIONS.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-gray-400">
                Esta encuesta es orientativa y no sustituye la evaluación de un
                profesional de la salud mental.
              </p>
            </div>

            <div className="rounded-3xl border border-lumina-light bg-white p-6 shadow-xl shadow-lumina-purple/5 sm:p-8 md:p-10">
              {surveySubmitted ? (
                <div className="flex min-h-96 flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-lumina-light text-2xl font-semibold text-lumina-purple">
                    ✓
                  </div>
                  <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-lumina-purple">
                    Encuesta completada
                  </span>
                  <h3 className="font-display text-3xl font-bold text-lumina-purple md:text-4xl">
                    Gracias por escucharte
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-gray-500">
                    Completaste este diagnóstico. Reconocer cómo te sientes es un
                    primer paso valioso para cuidar tu bienestar.
                  </p>
                  <button
                    type="button"
                    onClick={resetSurvey}
                    className="mt-8 rounded-full border border-lumina-mid px-6 py-3 text-sm font-semibold text-lumina-purple transition-colors hover:bg-lumina-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumina-purple"
                  >
                    Realizar de nuevo
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    handleSurveyNext()
                  }}
                >
                  <div className="mb-8 border-b border-lumina-light pb-6">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-widest text-lumina-purple">
                        Sección {surveyStep + 1} de {SURVEY_SECTIONS.length}
                      </span>
                      <span className="text-xs text-gray-400">
                        {currentSurveySection.questions.length} preguntas
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-lumina-purple md:text-3xl">
                      {currentSurveySection.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {currentSurveySection.description}
                    </p>
                  </div>

                  <div className="space-y-9">
                    {currentSurveySection.questions.map(
                      (item, questionIndex) => {
                        const key = questionKey(surveyStep, questionIndex)

                        return (
                          <fieldset key={item.question}>
                            <legend className="mb-4 text-base font-semibold leading-snug text-gray-800">
                              <span className="mr-2 text-lumina-purple">
                                {String(questionIndex + 1).padStart(2, "0")}.
                              </span>
                              {item.question}
                            </legend>
                            <div className="grid gap-2.5">
                              {item.options.map((option, optionIndex) => {
                                const optionId = `survey-${key}-${optionIndex}`

                                return (
                                  <label
                                    key={option}
                                    htmlFor={optionId}
                                    className={`group flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 transition-all ${
                                      surveyResponses[key] === option
                                        ? "border-lumina-purple bg-lumina-light/40 shadow-sm"
                                        : "border-gray-200 hover:border-lumina-mid hover:bg-lumina-soft"
                                    }`}
                                  >
                                    <input
                                      id={optionId}
                                      type="radio"
                                      name={key}
                                      value={option}
                                      checked={surveyResponses[key] === option}
                                      onChange={() =>
                                        setSurveyResponses((responses) => ({
                                          ...responses,
                                          [key]: option,
                                        }))
                                      }
                                      className="mt-0.5 h-4 w-4 shrink-0 accent-lumina-purple"
                                    />
                                    <span className="text-sm leading-relaxed text-gray-600">
                                      <span className="mr-1.5 font-semibold text-lumina-purple">
                                        {String.fromCharCode(65 + optionIndex)}.
                                      </span>
                                      {option}
                                    </span>
                                  </label>
                                )
                              })}
                            </div>
                          </fieldset>
                        )
                      },
                    )}
                  </div>

                  <div className="mt-10 flex flex-col-reverse gap-3 border-t border-lumina-light pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setSurveyStep((step) => Math.max(0, step - 1))
                      }
                      className={`rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumina-purple ${
                        surveyStep === 0
                          ? "pointer-events-none text-gray-300"
                          : "text-lumina-purple hover:bg-lumina-light"
                      }`}
                      disabled={surveyStep === 0}
                    >
                      Anterior
                    </button>
                    <div className="text-center sm:text-right">
                      {!currentSectionComplete && (
                        <p className="mb-2 text-xs text-gray-400">
                          Responde todas las preguntas para continuar
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={!currentSectionComplete}
                        className="w-full rounded-full bg-lumina-purple px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-lumina-purple/15 transition-all hover:bg-lumina-dark disabled:cursor-not-allowed disabled:bg-lumina-mid disabled:shadow-none sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumina-purple"
                      >
                        {surveyStep === SURVEY_SECTIONS.length - 1
                          ? "Finalizar encuesta"
                          : "Continuar"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contacto" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
              style={{ background: "#EFD4F3", color: "#783C92" }}
            >
              Contacto
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#783C92",
              }}
            >
              Comienza tu camino hacia el bienestar
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              ¿Tienes preguntas? Estamos aquí para acompañarte. Escríbenos y te
              respondemos en menos de 24 horas.
            </p>
            <div className="space-y-4">
              {[
                { icon: "📧", label: "hola@luminastats.com" },
                { icon: "📍", label: "Colombia · América Latina" },
                { icon: "🕐", label: "Lunes a viernes, 8am – 6pm" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 text-gray-500"
                >
                  <span className="text-xl">{c.icon}</span>
                  <span className="text-sm">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            className="rounded-3xl p-8 md:p-10 space-y-5"
            style={{ background: "#f9f4fb", border: "1px solid #EFD4F3" }}
            onSubmit={(e) => {
              e.preventDefault()
              alert("¡Gracias! Nos pondremos en contacto pronto.")
            }}
          >
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: "#783C92" }}
              >
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: "#fff",
                  border: "1px solid #EFD4F3",
                  color: "#333",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#783C92")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#EFD4F3")}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: "#783C92" }}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@correo.com"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: "#fff",
                  border: "1px solid #EFD4F3",
                  color: "#333",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#783C92")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#EFD4F3")}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: "#783C92" }}
              >
                Mensaje
              </label>
              <textarea
                rows={4}
                placeholder="¿En qué podemos ayudarte?"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                style={{
                  background: "#fff",
                  border: "1px solid #EFD4F3",
                  color: "#333",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#783C92")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#EFD4F3")}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200"
              style={{ background: "#783C92" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#4A2260")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#783C92")
              }
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a2e" }} className="py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src={logo}
            alt="Lumina Stats"
            className="h-14 brightness-0 invert opacity-80"
          />
          <p className="text-center text-sm" style={{ color: "#C9B6D1" }}>
            © 2026 Lumina Stats · Todos los derechos reservados
          </p>
          <div className="flex gap-6">
            {["Política de privacidad", "Términos"].map((l) => (
              <button
                key={l}
                className="text-xs transition-colors duration-200"
                style={{ color: "#C9B6D1" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EFD4F3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#C9B6D1")}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
