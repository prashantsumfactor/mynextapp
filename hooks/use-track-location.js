import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

const useTrackLocation = () => {

    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [isFindingLocation, setFindingLocation] = useState(false);
    const { state, dispatch } = useContext(StoreContext);

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        var latLong = `${latitude},${longitude}`;
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: {
                latLong: latLong
            },
        });
        setLocationErrorMsg('');
        setFindingLocation(false);
    };

    const error = () => {
        setFindingLocation(false);
        setLocationErrorMsg("Unable to retrieve your location");
    };

    const handleTrackLocation = () => {
        setFindingLocation(true);
        if (!navigator.geolocation) {
            setFindingLocation(false);
            setLocationErrorMsg("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return {
        //latLong, // no need now
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation
    };
};

export default useTrackLocation;