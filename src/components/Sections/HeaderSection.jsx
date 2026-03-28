export default function HeaderSection({ data }) {
  const { logoText = 'Logo', menuItems = [], ctaLabel = 'Get Started' } = data;

  return (
    <header
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}
        className="flex items-center justify-between h-16"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {logoText.charAt(0).toUpperCase()}
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--color-text)',
            }}
          >
            {logoText}
          </span>
        </div>

        {/* Nav items */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item, i) => (
            <a
              key={i}
              href="#"
              onClick={e => e.preventDefault()}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.target.style.color = 'var(--color-text-muted)')}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        {ctaLabel && (
          <button
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 20px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </header>
  );
}
