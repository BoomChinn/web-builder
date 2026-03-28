import { Layout, Palette, Layers, PenSquare, Sun, Moon } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import TemplateSelector from './TemplateSelector';
import ColorPaletteSelector from './ColorPaletteSelector';
import SectionList from './SectionList';
import SectionEditor from './SectionEditor';

const tabs = [
  { id: 'templates', icon: Layout, label: 'Templates' },
  { id: 'colors', icon: Palette, label: 'Colors' },
  { id: 'sections', icon: Layers, label: 'Sections' },
  { id: 'edit', icon: PenSquare, label: 'Edit' },
];

export default function Sidebar() {
  const sidebarTab = useBuilderStore(s => s.sidebarTab);
  const setSidebarTab = useBuilderStore(s => s.setSidebarTab);
  const selectedTemplate = useBuilderStore(s => s.selectedTemplate);
  const openTemplateModal = useBuilderStore(s => s.openTemplateModal);
  const builderTheme = useBuilderStore(s => s.builderTheme);
  const toggleBuilderTheme = useBuilderStore(s => s.toggleBuilderTheme);

  return (
    <aside className="w-72 min-w-[288px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full shadow-sm transition-colors">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">W</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100 text-base">WebBuilder AI</span>
          </div>
          <button
            onClick={toggleBuilderTheme}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            title={builderTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {builderTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        {selectedTemplate && (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 dark:text-gray-500">Template</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[140px]">{selectedTemplate.name}</div>
            </div>
            <button
              onClick={openTemplateModal}
              className="text-xs text-blue-500 hover:text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-gray-800">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = sidebarTab === tab.id;
          const isDisabled = !selectedTemplate && tab.id !== 'templates';
          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && setSidebarTab(tab.id)}
              disabled={isDisabled}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : isDisabled
                  ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4 dark:bg-gray-900">
        {sidebarTab === 'templates' && <TemplateSelector />}
        {sidebarTab === 'colors' && <ColorPaletteSelector />}
        {sidebarTab === 'sections' && <SectionList />}
        {sidebarTab === 'edit' && <SectionEditor />}
      </div>
    </aside>
  );
}
