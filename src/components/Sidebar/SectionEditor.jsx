import { useState } from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import ImagePicker from './ImagePicker';
import { Image as ImageIcon } from 'lucide-react';

const sectionLabels = {
  header: 'Header / Navigation',
  hero: 'Hero Section',
  features: 'Features Grid',
  testimonials: 'Testimonials',
  pricing: 'Pricing Table',
  footer: 'Footer',
  video: 'Video Embed',
};

function TextField({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors resize-none"
      />
    </div>
  );
}

function HeaderEditor({ section }) {
  const updateField = useBuilderStore(s => s.updateSectionField);
  const id = section.id;
  const menuItemsStr = (section.data.menuItems || []).join(', ');

  return (
    <div className="flex flex-col gap-4">
      <TextField label="Logo Text" value={section.data.logoText} onChange={v => updateField(id, 'logoText', v)} />
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Menu Items</label>
        <input
          type="text"
          value={menuItemsStr}
          onChange={e => updateField(id, 'menuItems', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="Home, About, Contact"
          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
        />
        <p className="text-[10px] text-gray-400 dark:text-gray-500 italic">Separate items with commas</p>
      </div>
      <TextField label="CTA Button Label" value={section.data.ctaLabel} onChange={v => updateField(id, 'ctaLabel', v)} />
    </div>
  );
}

function HeroEditor({ section }) {
  const updateField = useBuilderStore(s => s.updateSectionField);
  const id = section.id;
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <TextField label="Heading" value={section.data.heading} onChange={v => updateField(id, 'heading', v)} />
      <TextAreaField label="Subheading" value={section.data.subheading} onChange={v => updateField(id, 'subheading', v)} />
      <TextField label="Primary CTA" value={section.data.ctaPrimary} onChange={v => updateField(id, 'ctaPrimary', v)} />
      <TextField label="Secondary CTA" value={section.data.ctaSecondary} onChange={v => updateField(id, 'ctaSecondary', v)} />
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Image URL</label>
          <button
            onClick={() => setIsPickerOpen(true)}
            className="text-[10px] font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1"
          >
            <ImageIcon size={10} /> Browse Unsplash
          </button>
        </div>
        <input
          type="text"
          value={section.data.image || ''}
          onChange={e => updateField(id, 'image', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
        />
      </div>
      {section.data.image && (
        <img
          src={section.data.image}
          alt="Preview"
          className="rounded-lg w-full object-cover h-28 border border-gray-100 dark:border-gray-800"
          onError={e => { e.target.src = 'https://placehold.co/400x200?text=Invalid+URL'; }}
        />
      )}
      <ImagePicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(url) => {
          updateField(id, 'image', url);
          setIsPickerOpen(false);
        }}
      />
    </div>
  );
}

function FeaturesEditor({ section }) {
  const updateArrayItem = useBuilderStore(s => s.updateSectionArrayItem);
  const updateField = useBuilderStore(s => s.updateSectionField);
  const id = section.id;
  return (
    <div className="flex flex-col gap-4">
      <TextField label="Section Heading" value={section.data.heading} onChange={v => updateField(id, 'heading', v)} />
      <TextField label="Subheading" value={section.data.subheading} onChange={v => updateField(id, 'subheading', v)} />
      <div>
        <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Features</h4>
        <div className="flex flex-col gap-4">
          {section.data.features?.map((f, i) => (
            <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3 flex flex-col gap-2 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">{f.icon}</span>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Feature {i + 1}</span>
              </div>
              <TextField
                label="Title"
                value={f.title}
                onChange={v => updateArrayItem(id, 'features', i, { title: v })}
              />
              <TextAreaField
                label="Description"
                value={f.description}
                onChange={v => updateArrayItem(id, 'features', i, { description: v })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsEditor({ section }) {
  const updateArrayItem = useBuilderStore(s => s.updateSectionArrayItem);
  const updateField = useBuilderStore(s => s.updateSectionField);
  const id = section.id;
  const [pickerState, setPickerState] = useState({ isOpen: false, index: null });

  return (
    <div className="flex flex-col gap-4">
      <TextField label="Section Heading" value={section.data.heading} onChange={v => updateField(id, 'heading', v)} />
      <div>
        <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Testimonials</h4>
        <div className="flex flex-col gap-4">
          {section.data.testimonials?.map((t, i) => (
            <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3 flex flex-col gap-2 bg-gray-50 dark:bg-gray-800/50">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Testimonial {i + 1}</span>
              <TextField
                label="Name"
                value={t.name}
                onChange={v => updateArrayItem(id, 'testimonials', i, { name: v })}
              />
              <TextField
                label="Role"
                value={t.role}
                onChange={v => updateArrayItem(id, 'testimonials', i, { role: v })}
              />
              <TextAreaField
                label="Quote"
                value={t.text}
                onChange={v => updateArrayItem(id, 'testimonials', i, { text: v })}
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Avatar URL</label>
                  <button
                    onClick={() => setPickerState({ isOpen: true, index: i })}
                    className="text-[10px] font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1"
                  >
                    <ImageIcon size={10} /> Browse Unsplash
                  </button>
                </div>
                <input
                  type="text"
                  value={t.avatar || ''}
                  onChange={e => updateArrayItem(id, 'testimonials', i, { avatar: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImagePicker
        isOpen={pickerState.isOpen}
        onClose={() => setPickerState({ isOpen: false, index: null })}
        onSelect={(url) => {
          updateArrayItem(id, 'testimonials', pickerState.index, { avatar: url });
          setPickerState({ isOpen: false, index: null });
        }}
      />
    </div>
  );
}

function PricingEditor({ section }) {
  const updateArrayItem = useBuilderStore(s => s.updateSectionArrayItem);
  const updateField = useBuilderStore(s => s.updateSectionField);
  const id = section.id;
  return (
    <div className="flex flex-col gap-4">
      <TextField label="Section Heading" value={section.data.heading} onChange={v => updateField(id, 'heading', v)} />
      <TextField label="Subheading" value={section.data.subheading} onChange={v => updateField(id, 'subheading', v)} />
      <div>
        <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Plans</h4>
        <div className="flex flex-col gap-4">
          {section.data.plans?.map((plan, i) => (
            <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3 flex flex-col gap-2 bg-gray-50 dark:bg-gray-800/50">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Plan {i + 1}</span>
              <TextField
                label="Plan Name"
                value={plan.name}
                onChange={v => updateArrayItem(id, 'plans', i, { name: v })}
              />
              <TextField
                label="Price"
                value={plan.price}
                onChange={v => updateArrayItem(id, 'plans', i, { price: v })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterEditor({ section }) {
  const updateField = useBuilderStore(s => s.updateSectionField);
  const id = section.id;
  return (
    <div className="flex flex-col gap-4">
      <TextField label="Company Name" value={section.data.companyName} onChange={v => updateField(id, 'companyName', v)} />
      <TextField label="Tagline" value={section.data.tagline} onChange={v => updateField(id, 'tagline', v)} />
      <TextField label="Copyright" value={section.data.copyright} onChange={v => updateField(id, 'copyright', v)} />
    </div>
  );
}

function VideoEditor({ section }) {
  const updateField = useBuilderStore(s => s.updateSectionField);
  const id = section.id;
  return (
    <div className="flex flex-col gap-4">
      <TextField label="Section Heading" value={section.data.heading} onChange={v => updateField(id, 'heading', v)} />
      <TextField label="Subheading" value={section.data.subheading} onChange={v => updateField(id, 'subheading', v)} />
      <TextField label="YouTube URL" value={section.data.videoUrl} onChange={v => updateField(id, 'videoUrl', v)} />
      <p className="text-[10px] text-gray-400 dark:text-gray-500 -mt-2 italic">Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ</p>
    </div>
  );
}

const editorMap = {
  header: HeaderEditor,
  hero: HeroEditor,
  features: FeaturesEditor,
  testimonials: TestimonialsEditor,
  pricing: PricingEditor,
  footer: FooterEditor,
  video: VideoEditor,
};

export default function SectionEditor() {
  const sections = useBuilderStore(s => s.sections);
  const activeSectionId = useBuilderStore(s => s.activeSectionId);
  const setActiveSectionId = useBuilderStore(s => s.setActiveSectionId);

  const activeSection = sections.find(s => s.id === activeSectionId);

  if (!activeSection) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center text-gray-400 dark:text-gray-500 gap-2 mt-4">
        <div className="text-3xl">👆</div>
        <p className="text-sm">Click any section in the preview to edit its content.</p>
      </div>
    );
  }

  const EditorComponent = editorMap[activeSection.type];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{sectionLabels[activeSection.type] || activeSection.type}</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500">Edit section content below</p>
        </div>
        <button
          onClick={() => setActiveSectionId(null)}
          className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          ✕ Close
        </button>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        {EditorComponent ? <EditorComponent section={activeSection} /> : (
          <p className="text-sm text-gray-400 dark:text-gray-500">No editor available for this section type.</p>
        )}
      </div>
    </div>
  );
}
