import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Filter, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  User, 
  Plus, 
  CheckCircle,
  HelpCircle,
  Hash,
  Globe,
  Compass
} from 'lucide-react';
import { Temple, Activity } from './types';
import { initialTemples, initialActivities } from './data';
import { TempleCard } from './components/TempleCard';
import { StatCard } from './components/StatCard';
import { AIChatAdvisor } from './components/AIChatAdvisor';
import { EditorPanel } from './components/EditorPanel';
import { SuperAdminConsole } from './components/SuperAdminConsole';
import { TempleDetailModal } from './components/TempleDetailModal';

export default function App() {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  
  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Focus navigation state
  const [activeScreen, setActiveScreen] = useState<'directory' | 'propose' | 'advisor' | 'officer'>('directory');
  
  // Inspection / detail modal state
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);

  // Load initial templates on startup
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await fetch("/api/temples");
        if (res.ok) {
          const data = await res.json();
          setTemples(data);
        } else {
          setTemples(initialTemples);
        }
      } catch (err) {
        console.error("Express is offline or booting; using presets:", err);
        setTemples(initialTemples);
      }
    };
    fetchTemples();
  }, []);

  const handleUpdateTemple = (id: string, updates: Partial<Temple>) => {
    setTemples(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleAddTemple = (newTemple: Temple) => {
    setTemples(prev => [newTemple, ...prev]);
  };

  const handleAddActivity = (text: string, highlight?: string, type?: 'verification' | 'review' | 'user' | 'media') => {
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      type: type || 'user',
      time: 'Just now',
      text,
      highlightText: highlight
    };
    setActivities(prev => [newAct, ...prev]);
  };

  // Live callback when someone adds a review on the modal
  const handleRefreshTemple = (templeId: string, newReviewsCount: number, newRating: number) => {
    setTemples(prev => prev.map(t => {
      if (t.id === templeId) {
        return {
          ...t,
          reviewsCount: newReviewsCount,
          rating: newRating
        };
      }
      return t;
    }));
  };

  // Filter logic
  const filteredTemples = temples.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvince = selectedProvince === 'All' || t.province === selectedProvince;
    const matchesType = selectedType === 'All' || t.type === selectedType;
    const matchesVerified = !onlyVerified || t.verified;
    return matchesSearch && matchesProvince && matchesType && matchesVerified;
  });

  // Calculate high quality dynamic stats
  const totalTemples = temples.length;
  const verifiedCount = temples.filter(t => t.verified).length;
  const totalReviews = temples.reduce((sum, t) => sum + t.reviewsCount, 0);
  const avgRating = temples.reduce((sum, t) => sum + t.rating, 0) / totalTemples || 0;

  return (
    <div className="min-h-screen bg-[#fffcfb] text-on-surface flex flex-col font-sans">
      
      {/* Absolute Header Ribbon */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md glass-nav border-b border-outline-variant/30 px-6 py-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary rounded-2xl text-primary-container shadow-md shadow-primary/20 flex items-center justify-center">
              <Compass size={22} className="animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#8f4e00] bg-amber-500/10 px-2 py-0.5 rounded-md">
                  SIAM HERITAGE
                </span>
                <span className="text-[10px] uppercase font-mono text-emerald-700 bg-emerald-500/10 px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle size={9} className="fill-current" />
                  Official Registry
                </span>
              </div>
              <h1 className="font-display text-xl font-extrabold text-on-surface mt-0.5 tracking-tight flex items-baseline gap-1.5">
                SiamSanctuary
                <span className="text-xs text-on-surface-variant font-sans font-normal border-l border-outline-variant/30 pl-1.5">
                  สยามแซงชัวรี
                </span>
              </h1>
            </div>
          </div>

          {/* Navigation Screens Controls */}
          <nav className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-2xl border border-outline-variant/15">
            <button
              onClick={() => setActiveScreen('directory')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeScreen === 'directory'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveScreen('propose')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeScreen === 'propose'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Propose
            </button>
            <button
              onClick={() => setActiveScreen('advisor')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeScreen === 'advisor'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              AI Advisor
            </button>
            <button
              onClick={() => setActiveScreen('officer')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                activeScreen === 'officer'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Officer Panel
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping inline-block" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 space-y-8 text-left">
        
        {/* Welcome Section / Dynamic Jumbotrons */}
        <section className="bg-gradient-to-br from-[#735c00]/5 via-[#8f4e00]/2 to-transparent rounded-3xl p-6 md:p-10 border border-outline-variant/20 relative overflow-hidden thai-pattern-bg">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-primary">
              Discover Monuments of the Siam Kingdom
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-on-surface mt-2 tracking-tight leading-tight">
              A Living Directory of Majestic Thai Temples
            </h2>
            <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
              Explore consecration history, beautiful Lan Xang and Rattanakosin architectural parameters, dress rules, and consult with our intelligent heritage advisor. Sourced from certified archives.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-contain bg-no-repeat bg-right" />
        </section>

        {/* Dynamic Statistical overview Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Compass size={20} />}
            label="Total Temples"
            value={totalTemples}
            change="+4 new"
            isPositive={true}
          />
          <StatCard
            icon={<Award size={20} />}
            label="Heritage Score Avg"
            value={`${avgRating.toFixed(2)}/5`}
            change="Royal Grade"
            isPositive={true}
          />
          <StatCard
            icon={<ShieldCheck size={20} />}
            label="Verified Artifacts"
            value={`${verifiedCount} / ${totalTemples}`}
            change="Officially Audited"
            isPositive={true}
          />
          <StatCard
            icon={<User size={20} />}
            label="Community Pilgrim Reviews"
            value={totalReviews}
            change="+2 fresh"
            isPositive={true}
          />
        </section>

        {/* Dynamic TAB Screen Renderer */}
        {activeScreen === 'directory' && (
          <div className="space-y-6">
            
            {/* Filter Section */}
            <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 flex flex-col lg:flex-row gap-4 items-center justify-between">
              
              {/* Search control */}
              <div className="relative w-full lg:max-w-md">
                <span className="absolute left-3.5 top-3 text-on-surface-variant">
                  <Search size={15} />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query Wat Phra Kaew, Wat Arun, Chedis..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary bg-surface-container-lowest text-on-surface font-medium"
                />
              </div>

              {/* Tag Filters Row */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                
                {/* Province Filter Selection */}
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-secondary" />
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/20 focus:outline-none text-on-surface cursor-pointer"
                  >
                    <option value="All">All Provinces</option>
                    <option value="กรุงเทพมหานคร">กรุงเทพมหานคร (Bangkok)</option>
                    <option value="เชียงใหม่">เชียงใหม่ (Chiang Mai)</option>
                    <option value="หนองคาย">หนองคาย (Nong Khai)</option>
                    <option value="เลย">เลย (Loei)</option>
                    <option value="สุโขทัย">สุโขทัย (Sukhothai)</option>
                    <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา (Ayutthaya)</option>
                  </select>
                </div>

                {/* Admins Type selection */}
                <div className="flex items-center gap-1.5">
                  <Filter size={13} className="text-secondary" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/20 focus:outline-none text-on-surface cursor-pointer"
                  >
                    <option value="All">All Status Classes</option>
                    <option value="วัดราษฎร์">วัดราษฎร์ (Community Temple)</option>
                    <option value="พระอารามหลวง">พระอารามหลวง (Royal Temple)</option>
                    <option value="อุทยานประวัติศาสตร์">อุทยานประวัติศาสตร์ (Historical Site)</option>
                  </select>
                </div>

                {/* Toggle Verified state checkbox */}
                <label className="inline-flex items-center gap-2 cursor-pointer bg-surface-container-low/60 hover:bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/25 transition-all text-xs font-semibold text-on-surface select-none">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="rounded border-outline-variant text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
                  />
                  <span>Verified Only</span>
                </label>

              </div>
            </div>

            {/* List Grid display */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display font-bold text-xl text-on-surface">
                  Siam Archives Sanctuaries
                </h3>
                <span className="font-mono text-xs text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-md font-semibold">
                  Showing {filteredTemples.length} of {totalTemples} sanctuaries
                </span>
              </div>

              {filteredTemples.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-outline-variant/30 shadow-xs">
                  <Compass size={40} className="mx-auto text-primary-container bg-primary-container/10 p-2.5 rounded-full mb-3" />
                  <p className="text-sm font-semibold text-on-surface">No Sanctuaries Matched</p>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">Please widen your search query or reset your province/type filter options to locate more beautiful sacred monuments.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemples.map((temple) => (
                    <TempleCard
                      key={temple.id}
                      temple={temple}
                      onSelect={(t) => setSelectedTemple(t)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeScreen === 'propose' && (
          <div className="max-w-2xl mx-auto">
            <EditorPanel
              onAddTemple={handleAddTemple}
              onAddActivity={handleAddActivity}
            />
          </div>
        )}

        {activeScreen === 'advisor' && (
          <div className="max-w-2xl mx-auto">
            <AIChatAdvisor />
          </div>
        )}

        {activeScreen === 'officer' && (
          <div className="max-w-3xl mx-auto">
            <SuperAdminConsole
              temples={temples}
              onUpdateTemple={handleUpdateTemple}
              activities={activities}
              onAddActivity={handleAddActivity}
            />
          </div>
        )}

      </main>

      {/* Footer Info Area */}
      <footer className="bg-surface-container-low border-t border-outline-variant/30 py-8 px-6 mt-16 text-center text-xs text-on-surface-variant">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-serif">© 1782-2026 SiamSanctuary Chronicles. Dedicated to Cultural Heritage & Preservation.</span>
          <div className="flex gap-4 font-mono text-[10px] font-semibold text-primary">
            <a href="#directory" onClick={() => { setActiveScreen('directory'); }} className="hover:underline">DIRECTORY</a>
            <a href="#ethics" onClick={() => { setActiveScreen('advisor'); }} className="hover:underline">ETIQUETTE RULES</a>
            <a href="#advisor" onClick={() => { setActiveScreen('officer'); }} className="hover:underline">OFFICER LOGIN</a>
          </div>
        </div>
      </footer>

      {/* Detail Inspection Modal Overlay popup */}
      {selectedTemple && (
        <TempleDetailModal
          temple={selectedTemple}
          onClose={() => setSelectedTemple(null)}
          onAddActivity={handleAddActivity}
          onRefreshTemple={handleRefreshTemple}
        />
      )}

    </div>
  );
}
