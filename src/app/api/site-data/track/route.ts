import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db_local";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

        // Enregistrement dans notre "base de données" locale
        db.addEvent({
            ...body,
            ip,
            country: "NE" // Simulation: on mettra une vraie détection IP plus tard
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
