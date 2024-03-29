import {GoogleAPI} from "https://deno.land/x/google_deno_integration/mod.ts";

import {serve} from "https://deno.land/std@0.168.0/http/server.ts"
import {clientEmail, orderHistorySheetId, privateKey} from "../_shared/constants.ts";
import {corsHeaders} from "../_shared/cors.ts";

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {headers: corsHeaders})
    }

    const {time, name, email, payment, order, total, tempdd} = await req.json()

    const api = new GoogleAPI({
        email: clientEmail,
        scope: ["https://www.googleapis.com/auth/spreadsheets"],
        key: privateKey,
    });


    // Google sheet has the layout
    // [Time, Name, Email, Payment, Order, Total, tempdd]
    await api.post(`https://sheets.googleapis.com/v4/spreadsheets/${orderHistorySheetId}/values/Orders:append?valueInputOption=USER_ENTERED?insertDataOption=INSERT_ROWS`, {
        "range": "Orders",
        "values": [[time, name, email, payment, order, total, tempdd]],
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