import star_icon from "@/assets/icons/star-fill.svg";
import clsx from "clsx";
import { ArrowUpRightFromSquareIcon, Clock5Icon, Phone } from "lucide-react";
import Reviews from "./reviews";
import Photos from "./photos";

interface Props {
  place: google.maps.places.PlaceResult;
}

function cleanStr(str: string) {
  const s = str[0].toUpperCase() + str.slice(1);
  return s.replaceAll("_", " ");
}

function PlaceDetails({ place }: Props) {
  let openStatusText: string | null = null;
  if (place.opening_hours && place.opening_hours.periods) {
    const currentDay = new Date().getDay();
    const match = place.opening_hours.periods.find(
      (p) => p.open.day === currentDay
    );
    if (match) {
      openStatusText = `Opens ${
        match.open.hours.toString().length === 1
          ? "0" + match.open.hours
          : match.open.hours
      }:${
        match.open.minutes.toString().length === 1
          ? "0" + match.open.minutes
          : match.open.minutes
      }   •   Closes ${
        match.close?.hours.toString().length === 1
          ? "0" + match.close?.hours
          : match.close?.hours
      }:${
        match.close?.minutes.toString().length === 1
          ? "0" + match.close?.minutes
          : match.close?.minutes
      }`;
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold">
        <span>{place.name ?? "Unknown"}</span>{" "}
        {place.opening_hours && (
          <span
            className={clsx(
              place.opening_hours.isOpen() ? "text-[#34C759]" : "text-[#FF3B30]"
            )}
          >
            {place.opening_hours?.isOpen() ? "(Open)" : "(Closed)"}
          </span>
        )}
      </p>
      <div className="flex items-center mb-2 space-x-2 text-xs">
        <img src={star_icon} alt="" height={16} width={16} />
        <span className="font-mono font-semibold">{place.rating}</span>
        <span className="font-mono text-white/70">{`(${place.user_ratings_total} Google reviews)`}</span>
      </div>
      {openStatusText && (
        <div className="mb-2">
          <p className="text-[12.8px] leading-4">{openStatusText}</p>
        </div>
      )}
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
      {place.website && (
        <a
          href={place.website}
          target="_blank"
          rel="norefferer"
          className="flex items-center mb-4 text-xs text-blue-400"
        >
          <span>{place.website}</span>
          <ArrowUpRightFromSquareIcon className="w-4 h-4 ml-2" />
        </a>
      )}
      <div className="space-y-2">
        {place.formatted_phone_number && (
          <div className="flex items-center">
            <Phone className="text-[#999] mr-2 h-4 w-4" />
            <a href={`tel:${place.formatted_phone_number}`}>
              <span className="font-mono text-xs font-semibold">
                {place.formatted_phone_number}
              </span>
            </a>
          </div>
        )}
        {place.opening_hours && place.opening_hours.weekday_text && (
          <div className="space-y-4">
            <div className="flex items-center">
              <Clock5Icon className="text-[#999] mr-2 h-4 w-4" />
              <p className="text-[12.8px] -mb-px leading-4 font-semibold ">
                Operating times
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-4 pl-6">
              {place.opening_hours.weekday_text.map((str, i) => (
                <li key={str + i}>
                  <div className="font-mono text-xs text-neutral-400">
                    <span>{str}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {place.reviews && place.reviews.length > 0 && (
          <div className="py-4">
            <p className="mb-2 text-sm font-semibold">Reviews</p>
            <div className="p-4 bg-neutral-900 rounded-2xl">
              <Reviews reviews={place.reviews} />
            </div>
          </div>
        )}
        {place.photos && place.photos.length > 0 && (
          <div className="py-4">
            <p className="mb-4 text-sm font-semibold">Photos</p>
            <div className="px-2">
              <Photos photos={place.photos} />
            </div>
          </div>
        )}
        <p className="font-mono text-xs text-white/70">
          {place.formatted_address}
        </p>
        {place.url && (
          <a
            href={place.url}
            target="_blank"
            rel="norefferer"
            className="flex items-center text-blue-500"
          >
            <span className="text-xs">Open on Maps</span>
            <ArrowUpRightFromSquareIcon className="w-3 h-3 ml-2" />
          </a>
        )}
      </div>
    </div>
  );
}

export default PlaceDetails;
