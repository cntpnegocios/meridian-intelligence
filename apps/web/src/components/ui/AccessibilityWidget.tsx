import { useState, useEffect } from 'react';
import { Accessibility, Eye, Type, X, ZoomIn, Activity } from 'lucide-react';

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [visionMode, setVisionMode] = useState<string>('default');
  const [textMode, setTextMode] = useState<string>('default');

  // Handle CSS Class Application
  useEffect(() => {
    const html = document.documentElement;
    
    // Remove all a11y classes
    html.classList.remove(
      'a11y-large-text', 'a11y-dyslexic', 'a11y-spaced', 
      'a11y-grayscale', 'a11y-high-contrast', 
      'a11y-protanopia', 'a11y-deuteranopia', 'a11y-tritanopia'
    );

    // Apply Vision Mode
    if (visionMode !== 'default') {
      html.classList.add(`a11y-${visionMode}`);
    }

    // Apply Text Mode
    if (textMode !== 'default') {
      html.classList.add(`a11y-${textMode}`);
    }
  }, [visionMode, textMode]);

  return (
    <>
      {/* SVG Filters for Colorblindness Mapping */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0  0, 0.433, 0.567, 0, 0  0, 0.475, 0.525, 0, 0  0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>

      {/* Floating Button (Added white border to stand out on dark footer) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] p-3 bg-brand-primary text-white rounded-full border-2 border-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:bg-[#096b4b] hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-brand-primary/30"
        aria-label="Open Accessibility Menu"
      >
        <Accessibility size={28} />
      </button>

      {/* Accessibility Panel (Forced Light Theme styles for high contrast readability) */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-80 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 font-sans">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 text-brand-primary font-bold">
              <Accessibility size={20} />
              <span className="text-gray-900">Universal Access</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-5 space-y-6 max-h-[60vh] overflow-y-auto bg-white">
            
            {/* Vision Profiles */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                <Eye size={16} className="text-brand-primary" /> Vision & Color
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setVisionMode('default')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'default' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  Standard
                </button>
                <button 
                  onClick={() => setVisionMode('high-contrast')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'high-contrast' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  High Contrast
                </button>
                <button 
                  onClick={() => setVisionMode('grayscale')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'grayscale' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  Monochrome
                </button>
                <button 
                  onClick={() => setVisionMode('protanopia')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'protanopia' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  Protanopia
                </button>
                <button 
                  onClick={() => setVisionMode('deuteranopia')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'deuteranopia' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  Deuteranopia
                </button>
                <button 
                  onClick={() => setVisionMode('tritanopia')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'tritanopia' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  Tritanopia
                </button>
              </div>
            </div>

            {/* Reading Profiles */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                <Type size={16} className="text-brand-primary" /> Reading & Text
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => setTextMode(textMode === 'large-text' ? 'default' : 'large-text')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${textMode === 'large-text' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="text-sm font-medium">Large Text</span>
                  <ZoomIn size={16} />
                </button>
                
                <button 
                  onClick={() => setTextMode(textMode === 'dyslexic' ? 'default' : 'dyslexic')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${textMode === 'dyslexic' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="text-sm font-medium">Dyslexia Friendly</span>
                  <Activity size={16} />
                </button>

                <button 
                  onClick={() => setTextMode(textMode === 'spaced' ? 'default' : 'spaced')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${textMode === 'spaced' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="text-sm font-medium">Wide Spacing</span>
                  <Type size={16} />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 text-center">
              <button 
                onClick={() => { setVisionMode('default'); setTextMode('default'); }}
                className="text-sm font-semibold text-brand-primary hover:underline"
              >
                Reset all preferences
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
