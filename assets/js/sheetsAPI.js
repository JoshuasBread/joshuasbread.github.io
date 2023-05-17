const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZHJmZmJib3J3d3JjdnZhY2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4MzgyNjIsImV4cCI6MTk5OTQxNDI2Mn0.idwkFmYv-8XcHwkUsW_sHRmJOzDh3-vjiZKOleNdZOU";

/**
 *
 * @param {{customerName: string, email: string, paymentMethod: string, pickupTime: string}} customerData
 * @param {Record<string, string>} itemData
 * @param {string} total
 * @return {Promise<void>}
 */
async function writeBreadLedgerData(customerData, itemData, total) {
    const nowPST = new Date().getUTCDate().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles"
    });

    let productOrder = [];

    // Reduce quantity
    let reduceQuantityPromises = [];
    for (const [productName, quantityPurchased] of Object.entries(itemData)) {
        productOrder.push(`${quantityPurchased}x ${productName}`);
    }

    const productOrderString = productOrder.join(',');

    // Add order to history
    const {customerName, email, paymentMethod, pickupTime} = customerData;
    const addToOrderHistoryPromise = _addToOrderHistory({
        time: nowPST,
        name: customerName,
        email: email,
        payment: paymentMethod,
        order: productOrderString,
        total: total,
        pickup: pickupTime
    });


    // Execute
    await Promise.all([addToOrderHistoryPromise, ...reduceQuantityPromises])
}

/**
 * @return {Promise<{
 *  name: string,
 *  size: string,
 *  quantity: number,
 *  description: string,
 *  cost: string,
 *  image: string
 * }[]>}
 */
async function getBreadLedgerData() {
    const rawData = await _fetchRawBreadLedgerData();
    const breadValues = rawData.values;

    // We skip 0 because 0 is Headers.
    const data = [];
    for (let i = 1; i < breadValues.length; i++) {
        const value = breadValues[i];

        const [
            name,
            size,
            placeholder1,
            quantity,
            description,
            cost,
            placeholder2,
            image,
        ] = value;

        data.push({
            name,
            size,
            quantity: parseInt(quantity),
            description,
            cost: cost.split("$")[1],
            image: `images/${image}`,
        });
    }

    return data;
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
 * @param {{time: string,
 * name: string,
 * email: string,
 * payment: string,
 * order: string,
 * total: string,
 * pickup: string}} data
 * @return {Promise<void>}
 * @private
 */
async function _addToOrderHistory(data) {
    await fetch("https://hadrffbborwwrcvvacex.functions.supabase.co/add-to-order-history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`
        },
        body: JSON.stringify(data),
    });
}

/**
 * Expects `values` to return an array with values in the order of
 * Product, Size, Placeholder1, Quantity, Description, Cost, Placeholder2, Image
 *
 * @returns {Promise<{
 * range: string,
 * majorDimension: string,
 * values: [string, string, string, string, string, string, string, string][],
 * }>}
 */
async function _fetchRawBreadLedgerData() {
    const res = await fetch("https://hadrffbborwwrcvvacex.functions.supabase.co/read-bread-ledger", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`
        },
    });

    return res.json();
}