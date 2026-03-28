import React, { useState } from 'react';
import { Search, X, Loader2, Image as ImageIcon } from 'lucide-react';

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Placeholder

export default function ImagePicker({ isOpen, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchImages = async () => {
    if (!query) return;
    setLoading(true);
    setHasSearched(true);
    try {
      // For demonstration, we'll use a mock if key is not provided
      if (UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY' || !UNSPLASH_ACCESS_KEY) {
        // Real Unsplash IDs that are known to work
        const mockIds = [
          'photo-1497215728101-856f4ea42174',
          'photo-1519389950473-47ba0277781c',
          'photo-1460925895917-afdab827c52f',
          'photo-1486312338219-ce68d2c6f44d',
          'photo-1522202176988-66273c2fd55f',
          'photo-1552664730-d307ca884978',
          'photo-1517245386807-bb43f82c33c4',
          'photo-1531482615713-2afd69097998'
        ];
        
        const mockResults = mockIds.map((id, i) => ({
          id: `mock-${i}`,
          urls: {
            small: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`,
            regular: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1080&q=80`,
          },
          alt_description: `Mock Image ${i + 1}`,
          user: { name: 'Unsplash Contributor' }
        }));
        setResults(mockResults);
      } else {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`);
        if (!res.ok) throw new Error('Unsplash API error');
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="text-blue-500" size={20} />
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Select Image from Unsplash</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search high-quality photos..."
              className="w-full pl-10 pr-24 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 text-sm dark:text-gray-100 transition-colors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchImages()}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <button
              onClick={searchImages}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : 'Search'}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {!hasSearched ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
              <ImageIcon size={48} className="mb-4 opacity-20" />
              <p className="text-sm">Search for anything to browse free photos</p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {results.map((img) => (
                <button
                  key={img.id}
                  onClick={() => onSelect(img.urls.regular)}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-400 transition-all"
                >
                  <img
                    src={img.urls.small}
                    alt={img.alt_description}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <p className="text-[10px] text-white truncate w-full">by {img.user.name}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
          <p className="text-[10px] text-gray-400">Powered by Unsplash</p>
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
