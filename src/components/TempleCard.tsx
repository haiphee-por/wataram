import React from 'react';
import { Sparkles, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';
import { Temple } from '../types';

interface TempleCardProps {
  id?: string;
  temple: Temple;
  onSelect: (temple: Temple) => void;
  isSelected?: boolean;
}

export const TempleCard: React.FC<TempleCardProps> = ({ id, temple, onSelect, isSelected }) => {
  return (
    <div
      id={id || `temple-card-${temple.id}`}
      onClick={() => onSelect(temple)}
      className={`group cursor-pointer bg-white rounded-2xl overflow-hidden border transition-all duration-300 transform ${
        isSelected 
          ? 'border-primary shadow-lg ring-1 ring-primary/20 scale-[1.01]' 
          : 'border-outline-variant/30 hover:border-primary-container hover:shadow-md hover:scale-[1.005]'
      }`}
    >
      {/* Container for hotlinked image */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-container-low">
        <img
          src={temple.image}
          alt={temple.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Verification Tag */}
        <div className="absolute top-3 left-3 flex gap-2">
          {temple.verified ? (
            <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 bg-primary-container text-on-primary-container rounded-full shadow-sm shadow-black/10">
              <CheckCircle size={10} className="fill-current" />
              Verified Heritage
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded-full shadow-sm shadow-black/10">
              <Clock size={10} />
              Awaiting Approval
            </span>
          )}
          
          <span className="text-[11px] font-medium px-2 py-1 bg-white/90 backdrop-blur-sm text-on-surface-variant rounded-full">
            {temple.type}
          </span>
        </div>
        
        {/* Architectural style indicator */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <span className="text-[10px] tracking-wide text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-mono uppercase">
            {temple.architecturalStyle || 'Classical'}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-secondary font-medium font-mono uppercase mb-1">
          <MapPin size={11} />
          <span>{temple.province}</span>
          {temple.district && (
            <>
              <span className="opacity-40">•</span>
              <span>{temple.district}</span>
            </>
          )}
        </div>
        
        <h3 className="font-display font-semibold text-lg text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
          {temple.name}
        </h3>
        
        <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 min-h-[2rem]">
          {temple.tagline}
        </p>
        
        <div className="mt-4 pt-3 border-t border-outline-variant/30 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold">
              {temple.rating.toFixed(1)}
            </span>
            <div className="flex text-amber-400">
              {'★'.repeat(Math.round(temple.rating))}
              {'☆'.repeat(5 - Math.round(temple.rating))}
            </div>
            <span className="text-on-surface-variant font-mono">
              ({temple.reviewsCount})
            </span>
          </div>
          
          <div className="text-on-surface-variant flex items-center gap-1">
            <Calendar size={11} />
            <span className="font-mono text-[11px]">{temple.yearBuilt.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
