import { useState } from 'react';
import { X } from 'lucide-react';
import { templates, categories } from '../data/templates';
import { useBuilderStore } from '../store/useBuilderStore';

export default function TemplateModal() {
  const showTemplateModal = useBuilderStore(s => s.showTemplateModal);
  const selectTemplate = useBuilderStore(s => s.selectTemplate);
  const selectedTemplate = useBuilderStore(s => s.selectedTemplate);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  if (!showTemplateModal) return null;

  const filtered = templates.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Choose a Template</h2>
            <p className="text-sm text-gray-400 mt-0.5">Start with a professionally designed template.</p>
          </div>
          {selectedTemplate && (
            <button
              onClick={() => useBuilderStore.setState({ showTemplateModal: false })}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Search + Filter */}
        <div className="px-6 py-4 border-b border-gray-50 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-400"
          />
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(template => (
              <button
                key={template.id}
                onClick={() => selectTemplate(template)}
                className="group text-left rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = 'https://placehold.co/400x250?text=Preview'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <span className="bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                      Use Template →
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-gray-800">{template.name}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{template.sections.length} sections</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">{template.description}</p>
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {template.category}
                  </span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-400">
                <div className="text-4xl mb-3">🔍</div>
                <p>No templates match your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
