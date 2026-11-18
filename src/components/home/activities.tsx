'use client';

import { ArrowUpRight, Megaphone } from 'lucide-react';
import type { Activity } from '@/lib/services';

export default function Activities({ items = [] }: { items?: Activity[] }) {
  if (items.length === 0) return null;

  return (
    <section id="activites" className="bg-white border-t border-gray-100 py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grotesk">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 flex items-center gap-2">
              <Megaphone className="w-4 h-4" /> Nos activités
            </p>
            <h2 className="text-4xl md:text-6xl font-medium text-black tracking-tight serif italic leading-[0.95]">
              Ce que nous faisons<br /><span className="not-italic font-bold">en ce moment.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {items.slice(0, 6).map((a) => {
            const card = (
              <div className="group h-full bg-[#f9f9f9] rounded-3xl border border-gray-100 overflow-hidden hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col">
                {a.image_url && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  {a.published_at && (
                    <p className="text-[10px] font-bold tracking-[0.25em] text-gray-400 uppercase mb-2">
                      {new Date(a.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  <h3 className="text-lg md:text-xl font-bold text-black leading-snug">{a.title}</h3>
                  {a.excerpt && (
                    <p className="text-sm text-gray-500 leading-relaxed mt-2 line-clamp-3">{a.excerpt}</p>
                  )}
                  {a.link && (
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-bold text-black">
                      En savoir plus
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  )}
                </div>
              </div>
            );
            return a.link ? (
              <a key={a.id} href={a.link} target="_blank" rel="noreferrer" className="block h-full">
                {card}
              </a>
            ) : (
              <div key={a.id} className="h-full">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
