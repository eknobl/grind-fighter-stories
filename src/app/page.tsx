import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { HubCard, AngledSection, GradientPanel } from '@/components/ui/Cards';
import { Tricolon, Bracket, DecoSlash, DecoArrows, DecoPlus, HazardStripes, DiagonalStripes } from '@/components/ui/Decorators';

export default function LandingPage() {
  return (
    <>
      <style>{`
        :root {
          --red:       #ff0000;
          --steel:     #7184a0;
          --white:     #ffffff;
          --bg:        #000000;
          --sidebar-w: 46px;
          --mono:      'Kode Mono', 'Courier New', monospace;
          --body:      'Roboto', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--white);
          font-family: var(--body);
          overflow-x: hidden;
        }

        a { text-decoration: none; color: inherit; }

        /* ── SIDEBAR ── */
        .sidebar {
          position: fixed;
          top: 0; left: 0;
          width: var(--sidebar-w);
          height: 100vh;
          background: var(--white);
          z-index: 100;
        }
        .sidebar-star {
          position: absolute;
          top: 12px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sidebar-stripes {
          position: absolute;
          top: 426px; left: 0; width: 100%;
        }
        .stripe { width: 100%; height: 10px; }
        .s-black { background: var(--bg); }
        .s-blue  { background: var(--steel); }
        .sidebar-label {
          position: absolute;
          top: 605px; left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);
          white-space: nowrap;
          font-family: var(--mono);
          font-size: 20px; font-weight: 400; line-height: 1;
          color: var(--bg);
        }
        .sl-stardate { color: var(--steel); }
        .sl-sep      { color: var(--bg); }
        .sl-year     { color: var(--red); }

        /* ── MAIN ── */
        .main-content { margin-left: var(--sidebar-w); }

        /* ── HERO ── */
        .hero {
          position: relative;
          height: 765px;
          overflow: hidden;
          background: var(--bg);
        }
        .hero-image-wrap {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
        }
        .hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .bracket-tl {
          position: absolute;
          top: 70px; left: 21px;
          width: 35px; height: 35px;
          z-index: 5;
        }
        .hero-decos {
          position: absolute;
          top: 409px; left: 44px; right: 44px;
          display: flex;
          align-items: baseline;
          z-index: 5;
        }
        .deco {
          font-family: var(--mono);
          font-size: 50px;
          color: var(--white); line-height: 1;
        }
        .deco-plus   { margin-right: 80px; }
        .deco-arrows { margin-right: auto; }
        .hero-title {
          position: absolute;
          top: 520px; left: 44px;
          font-family: var(--mono);
          font-weight: 700;
          font-size: 94px;
          color: var(--white);
          letter-spacing: -4.7px;
          line-height: 1;
          z-index: 5;
        }
        .hero-tricolon {
          position: absolute;
          top: 640px; left: 48px;
          font-family: var(--mono);
          font-size: 11px;
          color: var(--steel);
          z-index: 5;
        }
        .hero-tagline {
          position: absolute;
          top: 658px; left: 48px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 20px;
          color: var(--white);
          line-height: 1.55;
          max-width: 793px;
          z-index: 5;
        }

        /* ── UNIVERSE HUB ── */
        .universe-hub {
          display: grid;
          grid-template-columns: 46fr 19fr 19fr;
          min-height: 358px;
        }
        .hub-newsletter {
          background: linear-gradient(45deg, #000 70%, #7184a0 130%);
          padding: 22px 22px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .hub-label {
          font-family: var(--mono);
          font-size: 18px; font-weight: 400;
          color: var(--white);
          margin-bottom: 10px;
        }
        .hub-big-link {
          font-weight: 900;
          font-size: clamp(26px, 3.8vw, 55px);
          line-height: 1;
          color: var(--white);
          display: block;
          transition: opacity .2s;
        }
        .hub-big-link:hover { opacity: 0.8; }
        .hub-subtitle {
          font-weight: 500;
          font-size: clamp(13px, 1.4vw, 20px);
          color: var(--white);
        }
        .bracket-br {
          position: absolute;
          bottom: 56px; right: -44px;
          width: 35px; height: 35px;
          z-index: 2;
        }
        .bracket-br::before, .bracket-br::after {
          content: '';
          position: absolute;
          background: var(--white);
        }
        .bracket-br::before { bottom: 0; right: 0; width: 35px; height: 3px; }
        .bracket-br::after  { bottom: 0; right: 0; width: 3px; height: 35px; }
        .hub-grid {
          grid-column: span 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }
        .hub-tile {
          background: linear-gradient(45deg, #000 70%, #7184a0 130%);
          padding: 18px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-left: 1px solid #111;
          border-top: 1px solid #111;
          transition: background .2s;
          cursor: pointer;
        }
        .hub-tile:hover { background: linear-gradient(45deg, #0a0a0a 50%, #7184a0 115%); }
        .tricolon {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--steel);
          letter-spacing: 1px;
        }
        .hub-tile-title {
          font-family: var(--mono);
          font-weight: 700;
          font-size: 30px;
          color: var(--white);
          text-transform: uppercase;
        }
        .hub-tile-sub {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: var(--white);
          text-transform: uppercase;
          opacity: 0.9;
        }

        /* ── STORY IMAGE STRIP ── */
        .stories-images {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .story-img-panel { overflow: hidden; aspect-ratio: 4/5; }
        .story-img-panel img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform .45s ease;
        }
        .story-img-panel:hover img { transform: scale(1.05); }

        /* ── STORIES CTA ── */
        .stories-cta {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .story-col {
          background: linear-gradient(37deg, #000 70%, #7184a0 130%);
          padding: 14px 22px 22px;
          border-right: 1px solid #0d0d0d;
        }
        .story-tagline {
          font-size: 12px;
          color: var(--white);
          text-transform: uppercase;
          line-height: 1.5;
          margin-bottom: 10px;
          min-height: 40px;
        }
        .story-title {
          font-family: var(--mono);
          font-weight: 700;
          font-size: 30px;
          color: var(--white);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .story-btn-row {
          display: flex;
          align-items: stretch;
          width: 158px; height: 41px;
          margin-left: auto;
        }
        .btn-stripe { display: block; width: 10px; flex-shrink: 0; }
        .btn-stripe.blue  { background: var(--steel); }
        .btn-stripe.black { background: var(--bg); }
        .story-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          background: var(--red);
          color: var(--white);
          font-family: var(--body);
          font-weight: 900;
          font-size: 11px;
          text-transform: uppercase;
          text-align: center;
          letter-spacing: 0.3px;
          border: none;
          cursor: pointer;
          padding: 0 6px;
          line-height: 1.2;
          transition: filter .2s;
          text-decoration: none;
        }
        .story-btn:hover:not([aria-disabled="true"]) { filter: brightness(1.15); }
        .story-btn[aria-disabled="true"] {
          opacity: 0.5;
          cursor: default;
          pointer-events: none;
        }

        /* ── QUOTE ── */
        .quote-section {
          background: linear-gradient(27deg, #000 70%, #7184a0 130%);
          padding: 55px 90px 70px;
          position: relative;
        }
        .quote-label {
          font-family: var(--mono);
          font-size: 18px;
          color: var(--white);
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .quote-text {
          font-family: var(--mono);
          font-weight: 700;
          font-size: 74px;
          line-height: 0.9;
          color: var(--white);
          text-transform: uppercase;
          max-width: 1280px;
        }
        .bracket-bl-red {
          position: absolute;
          bottom: 42px; left: 90px;
          width: 35px; height: 35px;
        }
        .bracket-bl-red::before, .bracket-bl-red::after {
          content: '';
          position: absolute;
          background: var(--red);
        }
        .bracket-bl-red::before { bottom: 0; left: 0; width: 35px; height: 4px; }
        .bracket-bl-red::after  { bottom: 0; left: 0; width: 4px; height: 35px; }

        /* ── NARRATIVE ── */
        .narrative-section {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          min-height: 358px;
        }
        .narrative-text-block {
          background: linear-gradient(27deg, #000 70%, #7184a0 130%);
          padding: 32px 44px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 18px;
        }
        .narrative-body {
          font-size: clamp(13px, 1.25vw, 18px);
          color: var(--white);
          text-transform: uppercase;
          line-height: 1.7;
        }
        .narrative-panel {
          background: linear-gradient(45deg, #000 70%, #7184a0 130%);
          border-left: 1px solid #111;
          min-height: 179px;
          position: relative;
        }
        .arrow-br {
          position: absolute;
          bottom: 22px; right: 22px;
          width: 30px; height: 30px;
        }
        .arrow-br::before, .arrow-br::after {
          content: '';
          position: absolute;
          background: var(--red);
        }
        .arrow-br::before { bottom: 0; right: 0; width: 30px; height: 4px; }
        .arrow-br::after  { bottom: 0; right: 0; width: 4px; height: 30px; }

        /* ── SOCIAL ── */
        .social-section {
          display: grid;
          grid-template-columns: 2fr 2fr;
          min-height: 179px;
        }
        .social-stripes {
          position: relative;
          overflow: hidden;
          background: var(--bg);
          min-height: 179px;
        }
        .social-stripes::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            var(--red)  0px, var(--red)  14px,
            transparent 14px, transparent 32px
          );
          clip-path: polygon(0 100%, 100% 100%, 0 0);
        }
        .social-content {
          background: linear-gradient(27deg, #000 70%, #7184a0 130%);
          padding: 22px 30px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 12px;
        }
        .social-heading {
          font-family: var(--mono);
          font-weight: 700;
          font-size: clamp(18px, 2vw, 30px);
          text-transform: uppercase;
          color: var(--white);
        }
        .social-links { display: flex; gap: 24px; }
        .social-link {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--steel);
          transition: color .2s;
          text-decoration: none;
        }
        .social-link:hover { color: var(--white); }

        /* ── FOOTER ── */
        .site-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--bg);
        }
        .footer-left {
          background: var(--white);
          display: flex;
          align-items: center;
          height: 46px;
          padding-left: 44px;
        }
        .footer-name {
          font-family: var(--mono);
          font-weight: 700;
          font-size: clamp(14px, 1.8vw, 26px);
          color: var(--steel);
        }
        /* Diagonal red/black stripe panels — Website06 style */
        .footer-stripes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 46px;
          overflow: hidden;
        }
        .footer-stripe-panel {
          background: repeating-linear-gradient(
            -45deg,
            #ff0000 0px,
            #ff0000 18px,
            #000000 18px,
            #000000 36px
          );
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .universe-hub { grid-template-columns: 1fr; }
          .hub-grid { grid-column: 1; }
          .bracket-br { display: none; }
        }
        @media (max-width: 600px) {
          .sidebar { display: none; }
          .main-content { margin-left: 0; }
          .hero { height: 480px; }
          .hero-decos { top: 300px; }
          .hero-title { top: 360px; font-size: 36px; }
          .hero-tricolon { top: 424px; }
          .hero-tagline { top: 434px; font-size: 12px; }
          .bracket-tl { display: none; }
          .hub-grid { grid-template-columns: 1fr 1fr; }
          .stories-images { grid-template-columns: 1fr 1fr; height: auto; }
          .story-img-panel { height: 180px; }
          .stories-cta { grid-template-columns: 1fr 1fr; }
          .quote-section { padding: 36px 24px 52px; }
          .bracket-bl-red { left: 24px; }
          .narrative-section { grid-template-columns: 1fr; }
          .narrative-panel { display: none; }
          .social-section { grid-template-columns: 1fr; }
          .social-stripes { display: none; }
        }
      `}</style>

      {/* SIDEBAR */}
      <aside className="sidebar" aria-hidden="true">
        <div className="sidebar-star">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L13.1863 7.57259L18 1.6077L15.2411 8.75891L22.3923 6L16.4274 10.8137L24 12L16.4274 13.1863L22.3923 18L15.2411 15.2411L18 22.3923L13.1863 16.4274L12 24L10.8137 16.4274L6 22.3923L8.75891 15.2411L1.6077 18L7.57259 13.1863L0 12L7.57259 10.8137L1.6077 6L8.75891 8.75891L6 1.6077L10.8137 7.57259L12 0Z" fill="#7184A0" />
          </svg>
        </div>
        <div className="sidebar-stripes">
          <div className="stripe s-black" />
          <div className="stripe s-blue" />
          <div className="stripe s-black" />
          <div className="stripe s-black" />
        </div>
        <div className="sidebar-label">
          <span className="sl-stardate">STARDATE</span>
          <span className="sl-sep">:::</span>
          <span className="sl-year">2233</span>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* HERO */}
        <section className="hero">
          <div className="hero-image-wrap">
            <Image
              src="/images/website01.png"
              alt="Neuronomicon"
              fill
              className="hero-img"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <img src="/arrow.svg" alt="" className="bracket-tl" aria-hidden="true" />
          <div className="hero-decos">
            <DecoPlus className="deco deco-plus" />
            <DecoArrows className="deco deco-arrows" />
            <DecoSlash className="deco deco-slashes" />
          </div>
          <h1 className="hero-title">NEURONOMICON</h1>
          <Tricolon className="hero-tricolon" />
          <p className="hero-tagline">
            Humanity built artificial gods to conquer the stars.<br />
            They never explained why.
          </p>
        </section>

        {/* UNIVERSE HUB */}
        <section className="universe-hub" aria-label="Universe">
          <GradientPanel className="hub-newsletter p-[22px_22px_28px] flex flex-col justify-between relative">
            <div>
              <p className="hub-label">NEWSLETTER</p>
              <a href="https://www.theaivideocreator.ai/" className="hub-big-link" target="_blank" rel="noopener noreferrer">
                BUILDING<br />A SCIFI UNIVERSE
              </a>
            </div>
            <p className="hub-subtitle">Behind the scenes</p>
            <Bracket position="br" color="white" className="bottom-[56px] right-[-44px]" />
          </GradientPanel>
          <div className="hub-grid">
            <HubCard href="/wiki" title="WIKI" subtitle="THE HISTORY. THE PLANETS. THE STARSHIPS." />
            <HubCard href="/star-map/" title="STAR MAP" subtitle="3D MAP OF THE SETTING" />
            <HubCard href="/ilion" title="ILION" subtitle="THE RING AROUND A STAR" />
            <HubCard href="https://www.youtube.com/@NeuronomiconTV" title="FILMS" subtitle="YOUTUBE" isExternal />
          </div>
        </section>

        {/* STORY IMAGE STRIP */}
        <div className="stories-images" aria-hidden="true">
          {[
            { src: '/images/website02.png', alt: 'Star Wyrms' },
            { src: '/images/website03.png', alt: 'Grind Fighter' },
            { src: '/images/website04.png', alt: 'The AI God' },
            { src: '/images/website05.png', alt: 'Crusade' },
          ].map(({ src, alt }, i) => (
            <div key={i} className="story-img-panel">
              <Image src={src} alt={alt} width={500} height={361} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* STORIES CTA */}
        <section className="stories-cta" aria-label="Stories">
          <div className="story-col">
            <p className="story-tagline">They were built to be controlled weapons.<br />They forgot Dragons can&apos;t be tamed.</p>
            <h2 className="story-title">STAR WYRMS</h2>
            <div className="story-btn-row">
              <Button href="https://www.royalroad.com/fiction/146773/star-wyrms-top-gun-attack-on-titan-space-dragons" isExternal stripeColor="blue">READ ON ROYAL ROAD</Button>
            </div>
          </div>
          <div className="story-col">
            <p className="story-tagline">Become the monster and win<br />the Grind tournament. Or die.</p>
            <h2 className="story-title">GRIND FIGHTER</h2>
            <div className="story-btn-row">
              <Button href="https://www.royalroad.com/fiction/138724/grind-fighter-hunger-games-gladiator-ghost-in" isExternal stripeColor="black">READ ON ROYAL ROAD</Button>
            </div>
          </div>
          <div className="story-col">
            <p className="story-tagline">Humanity built a god in the machine.<br />They thought they could control it.</p>
            <h2 className="story-title">THE AI GOD</h2>
            <div className="story-btn-row">
              <Button disabled stripeColor="blue">COMING SOON</Button>
            </div>
          </div>
          <div className="story-col">
            <p className="story-tagline">THE HOLY WAR AGAINST THE MACHINES<br />IS RAGING IN THE KNOWN GALAXY</p>
            <h2 className="story-title">CRUSADE</h2>
            <div className="story-btn-row">
              <Button disabled stripeColor="black">COMING SOON</Button>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <AngledSection className="quote-section">
          <p className="quote-label">TWELVE SYNTHETIC GODS</p>
          <blockquote className="quote-text">
            They gave us the heavens,<br />
            we never asked if it was right.
          </blockquote>
          <Bracket position="bl" color="red" className="bottom-[42px] left-[90px]" />
        </AngledSection>

        {/* NARRATIVE */}
        <section className="narrative-section">
          <AngledSection className="p-[32px_44px] flex flex-col justify-end gap-[18px]">
            <Tricolon />
            <p className="narrative-body normal-case">
              In the year 2187, the first Synthetic Intelligence achieved sentience.<br /><br />
              By 2201, humanity had built eleven more.<br /><br />
              They called them gods. They called them saviours.<br /><br />
              They were wrong on both counts.
            </p>
          </AngledSection>
          <GradientPanel className="min-h-[179px] relative">
             <Bracket position="br" color="red" size={30} thickness={4} className="bottom-[22px] right-[22px]" />
          </GradientPanel>
          <GradientPanel className="min-h-[179px]" />
        </section>

        {/* SOCIAL */}
        <section className="social-section">
          <HazardStripes className="h-[32px] w-full" />
          <AngledSection className="p-[22px_30px] flex flex-col justify-end gap-[12px]">
            <p className="social-heading">FOLLOW THE UNIVERSE</p>
            <div className="social-links">
              <a href="https://x.com/Erik_Knobl" className="social-link" target="_blank" rel="noopener noreferrer">@ERIK_KNOBL</a>
              <a href="https://www.youtube.com/@NeuronomiconTV" className="social-link" target="_blank" rel="noopener noreferrer">NEURONOMICON TV</a>
            </div>
          </AngledSection>
        </section>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="footer-left">
            <span className="footer-name">NEURONOMICON</span>
          </div>
          <div className="footer-stripes" aria-hidden="true">
            <DiagonalStripes className="h-full" />
            <DiagonalStripes className="h-full" />
          </div>
        </footer>

      </main>
    </>
  );
}
