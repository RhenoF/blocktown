import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defineMessages, FormattedMessage } from "react-intl";
import { changeLocale } from "../locales/localeSlice";

import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  selectPosition,
  selectGridSize,
  selectBlocks,
} from "./gridSlice";
import styles from "./Grid.module.css";
import worker from "../../assets/units/worker.png";
import _, { isEqual } from "lodash";
const messages = defineMessages({
  welcome: {
    id: "Welcome",
    defaultMessage: "Hello! Welcome to Blocktown!",
  },
});

export default function Grid() {
  const dispatch = useDispatch();
  const position = useSelector(selectPosition);
  const grid_size = useSelector(selectGridSize);
  const blocks = useSelector(selectBlocks);

  const dot = (obj: Object) => {
    let dot = (
      <div className={styles.workerUnit}>
        <div className={styles.workerUnit}></div>
      </div>
    );
    if (blocks.some((e: any) => _.isEqual(e, obj))) {
      dot = (
        <div className={styles.block}>
          <div className={styles.workerUnit}></div>
        </div>
      );
    } else if (_.isEqual(obj, position)) {
      dot = (
        <div className={styles.workerUnit}>
          <img src={worker} className={styles.workerUnit} alt="worker"></img>
        </div>
      );
    }

    return dot;
  };

  const renderRows = () => {
    let x = 0;
    let y = 0;
    let grid: any = [];

    while (y < grid_size.y) {
      x = 0;
      let row = [];
      while (x < grid_size.x) {
        row.push(dot({ x: x, y: y }));
        x += 1;
      }
      grid.push(<div className={styles.row}>{row}</div>);
      y += 1;
    }

    return grid;
  };

  const space = renderRows();

  return (
    <div>
      <div className={styles.row}>
        <span>
          <FormattedMessage {...messages.welcome} /> test
        </span>
      </div>
      {space}
      <div className={styles.row}>
        <span>
          Grid Size: x:{grid_size.x}, y:{grid_size.y}
        </span>
      </div>
      <div className={styles.row}>
        <span>
          Position: x:{position.x}, y:{position.y}
        </span>
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={() => dispatch(moveUp())}>
          Move Up
        </button>
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={() => dispatch(moveLeft())}>
          Move Left
        </button>
        <button className={styles.button} onClick={() => dispatch(moveDown())}>
          Move Down
        </button>
        <button className={styles.button} onClick={() => dispatch(moveRight())}>
          Move Right
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => dispatch(changeLocale("en"))}
        >
          Change Locale to EN
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(changeLocale("br"))}
        >
          Change Locale to BR
        </button>
      </div>
    </div>
  );
}
