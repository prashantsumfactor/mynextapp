import { table, findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
    // Check if request method is PUT
    if (req.method === "PUT") {
        // Define request body param
        const { pageId } = req.body;
        console.log(req.body)
        try {
            // Get record from table and filter by ID
            if (pageId) {
                const getRecords = await findRecordByFilter(pageId);
                if (getRecords.length !== 0) {
                    const record = getRecords[0];
                    const getVoting = parseInt(record.voting) + parseInt(1);
                    // Update table record
                    const update = await table.update([{
                            id: record.recordId,
                            fields: {
                                voting: getVoting,
                            }
                        }]);
                    if (update) {
                        const minifyRecord = getMinifiedRecords(update);
                        res.status(200);
                        res.json(minifyRecord);
                    } else {
                        res.status(500);
                        res.json({ message: "update failed" });
                    }
                }
                else {
                    res.json({ message: "Coffee Store does not exist" });
                }
            } else {
                res.status(400);
                res.json({ message: "ID is missing", id: `id=${pageId}` });
            }
        } catch (err) {
            res.status(500);
            res.json({ message: "Error updating a store", err });
            console.error("Error updating a store", err);
        }
    } else {
        res.json({ message: "Accept only PUT method" });
    }
}

export default favouriteCoffeeStoreById;