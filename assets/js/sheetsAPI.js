const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZHJmZmJib3J3d3JjdnZhY2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4MzgyNjIsImV4cCI6MTk5OTQxNDI2Mn0.idwkFmYv-8XcHwkUsW_sHRmJOzDh3-vjiZKOleNdZOU";

/**
 * @return {Promise<{
 *  name: string,
 *  quantity: number,
 *  description: string,
 *  cost: string,
 *  image: string
 * }[]>}
 */
async function getBreadLedgerData() {
    const data = await _fetchRawBreadLedgerData();

    return data.values.map(function (breadValues) {
        const [name, quantity, description, cost, image] = breadValues;
        return {
            name,
            quantity,
            description,
            cost,
            image
        }
    });
}

/**
 * @param {string[]}itemNames
 * @return {{name: string, count: string, price: string}[]}
 */
function itemNamesToDOMIds(itemNames) {
    return itemNames.map(function (itemName) {
        return {
            name: `${itemName}-name`,
            count: `${itemName}-count`,
            price: `${itemName}-price`,
        }
    });
}

/**
 * Expects `values` to return an array with values in the order of
 * Product, Quantity, Description, Cost, Image
 *
 * @returns {Promise<{
 * range: string,
 * majorDimension: string,
 * values: [string, string, string, string][],
 * }[]>}
 */
async function _fetchRawBreadLedgerData() {
    const res = await fetch("https://hadrffbborwwrcvvacex.functions.supabase.co/read-bread-ledger", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`
        },
        // body: JSON.stringify(data), /
    });

    return res.json();
}