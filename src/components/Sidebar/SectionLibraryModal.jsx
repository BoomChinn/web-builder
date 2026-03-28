import { X } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';

const sectionTypes = [
  { type: 'header', icon: '🔝', name: 'Header / Navigation', description: 'Logo and main menu fixed at the top.' },
  { type: 'hero', icon: '🦸', name: 'Hero', description: 'Full-width headline with CTA and image.' },
  { type: 'features', icon: '✨', name: 'Features Grid', description: 'Showcase your key features in a grid.' },
  { type: 'testimonials', icon: '💬', name: 'Testimonials', description: 'Customer quotes and social proof.' },
  { type: 'pricing', icon: '💰', name: 'Pricing Table', description: 'Plans and pricing tiers side by side.' },
  { type: 'video', icon: '📺', name: 'Video Embed', description: 'Embed a YouTube video with a caption.' },
  { type: 'footer', icon: '📌', name: 'Footer', description: 'Links, copyright, and company info.' },
];

export default function SectionLibraryModal({ isOpen, onClose }) {
  const addSection = useBuilderStore(s => s.addSection);
  const setSidebarTab = useBuilderStore(s => s.setSidebarTab);

  if (!isOpen) return null;

  const handleAdd = (type) => {
    addSection(type);
    onClose();
    setSidebarTab('sections');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Add a Section</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Choose a section type to insert.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section list */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {sectionTypes.map(({ type, icon, name, description }) => (
            <button
              key={type}
              onClick={() => handleAdd(type)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group"
            >
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {name}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
