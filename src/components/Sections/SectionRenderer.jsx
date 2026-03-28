import { GripVertical, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import HeaderSection from './HeaderSection';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import FooterSection from './FooterSection';
import VideoSection from './VideoSection';

const sectionMap = {
  header: HeaderSection,
  hero: HeroSection,
  features: FeaturesSection,
  testimonials: TestimonialsSection,
  pricing: PricingSection,
  footer: FooterSection,
  video: VideoSection,
};

export default function SectionRenderer({
  section,
  isActive,
  onClick,
  index,
  totalCount,
  onMoveUp,
  onMoveDown,
  onDelete,
  dragHandleProps,
}) {
  const Component = sectionMap[section.type];
  if (!Component || section.hidden) return null;

  return (
    <div
      onClick={onClick}
      className={`relative group transition-all duration-150 ${
        isActive ? 'ring-2 ring-offset-0' : 'hover:ring-1 hover:ring-offset-0'
      } ring-blue-400 cursor-pointer`}
    >
      {/* Hover toolbar */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Drag handle */}
        <div
          {...dragHandleProps}
          onClick={e => e.stopPropagation()}
          className="p-1 rounded bg-white/90 shadow text-gray-400 hover:text-gray-700 cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          <GripVertical size={14} />
        </div>
        <button
          onClick={e => { e.stopPropagation(); onMoveUp?.(); }}
          disabled={index === 0}
          className="p-1 rounded bg-white/90 shadow text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Move up"
        >
          <ChevronUp size={14} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); onMoveDown?.(); }}
          disabled={index === totalCount - 1}
          className="p-1 rounded bg-white/90 shadow text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Move down"
        >
          <ChevronDown size={14} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); onDelete?.(); }}
          className="p-1 rounded bg-white/90 shadow text-gray-400 hover:text-red-500"
          title="Delete section"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {isActive && (
        <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded shadow">
          Editing
        </div>
      )}
      <Component data={section.data} id={section.id} />
    </div>
  );
}
