import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks";
import { Launch, launches } from "../../slices/launchesSlice";
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
} from "react-map-gl";
import { Markers } from "../Markers/Markers";
import { Popover } from "../Popover/Popover";
import { Feedback } from "../Feedback/Feedback";
import { Pagination } from "../Pagination/Pagination";

export const Launches = ({ ...props }) => {
  const defaultVierPort = useMemo(
    () => ({
      latitude: 0,
      longitude: 0,
      zoom: 0.5,
    }),
    []
  );
  const _launches = useAppSelector(launches);
  const [popupInfo, setPopupInfo] = useState<Launch | null>(null);
  const [viewport, setViewport] = useState(defaultVierPort);

  useEffect(() => {
    if (_launches.length > 0) {
      setViewport({
        zoom: 2.5,
        latitude: Number(_launches[0].latitude),
        longitude: Number(_launches[0].longitude),
      });
    } else {
      setViewport(defaultVierPort);
    }
  }, [defaultVierPort, _launches]);

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(evt) => setViewport(evt.viewState)}
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
        }}
        {...props}
      >
        <Feedback />
        <Markers onClick={setPopupInfo} />
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {popupInfo && <Popover onClose={setPopupInfo} {...popupInfo} />}
      </ReactMapGL>
      <Pagination />
    </>
  );
};
