import { create } from 'zustand';
import { colorPalettes } from '../data/colorPalettes';

function genId() {
  return Math.random().toString(36).substr(2, 9);
}

const defaultSectionData = {
  header: {
    logoText: 'MyBrand',
    menuItems: ['Home', 'About', 'Services', 'Contact'],
    ctaLabel: 'Get Started',
  },
  hero: {
    heading: 'Your Compelling Headline',
    subheading: 'Add a short description that captures attention and explains your value proposition.',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Learn More',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
  },
  features: {
    heading: 'Our Features',
    subheading: 'Everything you need to succeed.',
    features: [
      { icon: '⚡', title: 'Fast Performance', description: 'Lightning-fast speed for the best user experience.' },
      { icon: '🎨', title: 'Beautiful Design', description: 'Stunning visuals that engage and convert visitors.' },
      { icon: '🔒', title: 'Secure & Reliable', description: 'Enterprise-grade security you can count on.' },
    ],
  },
  testimonials: {
    heading: 'What Our Customers Say',
    testimonials: [
      { name: 'Alex Johnson', role: 'CEO, TechCorp', text: 'Absolutely transformed our online presence!', avatar: 'https://i.pravatar.cc/60?img=1' },
      { name: 'Maria Garcia', role: 'Designer', text: 'The most intuitive builder I have ever used.', avatar: 'https://i.pravatar.cc/60?img=2' },
    ],
  },
  pricing: {
    heading: 'Simple Pricing',
    subheading: 'Choose the plan that works for you.',
    plans: [
      { name: 'Starter', price: '$9', period: '/mo', features: ['1 Website', '5GB Storage', 'Email Support'], highlighted: false },
      { name: 'Pro', price: '$29', period: '/mo', features: ['10 Websites', '50GB Storage', 'Priority Support', 'Analytics'], highlighted: true },
      { name: 'Business', price: '$79', period: '/mo', features: ['Unlimited Websites', '200GB Storage', 'Dedicated Support', 'Custom Domain'], highlighted: false },
    ],
  },
  video: {
    heading: 'See It in Action',
    subheading: 'Watch how it works in this quick overview.',
    videoUrl: '',
  },
  footer: {
    companyName: 'MyBrand',
    tagline: 'Building great things together.',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
    copyright: `© ${new Date().getFullYear()} MyBrand. All rights reserved.`,
  },
};

function applyPaletteToDOM(palette) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', palette.primary);
  root.style.setProperty('--color-secondary', palette.secondary);
  root.style.setProperty('--color-background', palette.background);
  root.style.setProperty('--color-surface', palette.surface);
  root.style.setProperty('--color-accent', palette.accent);
  root.style.setProperty('--color-text', palette.text);
  root.style.setProperty('--color-text-muted', palette.textMuted);
}

const defaultPalette = colorPalettes.find(p => p.id === 'corporate-blue') || colorPalettes[0];

export const useBuilderStore = create((set, get) => ({
  // Current state
  selectedTemplate: null,
  sections: [],
  activePalette: defaultPalette,
  activeSectionId: null,
  viewport: 'desktop', // 'mobile' | 'tablet' | 'desktop'
  sidebarTab: 'templates', // 'templates' | 'colors' | 'sections'
  showTemplateModal: true,
  builderTheme: 'light', // 'light' | 'dark'

  // Toggle builder UI theme
  toggleBuilderTheme: () => set((state) => ({ 
    builderTheme: state.builderTheme === 'light' ? 'dark' : 'light' 
  })),

  // Select a template
  selectTemplate: (template) => {
    // Deep-clone sections so edits don't mutate the original data
    const sections = template.sections.map(s => ({
      ...s,
      data: JSON.parse(JSON.stringify(s.data)),
    }));
    set({
      selectedTemplate: template,
      sections,
      showTemplateModal: false,
      sidebarTab: 'sections',
      activeSectionId: null,
    });
  },

  // Set active palette and update CSS variables
  setActivePalette: (palette) => {
    applyPaletteToDOM(palette);
    set({ activePalette: palette });
  },

  // Set viewport
  setViewport: (viewport) => set({ viewport }),

  // Set sidebar tab
  setSidebarTab: (tab) => set({ sidebarTab: tab }),

  // Set active section for editing
  setActiveSectionId: (id) => set({ activeSectionId: id }),

  // Reorder sections (drag-and-drop result)
  reorderSections: (sourceIndex, destIndex) => {
    const sections = Array.from(get().sections);
    const [removed] = sections.splice(sourceIndex, 1);
    sections.splice(destIndex, 0, removed);
    set({ sections });
  },

  // Update section data
  updateSectionData: (sectionId, newData) => {
    const sections = get().sections.map(s =>
      s.id === sectionId ? { ...s, data: { ...s.data, ...newData } } : s
    );
    set({ sections });
  },

  // Update a single nested field in section data
  updateSectionField: (sectionId, field, value) => {
    const sections = get().sections.map(s => {
      if (s.id !== sectionId) return s;
      return { ...s, data: { ...s.data, [field]: value } };
    });
    set({ sections });
  },

  // Update nested array item (e.g. features[0].title)
  updateSectionArrayItem: (sectionId, arrayField, index, itemData) => {
    const sections = get().sections.map(s => {
      if (s.id !== sectionId) return s;
      const arr = [...(s.data[arrayField] || [])];
      arr[index] = { ...arr[index], ...itemData };
      return { ...s, data: { ...s.data, [arrayField]: arr } };
    });
    set({ sections });
  },

  // Toggle section visibility (remove from view)
  toggleSectionVisibility: (sectionId) => {
    const sections = get().sections.map(s =>
      s.id === sectionId ? { ...s, hidden: !s.hidden } : s
    );
    set({ sections });
  },

  // Delete a section
  deleteSection: (sectionId) => {
    const sections = get().sections.filter(s => s.id !== sectionId);
    const activeSectionId = get().activeSectionId === sectionId ? null : get().activeSectionId;
    set({ sections, activeSectionId });
  },

  // Move section up one position
  moveSectionUp: (sectionId) => {
    const sections = Array.from(get().sections);
    const idx = sections.findIndex(s => s.id === sectionId);
    if (idx <= 0) return;
    [sections[idx - 1], sections[idx]] = [sections[idx], sections[idx - 1]];
    set({ sections });
  },

  // Move section down one position
  moveSectionDown: (sectionId) => {
    const sections = Array.from(get().sections);
    const idx = sections.findIndex(s => s.id === sectionId);
    if (idx < 0 || idx >= sections.length - 1) return;
    [sections[idx], sections[idx + 1]] = [sections[idx + 1], sections[idx]];
    set({ sections });
  },

  // Add a new section of the given type with default data
  addSection: (type) => {
    const data = defaultSectionData[type];
    if (!data) return;
    const newSection = { id: genId(), type, data: JSON.parse(JSON.stringify(data)) };
    set({ sections: [...get().sections, newSection] });
  },

  // Show template modal
  openTemplateModal: () => set({ showTemplateModal: true }),
}));

// Apply default palette on load
applyPaletteToDOM(defaultPalette);
