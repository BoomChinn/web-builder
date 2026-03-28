import { useBuilderStore } from '../../store/useBuilderStore';

export default function FeaturesSection({ data, id }) {
  const updateField = useBuilderStore(s => s.updateSectionField);
  const updateArrayItem = useBuilderStore(s => s.updateSectionArrayItem);

  const handleBlur = (field, e) => {
    updateField(id, field, e.target.innerText);
  };

  const handleArrayBlur = (arrayField, index, field, e) => {
    updateArrayItem(id, arrayField, index, { [field]: e.target.innerText });
  };

  const cols = data.features?.length <= 4 ? 'md:grid-cols-2' : 'md:grid-cols-3';
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
              className="text-lg max-w-2xl mx-auto outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {data.subheading}
            </p>
          )}
        </div>
        <div className={`grid grid-cols-1 ${cols} gap-8`}>
          {data.features?.map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: 'var(--color-background)' }}
            >
              <div
                className="text-4xl mb-4 w-14 h-14 flex items-center justify-center rounded-xl"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                {feature.icon}
              </div>
              <h3
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleArrayBlur('features', i, 'title', e)}
                className="text-xl font-semibold mb-2 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                style={{ color: 'var(--color-text)' }}
              >
                {feature.title}
              </h3>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleArrayBlur('features', i, 'description', e)}
                className="outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
