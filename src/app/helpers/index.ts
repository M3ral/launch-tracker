import moment from "moment";

export const dateIsValid = (dateStr: string) => {
  const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

  if (dateStr.match(regex) === null) {
    return false;
  }

  const date = new Date(dateStr);

  const timestamp = date.getTime();

  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(dateStr);
};

export const incrementMonths = (numMonths: number) => {
  const currentDate = moment().format("YYYY-MM-DD");
  return moment(currentDate).add(numMonths, "M").format("YYYY-MM-DD");
};

export const parseParams = (url: string) => {
  const index = url.indexOf("?");
  const searchParams = url.slice(index);
  const urlSearchParams = new URLSearchParams(searchParams);

  return Object.fromEntries(urlSearchParams.entries());
};
