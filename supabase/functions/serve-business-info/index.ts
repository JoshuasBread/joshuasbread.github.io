import {serve} from "https://deno.land/std@0.168.0/http/server.ts"

import {bakeryEmailAddress, joshuaFullName} from "../_shared/constants.ts";
import {corsHeaders} from "../_shared/cors.ts";

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {headers: corsHeaders})
    }

    return new Response(
        JSON.stringify({
          "bakeryEmailAddress": bakeryEmailAddress,
          "joshuaFullName": joshuaFullName,
        }),
        {headers: {"Content-Type": "application/json", ...corsHeaders}},
    )
})