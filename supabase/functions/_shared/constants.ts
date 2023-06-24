export const clientEmail = Deno.env.get('CLIENT_EMAIL');
export const privateKey = Deno.env.get('PRIVATE_KEY').replace(/\\n/g, '\n');
export const breadLedgerSheetId = Deno.env.get('BREAD_LEDGER_SHEET_ID');
export const orderHistorySheetId = Deno.env.get('ORDER_HISTORY_SHEET_ID');
export const bakeryEmailAddress = Deno.env.get('BAKERY_EMAIL_ADDRESS');
export const joshuaFullName = Deno.env.get('JOSHUA_FULL_NAME');