import moment from "moment";
import React from "react";
import { Popup } from "react-map-gl";
import { Launch } from "../../slices/launchesSlice";
import style from "./Popover.module.scss";
export interface PopoverProps extends Launch {
  onClose: (arg: null) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  longitude,
  latitude,
  name,
  padName,
  agency,
  launchTime,
  onClose,
}) => {
  return (
    <Popup
      anchor="top"
      longitude={Number(longitude)}
      latitude={Number(latitude)}
      onClose={() => onClose(null)}
      className={style.popover}
    >
      <p>
        <span>Name:</span>
        <strong>{name}</strong>
      </p>

      <p>
        <span>Date of launch:</span>
        <strong>{moment(launchTime).format("DD/MM/YYYY")}</strong>
      </p>

      <p>
        <span>Time of launch:</span>
        <strong>{moment(launchTime).format("HH:MM:SS")}</strong>
      </p>

      <p>
        <span>Pad name:</span>
        <strong>{padName}</strong>
      </p>

      <p>
        <span>Agency:</span>
        <a href={agency.url} target="_blank" rel="noreferrer">
          {agency.name}
        </a>
      </p>
    </Popup>
  );
};
