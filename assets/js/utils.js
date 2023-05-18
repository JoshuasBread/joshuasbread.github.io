
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
 * @return {string}
 */
function generatePickupTimes() {
}