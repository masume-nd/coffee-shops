import { useState } from "react";

const useTrackLocation = () => {
   const [locationErrorMsg, setLocationErrorMsg] = useState("");
   const [latLong, setLatLong] = useState("");

   const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLatLong(`${latitude},${longitude}`);
      setLocationErrorMsg("");
      console.log(latLong);
   };

   const error = (err) => {
      console.log(err);
      setLocationErrorMsg("Unable to retreive your location");
   };

   const handleTrackLocation = () => {
      if (!navigator.geolocation) {
         setLocationErrorMsg("Geolocation is not supported by your browser");
      } else {
         //  status.textContent = "Locating...";
         navigator.geolocation.getCurrentPosition(success, error);
      }
   };
   return { latLong, handleTrackLocation, locationErrorMsg };
};
export default useTrackLocation;
