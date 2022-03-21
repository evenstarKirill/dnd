import {
  MOVE_CARD,
  MOVE_CARD_TO_EMPTY_COLUMN,
  MOVE_COLUMN,
  SELECTED,
} from "./actionTypes";

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

export const swapCardsToEmptyColumn = ({
  sourceCardId,
  sourceColumnId,
  targetColumnId,
}) => ({
  type: MOVE_CARD_TO_EMPTY_COLUMN,
  payload: {
    sourceCardId,
    sourceColumnId,
    targetColumnId,
  },
});

export const selected = ({ selectedElement }) => ({
  type: SELECTED,
  payload: { selectedElement },
});
