const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZHJmZmJib3J3d3JjdnZhY2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4MzgyNjIsImV4cCI6MTk5OTQxNDI2Mn0.idwkFmYv-8XcHwkUsW_sHRmJOzDh3-vjiZKOleNdZOU";

/**
 * @param {[string, string, string, string, string, string, string, string][]} rawBreadLedgerDataValues
 * @param {{customerName: string, email: string, paymentMethod: string, tempddPost: string}} customerData
 * @param {Record<string, string>} itemData
 * @param {string} total
 * @return {Promise<void>}
 */
async function writeBreadLedgerData(rawBreadLedgerDataValues, customerData, itemData, total) {
    const nowPST = new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles"
    });

    /** @type {Record<string, string>}*/
    let coordinateToQuantity = {};
    let productOrder = [];

    // Reduce quantity
    for (const [productName, quantityPurchased] of Object.entries(itemData)) {
        productOrder.push(`${quantityPurchased}x ${productName}`);
        const coordinate = findQuantityCoordinateAndValueByName(rawBreadLedgerDataValues, productName);

        const newValue = coordinate.currentValue - parseInt(quantityPurchased)

        coordinateToQuantity[coordinate.coordinate] = newValue.toString();
    }
    const reduceQuantityPromise = _reduceBreadLedgerQuantity(coordinateToQuantity);


    const productOrderString = productOrder.join(',');

    // Add order to history
    const {customerName, email, paymentMethod, tempddPost} = customerData;
    const addToOrderHistoryPromise = _addToOrderHistory({
        time: nowPST,
        name: customerName,
        email: email,
        payment: paymentMethod,
        order: productOrderString,
        total: total,
        tempdd: tempddPost
    });

    // Execute
    await Promise.all([reduceQuantityPromise, addToOrderHistoryPromise])
}

/**
 * @param {{
 * range: string,
 * majorDimension: string,
 * values: [string, string, string, string, string, string, string, string][],
 * }} rawBreadLedgerData
 *
 * @return {{
 *  name: string,
 *  size: string,
 *  quantity: number,
 *  description: string,
 *  cost: string,
 *  pickup: string,
 *  image: string
 * }[]}
 */
function rawDataToTableData(rawBreadLedgerData) {
    const breadValues = rawBreadLedgerData.values;

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
            pickup,
            image
        ] = value;

        if (quantity === "" || quantity === "0") {
            continue;
        }

        data.push({
            name,
            size,
            quantity: parseInt(quantity),
            description,
            cost: parseFloat(cost),
            pickup, //As a string, not a date object
            image: `images/${image}`
        });
    }

    return data;
}

/**
 * Expects `values` to return an array with values in the order of
 * Product, Size, Placeholder1, Quantity, Description, Cost, Pickup, Image
 *
 * @returns {Promise<{
 * range: string,
 * majorDimension: string,
 * values: [string, string, string, string, string, string, string, string][],
 * }>}
 */
async function fetchRawBreadLedgerData() {
    const res = await fetch("https://hadrffbborwwrcvvacex.functions.supabase.co/read-bread-ledger", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`
        },
    });

    return res.json();
}

/**
 * @param {{time: string,
 * name: string,
 * email: string,
 * payment: string,
 * order: string,
 * total: string,
 * tempdd: string}} data
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
    console.log(data);
}

/**
 *
 * @param {Record<string, string>} data
 * @return {Promise<void>}
 * @private
 */
async function _reduceBreadLedgerQuantity(data) {
    await fetch("https://hadrffbborwwrcvvacex.functions.supabase.co/reduce-bread-ledger-quantity", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`
        },
        body: JSON.stringify(data),
    });
}

