import { useState } from "react";

const useTrackLocation = () => {

    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [latLong, setLatLong] = useState("");
    const [isFindingLocation, setFindingLocation] = useState(false);



    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg('');
        setFindingLocation(false);
    }

    const error = () => {
        setFindingLocation(false);
        setLocationErrorMsg("Unable to retrieve your location");
    }

    const handleTrackLocation = () => {
        setFindingLocation(true);
        if (!navigator.geolocation) {
            setFindingLocation(false);
            setLocationErrorMsg("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {
        latLong,
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation
    }
}

export default useTrackLocation;