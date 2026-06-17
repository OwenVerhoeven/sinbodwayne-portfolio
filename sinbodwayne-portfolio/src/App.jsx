import { useEffect, useRef, useState } from 'react'
import './App.css'

const logoWordmark = '/brand/sinbod-wayne-wordmark.png'
const logoLion = '/brand/sinbod-wayne-lion.png'

const proofPoints = ['Cloudflare free plan', 'sinbodwayne.nl', 'React motion system', 'No editor lock-in']

const showcaseModules = [
  {
    label: 'Motion',
    title: 'Scroll scenes',
    text: 'Sections can enter like film shots: masked text, sticky panels, parallax layers, and motion paced to the story.',
  },
  {
    label: 'Input',
    title: 'Mouse-reactive UI',
    text: 'The interface can respond to movement, hover intent, focus, and user choices instead of behaving like a static brochure.',
  },
  {
    label: 'Brand',
    title: 'Custom visual system',
    text: 'The lion, wordmark, red-blue split, gold highlights, and dark stage all become reusable design tokens.',
  },
  {
    label: 'Deploy',
    title: 'Fast static output',
    text: 'This still builds into static files that fit Cloudflare Pages perfectly, even on the free hosting plan.',
  },
]

const studioDeck = [
  'Layered logo reveals',
  'Glass HUD overlays',
  'Animated proof panels',
  'Responsive cinematic grids',
  'Pointer-driven lighting',
  'Scroll-progress storytelling',
  'Template vs custom contrast',
  'Static deployment performance',
]

const editorLimits = [
  'Preset animation timing',
  'Rigid stacked blocks',
  'Plugin dependency pileup',
  'Limited stateful interaction',
  'Generic template personality',
]

function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let animationFrame
    let width = 0
    let height = 0
    let particles = []

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: Math.min(150, Math.floor(width / 7)) }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 3.4,
        speed: 0.2 + Math.random() * 0.9,
        angle: Math.random() * Math.PI * 2,
        hue: index % 4,
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      const gradient = context.createRadialGradient(width * 0.54, height * 0.28, 40, width * 0.5, height * 0.4, width * 0.72)
      gradient.addColorStop(0, 'rgba(255, 206, 85, 0.20)')
      gradient.addColorStop(0.36, 'rgba(0, 174, 239, 0.10)')
      gradient.addColorStop(0.72, 'rgba(218, 18, 31, 0.06)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        particle.angle += 0.01 + index * 0.000035
        particle.x += Math.cos(particle.angle) * particle.speed
        particle.y += Math.sin(particle.angle * 0.7) * particle.speed

        if (particle.x < -24) particle.x = width + 24
        if (particle.x > width + 24) particle.x = -24
        if (particle.y < -24) particle.y = height + 24
        if (particle.y > height + 24) particle.y = -24

        const colors = ['rgba(255, 55, 55, 0.72)', 'rgba(0, 174, 239, 0.70)', 'rgba(255, 210, 84, 0.74)', 'rgba(255,255,255,0.42)']
        context.beginPath()
        context.fillStyle = colors[particle.hue]
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })

      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />
}

function App() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 })
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onPointerMove = (event) => {
      setCursor({
        x: Math.round((event.clientX / window.innerWidth) * 100),
        y: Math.round((event.clientY / window.innerHeight) * 100),
      })
    }

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0)
    }

    onScroll()
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const progressPercent = `${Math.round(scrollProgress * 100)}%`

  return (
    <main className="site-shell" style={{ '--cursor-x': `${cursor.x}%`, '--cursor-y': `${cursor.y}%`, '--scroll-progress': scrollProgress }}>
      <div className="cursor-light" aria-hidden="true" />
      <div className="scroll-meter" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <header className="experience-hud" aria-label="Site navigation">
        <a href="#top" className="hud-brand">
          <img src={logoLion} alt="" />
          <span>Sinbod Wayne</span>
        </a>
        <nav>
          <a href="#experience">Experience</a>
          <a href="#react-vs-editor">React vs editor</a>
          <a href="#deploy">Deploy</a>
        </nav>
        <strong>{progressPercent}</strong>
      </header>

      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <ParticleField />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Brand experience prototype</p>
            <h1 id="hero-title">A cinematic React site for brands that want the website to be the spectacle.</h1>
            <p className="hero-text">
              Built as a portfolio template for sinbodwayne.nl: a dark, high-impact, mouse-reactive, scroll-led
              showcase proving what becomes possible when a site is engineered instead of assembled from blocks.
            </p>
            <div className="hero-actions" aria-label="Primary site actions">
              <a href="#experience" className="button button-primary">Enter the experience</a>
              <a href="#react-vs-editor" className="button button-secondary">Watch the contrast</a>
            </div>
          </div>

          <div className="brand-stage" aria-label="Sinbod Wayne animated brand stage">
            <div className="stage-rings">
              <span />
              <span />
              <span />
            </div>
            <img className="lion-logo" src={logoLion} alt="Sinbod Wayne lion logo" />
            <img className="wordmark-logo" src={logoWordmark} alt="Sinbod Wayne wordmark logo" />
            <div className="signal-card signal-one">
              <span>Live layer</span>
              <strong>Pointer light</strong>
            </div>
            <div className="signal-card signal-two">
              <span>Engine</span>
              <strong>React + CSS + Canvas</strong>
            </div>
          </div>
        </div>

        <div className="proof-strip" aria-label="Project proof points">
          {proofPoints.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </section>

      <section className="marquee-section" aria-label="Animated capability marquee">
        <div className="marquee-track">
          {[...studioDeck, ...studioDeck].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="story-section" id="experience" aria-labelledby="story-title">
        <div className="sticky-copy">
          <p className="eyebrow">The walkthrough</p>
          <h2 id="story-title">Not a page. A directed brand sequence.</h2>
          <p>
            A React portfolio can feel like a launch trailer: the viewer moves through proof, identity, contrast,
            technical confidence, and a final deployment story without ever seeing a generic template.
          </p>
        </div>

        <div className="story-rail" aria-label="Experience chapters">
          {showcaseModules.map((module, index) => (
            <article className="story-card" key={module.title}>
              <span>{String(index + 1).padStart(2, '0')} / {module.label}</span>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cinema-section" aria-labelledby="cinema-title">
        <div className="cinema-frame">
          <div className="cinema-copy">
            <p className="eyebrow">Brand control room</p>
            <h2 id="cinema-title">Every surface can move, react, and carry the identity.</h2>
          </div>
          <div className="control-grid" aria-label="Interactive brand controls">
            <div className="control-tile tall">
              <img src={logoLion} alt="" />
              <span>Hover states</span>
            </div>
            <div className="control-tile">
              <strong>00.72s</strong>
              <span>Entrance timing</span>
            </div>
            <div className="control-tile red">
              <strong>Red</strong>
              <span>Intensity channel</span>
            </div>
            <div className="control-tile blue">
              <strong>Blue</strong>
              <span>Precision channel</span>
            </div>
            <div className="control-tile wide">
              <img src={logoWordmark} alt="" />
              <span>Responsive brand lockup</span>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison-section" id="react-vs-editor" aria-labelledby="comparison-title">
        <div className="section-heading">
          <p className="eyebrow">The contrast</p>
          <h2 id="comparison-title">React gives the brand a system. Editors give it a box.</h2>
        </div>

        <div className="comparison-grid">
          <article className="react-panel">
            <div className="panel-topline">
              <span>React framework</span>
              <strong>Designed as a custom experience</strong>
            </div>
            <div className="demo-window">
              <div className="demo-toolbar">
                <span />
                <span />
                <span />
              </div>
              <div className="demo-scene">
                <div className="code-ribbon">state + motion + brand assets</div>
                <div className="motion-core">
                  <img src={logoLion} alt="" />
                </div>
                <div className="floating-chip chip-red">pointer tracking</div>
                <div className="floating-chip chip-blue">scroll story</div>
                <div className="floating-chip chip-gold">static deploy</div>
              </div>
            </div>
          </article>

          <article className="editor-panel">
            <div className="panel-topline">
              <span>Webeditor attempt</span>
              <strong>Preset friction stack</strong>
            </div>
            <div className="editor-stack" aria-label="Webeditor limitation list">
              {editorLimits.map((item, index) => (
                <div className="editor-block" key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="deploy-section" id="deploy" aria-labelledby="deploy-title">
        <div className="deploy-orb" aria-hidden="true">
          <img src={logoLion} alt="" />
        </div>
        <div>
          <p className="eyebrow">Production story</p>
          <h2 id="deploy-title">The wild experience still ships as clean static files.</h2>
          <p>
            Cloudflare Pages can host the final build on the free plan, connect it to sinbodwayne.nl, and serve a
            custom React experience without a heavy server or webeditor subscription.
          </p>
        </div>
        <div className="deploy-card">
          <span>Deploy target</span>
          <strong>sinbodwayne.nl</strong>
          <p>Fast build output, custom domain, source-controlled changes, and total creative control.</p>
        </div>
      </section>
    </main>
  )
}

export default App
