import { table, getMinifiedRecords, findRecordByFilter } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
    // Check if request method is POST
    if (req.method === "POST") {
        // Define request body param
        const { id, name, address, neighbourhood, voting, imgUrl } = req.body;
        try {
            // Get record from table and filter by ID
            if (id) {
                const getRecord = await findRecordByFilter(id);
                if (getRecord.length !== 0) {
                    res.status(200);
                    res.json(getRecord);
                }  // Created new record in table 
                else {
                    // Check body's param is valid or not
                    if (name) {
                        const createRecord = await table.create([{
                            fields: {
                                id, name, address, neighbourhood, voting, imgUrl
                            }
                        }])
                        const newRecord = res.json(getMinifiedRecords(createRecord));
                        res.status(200);
                        res.json({ message: "Create new record", newRecord });
                    } else {
                        res.status(400);
                        res.json({ message: "Name is missing" });
                    }
                }
            } else {
                res.status(400);
                res.json({ message: "ID is missing", id: `id=${id}` });
            }
        } catch (err) {
            res.status(500);
            res.json({ message: "Error creating or finding a store", err });
            console.error("Error creating or finding a store", err);
        }
    } else {
        res.json({ message: "GET method" });
    }
}



export default createCoffeeStore;

// s-239, 243, 255
// an-247, 247,, done
// r-245, 249, 259
// a-247, 252, 
// v-244, 247