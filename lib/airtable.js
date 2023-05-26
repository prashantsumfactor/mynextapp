var Airtable = require('airtable');
var base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_TOKEN
}
).base('appdZQkW5nRV9hWPw');

// Get base reference of table/ records
const table = base('coffee-store');

const getMinifiedRecord = (record) => {
    return {
        ...record.fields,
    };
};

const getMinifiedRecords = (records) => {
    return records.map(itemRecord => getMinifiedRecord(itemRecord));
};

const findRecordByFilter = async (id) => {
    const findCoffeeStoreRecord = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage()
    return getMinifiedRecords(findCoffeeStoreRecord);
}

export { table, getMinifiedRecords, findRecordByFilter };

