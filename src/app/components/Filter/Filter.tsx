import moment from "moment";
import { useEffect, useState } from "react";
import { getLaunches } from "../../slices/launchesSlice";
import { dateIsValid, incrementMonths } from "../../helpers";
import { useAppDispatch } from "../../hooks";
import { Input } from "../Input/Input";
import style from "./Filter.module.scss";

export const Filter = () => {
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(incrementMonths(3));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dateIsValid(startDate) && dateIsValid(endDate)) {
      const query = {
        window_start__gte: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
        window_end__lte: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
      };
      dispatch(getLaunches(query));
    }
  }, [dispatch, startDate, endDate]);

  return (
    <form className={style.flex}>
      <Input
        label="Start date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        data-testid="startDate"
      />
      <Input
        label="End date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        data-testid="endDate"
      />
    </form>
  );
};
