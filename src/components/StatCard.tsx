import React from 'react';

interface StatCardProps {
  id?: string;
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ id, icon, label, value, change, isPositive }) => {
  return (
    <div id={id} className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/30 shadow-sm flex items-center gap-4 transition-all hover:scale-[1.01] hover:shadow-md">
      <div className="p-3 bg-primary-container/10 text-primary rounded-xl">
        {icon}
      </div>
      <div>
        <span className="text-xs text-on-surface-variant font-medium tracking-wide block uppercase">
          {label}
        </span>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-2xl font-semibold text-on-surface font-display tracking-tight">
            {value}
          </span>
          {change && (
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
              isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
            }`}>
              {change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
