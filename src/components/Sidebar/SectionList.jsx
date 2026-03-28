import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Eye, EyeOff, Plus } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import SectionLibraryModal from './SectionLibraryModal';

const sectionIcons = {
  header: '🔝',
  hero: '🦸',
  features: '✨',
  testimonials: '💬',
  pricing: '💰',
  footer: '📌',
  video: '📺',
};

const sectionLabels = {
  header: 'Header',
  hero: 'Hero',
  features: 'Features',
  testimonials: 'Testimonials',
  pricing: 'Pricing',
  footer: 'Footer',
  video: 'Video',
};

export default function SectionList() {
  const sections = useBuilderStore(s => s.sections);
  const activeSectionId = useBuilderStore(s => s.activeSectionId);
  const reorderSections = useBuilderStore(s => s.reorderSections);
  const setActiveSectionId = useBuilderStore(s => s.setActiveSectionId);
  const toggleSectionVisibility = useBuilderStore(s => s.toggleSectionVisibility);
  const [libraryOpen, setLibraryOpen] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderSections(result.source.index, result.destination.index);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Drag to reorder · Click to edit</p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-2"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all select-none ${
                        snapshot.isDragging
                          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                          : activeSectionId === section.id
                          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                      } ${section.hidden ? 'opacity-50' : ''}`}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors shrink-0"
                      >
                        <GripVertical size={16} />
                      </div>
                      <button
                        className="flex items-center gap-2 flex-1 text-left"
                        onClick={() => setActiveSectionId(activeSectionId === section.id ? null : section.id)}
                      >
                        <span className="text-base">{sectionIcons[section.type] || '📄'}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {sectionLabels[section.type] || section.type}
                          </div>
                          {(section.data.heading || section.data.logoText) && (
                            <div className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[140px]">
                              {section.data.heading || section.data.logoText}
                            </div>
                          )}
                        </div>
                      </button>
                      <button
                        onClick={() => toggleSectionVisibility(section.id)}
                        className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors shrink-0 p-1 rounded"
                        title={section.hidden ? 'Show section' : 'Hide section'}
                      >
                        {section.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Section button */}
      <button
        onClick={() => setLibraryOpen(true)}
        className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all text-sm font-medium"
      >
        <Plus size={15} />
        Add Section
      </button>

      <SectionLibraryModal isOpen={libraryOpen} onClose={() => setLibraryOpen(false)} />
    </div>
  );
}
