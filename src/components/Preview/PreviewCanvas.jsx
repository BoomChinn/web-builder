import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useBuilderStore } from '../../store/useBuilderStore';
import SectionRenderer from '../Sections/SectionRenderer';
import DeviceToggle from './DeviceToggle';

const viewportWidths = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
};

const viewportFrameClasses = {
  mobile: 'shadow-2xl rounded-2xl overflow-hidden border border-gray-200',
  tablet: 'shadow-2xl rounded-2xl overflow-hidden border border-gray-200',
  desktop: '',
};

export default function PreviewCanvas() {
  const sections = useBuilderStore(s => s.sections);
  const viewport = useBuilderStore(s => s.viewport);
  const activeSectionId = useBuilderStore(s => s.activeSectionId);
  const setActiveSectionId = useBuilderStore(s => s.setActiveSectionId);
  const setSidebarTab = useBuilderStore(s => s.setSidebarTab);
  const selectedTemplate = useBuilderStore(s => s.selectedTemplate);
  const reorderSections = useBuilderStore(s => s.reorderSections);
  const deleteSection = useBuilderStore(s => s.deleteSection);
  const moveSectionUp = useBuilderStore(s => s.moveSectionUp);
  const moveSectionDown = useBuilderStore(s => s.moveSectionDown);

  const handleSectionClick = (sectionId) => {
    setActiveSectionId(sectionId);
    setSidebarTab('edit');
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderSections(result.source.index, result.destination.index);
  };

  const visibleSections = sections.filter(s => !s.hidden);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          {selectedTemplate && (
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 min-w-[200px] transition-colors">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate transition-colors">
                {selectedTemplate.name} — Live Preview
              </span>
            </div>
          )}
        </div>
        <DeviceToggle />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500 hidden md:block transition-colors">
            {viewport === 'mobile' ? '375px' : viewport === 'tablet' ? '768px' : 'Full Width'}
          </span>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 overflow-auto p-6 flex justify-center bg-gray-100 dark:bg-gray-950 transition-colors">
        {selectedTemplate ? (
          <div
            className={`transition-all duration-300 ${viewportFrameClasses[viewport]} bg-white`}
            style={{
              width: viewportWidths[viewport],
              maxWidth: '100%',
              minHeight: '100%',
            }}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="canvas-sections">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {sections.map((section, index) => {
                      if (section.hidden) return null;
                      const visibleIndex = visibleSections.findIndex(s => s.id === section.id);
                      return (
                        <Draggable key={section.id} draggableId={`canvas-${section.id}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <SectionRenderer
                                section={section}
                                isActive={activeSectionId === section.id}
                                onClick={() => handleSectionClick(section.id)}
                                index={visibleIndex}
                                totalCount={visibleSections.length}
                                onMoveUp={() => moveSectionUp(section.id)}
                                onMoveDown={() => moveSectionDown(section.id)}
                                onDelete={() => deleteSection(section.id)}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  const setSidebarTab = useBuilderStore(s => s.setSidebarTab);
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center max-w-sm mx-auto my-auto">
      <div className="text-6xl">🏗️</div>
      <div>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Start Building Your Website</h2>
        <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed transition-colors">
          Choose a template to get started. Customize colors, sections, and content to build your perfect site.
        </p>
      </div>
      <button
        onClick={() => setSidebarTab('templates')}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors shadow-sm"
      >
        Browse Templates →
      </button>
    </div>
  );
}
