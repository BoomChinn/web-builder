import { Check } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';

export default function PricingSection({ data, id }) {
  const updateField = useBuilderStore(s => s.updateSectionField);
  const updateArrayItem = useBuilderStore(s => s.updateSectionArrayItem);

  const handleBlur = (field, e) => {
    updateField(id, field, e.target.innerText);
  };

  const handleArrayBlur = (arrayField, index, field, e) => {
    updateArrayItem(id, arrayField, index, { [field]: e.target.innerText });
  };

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('heading', e)}
            className="text-3xl md:text-4xl font-bold mb-4 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
            style={{ color: 'var(--color-text)' }}
          >
            {data.heading}
          </h2>
          {data.subheading && (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleBlur('subheading', e)}
              className="text-lg outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1 max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {data.subheading}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {data.plans?.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 flex flex-col gap-6 relative"
              style={{
                backgroundColor: plan.highlighted ? 'var(--color-primary)' : 'var(--color-background)',
                boxShadow: plan.highlighted ? '0 20px 60px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.06)',
                transform: plan.highlighted ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full text-white"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  MOST POPULAR
                </div>
              )}
              <div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleArrayBlur('plans', i, 'name', e)}
                  className="text-sm font-semibold uppercase tracking-widest mb-2 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                  style={{ color: plan.highlighted ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)' }}
                >
                  {plan.name}
                </div>
                <div className="flex items-end gap-1">
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleArrayBlur('plans', i, 'price', e)}
                    className="text-4xl font-extrabold outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                    style={{ color: plan.highlighted ? '#fff' : 'var(--color-text)' }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleArrayBlur('plans', i, 'period', e)}
                      className="text-sm mb-1 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                      style={{ color: plan.highlighted ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features?.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <Check
                      size={16}
                      style={{ color: plan.highlighted ? '#fff' : 'var(--color-primary)', flexShrink: 0 }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: plan.highlighted ? 'rgba(255,255,255,0.9)' : 'var(--color-text)' }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                style={
                  plan.highlighted
                    ? { backgroundColor: '#fff', color: 'var(--color-primary)' }
                    : { backgroundColor: 'var(--color-primary)', color: '#fff' }
                }
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
