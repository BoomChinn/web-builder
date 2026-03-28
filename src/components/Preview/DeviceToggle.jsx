import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';

const viewports = [
  { id: 'mobile', icon: Smartphone, label: 'Mobile', emoji: '📱', width: '375px' },
  { id: 'tablet', icon: Tablet, label: 'Tablet', emoji: '💊', width: '768px' },
  { id: 'desktop', icon: Monitor, label: 'Desktop', emoji: '💻', width: '100%' },
];

export default function DeviceToggle() {
  const viewport = useBuilderStore(s => s.viewport);
  const setViewport = useBuilderStore(s => s.setViewport);

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {viewports.map(v => {
        const Icon = v.icon;
        const isActive = viewport === v.id;
        return (
          <button
            key={v.id}
            onClick={() => setViewport(v.id)}
            title={`${v.label} (${v.width})`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              isActive
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{v.label}</span>
          </button>
        );
      })}
    </div>
  );
}
