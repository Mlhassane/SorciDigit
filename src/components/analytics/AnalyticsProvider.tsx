"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { UAParser } from "ua-parser-js";
import { useReportWebVitals } from "next/web-vitals";

// Types pour nos événements
export type AnalyticsPayload = {
    type: "pageview" | "web-vital" | "custom";
    url: string;
    referrer: string;
    timestamp: string;
    os: string;
    browser: string;
    device: string;
    screen_size: string;
    country?: string; // Sera déterminé côté serveur via IP
    vital_name?: string;
    vital_value?: number;
};

export function AnalyticsProvider() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Fonction générique pour envoyer les données
    const sendEvent = useCallback(async (data: Partial<AnalyticsPayload>) => {
        try {
            // @ts-ignore - UAParser type definition mismatch workaround
            const parser = new UAParser();
            const result = parser.getResult();

            const payload: AnalyticsPayload = {
                type: data.type || "pageview",
                url: window.location.href,
                referrer: document.referrer || "direct",
                timestamp: new Date().toISOString(),
                os: result.os.name || "Unknown",
                browser: result.browser.name || "Unknown",
                device: result.device.type || "desktop", // ua-parser renvoie undefined pour desktop souvent
                screen_size: `${window.innerWidth}x${window.innerHeight}`,
                ...data,
            };

            // Envoi asynchrone sans bloquer l'UI (fire and forget)
            // Utilisation de navigator.sendBeacon si disponible pour fiabilité lors de la fermeture de page
            const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
            if (navigator.sendBeacon) {
                navigator.sendBeacon("/api/site-data/track", blob);
            } else {
                await fetch("/api/site-data/track", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    keepalive: true,
                });
            }
        } catch (err) {
            console.error("Failed to send analytics event", err);
        }
    }, []);

    // Tracking des Pageviews
    useEffect(() => {
        // Petit délai pour s'assurer que le titre et autres sont à jour si besoin
        const timeout = setTimeout(() => {
            sendEvent({ type: "pageview" });
        }, 500);
        return () => clearTimeout(timeout);
    }, [pathname, searchParams, sendEvent]);

    // Tracking des Web Vitals (Performance)
    useReportWebVitals((metric) => {
        // On ne track que les vitaux essentiels pour ne pas spammer
        if (["FCP", "LCP", "CLS", "INP"].includes(metric.name)) {
            // Optionnel: on peut réduire l'échantillonnage ici
            sendEvent({
                type: "web-vital",
                vital_name: metric.name,
                vital_value: metric.value
            });
        }
    });

    return null; // Ce composant ne rend rien visuellement
}
