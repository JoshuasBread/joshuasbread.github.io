import {serve} from "https://deno.land/std@0.168.0/http/server.ts"

import {GoogleAPI} from "https://deno.land/x/google_deno_integration/mod.ts";

const clientEmail = Deno.env.get('CLIENT_EMAIL');
const privateKey = Deno.env.get('PRIVATE_KEY').replace(/\\n/g, '\n');
const sheetId = Deno.env.get('BREAD_LEDGER_SHEET_ID');

serve(async () => {
    const api = new GoogleAPI({
        email: clientEmail,
        scope: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        key: privateKey,
    });

    const read = await api.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:E`)

    return new Response(
        JSON.stringify(read),
        {headers: {"Content-Type": "application/json"}},
    )
})