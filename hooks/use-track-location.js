import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";


const useTrackLocation = () => {
  
   const [locationErrorMsg, setLocationErrorMsg] = useState("");
   const {dispatch} = useContext(StoreContext);
   // const [latLong, setLatLong] = useState("");
   
   
   
   const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // setLatLong(`${latitude},${longitude}`);
      dispatch({
         type: ACTION_TYPES.SET_LAT_LONG,
         payload: { latLong: `${latitude},${longitude}` },
      });
      setLocationErrorMsg("");
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
   return { handleTrackLocation, locationErrorMsg };
};
export default useTrackLocation;
