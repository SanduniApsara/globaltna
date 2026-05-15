import "./globals.css";

export const metadata = {
  title: "GlobalTNA — Service Request Board",
  description: "Connect homeowners with skilled tradespeople across Scotland",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <a href="/" className="logo">
              <span className="logo-mark">G</span>
              <span className="logo-text">GlobalTNA</span>
            </a>
            <nav className="header-nav">
              <a href="/" className="nav-link">Board</a>
              <a href="/jobs/new" className="nav-cta">Post a Job</a>
            </nav>
          </div>
        </header>
        <main className="main-content">{children}</main>
        <footer className="site-footer">
          <p>© 2026 GlobalTNA · Connecting homeowners with trusted tradespeople</p>
        </footer>
      </body>
    </html>
  );
}
