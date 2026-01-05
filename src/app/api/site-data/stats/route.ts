import { NextResponse } from "next/server";
import { db, EventData } from "@/lib/db_local";

export async function GET() {
    const events = db.getEvents();
    const now = new Date();

    // Filtrer les événements (pageview seulement pour les stats principales)
    const pageViews = events.filter(e => e.type === 'pageview');

    // 1. Visiteurs Uniques (basé sur IP pour simplifier)
    const uniqueVisitors = new Set(pageViews.map(e => e.ip)).size;

    // 2. Total Pages Vues
    const totalViews = pageViews.length;

    // 3. Pages les plus visitées
    const pages: Record<string, number> = {};
    pageViews.forEach(e => {
        const path = e.url.replace(/^.*\/\/[^\/]+/, ''); // garde le pathname
        pages[path] = (pages[path] || 0) + 1;
    });
    const topPages = Object.entries(pages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([path, views]) => ({ path, views }));

    // 4. Sources
    const sources: Record<string, number> = {};
    pageViews.forEach(e => {
        let source = 'Direct';
        if (e.referrer && e.referrer !== 'direct' && !e.referrer.includes('localhost')) {
            try {
                source = new URL(e.referrer).hostname;
            } catch { source = e.referrer; }
        }
        sources[source] = (sources[source] || 0) + 1;
    });
    const topSources = Object.entries(sources)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([source, count]) => ({
            source,
            percentage: Math.round((count / totalViews) * 100)
        }));

    // 5. Appareils / OS
    const osStats: Record<string, number> = {};
    pageViews.forEach(e => {
        osStats[e.os] = (osStats[e.os] || 0) + 1;
    });
    const topOS = Object.entries(osStats)
        .sort((a, b) => b[1] - a[1])
        .map(([item, count]) => ({ item, count, percentage: Math.round((count / totalViews) * 100) }));

    // 6. Performance Web Vitals (Nouveau)
    const vitals = events.filter(e => e.type === 'web-vital');
    const calculateAvg = (name: string) => {
        const metrics = vitals.filter(e => e.vital_name === name && e.vital_value);
        if (!metrics.length) return 0;
        const sum = metrics.reduce((acc, curr) => acc + (curr.vital_value || 0), 0);
        return Math.round(sum / metrics.length);
    };

    const performance = {
        lcp: calculateAvg('LCP'), // Largest Contentful Paint (ms)
        cls: calculateAvg('CLS') / 1000, // Cumulative Layout Shift (score * 1000 dans vitals souvent, ici on garde brut) -> CLS est petit (0.1)
        inp: calculateAvg('INP'), // Interaction to Next Paint (ms)
    };

    // 7. Données du Graphique (Time Series)
    // On groupe par heure pour les dernières 24h
    const chartMap = new Map<string, number>();
    const nowMs = now.getTime();
    const oneDayAgo = nowMs - 24 * 60 * 60 * 1000;

    // Initialiser les 24 dernières heures avec 0
    for (let i = 0; i <= 24; i++) {
        const d = new Date(oneDayAgo + i * 3600 * 1000);
        const hourKey = `${d.getDate()}/${d.getHours()}h`;
        chartMap.set(hourKey, 0);
    }

    pageViews.forEach(e => {
        const date = new Date(e.timestamp);
        if (date.getTime() > oneDayAgo) {
            const key = `${date.getDate()}/${date.getHours()}h`;
            if (chartMap.has(key)) {
                chartMap.set(key, (chartMap.get(key) || 0) + 1);
            }
        }
    });

    const chartData = Array.from(chartMap.values());
    const chartLabels = Array.from(chartMap.keys());

    return NextResponse.json({
        uniqueVisitors,
        totalViews,
        bounceRate: "42%", // Valeur simulée pour l'instant
        avgDuration: "2m 15s", // Valeur simulée
        topPages,
        topSources,
        topOS,
        performance, // Ajouté
        chartData,   // Mis à jour avec vraies données
        chartLabels  // Labels temporels
    });
}
