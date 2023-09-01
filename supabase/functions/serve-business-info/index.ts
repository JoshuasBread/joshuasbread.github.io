import {serve} from "https://deno.land/std@0.168.0/http/server.ts"

import {
    bakeryCityState,
    bakeryEmailAddress,
    bakeryMapLink,
    bakeryStreetAddress,
    bakeryWhatsappLink,
    danielFullName,
    joshuaFullName,
    zoeFullName
} from "../_shared/constants.ts";
import {corsHeaders} from "../_shared/cors.ts";

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {headers: corsHeaders})
    }

    return new Response(
        JSON.stringify({
            "bakeryEmailAddress": bakeryEmailAddress,
            "bakeryStreetAddress": bakeryStreetAddress,
            "bakeryCityState": bakeryCityState,
            "bakeryMapLink": bakeryMapLink,
            "bakeryWhatsappLink": bakeryWhatsappLink,
            "joshuaFullName": joshuaFullName,
            "zoeFullName": zoeFullName,
            "danielFullName": danielFullName,
        }),
        {headers: {"Content-Type": "application/json", ...corsHeaders}},
    )
})