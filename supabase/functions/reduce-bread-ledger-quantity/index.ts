import {serve} from "https://deno.land/std@0.168.0/http/server.ts"

import {GoogleAPI} from "https://deno.land/x/google_deno_integration/mod.ts";

const clientEmail = Deno.env.get('CLIENT_EMAIL');
const privateKey = Deno.env.get('PRIVATE_KEY').replace(/\\n/g, '\n');
const sheetId = Deno.env.get('BREAD_LEDGER_SHEET_ID');

serve(async (req) => {
    // const {name} = await req.json()
    // const data = {
    //     message: `Hello ${name}!`,
    // }

    const api = new GoogleAPI({
        email: clientEmail,
        scope: ["https://www.googleapis.com/auth/spreadsheets"],
        key: privateKey,
    });

    await api.put(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/B2?valueInputOption=USER_ENTERED`, {
        "range": "B2",
        "values": [[6]],
    });


    return new Response(
        JSON.stringify({}),
        {headers: {"Content-Type": "application/json"}},
    )
})