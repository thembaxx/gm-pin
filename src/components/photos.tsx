import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface Props {
  photos: google.maps.places.PlacePhoto[];
}

function Photos({ photos }: Props) {
  return (
    <PhotoProvider>
      <ul className="grid grid-cols-3 gap-2">
        {photos.map((p, index) => (
          <li key={"image" + index}>
            <PhotoView src={p.getUrl()}>
              <div className="w-full h-24 overflow-hidden rounded-lg cursor-pointer bg-neutral-900 aspect-square">
                <img
                  src={p.getUrl()}
                  alt=""
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </PhotoView>
          </li>
        ))}
      </ul>
    </PhotoProvider>
  );
}

export default Photos;
