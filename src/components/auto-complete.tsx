import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import maps_icon from "@/assets/icons/google_maps_icon.svg";
import warning_icon from "@/assets/icons/warning-octagon-fill.svg";
import map_pin_icon from "@/assets/icons/map-pin-fill.svg";
import Loader from "@/components/ui/loader";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

function AutoComplete({ onPlaceSelect }: Props) {
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [predictionsOpen, setPredictionsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSearch = useDebouncedCallback((query: string) => {
    setLoading(false);
    if (!placesLib || !map || !query || query === "") {
      setPredictionsOpen(false);
      setResults([]);

      return;
    }

    setLoading(true);

    const svc = new placesLib.PlacesService(map);

    svc.textSearch({ query, language: "en-US" }, (results, status) => {
      setLoading(false);
      if (status === placesLib.PlacesServiceStatus.OK && results) {
        setResults(results);
        setPredictionsOpen(results.length > 0);
      } else {
        setPredictionsOpen(false);
        setResults([]);
      }
    });
  }, 300);

  const handleClick = (result: google.maps.places.PlaceResult) => {
    setPredictionsOpen(false);
    onPlaceSelect(result);
  };

  useEffect(() => {
    if (focused && results.length > 0 && !predictionsOpen) {
      setPredictionsOpen(true);
    }
  }, [focused, predictionsOpen, results.length]);

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  return (
    <div className="relative">
      <div className="relative z-20 flex items-center w-full">
        <label htmlFor="search">
          <img
            src={maps_icon}
            alt="Google Maps Icon"
            className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
          />
        </label>
        <Input
          id="search"
          className="h-14 text-base rounded-2xl bg-[#191919] pl-10 pr-14"
          placeholder="Search for a place"
          value={query}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && (
          <div className="absolute rounded-lg right-4">
            <Loader variant="dark" size="lg" />
          </div>
        )}
      </div>
      <div className="flex items-center mt-4 ml-2">
        <img src={warning_icon} alt="Warning" className="w-4 h-4 mr-2" />
        <span className="text-xs text-white/60">
          Disable <span className="underline">Ad Blockers</span> for a seamless
          experience
        </span>
      </div>
      {predictionsOpen && (
        <div
          className="bg-[#0a0a0a]/60 backdrop-blur-sm fixed w-full h-full left-0 top-0 z-10"
          onClick={() => setPredictionsOpen(false)}
        />
      )}
      {predictionsOpen && (
        <ul className="bg-[#191919] rounded-2xl max-h-[500px] overflow-auto shadow-lg absolute w-full top-16 z-20 border overflow-y-auto">
          {results.map((result) => (
            <li key={result.place_id}>
              <div
                key={result.place_id}
                className="px-2 py-3 flex items-center cursor-pointer hover:bg-[#333333] transition-colors"
                onClick={() => handleClick(result)}
              >
                <img src={map_pin_icon} alt="pin" className="w-4 h-4 mr-2" />
                <p className="flex-grow text-xs text-white truncate">
                  {result.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
