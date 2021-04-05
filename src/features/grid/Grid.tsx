import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defineMessages, FormattedMessage } from "react-intl";
import { changeLocale } from "../locales/localeSlice";

import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  move,
  change_size,
  selectPosition,
  selectGridSize,
} from "./gridSlice";
import styles from "./Grid.module.css";
import worker from "./assets/units/worker.png";

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

  return (
    <div>
      <div className={styles.row}>
        <span>
          <FormattedMessage {...messages.welcome} /> test
        </span>
      </div>
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
        <button className={styles.button} onClick={() => dispatch(moveDown())}>
          Move Down
        </button>
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={() => dispatch(moveLeft())}>
          Move Left
        </button>
        <button className={styles.button} onClick={() => dispatch(moveRight())}>
          Move Right
        </button>
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={() => dispatch(changeLocale("en"))}>
          Change Locale to EN
        </button>
        <button className={styles.button} onClick={() => dispatch(changeLocale("br"))}>
          Change Locale to BR
        </button>
      </div>
    </div>
  );
}
