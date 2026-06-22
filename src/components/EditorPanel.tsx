import React, { useState } from 'react';
import { Send, Image, HelpCircle, CheckCircle, Info, Sparkles } from 'lucide-react';
import { Temple } from '../types';

interface EditorPanelProps {
  onAddTemple: (templeData: Partial<Temple>) => void;
  onAddActivity: (text: string, highlight?: string, type?: 'verification' | 'review' | 'user' | 'media') => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ onAddTemple, onAddActivity }) => {
  const [name, setName] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [type, setType] = useState<'วัดราษฎร์' | 'พระอารามหลวง' | 'อุทยานประวัติศาสตร์'>('วัดราษฎร์');
  const [image, setImage] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [architecturalStyle, setArchitecturalStyle] = useState('Rattanakosin Style');
  const [visitingHours, setVisitingHours] = useState('08:00 - 17:00 Daily');

  const [validationSuccess, setValidationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pre-configured hotlink suggestions for the user to try instantly
  const hotlinkPresets = [
    {
      title: 'Wat Mahathat (Ayutthaya)',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_y3_y8Hl6gWf4h3G9Ynd-t647X9Jv37_y9kZf4y9g-H47n=w800',
      description: 'Iconic Buddha head entwined inside ancient Bodhi tree roots.'
    },
    {
      title: 'Wat Sri Chum (Sukhothai)',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArl-f29yqZ9X8P3h8C6=w800',
      description: 'The legendary talking giant Buddha statue of the Sukhothai kingdom.'
    },
    {
      title: 'Wat Rong Khun (Chiang Rai)',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC38J9YnD0zF9Zdf3n5G=w800',
      description: 'The majestic contemporary White Temple.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !province || !image) {
      alert("Please fill in Name, Province, and Header Image URL.");
      return;
    }

    setIsLoading(true);

    const templePayload = {
      name,
      englishName: englishName || name,
      tagline: tagline || "A community registered sanctuary.",
      description: description || "Proposed for archive verification on SiamSanctuary.",
      thaiDescription: description,
      image,
      province,
      type,
      yearBuilt: yearBuilt || "Modern Era",
      architecturalStyle,
      visitingHours,
      locationName: `${province}, Thailand`
    };

    try {
      const res = await fetch("/api/temples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templePayload)
      });

      if (res.ok) {
        const data = await res.json();
        onAddTemple(data);
        onAddActivity(`Proposed a new temple for certification: `, name, 'user');
        
        // Reset states
        setName('');
        setEnglishName('');
        setImage('');
        setTagline('');
        setDescription('');
        setYearBuilt('');
        
        setValidationSuccess(true);
        setTimeout(() => setValidationSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-xl overflow-hidden">
      {/* Panel Header */}
      <div className="border-b border-outline-variant/30 pb-4 mb-5">
        <div className="flex items-center gap-1.5 text-secondary text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles size={14} className="text-secondary-container" />
          Heritage Propose Hub
        </div>
        <h2 className="font-display text-2xl font-bold text-on-surface mt-1">
          Propose Community Sanctuaries
        </h2>
        <p className="text-xs text-on-surface-variant">
          Contribute to the catalog of sacred temple architecture. Fill out verified parameters and submit directly to religious department officers.
        </p>
      </div>

      {validationSuccess && (
        <div className="mb-5 p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl flex items-start gap-3 animate-fade-in">
          <CheckCircle size={18} className="shrink-0 text-emerald-600 mt-0.5" />
          <div>
            <p className="text-xs font-bold">Proposal Lodged Successfully!</p>
            <p className="text-[11px] text-emerald-700/95 mt-0.5">
              The temple has been registered in the system. It will appear on the portal and await status class verification inside the Officer Console instantly.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name and Eng Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
              Temple Name (ภาษาไทย) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. วัดศรีชุม (Wat Sri Chum)"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
              English Transliteration
            </label>
            <input
              type="text"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
              placeholder="e.g. Wat Sri Chum"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface"
            />
          </div>
        </div>

        {/* Row 2: Tagline / Short description */}
        <div>
          <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
            One-line Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. The legendary giant talking Buddha statue of Sukhothai."
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface"
          />
        </div>

        {/* Row 3: Image Sourcing & Presets */}
        <div>
          <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
            Header Image Hotlink *
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-on-surface-variant">
              <Image size={14} />
            </span>
            <input
              type="url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste a direct hotlink (JPG/PNG URL)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface font-mono"
            />
          </div>

          {/* Quick Choice Hotlinks */}
          <div className="mt-2.5 p-3 bg-surface-container-low rounded-xl border border-outline-variant/15">
            <p className="text-[10px] font-bold text-on-surface-variant flex items-center gap-1 uppercase tracking-wider mb-2">
              <Info size={11} className="text-secondary" />
              Instant Sourcing Hotlink presets (Try image hotlinking!):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {hotlinkPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImage(preset.url);
                    if (!name) setName(preset.title);
                    if (!tagline) setTagline(preset.description);
                  }}
                  className="p-2 text-left bg-white border border-outline-variant/20 rounded-lg hover:border-primary-container transition-all cursor-pointer text-[10px] hover:bg-primary-container/5"
                >
                  <span className="font-semibold block text-on-surface truncate">{preset.title}</span>
                  <span className="text-on-surface-variant mt-0.5 line-clamp-1 block text-[9px]">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Category, Province Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
              Administration Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface font-medium"
            >
              <option value="วัดราษฎร์">วัดราษฎร์ (Community Temple)</option>
              <option value="พระอารามหลวง">พระอารามหลวง (Royal Temple)</option>
              <option value="อุทยานประวัติศาสตร์">อุทยานประวัติศาสตร์ (Historical Site)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
              Province Location
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface font-medium"
            >
              <option value="กรุงเทพมหานคร">กรุงเทพมหานคร (Bangkok)</option>
              <option value="เชียงใหม่">เชียงใหม่ (Chiang Mai)</option>
              <option value="สุโขทัย">สุโขทัย (Sukhothai)</option>
              <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา (Ayutthaya)</option>
              <option value="หนองคาย">หนองคาย (Nong Khai)</option>
              <option value="เลย">เลย (Loei)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
              Architectural Tag
            </label>
            <input
              type="text"
              value={architecturalStyle}
              onChange={(e) => setArchitecturalStyle(e.target.value)}
              placeholder="e.g. Classic Sukhothai Art"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface"
            />
          </div>
        </div>

        {/* Row 5: Year built and visiting hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
              Consecration / Built Year
            </label>
            <input
              type="text"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(e.target.value)}
              placeholder="e.g. 13th Century"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
              Visiting Hours
            </label>
            <input
              type="text"
              value={visitingHours}
              onChange={(e) => setVisitingHours(e.target.value)}
              placeholder="08:00 - 18:00 Daily"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
            Cultural History Narrative
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Introduce the historic background, design hallmarks, murals and lore..."
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-outline-variant-30 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface-container-lowest text-on-surface"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-secondary text-white rounded-xl py-3 text-xs font-semibold uppercase tracking-wider hover:bg-secondary/95 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <span>Registering Submission...</span>
          ) : (
            <>
              <Send size={13} />
              Submit Proposal for Verification
            </>
          )}
        </button>
      </form>
    </div>
  );
};
