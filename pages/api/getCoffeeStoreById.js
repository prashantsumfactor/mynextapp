import { table, getMinifiedRecords, findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query;
    if (id) {
        try {
            const getRecord = await findRecordByFilter(id);
            if (getRecord.length !== 0) {   
                res.status(200);
                res.json(getRecord);
            } else {
                res.status(500);
                res.json({ message: "ID could not be found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500);
            res.json({ message: "Spmething went wrong : ", err })
        }
    } else {
        res.status(400);
        res.json({ message: "ID is missing" });
    }
}

export default getCoffeeStoreById;