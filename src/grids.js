import { map } from './calculation';

export const grid = ({ columns, rows, width, height }, callback) => {
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const positionX = map(columnIndex, 0, columns, 0, width);
      const positionY = map(rowIndex, 0, rows, 0, height);
      const itemHeight = height / rows;
      const itemWidth = width / columns;

      callback({
        columnIndex,
        rowIndex,
        positionX,
        positionY,
        itemHeight,
        itemWidth
      });
    }
  }
};

export const times = (number, callback) => {
  for (let index = 0; index < number; index++) {
    callback(index);
  }
};
