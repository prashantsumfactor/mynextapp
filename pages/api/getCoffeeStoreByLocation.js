import { fetchCoffeeStore } from '../../lib/coffee-stores'

const getCoffeeStoreByLocation = async (req, res) => {
    try {
        const { latLong, limit } = req.query;
        const response = await fetchCoffeeStore(latLong, limit);
        res.status(200);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
}

export default getCoffeeStoreByLocation;