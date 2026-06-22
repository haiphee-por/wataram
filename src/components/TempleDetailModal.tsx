import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Clock, Star, Sparkles, Send, ShieldCheck, Heart } from 'lucide-react';
import { Temple, Review } from '../types';

interface TempleDetailModalProps {
  id?: string;
  temple: Temple;
  onClose: () => void;
  onAddActivity: (text: string, highlight?: string, type?: 'verification' | 'review' | 'user' | 'media') => void;
  onRefreshTemple: (id: string, newReviewsCount: number, newRating: number) => void;
}

export const TempleDetailModal: React.FC<TempleDetailModalProps> = ({ 
  id, 
  temple, 
  onClose, 
  onAddActivity,
  onRefreshTemple 
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [authorValue, setAuthorValue] = useState('');
  const [ratingValue, setRatingValue] = useState(5);
  const [commentValue, setCommentValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch reviews whenever temple selection changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/${temple.id}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (err) {
        console.error("Error drawing reviews:", err);
      }
    };
    fetchReviews();
  }, [temple.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorValue.trim() || !commentValue.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templeId: temple.id,
          author: authorValue,
          rating: ratingValue,
          comment: commentValue
        })
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews(prev => [newReview, ...prev]);
        onAddActivity(`${authorValue} authored a ${ratingValue}-star review for `, temple.name, 'review');
        
        // Calculate new averags
        const draftReviews = [newReview, ...reviews];
        const newRating = draftReviews.reduce((sum, r) => sum + r.rating, 0) / draftReviews.length;
        
        // Callback parent to update inline list
        onRefreshTemple(temple.id, draftReviews.length, newRating);

        // Reset review fields
        setAuthorValue('');
        setCommentValue('');
        setRatingValue(5);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={id || "temple-detail-modal-overlay"} className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up border border-outline-variant/20">
        
        {/* Left Column: Media & Core Information */}
        <div className="md:w-1/2 relative bg-surface-container-low flex flex-col h-[300px] md:h-auto">
          <img
            src={temple.image}
            alt={temple.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay Dark Gradation */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white text-left">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-primary-container block mb-1">
              {temple.type} • {temple.architecturalStyle}
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {temple.name}
            </h2>
            <p className="text-white/85 text-xs font-serif italic mt-1 line-clamp-2">
              {temple.tagline}
            </p>
          </div>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 left-4 p-2.5 rounded-full bg-black/45 backdrop-blur-md text-white hover:scale-105 transition-all cursor-pointer"
          >
            <Heart size={16} className={isFavorite ? "fill-rose-500 text-rose-500" : "text-white"} />
          </button>
        </div>

        {/* Right Column: Historical Narrative and Reviews */}
        <div className="md:w-1/2 flex flex-col h-[450px] md:h-[600px] bg-white">
          {/* Modal Header Tab Details */}
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-start shrink-0">
            <div>
              <span className="text-[10px] text-on-surface-variant font-mono font-bold uppercase tracking-wider block">
                Historical Details
              </span>
              <span className="text-xs text-secondary font-mono tracking-tight font-semibold mt-0.5 block">
                {temple.englishName}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-low text-on-surface-variant rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrolling Body Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
            {/* Quick Metadata parameters */}
            <div className="grid grid-cols-2 gap-3 pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2 p-2.5 bg-surface-container-low/50 rounded-xl border border-outline-variant/10">
                <Calendar size={14} className="text-primary" />
                <div>
                  <span className="text-[9px] text-on-surface-variant uppercase font-mono block">Epoch / Erected</span>
                  <span className="text-xs font-semibold text-on-surface font-mono">{temple.yearBuilt || 'Unrecorded'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-surface-container-low/50 rounded-xl border border-outline-variant/10">
                <Clock size={14} className="text-primary" />
                <div>
                  <span className="text-[9px] text-on-surface-variant uppercase font-mono block">Visiting Hours</span>
                  <span className="text-xs font-semibold text-on-surface font-mono">{temple.visitingHours || '08:00 - 17:00'}</span>
                </div>
              </div>
            </div>

            {/* Cultural Narrative */}
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <Sparkles size={11} className="text-primary" />
                Heritage Narrative & Murals
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed font-sans font-normal">
                {temple.description}
              </p>
              
              {temple.thaiDescription && (
                <p className="text-xs text-on-surface-variant/85 leading-relaxed font-sans font-medium mt-3 pb-4 border-b border-outline-variant/20 italic">
                  "{temple.thaiDescription}"
                </p>
              )}
            </div>

            {/* Ethics & Dress Code Notice info box */}
            <div className="p-3.5 bg-primary-container/10 border border-primary-container/20 rounded-2xl">
              <span className="text-[10px] font-bold text-on-primary-container uppercase tracking-wider flex items-center gap-1 font-mono">
                <ShieldCheck size={12} className="text-primary" />
                Visitor Etiquette Reminder
              </span>
              <p className="text-[10px] text-on-surface-variant mt-1 leading-normal">
                Avoid sleeveless tops, mini skirts, and transparent layers. Remove hats and slip-off footwear when stepping inside the principal shrine chambers.
              </p>
            </div>

            {/* Review Section */}
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3 flex items-center justify-between font-mono">
                <span>Pilgrim & Spectator Reviews ({reviews.length})</span>
                <span className="text-amber-500 font-semibold">★ {temple.rating.toFixed(1)}</span>
              </h4>

              {/* Add Custom Review Inline Form */}
              <form onSubmit={handleReviewSubmit} className="bg-surface-container-low/40 p-4 rounded-2xl border border-outline-variant/20 space-y-3 mb-5">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase block font-mono">Share your Pilgrim Experience</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={authorValue}
                    onChange={(e) => setAuthorValue(e.target.value)}
                    placeholder="Your name"
                    className="px-3 py-2 text-xs rounded-xl border border-outline-variant/20 focus:border-primary focus:outline-none bg-white text-on-surface"
                  />

                  <div className="flex items-center gap-1 bg-white border border-outline-variant/20 rounded-xl px-2.5">
                    <span className="text-[10px] text-on-surface-variant font-mono">Rating:</span>
                    <select
                      value={ratingValue}
                      onChange={(e) => setRatingValue(Number(e.target.value))}
                      className="text-xs font-bold text-amber-500 focus:outline-none bg-transparent"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4)</option>
                      <option value={3}>⭐⭐⭐ (3)</option>
                      <option value={2}>⭐⭐ (2)</option>
                      <option value={1}>⭐ (1)</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    placeholder="Write your serene review..."
                    className="w-full pl-3 pr-10 py-2.5 text-xs rounded-xl border border-outline-variant/20 focus:border-primary focus:outline-none bg-white text-on-surface"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-2 top-2 text-primary hover:scale-105 p-1 disabled:opacity-40 cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <p className="text-[11px] text-on-surface-variant italic py-2">No reviews have been written for this sanctuary yet. Be the first!</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="bg-surface-container-low/30 rounded-xl p-3 border.border-outline-variant/15 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-mono text-[9px]">
                            {rev.avatarChar}
                          </span>
                          <span className="font-semibold text-on-surface text-[11px]">{rev.author}</span>
                        </div>
                        <span className="text-amber-400 font-mono text-[10px]">{'★'.repeat(rev.rating)}</span>
                      </div>
                      <p className="text-on-surface-variant text-[11px] pl-7">{rev.comment}</p>
                      <span className="text-[9px] text-on-surface-variant pl-7 mt-0.5 block font-mono">{rev.date}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
