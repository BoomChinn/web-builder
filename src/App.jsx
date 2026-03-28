import Sidebar from './components/Sidebar/Sidebar';
import PreviewCanvas from './components/Preview/PreviewCanvas';
import TemplateModal from './components/TemplateModal';
import { useBuilderStore } from './store/useBuilderStore';

export default function App() {
  const builderTheme = useBuilderStore(s => s.builderTheme);

  return (
    <div className={`flex h-screen overflow-hidden ${builderTheme === 'dark' ? 'dark' : ''}`}>
      <div className="flex w-full h-full bg-gray-100 dark:bg-gray-950 transition-colors">
        <Sidebar />
        <main className="flex-1 overflow-hidden flex flex-col">
          <PreviewCanvas />
        </main>
        <TemplateModal />
      </div>
    </div>
  );
}
