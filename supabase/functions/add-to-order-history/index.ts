import {GoogleAPI} from "https://deno.land/x/google_deno_integration/mod.ts";

import {serve} from "https://deno.land/std@0.168.0/http/server.ts"
import {breadLedgerSheetId, clientEmail, privateKey} from "../_shared/constants.ts";
import {corsHeaders} from "../_shared/cors.ts";

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {headers: corsHeaders})
    }

    const {time, name, email, payment, order, total, pickup} = await req.json()

    const api = new GoogleAPI({
        email: clientEmail,
        scope: ["https://www.googleapis.com/auth/spreadsheets"],
        key: privateKey,
    });


    // Google sheet has the layout
    // [Time, Name, Email, Payment, Order, Total, Pickup]
    await api.post(`https://sheets.googleapis.com/v4/spreadsheets/${breadLedgerSheetId}/values/History:append?valueInputOption=USER_ENTERED`, {
        "range": "History",
        "values": [[time, name, email, payment, order, total, pickup]],
    });

    return new Response(
        JSON.stringify({message: "ok"}),
        {
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
            }
        },
    )
})