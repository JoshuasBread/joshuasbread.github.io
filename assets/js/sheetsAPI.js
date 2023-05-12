/**
 * @returns {Promise<{
 * image: string,
 * price: string,
 * name: string,
 * count: number,
 * description: string
 * }[]>}
 */
function getSheetsData() {
    const breadData = [{
        "image": "images/pic01.jpg",
        "name": "Focaccia",
        "description": "Garlic-rosemary focaccia with garlic-infused olive oil.",
        "price": "29.99",
        "count": 6
    }, {
        "image": "images/pic02.jpg",
        "name": "Baguette",
        "description": "Vis ac commodo adipiscing arcu aliquet.",
        "price": "19.99",
        "count": 2
    }];

    return Promise.resolve(breadData);
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