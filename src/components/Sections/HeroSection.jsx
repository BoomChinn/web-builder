import { useBuilderStore } from '../../store/useBuilderStore';

export default function HeroSection({ data, id }) {
  const updateField = useBuilderStore(s => s.updateSectionField);

  const handleBlur = (field, e) => {
    updateField(id, field, e.target.innerText);
  };

  return (
    <section className="preview-bg min-h-[480px] flex items-center" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto px-8 py-16 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('heading', e)}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1 -ml-1"
            style={{ color: 'var(--color-text)' }}
          >
            {data.heading}
          </h1>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('subheading', e)}
            className="text-lg mb-8 leading-relaxed outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1 -ml-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {data.subheading}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleBlur('ctaPrimary', e)}
              className="px-7 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 outline-none focus:ring-2 focus:ring-white/50"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {data.ctaPrimary}
            </button>
            <button
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleBlur('ctaSecondary', e)}
              className="px-7 py-3 rounded-lg font-semibold transition-opacity hover:opacity-80 border-2 outline-none focus:ring-2 focus:ring-blue-400"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'transparent' }}
            >
              {data.ctaSecondary}
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src={data.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop'}
            alt="Hero"
            className="rounded-2xl shadow-2xl w-full object-cover"
            style={{ maxHeight: '360px' }}
            onError={e => { e.target.src = 'https://placehold.co/800x500?text=Hero+Image'; }}
          />
          <div
            className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl opacity-20"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </div>
      </div>
    </section>
  );
}
