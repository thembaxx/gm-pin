import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

const useMapHandler = (place: google.maps.places.PlaceResult | null) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
  }, [map, place]);
};

export default useMapHandler;
