import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = {"day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0}

  const formatSpots = (n) => {
    if (n === 0) {
      return "no spots remaining";
    } else if (n === 1) {
      return `${n} spot remaining`;
    } else {
      return `${n} spots remaining`;
    }
  };

  return (
    <li className={classNames("day-list__item", dayClass)} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};