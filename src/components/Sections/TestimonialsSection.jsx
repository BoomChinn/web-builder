import { useBuilderStore } from '../../store/useBuilderStore';

export default function TestimonialsSection({ data, id }) {
  const updateField = useBuilderStore(s => s.updateSectionField);
  const updateArrayItem = useBuilderStore(s => s.updateSectionArrayItem);

  const handleBlur = (field, e) => {
    updateField(id, field, e.target.innerText);
  };

  const handleArrayBlur = (arrayField, index, field, e) => {
    updateArrayItem(id, arrayField, index, { [field]: e.target.innerText });
  };

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('heading', e)}
            className="text-3xl md:text-4xl font-bold outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
            style={{ color: 'var(--color-text)' }}
          >
            {data.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.testimonials?.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 shadow-sm flex flex-col gap-4"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <div className="flex gap-1 text-yellow-400 text-lg">
                {'★★★★★'}
              </div>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleArrayBlur('testimonials', i, 'text', e)}
                className="text-base leading-relaxed flex-1 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                style={{ color: 'var(--color-text)' }}
              >
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--color-surface)' }}>
                <img
                  src={t.avatar || `https://i.pravatar.cc/60?img=${i + 1}`}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-400"
                  onError={e => { e.target.src = 'https://placehold.co/60x60?text=👤'; }}
                />
                <div>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleArrayBlur('testimonials', i, 'name', e)}
                    className="font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {t.name}
                  </div>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleArrayBlur('testimonials', i, 'role', e)}
                    className="text-xs outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
