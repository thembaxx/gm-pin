import star_icon from "@/assets/icons/star-fill.svg";

interface Props {
  place: google.maps.places.PlaceResult;
}

function cleanStr(str: string) {
  const s = str[0].toUpperCase() + str.slice(1);
  return s.replaceAll("_", " ");
}

function PlaceDetails({ place }: Props) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold truncate">
        {place.name ?? "Unknown"}
      </p>
      <div className="flex items-center mb-2 space-x-2 text-xs">
        <img src={star_icon} alt="" height={16} width={16} />
        <span className="font-mono font-semibold">{place.rating}</span>
        <span className="font-mono text-white/70">{`(${place.user_ratings_total} votes)`}</span>
      </div>
      {place.types && place.types.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 mb-4">
          {place.types.map((place) => (
            <li key={place}>
              <div className="text-[11px] bg-[#1c1c1e] rounded-sm h-7 flex items-center px-2">
                <span className="text-neutral-200">{cleanStr(place)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="font-mono text-xs text-white/70">
        {place.formatted_address}
      </p>
    </div>
  );
}

export default PlaceDetails;
