import {serve} from "https://deno.land/std@0.168.0/http/server.ts"

import {bakeryEmailAddress, bakeryStreetAdress, bakeryCityState, bakeryWhatsappLink, joshuaFullName, danielFullName, zoeFullName} from "../_shared/constants.ts";
import {corsHeaders} from "../_shared/cors.ts";

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {headers: corsHeaders})
    }

    return new Response(
        JSON.stringify({
          "bakeryEmailAddress": bakeryEmailAddress,
          "bakeryStreetAddress":bakeryStreetAdress,
          "bakeryCityState":bakeryCityState,
          "bakeryWhatsappLink":bakeryWhatsappLink,
          "joshuaFullName": joshuaFullName,
          "zoeFullName": zoeFullName,
          "danielFullName": danielFullName,
        }),
        {headers: {"Content-Type": "application/json", ...corsHeaders}},
    )
})