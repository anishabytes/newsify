import { ArrowUpRight, BriefcaseBusiness, Code2, Mail } from 'lucide-react'

/** Public footer for the Newsify editorial desk. */
export default function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="content-width footer-content">
        <div className="footer-grid">
          <section className="footer-brand" aria-labelledby="footer-brand-title">
            <a className="wordmark footer-mark" href="#top" id="footer-brand-title">
              <span>NEWS</span><strong>IFY</strong>
            </a>
            <p className="footer-tagline">Independent national coverage across politics, policy, cities, culture, and the stories shaping India.</p>
            <span className="desk-status"><span className="status-dot" /> Live desk</span>
          </section>

          <nav className="footer-column" aria-labelledby="footer-links-title">
            <h2 id="footer-links-title">Explore</h2>
            <a href="#districts">All districts <ArrowUpRight size={14} /></a>
            <a href="#leadership">Leadership directory <ArrowUpRight size={14} /></a>
            <a href="#all-news">Latest stories <ArrowUpRight size={14} /></a>
            <a href="#live">Live video <ArrowUpRight size={14} /></a>
          </nav>

          <section className="footer-column footer-mission" aria-labelledby="footer-mission-title">
            <h2 id="footer-mission-title">About this desk</h2>
            <p>Newsify is designed to make national stories easier to follow — from parliamentary developments to regional priorities and civic updates.</p>
            <p>This public site does not ask for accounts, passwords, or personal information. Notifications are optional.</p>
          </section>

          <section className="footer-column footer-connect" aria-labelledby="footer-connect-title">
            <h2 id="footer-connect-title">Connect</h2>
            <a className="social-link" href="mailto:anishasubba783@gmail.com"><Mail size={16} /> <span>anishasubba783@gmail.com</span></a>
            <a className="social-link" href="https://www.linkedin.com/in/anisha-subba-ba16b1401" target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /> <span>LinkedIn</span><ArrowUpRight size={14} /></a>
            <a className="social-link" href="https://github.com/anishabytes" target="_blank" rel="noreferrer"><Code2 size={16} /> <span>GitHub · anishabytes</span><ArrowUpRight size={14} /></a>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Newsify. Independent &amp; open.</span>
          <span>Curated for India’s fast-moving news cycle</span>
        </div>
      </div>
    </footer>
  )
}
