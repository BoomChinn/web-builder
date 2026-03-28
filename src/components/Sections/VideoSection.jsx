import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function VideoSection({ data, id }) {
  const updateField = useBuilderStore(s => s.updateSectionField);
  const videoId = getYouTubeId(data.videoUrl);

  const handleBlur = (field, e) => {
    updateField(id, field, e.target.innerText);
  };

  return (
    <section className="preview-bg py-16" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-4xl mx-auto px-8 text-center">
        {data.heading && (
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('heading', e)}
            className="text-3xl font-bold mb-4 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
            style={{ color: 'var(--color-text)' }}
          >
            {data.heading}
          </h2>
        )}
        {data.subheading && (
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('subheading', e)}
            className="text-lg mb-8 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {data.subheading}
          </p>
        )}
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black group">
          {videoId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Please provide a valid YouTube URL</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
