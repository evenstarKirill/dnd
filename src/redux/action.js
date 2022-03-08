import { MOVE_CARD, MOVE_COLUMN } from "./actionTypes";

export const swapColumns = ({ sourceColumnId, targetColumnId, cb }) => ({
  type: MOVE_COLUMN,
  payload: {
    sourceColumnId,
    targetColumnId,
    cb,
  },
});

export const swapCards = ({
  sourceCardId,
  targetCardId,
  sourceColumnId,
  targetColumnId,
}) => ({
  type: MOVE_CARD,
  payload: {
    sourceCardId,
    targetCardId,
    sourceColumnId,
    targetColumnId,
  },
});
