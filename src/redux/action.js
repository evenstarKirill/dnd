import {
  MOVE_CARD,
  MOVE_CARD_TO_EMPTY_COLUMN,
  MOVE_COLUMN,
  SELECTED,
  TEST,
} from "./actionTypes";

export const swapColumns = ({ sourceColumnIndex, targetColumnIndex }) => ({
  type: MOVE_COLUMN,
  payload: {
    sourceColumnIndex,
    targetColumnIndex,
  },
});

export const swapCards = ({
  sourceCardIndex,
  targetCardIndex,
  sourceColumnIndex,
  targetColumnIndex,
}) => ({
  type: MOVE_CARD,
  payload: {
    sourceCardIndex,
    targetCardIndex,
    sourceColumnIndex,
    targetColumnIndex,
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

export const test = () => ({
  type: TEST,
});
