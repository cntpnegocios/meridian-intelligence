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

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-brand-primary text-white rounded-full shadow-[0_4px_15px_rgba(11,131,92,0.4)] hover:bg-[#096b4b] hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-brand-primary/30"
        aria-label="Open Accessibility Menu"
      >
        <Accessibility size={28} />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-bg-panel border border-border-default rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between p-4 border-b border-border-default bg-[#0a1a26]">
            <div className="flex items-center gap-2 text-brand-primary font-bold">
              <Accessibility size={20} />
              <span>Universal Access</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="p-5 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Vision Profiles */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-text-base uppercase tracking-wider">
                <Eye size={16} className="text-brand-primary" /> Vision & Color
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setVisionMode('default')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'default' ? 'bg-brand-primary text-white border-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  Standard
                </button>
                <button 
                  onClick={() => setVisionMode('high-contrast')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'high-contrast' ? 'bg-brand-primary text-white border-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  High Contrast
                </button>
                <button 
                  onClick={() => setVisionMode('grayscale')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'grayscale' ? 'bg-brand-primary text-white border-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  Monochrome
                </button>
                <button 
                  onClick={() => setVisionMode('protanopia')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'protanopia' ? 'bg-brand-primary text-white border-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  Protanopia
                </button>
                <button 
                  onClick={() => setVisionMode('deuteranopia')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'deuteranopia' ? 'bg-brand-primary text-white border-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  Deuteranopia
                </button>
                <button 
                  onClick={() => setVisionMode('tritanopia')}
                  className={`p-2 text-xs rounded border transition-colors ${visionMode === 'tritanopia' ? 'bg-brand-primary text-white border-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  Tritanopia
                </button>
              </div>
            </div>

            {/* Reading Profiles */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-text-base uppercase tracking-wider">
                <Type size={16} className="text-brand-primary" /> Reading & Text
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => setTextMode(textMode === 'large-text' ? 'default' : 'large-text')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${textMode === 'large-text' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  <span className="text-sm">Large Text</span>
                  <ZoomIn size={16} />
                </button>
                
                <button 
                  onClick={() => setTextMode(textMode === 'dyslexic' ? 'default' : 'dyslexic')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${textMode === 'dyslexic' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  <span className="text-sm">Dyslexia Friendly</span>
                  <Activity size={16} />
                </button>

                <button 
                  onClick={() => setTextMode(textMode === 'spaced' ? 'default' : 'spaced')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${textMode === 'spaced' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'border-border-default text-text-muted hover:text-white'}`}
                >
                  <span className="text-sm">Wide Spacing</span>
                  <Type size={16} />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-border-default text-center">
              <button 
                onClick={() => { setVisionMode('default'); setTextMode('default'); }}
                className="text-xs text-brand-primary hover:underline"
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

