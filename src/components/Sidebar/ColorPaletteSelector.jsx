import { useBuilderStore } from '../../store/useBuilderStore';
import { colorPalettes } from '../../data/colorPalettes';

export default function ColorPaletteSelector() {
  const activePalette = useBuilderStore(s => s.activePalette);
  const setActivePalette = useBuilderStore(s => s.setActivePalette);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Active Theme</h3>
        <div
          className="rounded-xl p-3 flex items-center gap-3 border-2"
          style={{ backgroundColor: activePalette.background, borderColor: activePalette.primary }}
        >
          <div className="flex gap-1">
            {activePalette.swatch.map((c, i) => (
              <div key={i} className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span className="text-sm font-medium" style={{ color: activePalette.text }}>
            {activePalette.name}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Color Hunt Palettes</h3>
        <div className="flex flex-col gap-2">
          {colorPalettes.map(palette => {
            const isActive = palette.id === activePalette.id;
            return (
              <button
                key={palette.id}
                onClick={() => setActivePalette(palette)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left hover:shadow-sm ${
                  isActive 
                    ? 'border-blue-500 shadow-sm bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex gap-1 shrink-0">
                  {palette.swatch.map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-lg shadow-sm border border-black/5 dark:border-white/5"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{palette.name}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-mono truncate">{palette.primary}</div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Preview</h3>
        <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: activePalette.surface }}>
          {[
            { label: 'Primary', key: 'primary' },
            { label: 'Secondary', key: 'secondary' },
            { label: 'Background', key: 'background' },
            { label: 'Accent', key: 'accent' },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-500 w-24">{label}</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-5 rounded shadow-sm border border-white/50"
                  style={{ backgroundColor: activePalette[key] }}
                />
                <span className="text-xs font-mono text-gray-600">{activePalette[key]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
