import { useBuilderStore } from '../../store/useBuilderStore';

export default function FooterSection({ data, id }) {
  const updateField = useBuilderStore(s => s.updateSectionField);

  const handleBlur = (field, e) => {
    updateField(id, field, e.target.innerText);
  };

  return (
    <footer className="py-14 px-8" style={{ backgroundColor: 'var(--color-text)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          <div className="text-center md:text-left">
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleBlur('companyName', e)}
              className="text-2xl font-bold text-white mb-2 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
            >
              {data.companyName}
            </div>
            {data.tagline && (
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('tagline', e)}
                className="text-sm outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {data.tagline}
              </p>
            )}
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
            {data.links?.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)' }}
                onClick={e => e.preventDefault()}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur('copyright', e)}
          className="border-t pt-6 text-center text-xs outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
          style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
        >
          {data.copyright}
        </div>
      </div>
    </footer>
  );
}
