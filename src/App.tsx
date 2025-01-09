import { useState } from "react";
import {
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  Pin,
} from "@vis.gl/react-google-maps";

import { Button } from "./components/ui/button";
import AutoComplete from "@/components/auto-complete";
import config from "@/data/app.config.json";
import useMapHandler from "./hooks/useMapHandler";
import PlaceDetails from "./components/place-details";
import githubLogo from "@/assets/icons/github-01-stroke-rounded.svg";
import clean_icon from "@/assets/icons/clean-stroke-rounded.svg";

function App() {
  const map = useMap();
  const places = useMapsLibrary("places");
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  useMapHandler(selectedPlace);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

  const currentLat = selectedPlace?.geometry?.location?.lat();
  const currentLng = selectedPlace?.geometry?.location?.lng();

  return (
    <div className="flex items-center justify-center h-full px-8 overflow-y-auto dark">
      <div className="max-w-[500px] min-w-[320px] w-full md:w-[600px] flex flex-col h-full py-8">
        <header>
          <AutoComplete
            onPlaceSelect={(place) => {
              setSelectedPlace(place);
              const lat = place?.geometry?.location?.lat();
              const lng = place?.geometry?.location?.lng();

              if (lat && lng) {
                setMarkers([...markers, { lat, lng }]);
              }
            }}
          />
        </header>
        <main className="flex-1 flex-grow py-8">
          <div className="w-full overflow-hidden h-80 aspect-video rounded-xl">
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={{ lat: 22.54992, lng: 0 }}
              defaultZoom={3}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
              mapId="xsdfsdkfuwiwrebfd"
              onClick={async (e) => {
                if (!e.detail.latLng) return;
                console.log(e);
                if (e.detail.placeId) {
                  if (!places || !map) return;

                  const svc = new places.PlacesService(map);

                  svc.getDetails(
                    { placeId: e.detail.placeId },
                    (result, status) => {
                      if (
                        status === google.maps.places.PlacesServiceStatus.OK &&
                        result
                      ) {
                        setSelectedPlace(result);
                        console.log(result);
                      }
                    }
                  );

                  const lat = e.detail.latLng.lat;
                  const lng = e.detail.latLng.lng;

                  if (
                    markers.findIndex((m) => m.lat === lat && m.lng === lng) ===
                    -1
                  ) {
                    setMarkers([...markers, { lat, lng }]);
                  }
                }
              }}
            >
              {markers.map((marker, i) => (
                <AdvancedMarker key={i} position={marker} className="relative">
                  <Pin
                    background={
                      marker.lat === currentLat && marker.lng === currentLng
                        ? "#FF2D55"
                        : null
                    }
                    borderColor={
                      marker.lat === currentLat && marker.lng === currentLng
                        ? "#FF2D55"
                        : null
                    }
                  />
                </AdvancedMarker>
              ))}
            </Map>
          </div>
          {markers && markers.length > 0 && (
            <div className="mt-4">
              <Button
                variant="link"
                size="sm"
                title="Clear all Pins"
                className="hover:no-underline bg-[#FF453A]/10 rounded-full"
                onClick={() => setMarkers([])}
              >
                <img
                  height={16}
                  width={16}
                  src={clean_icon}
                  alt="Clear all Pins"
                />
                <span className="text-white/80">
                  {"Clear all your Pins | Markers"}
                </span>
              </Button>
            </div>
          )}

          {selectedPlace && (
            <div className="mt-8">
              <PlaceDetails place={selectedPlace} />
            </div>
          )}
        </main>
        <footer className="space-x-3 flex items-center text-[13px]">
          <a
            href={config.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <div className="flex items-center">
              <img
                src={githubLogo}
                alt="Github Logo"
                height={20}
                width={20}
                className="mr-2"
              />
              <span>Open Github Repository</span>
            </div>
          </a>
          <span className="text-border">|</span>
          <span className="text-[#b3b3b3] font-mono text-xs">{`v${
            config.version
          } © ${new Date().getFullYear()}`}</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
