import React, { useState } from 'react';
import { ShieldAlert, Check, X, Award, Eye, FileText, Sparkles, Plus, AlertCircle, RefreshCw } from 'lucide-react';
import { Temple, Activity } from '../types';

interface SuperAdminConsoleProps {
  temples: Temple[];
  onUpdateTemple: (id: string, updates: Partial<Temple>) => void;
  activities: Activity[];
  onAddActivity: (text: string, highlight?: string, type?: 'verification' | 'review' | 'user' | 'media') => void;
}

export const SuperAdminConsole: React.FC<SuperAdminConsoleProps> = ({ 
  temples, 
  onUpdateTemple, 
  activities,
  onAddActivity 
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'audit' | 'management'>('pending');
  const [selectedAuditFilter, setSelectedAuditFilter] = useState<string>('all');
  const [submittingClass, setSubmittingClass] = useState<string | null>(null);
  const [customHeritageClass, setCustomHeritageClass] = useState<string>('Heritage Grade A');

  // Filter pending temples
  const pendingTemples = temples.filter(t => !t.verified);
  const verifiedTemples = temples.filter(t => t.verified);

  const handleApprove = async (temple: Temple) => {
    try {
      const res = await fetch(`/api/temples/${temple.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          verified: true,
          heritageClass: temple.heritageClass || 'Community Heritage Class B'
        })
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdateTemple(temple.id, { verified: true, heritageClass: updated.heritageClass });
        onAddActivity(`Officially verified & archived `, temple.name, 'verification');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = (id: string, name: string) => {
    // Just mock rejection / archiving for safe non-destructive action
    onUpdateTemple(id, { verified: false, heritageClass: 'Rejected / Under Revision' });
    onAddActivity(`Declined submission proposals for `, name, 'verification');
  };

  const handleAssignClass = async (templeId: string, className: string) => {
    try {
      const res = await fetch(`/api/temples/${templeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heritageClass: className })
      });
      if (res.ok) {
        onUpdateTemple(templeId, { heritageClass: className });
        const temple = temples.find(t => t.id === templeId);
        onAddActivity(`Assigned [${className}] designation to `, temple?.name || 'Siam Temple', 'verification');
        setSubmittingClass(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-xl overflow-hidden thai-pattern-bg">
      {/* Console Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-5">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Cultural Officers Board
          </div>
          <h2 className="font-display text-2xl font-bold text-on-surface mt-1">
            Heritage Certification Workspace
          </h2>
          <p className="text-xs text-on-surface-variant">
            Royal Religious Department interactive validation console. Review submissions, award heritage ratings, and monitor live audit rails.
          </p>
        </div>

        {/* Workspace controls */}
        <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant/20 self-start">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'pending'
                ? 'bg-white text-primary shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Pending ({pendingTemples.length})
          </button>
          <button
            onClick={() => setActiveTab('management')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'management'
                ? 'bg-white text-primary shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Active Heritage ({verifiedTemples.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'audit'
                ? 'bg-white text-primary shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Audit Log
          </button>
        </div>
      </div>

      {activeTab === 'pending' && (
        <div className="mt-6 space-y-4">
          {pendingTemples.length === 0 ? (
            <div className="text-center py-10 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/40">
              <Check className="mx-auto text-primary-container bg-primary-container/10 p-3 rounded-full mb-3" size={48} />
              <p className="text-sm font-semibold text-on-surface">All Submissions Cleared</p>
              <p className="text-xs text-on-surface-variant mt-1">No community proposals currently await official review.</p>
            </div>
          ) : (
            pendingTemples.map(temple => (
              <div key={temple.id} className="bg-surface-container-low border border-outline-variant/35 rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-5 transition-shadow hover:shadow-xs">
                <div className="flex gap-4 items-start">
                  <img
                    src={temple.image}
                    alt={temple.name}
                    className="w-20 h-20 object-cover rounded-xl border border-outline-variant/20 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-wide px-1.5 py-0.5 bg-amber-500/10 text-amber-700 rounded-md font-semibold">
                        Awaiting Verification
                      </span>
                      <span className="text-[10px] uppercase font-mono text-on-surface-variant">
                        {temple.type}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-on-surface mt-1 text-base">
                      {temple.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-0.5 font-sans font-medium">
                      📍 {temple.province} • {temple.yearBuilt || 'Modern'}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                      {temple.description}
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col justify-end gap-2 shrink-0 md:border-l md:border-outline-variant/25 md:pl-5">
                  <button
                    onClick={() => handleApprove(temple)}
                    className="flex justify-center items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/95 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Check size={14} />
                    Approve Heritage
                  </button>
                  <button
                    onClick={() => handleDecline(temple.id, temple.name)}
                    className="flex justify-center items-center gap-1.5 text-xs px-4 py-2 bg-white border border-outline-variant/40 text-rose-600 rounded-xl hover:bg-rose-50/40 cursor-pointer"
                  >
                    <X size={14} />
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'management' && (
        <div className="mt-6 space-y-3">
          {verifiedTemples.map(temple => (
            <div key={temple.id} className="flex justify-between items-center bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs" />
                <div>
                  <h4 className="text-xs font-bold text-on-surface">{temple.name}</h4>
                  <p className="text-[10px] text-on-surface-variant flex items-center gap-2 mt-0.5">
                    <span>{temple.province}</span>
                    <span>•</span>
                    <span className="text-primary font-mono tracking-wider font-semibold">
                      {temple.heritageClass || 'Community Grade A'}
                    </span>
                  </p>
                </div>
              </div>

              {submittingClass === temple.id ? (
                <div id={`submitting-class-box-${temple.id}`} className="flex items-center gap-2 p-1 bg-white rounded-lg border border-outline/30 animate-fade-in">
                  <input
                    type="text"
                    value={customHeritageClass}
                    onChange={(e) => setCustomHeritageClass(e.target.value)}
                    className="text-[10px] font-semibold px-2 py-1 max-w-[140px] text-on-surface focus:outline-none"
                    placeholder="e.g. Royal Grade A"
                  />
                  <button
                    onClick={() => handleAssignClass(temple.id, customHeritageClass)}
                    className="p-1 px-2.5 bg-primary text-white text-[10px] font-bold rounded-md hover:bg-primary/90"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setSubmittingClass(null)}
                    className="p-1 text-on-surface-variant hover:text-on-surface"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSubmittingClass(temple.id);
                    setCustomHeritageClass(temple.heritageClass || 'Heritage Grade A');
                  }}
                  className="flex items-center gap-1.5 text-[10px] font-semibold text-primary bg-primary-container/20 hover:bg-primary-container/30 border border-primary/20 px-3 py-1 rounded-lg"
                >
                  <Award size={12} />
                  Bestow Royal Title
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center text-xs text-on-surface-variant pb-2 border-b border-outline-variant/20 font-mono">
            <span>OFFICER EVENT RAILS</span>
            <span className="text-emerald-600">Active Monitoring Mode</span>
          </div>
          <div className="max-h-[300px] overflow-y-auto space-y-2.5 font-mono text-[11px] pr-2">
            {activities.map((act) => (
              <div key={act.id} className="flex justify-between items-start score-event bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/15">
                <div className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1 ${
                    act.type === 'verification' ? 'bg-amber-500' :
                    act.type === 'review' ? 'bg-emerald-500' : 
                    act.type === 'media' ? 'bg-sky-500' : 'bg-on-surface-variant'
                  }`} />
                  <span className="text-on-surface">
                    {act.text}
                    {act.highlightText && (
                      <strong className="text-primary font-semibold font-display">
                        {act.highlightText}
                      </strong>
                    )}
                  </span>
                </div>
                <span className="text-on-surface-variant shrink-0 pl-4">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
