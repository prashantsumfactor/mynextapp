var Airtable = require('airtable');
var base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_TOKEN
}
).base('appdZQkW5nRV9hWPw');

// Get base reference of table/ records
const table = base('coffee-store');

console.log(table);

// Creating a record
table.create([
    {
        "fields": {}
    },
], function (err, records) {
    if (err) {
        console.error(err);
        return;
    }
    records.forEach(function (record) {
        console.log(record.getId());
    });
});

const createCoffeeStore = async (req, res) => {

    if (req.method === "POST") {
        const findCoffeeStoreRecord = await table.select({
            filterByFormula: `id="0"`
        }).firstPage()

        if (findCoffeeStoreRecord.length!==0) {
            res.json(findCoffeeStoreRecord);
        } else {
            res.json({ message: "Not found" });
        }
    }

}

export default createCoffeeStore;