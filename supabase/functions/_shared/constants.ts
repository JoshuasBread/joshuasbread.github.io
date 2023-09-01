export const clientEmail = Deno.env.get('CLIENT_EMAIL');
export const privateKey = Deno.env.get('PRIVATE_KEY').replace(/\\n/g, '\n');
export const breadLedgerSheetId = Deno.env.get('BREAD_LEDGER_SHEET_ID');
export const orderHistorySheetId = Deno.env.get('ORDER_HISTORY_SHEET_ID');
export const bakeryEmailAddress = Deno.env.get('BAKERY_EMAIL_ADDRESS');
export const bakeryStreetAddress = Deno.env.get('BAKERY_STREET_ADDRESS');
export const bakeryCityState = Deno.env.get('BAKERY_CITY_STATE');
export const bakeryMapLink = Deno.env.get('BAKERY_MAP_LINK');
export const bakeryWhatsappLink = Deno.env.get('BAKERY_WHATSAPP_LINK');
export const joshuaFullName = Deno.env.get('JOSHUA_FULL_NAME');
export const zoeFullName = Deno.env.get('ZOE_FULL_NAME');
export const danielFullName = Deno.env.get('DANIEL_FULL_NAME');