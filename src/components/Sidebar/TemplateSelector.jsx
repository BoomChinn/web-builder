import { useState } from 'react';
import { templates, categories } from '../../data/templates';
import { useBuilderStore } from '../../store/useBuilderStore';

export default function TemplateSelector() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const selectTemplate = useBuilderStore(s => s.selectTemplate);

  const filtered = templates.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto flex-1">
        {filtered.map(template => (
          <button
            key={template.id}
            onClick={() => selectTemplate(template)}
            className="group text-left rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-900"
          >
            <div className="relative overflow-hidden h-36">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={e => { e.target.src = 'https://placehold.co/400x250?text=Preview'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Use Template →
                </span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{template.name}</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                  {template.sections.length} sections
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
              <span className="inline-block mt-2 text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                {template.category}
              </span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
            No templates found.
          </div>
        )}
      </div>
    </div>
  );
}
