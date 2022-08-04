import { launchCount, status } from "../../slices/launchesSlice";
import { useAppSelector } from "../../hooks";
import style from "./Feedback.module.scss";

export const Feedback = ({ ...props }) => {
  const apiStatus = useAppSelector(status);
  const _launchCount = useAppSelector(launchCount);
  let content;

  if (apiStatus !== "completed") {
    content = (
      <div className={style.container} {...props}>
        {apiStatus === "loading" && <h3>Loading, please wait... &#128640;</h3>}
        {apiStatus === "error" && <h3>Ups! Something went wrong &#128165;</h3>}
      </div>
    );
  } else if (apiStatus === "completed" && _launchCount === 0) {
    content = (
      <div className={style.container} {...props}>
        <h3>Ups, no results :( </h3>
        <span>Please try with different dates</span>
      </div>
    );
  } else {
    content = <></>;
  }

  return content;
};
