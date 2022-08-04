import React from "react";
import { Marker } from "react-map-gl";
import { Launch } from "../../slices/launchesSlice";
import { useAppSelector } from "../../hooks";

export interface MarkersProps {
  onClick: (launch: Launch) => void;
}

export const Markers: React.FC<MarkersProps> = ({ onClick }) => {
  const launches = useAppSelector((state) => state.launches.items);

  return (
    <>
      {launches?.map((launch) => (
        <Marker
          key={`marker-${launch.id}`}
          longitude={Number(launch.longitude)}
          latitude={Number(launch.latitude)}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onClick(launch);
          }}
        />
      ))}
    </>
  );
};
