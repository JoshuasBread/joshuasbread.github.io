import {serve} from "https://deno.land/std@0.168.0/http/server.ts"

import {GoogleAPI} from "https://deno.land/x/google_deno_integration/mod.ts";
import {breadLedgerSheetId, clientEmail, privateKey} from "../_shared/constants.ts";
import {corsHeaders} from "../_shared/cors.ts";

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {headers: corsHeaders})
    }

    const api = new GoogleAPI({
        email: clientEmail,
        scope: ["https://www.googleapis.com/auth/spreadsheets"],
        key: privateKey,
    });

    const coordinateToQuantity: Record<string, string> = await req.json()
    for (const [coordinate, quantity] of Object.entries(coordinateToQuantity)) {
        if (parseInt(quantity) < 0) {
            continue;
        }

        await api.put(`https://sheets.googleapis.com/v4/spreadsheets/${breadLedgerSheetId}/values/${coordinate}?valueInputOption=USER_ENTERED`, {
            "range": coordinate,
            "values": [[quantity]],
        });
    }

    return new Response(
        JSON.stringify({message: "ok"}),
        {headers: {"Content-Type": "application/json", ...corsHeaders}},
    )
})