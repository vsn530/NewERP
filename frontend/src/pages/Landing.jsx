import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Landing() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="landing">
            {/* ── Animated background blobs ── */}
            <div className="landing-bg">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />
                <div className="blob blob-4" />
            </div>

            {/* ── Navbar ── */}
            <nav className="landing-nav">
                <div className="landing-nav-inner">
                    <div className="landing-logo">
                        <div className="landing-logo-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <span>Mini ERP</span>
                    </div>
                    <div className="landing-nav-links">
                        <a href="#features">Features</a>
                        <a href="#demo">Demo</a>
                        <a href="#stats">Why Us</a>
                        {isAuthenticated ? (
                            <Link to="/app/dashboard" className="landing-btn landing-btn-nav-cta">Dashboard</Link>
                        ) : (
                            <Link to="/login" className="landing-btn landing-btn-nav-cta">Get Started</Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="hero">
                <div className="hero-content fade-up">
                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        Next-gen business management
                    </div>
                    <h1 className="hero-title">
                        Run your entire business
                        <br />
                        <span className="gradient-text">from one place</span>
                    </h1>
                    <p className="hero-subtitle">
                        Mini ERP brings together products, customers, orders and reporting
                        into one beautiful, blazing-fast platform.
                    </p>
                    <div className="hero-actions">
                        <Link to="/login" className="landing-btn landing-btn-hero">
                            Get Started Free
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Hero visual — mockup screenshot */}
                <div className="hero-visual fade-up-delay">
                    <div className="hero-mockup">
                        <div className="mockup-header">
                            <div className="mockup-dots">
                                <span /><span /><span />
                            </div>
                            <div className="mockup-url">app.minierp.com/dashboard</div>
                        </div>
                        <div className="mockup-body">
                            <div className="mockup-sidebar">
                                <div className="mockup-sidebar-item active" />
                                <div className="mockup-sidebar-item" />
                                <div className="mockup-sidebar-item" />
                                <div className="mockup-sidebar-item" />
                                <div className="mockup-sidebar-item" />
                            </div>
                            <div className="mockup-content">
                                <div className="mockup-cards">
                                    <div className="mockup-card mc-1" />
                                    <div className="mockup-card mc-2" />
                                    <div className="mockup-card mc-3" />
                                    <div className="mockup-card mc-4" />
                                </div>
                                <div className="mockup-table">
                                    <div className="mockup-row" />
                                    <div className="mockup-row" />
                                    <div className="mockup-row" />
                                    <div className="mockup-row" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features Section ── */}
            <section className="features" id="features">
                <div className="section-header fade-up">
                    <h2 className="section-title">Everything you need to <span className="gradient-text">scale fast</span></h2>
                    <p className="section-subtitle">Powerful features designed for modern businesses of any size</p>
                </div>
                <div className="features-grid">
                    <FeatureCard
                        icon={<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>}
                        title="Product Management"
                        desc="Track inventory, pricing, and stock levels in real-time with instant updates."
                        color="#4f46e5"
                        bg="#eef2ff"
                        delay={0}
                    />
                    <FeatureCard
                        icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                        title="Customer Directory"
                        desc="Maintain a rich client database with contact info, history, and more."
                        color="#0ea5e9"
                        bg="#f0f9ff"
                        delay={1}
                    />
                    <FeatureCard
                        icon={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>}
                        title="Order Processing"
                        desc="Create, track and fulfill orders with automatic stock deduction."
                        color="#10b981"
                        bg="#f0fdf4"
                        delay={2}
                    />
                    <FeatureCard
                        icon={<><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></>}
                        title="Live Analytics"
                        desc="Revenue, orders, and growth metrics updated in real-time on your dashboard."
                        color="#f59e0b"
                        bg="#fffbeb"
                        delay={3}
                    />
                    <FeatureCard
                        icon={<><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>}
                        title="Role-Based Access"
                        desc="Admin and staff roles with appropriate permissions for secure operations."
                        color="#ec4899"
                        bg="#fdf2f8"
                        delay={4}
                    />
                    <FeatureCard
                        icon={<><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></>}
                        title="Blazing Fast"
                        desc="Built with React and modern APIs for instant responsiveness everywhere."
                        color="#8b5cf6"
                        bg="#f5f3ff"
                        delay={5}
                    />
                </div>
            </section>

            {/* ── Demo / Video Section ── */}
            <section className="demo-section" id="demo">
                <div className="section-header fade-up">
                    <h2 className="section-title">See it in <span className="gradient-text">action</span></h2>
                    <p className="section-subtitle">Understand how an ERP system streamlines business operations</p>
                </div>
                <div className="demo-video-wrapper fade-up-delay">
                    <div className="demo-video-embed">
                        <iframe
                            src="https://www.youtube.com/embed/6qys-562kp4?rel=0"
                            title="What is ERP? | Enterprise Resource Planning Explained"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* ── Stats Section ── */}
            <section className="stats-section" id="stats">
                <div className="stats-grid">
                    <StatItem value="10x" label="Faster Operations" />
                    <StatItem value="99.9%" label="Uptime Guarantee" />
                    <StatItem value="24/7" label="Support Available" />
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="cta-section">
                <div className="cta-content fade-up">
                    <h2 className="cta-title">Ready to transform your business?</h2>
                    <p className="cta-subtitle">Start managing your products, customers, and orders effortlessly today.</p>
                    <Link to="/login" className="landing-btn landing-btn-white landing-btn-lg">
                        Get Started Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="landing-footer">
                <div className="landing-footer-inner">
                    <div className="landing-logo" style={{ opacity: 0.7 }}>
                        <div className="landing-logo-icon" style={{ width: '28px', height: '28px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <span style={{ fontSize: '0.9375rem' }}>Mini ERP</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>© 2026 Mini ERP. Built with care.</p>
                </div>
            </footer>

            <style>{landingStyles}</style>
        </div>
    );
}

function FeatureCard({ icon, title, desc, color, bg, delay }) {
    return (
        <div className={`feature-card fade-up-stagger`} style={{ '--delay': `${delay * 0.1}s` }}>
            <div className="feature-icon" style={{ background: bg, color }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                </svg>
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-desc">{desc}</p>
        </div>
    );
}

function StatItem({ value, label }) {
    return (
        <div className="stat-item">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

const landingStyles = `
/* ── Base ── */
.landing {
    position: relative;
    overflow-x: hidden;
    background: #ffffff;
    color: #0f172a;
    font-family: 'Inter', system-ui, sans-serif;
}

/* ── Animated Background Blobs ── */
.landing-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: blobFloat 20s ease-in-out infinite;
}

.blob-1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, #818cf8 0%, transparent 70%);
    top: -200px; left: -100px;
    animation-delay: 0s;
}
.blob-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
    top: 30%; right: -150px;
    animation-delay: -5s;
}
.blob-3 {
    width: 450px; height: 450px;
    background: radial-gradient(circle, #f472b6 0%, transparent 70%);
    bottom: 20%; left: -100px;
    animation-delay: -10s;
}
.blob-4 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #a78bfa 0%, transparent 70%);
    bottom: -100px; right: 20%;
    animation-delay: -15s;
}

@keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -40px) scale(1.05); }
    50% { transform: translate(-20px, 20px) scale(0.95); }
    75% { transform: translate(15px, 30px) scale(1.03); }
}

/* ── Animations ── */
.fade-up {
    animation: fadeUp 0.8s ease-out forwards;
}
.fade-up-delay {
    animation: fadeUp 0.8s ease-out 0.3s forwards;
    opacity: 0;
}
.fade-up-stagger {
    animation: fadeUp 0.6s ease-out forwards;
    animation-delay: var(--delay, 0s);
    opacity: 0;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.03); }
}

/* ── Nav ── */
.landing-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(226,232,240,0.6);
}
.landing-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.875rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.landing-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 1.0625rem;
    color: #0f172a;
    letter-spacing: -0.02em;
}
.landing-logo-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: #4f46e5;
    display: flex; align-items: center; justify-content: center;
}
.landing-nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}
.landing-nav-links a {
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
    transition: color 0.2s;
}
.landing-nav-links a:hover {
    color: #4f46e5;
}

/* Nav CTA button — high contrast */
.landing-btn-nav-cta {
    background: #4f46e5 !important;
    color: #ffffff !important;
    padding: 0.5rem 1.125rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.875rem;
    box-shadow: 0 2px 8px -2px rgba(79,70,229,0.4);
    transition: all 0.25s ease;
}
.landing-btn-nav-cta:hover {
    background: #4338ca !important;
    color: #ffffff !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px -4px rgba(79,70,229,0.5);
}

/* ── Buttons ── */
.landing-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    font-size: 0.875rem;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition: all 0.25s ease;
    border: none;
    cursor: pointer;
}

/* Hero primary CTA — big, bold, unmissable */
.landing-btn-hero {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #ffffff;
    padding: 0.875rem 2rem;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 12px;
    box-shadow: 0 6px 20px -4px rgba(79,70,229,0.5), 0 0 0 0 rgba(79,70,229,0);
    animation: heroBtnGlow 3s ease-in-out infinite;
    position: relative;
    overflow: hidden;
}
.landing-btn-hero::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    animation: shimmer 3s ease-in-out infinite;
}
@keyframes shimmer {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
}
@keyframes heroBtnGlow {
    0%, 100% { box-shadow: 0 6px 20px -4px rgba(79,70,229,0.5), 0 0 0 0 rgba(79,70,229,0); }
    50% { box-shadow: 0 8px 30px -4px rgba(79,70,229,0.6), 0 0 0 6px rgba(79,70,229,0.1); }
}
.landing-btn-hero:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px -5px rgba(79,70,229,0.6), 0 0 0 0 rgba(79,70,229,0);
}

.landing-btn-outline {
    background: white;
    color: #475569;
    border: 1.5px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.landing-btn-outline:hover {
    border-color: #4f46e5;
    color: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px -5px rgba(79,70,229,0.15);
}
.landing-btn-white {
    background: white;
    color: #4f46e5;
    font-weight: 700;
    box-shadow: 0 4px 14px -3px rgba(0,0,0,0.2);
}
.landing-btn-white:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -5px rgba(0,0,0,0.3);
}
.landing-btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 0.9375rem;
    border-radius: 10px;
}

/* ── Hero ── */
.hero {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 8rem 2rem 4rem;
    text-align: center;
}
.hero-content {
    max-width: 680px;
    margin: 0 auto;
}
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 1rem;
    background: #eef2ff;
    border: 1px solid #e0e7ff;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #4f46e5;
    margin-bottom: 1.5rem;
}
.hero-badge-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4f46e5;
    animation: pulse 2s ease-in-out infinite;
}
.hero-title {
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    color: #0f172a;
}
.gradient-text {
    background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.hero-subtitle {
    font-size: 1.125rem;
    color: #64748b;
    line-height: 1.7;
    margin-bottom: 2.25rem;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
}
.hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

/* ── Hero Mockup ── */
.hero-visual {
    margin-top: 4rem;
    perspective: 1000px;
}
.hero-mockup {
    max-width: 900px;
    margin: 0 auto;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 25px 80px -12px rgba(79,70,229,0.2), 0 0 0 1px rgba(79,70,229,0.05);
    overflow: hidden;
    background: white;
    animation: mockupFloat 6s ease-in-out infinite;
}
@keyframes mockupFloat {
    0%, 100% { transform: translateY(0) rotateX(2deg); }
    50% { transform: translateY(-8px) rotateX(0deg); }
}
.mockup-header {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}
.mockup-dots {
    display: flex;
    gap: 6px;
}
.mockup-dots span {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #e2e8f0;
}
.mockup-dots span:first-child { background: #fca5a5; }
.mockup-dots span:nth-child(2) { background: #fde68a; }
.mockup-dots span:last-child { background: #86efac; }
.mockup-url {
    font-size: 0.75rem;
    color: #94a3b8;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.25rem 0.75rem;
    flex: 1;
    max-width: 300px;
}
.mockup-body {
    display: flex;
    min-height: 280px;
}
.mockup-sidebar {
    width: 60px;
    background: #0f172a;
    padding: 1rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.mockup-sidebar-item {
    height: 8px;
    border-radius: 4px;
    background: rgba(255,255,255,0.1);
}
.mockup-sidebar-item.active {
    background: #4f46e5;
}
.mockup-content {
    flex: 1;
    padding: 1.25rem;
}
.mockup-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 1rem;
}
.mockup-card {
    height: 55px;
    border-radius: 8px;
    animation: pulse 3s ease-in-out infinite;
}
.mc-1 { background: #eef2ff; animation-delay: 0s; }
.mc-2 { background: #f0f9ff; animation-delay: 0.5s; }
.mc-3 { background: #f0fdf4; animation-delay: 1s; }
.mc-4 { background: #fffbeb; animation-delay: 1.5s; }
.mockup-table {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.mockup-row {
    height: 32px;
    background: #f8fafc;
    border-radius: 6px;
    border: 1px solid #f1f5f9;
}

/* ── Features ── */
.features {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 6rem 2rem;
}
.section-header {
    text-align: center;
    margin-bottom: 3.5rem;
}
.section-title {
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    margin-bottom: 0.75rem;
    color: #0f172a;
}
.section-subtitle {
    font-size: 1.0625rem;
    color: #64748b;
    max-width: 500px;
    margin: 0 auto;
}
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}
.feature-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 1.75rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}
.feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #4f46e5, #06b6d4);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px -8px rgba(79,70,229,0.15);
    border-color: #c7d2fe;
}
.feature-card:hover::before {
    opacity: 1;
}
.feature-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
}
.feature-title {
    font-size: 1.0625rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #0f172a;
}
.feature-desc {
    font-size: 0.9375rem;
    color: #64748b;
    line-height: 1.6;
}

/* ── Demo Section — YouTube Embed ── */
.demo-section {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
}
.demo-video-wrapper {
    margin-top: 2rem;
}
.demo-video-embed {
    position: relative;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 16/9;
    box-shadow: 0 30px 80px -15px rgba(79,70,229,0.25);
    border: 1px solid #e2e8f0;
}
.demo-video-embed iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

/* ── Stats ── */
.stats-section {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 4rem 2rem;
}
.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    text-align: center;
}
.stat-item {
    padding: 1.5rem;
}
.stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.25rem;
}
.stat-label {
    font-size: 0.9375rem;
    color: #64748b;
    font-weight: 500;
}

/* ── CTA ── */
.cta-section {
    position: relative;
    z-index: 1;
    margin: 4rem 2rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%);
    border-radius: 24px;
    padding: 4rem 3rem;
    text-align: center;
    box-shadow: 0 25px 60px -12px rgba(79,70,229,0.4);
    overflow: hidden;
}
.cta-section::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 50%);
    animation: ctaShine 8s linear infinite;
}
@keyframes ctaShine {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.cta-content {
    position: relative;
    z-index: 1;
}
.cta-title {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 800;
    color: white;
    margin-bottom: 0.75rem;
    letter-spacing: -0.03em;
}
.cta-subtitle {
    font-size: 1.0625rem;
    color: rgba(255,255,255,0.8);
    margin-bottom: 2rem;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
}

/* ── Footer ── */
.landing-footer {
    position: relative;
    z-index: 1;
    border-top: 1px solid #e2e8f0;
    padding: 2rem;
}
.landing-footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* ── Responsive ── */
@media (max-width: 768px) {
    .hero { padding-top: 6rem; }
    .landing-nav-links a:not(.landing-btn):not(.landing-btn-nav-cta) { display: none; }
    .mockup-cards { grid-template-columns: repeat(2, 1fr); }
    .features-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: repeat(3, 1fr); }
    .cta-section { padding: 3rem 1.5rem; margin: 2rem 1rem; }
    .landing-footer-inner { flex-direction: column; gap: 0.75rem; text-align: center; }
}
`;
