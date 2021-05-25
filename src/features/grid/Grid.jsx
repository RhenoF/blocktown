import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  selectPosition,
  selectGridSize,
  selectBlocks,
  selectCode,
} from "./gridSlice";
import styles from "./Grid.module.css";
import worker from "../../assets/units/worker.png";
import _ from "lodash";

export function Grid() {
  const dispatch = useDispatch();
  const code = useSelector(selectCode);
  const position = useSelector(selectPosition);
  const grid_size = useSelector(selectGridSize);
  const blocks = useSelector(selectBlocks);

  const dot = (obj) => {
    const key = String(obj.x) + String(obj.y);

    let dot = (
      <div key={key} className={styles.workerUnit}>
        <div className={styles.workerUnit}></div>
      </div>
    );
    if (blocks.some((e) => _.isEqual(e, obj))) {
      dot = (
        <div key={key} className={styles.block}>
          <div className={styles.workerUnit}></div>
        </div>
      );
    } else if (_.isEqual(obj, position)) {
      dot = (
        <div key={key} className={styles.workerUnit}>
          <img src={worker} className={styles.workerUnit} alt="worker"></img>
        </div>
      );
    }

    return dot;
  };

  const renderRows = () => {
    let x = 0;
    let y = 0;
    let grid = [];

    while (y < grid_size.y) {
      x = 0;
      let row = [];
      while (x < grid_size.x) {
        row.push(dot({ x: x, y: y }));
        x += 1;
      }
      grid.push(
        <div key={grid.length} className={styles.row}>
          {row}
        </div>
      );
      y += 1;
    }

    return grid;
  };

  const space = renderRows();

  return (
    <div>
      <div className={styles.row}>
        <span>Code: {code}</span>
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
    </div>
  );
}

export default Grid;
