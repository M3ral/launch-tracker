import {
  getLaunches,
  metaCount,
  nextLaunches,
  previousLaunches,
  Query,
  status,
} from "../../slices/launchesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import style from "./Pagination.module.scss";

export const Pagination = () => {
  const _status = useAppSelector(status);
  const next = useAppSelector(nextLaunches);
  const previous = useAppSelector(previousLaunches);
  const _metaCount = useAppSelector(metaCount);

  const dispatch = useAppDispatch();

  return _status === "completed" && _metaCount && _metaCount > 10 ? (
    <div className={style.wrapper}>
      <button
        aria-label="previous"
        disabled={previous === null || _status !== "completed"}
        onClick={() => dispatch(getLaunches(previous as Query))}
      >
        Previous
      </button>
      <button
        aria-label="next"
        disabled={next === null || _status !== "completed"}
        onClick={() => dispatch(getLaunches(next as Query))}
      >
        Next
      </button>
    </div>
  ) : null;
};
