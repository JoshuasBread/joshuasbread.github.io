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
 * @param {[string, string, string, string, string, string, string, string][]} rawBreadLedgerDataValues
 * @param {string} itemName
 * @return {{coordinate: string, currentValue: number} | null}
 */
function findQuantityCoordinateAndValueByName(rawBreadLedgerDataValues, itemName) {
    const columnIndex = rawBreadLedgerDataValues[0].findIndex(column => column === "Quantity");
    const rowIndex = rawBreadLedgerDataValues.findIndex(row => row[0] === itemName);

    if (rowIndex !== -1 && columnIndex !== -1) {
        const rowNumber = rowIndex + 1; // Adding 1 to convert zero-based index to 1-based row number
        const columnLetter = String.fromCharCode(65 + columnIndex); // Assuming the columns start from A

        return {
            coordinate: `${columnLetter}${rowNumber.toString()}`,
            currentValue: parseInt(rawBreadLedgerDataValues[rowIndex][columnIndex]),
        };
    }

    return null; // Return null if the name or age column is not found
}