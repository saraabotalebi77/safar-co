const formatToPersianDate = (isoDateString: string) => {
  const dateObject = new Date(isoDateString);
  const persianYear = dateObject.toLocaleDateString("fa-IR", {
    year: "numeric",
  });
  const persianMonth = dateObject.toLocaleDateString("fa-IR", {
    month: "long",
  });
  const persianDay = dateObject.toLocaleDateString("fa-IR", { day: "numeric" });
  const persianWeekDay = dateObject.toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  return `${persianWeekDay} ، ${persianDay} ${persianMonth} ${persianYear}`;
};
const formatTime = (isoDateString: string) => {
  const dateObject = new Date(isoDateString);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return `${minutes < 10 ? `0${minutes}` : minutes} : ${
    hours < 10 ? `0${hours}` : hours
  }`;

};

export { formatToPersianDate, formatTime };
