// import update from "immutability-helper";
import {
  MOVE_CARD,
  MOVE_CARD_TO_EMPTY_COLUMN,
  MOVE_COLUMN,
  SELECTED,
} from "./actionTypes";

import { nanoid } from "nanoid";

export const initialState = {
  columns: [
    {
      id: nanoid(),
      title: "col1",
      cards: [
        {
          id: nanoid(),
          text: "1",
        },
        {
          id: nanoid(),
          text: "2",
        },
        {
          id: nanoid(),
          text: "3",
        },
      ],
    },
    {
      id: nanoid(),
      title: "col2",
      cards: [],
    },
    {
      id: nanoid(),
      title: "col3",
      cards: [],
    },
    {
      id: nanoid(),
      title: "col4",
      cards: [],
    },
  ],
  selectedElement: {},
};

export default function columns(state = initialState, { type, payload }) {
  switch (type) {
    case SELECTED: {
      console.log("SELECTED", SELECTED);
      console.log("selected", payload.selectedElement);
      return {
        ...state,
        selectedElement: { ...payload.selectedElement },
      };
    }
    case MOVE_COLUMN: {
      // console.log("MOVE_COLUMN", MOVE_COLUMN);
      const nextState = JSON.parse(JSON.stringify({ ...state }));
      const sourceIndex = nextState.columns.splice(
        nextState.columns.findIndex(
          (item) => item.id === payload.sourceColumnId
        ),
        1
      );
      const targetIndex = state.columns.findIndex(
        (item) => item.id === payload.targetColumnId
      );
      nextState.columns.splice(targetIndex, 0, sourceIndex[0]);
      if (payload.cb) {
        payload.cb();
      }
      return nextState;
    }
    case MOVE_CARD: {
      console.log("MOVE_CARD", MOVE_CARD);
      const prevState = JSON.parse(JSON.stringify({ ...state }));
      console.log("prevState", prevState);

      const sourceColumnIndex = prevState.columns.findIndex(
        (item) => item.id === payload.sourceColumnId
      );

      const targetColumnIndex = prevState.columns.findIndex(
        (item) => item.id === payload.targetColumnId
      );

      const sourceCardIndex = prevState.columns[
        sourceColumnIndex
      ].cards.findIndex((card) => card.id === payload.sourceCardId);
      console.log("sourceCardIndex", sourceCardIndex);
      console.log("targetColumnIndex", targetColumnIndex);

      // delete sourceCardIndex;
      const deletedElement = prevState.columns[sourceColumnIndex].cards.splice(
        sourceCardIndex,
        1
      );
      console.log("deletedElement", deletedElement[0], sourceColumnIndex);
      console.log("payload.targetColumnId", payload);
      // console.log("targetColumnIndex", targetColumnIndex);

      console.log("prevState", prevState);

      const targetCardIndex = state.columns[targetColumnIndex].cards.findIndex(
        (card) => card.id === payload.targetCardId
      );
      console.log("targetCardIndex", targetCardIndex);

      prevState.columns[targetColumnIndex].cards.splice(
        targetCardIndex,
        0,
        deletedElement[0]
      );

      console.log("prevState", prevState);

      return prevState;
    }
    case MOVE_CARD_TO_EMPTY_COLUMN: {
      console.log("MOVE_CARD_TO_EMPTY_COLUMN", MOVE_CARD_TO_EMPTY_COLUMN);
      const prevState = JSON.parse(JSON.stringify({ ...state }));
      console.log("prevState", prevState);

      const sourceColumnIndex = prevState.columns.findIndex(
        (item) => item.id === payload.sourceColumnId
      );

      const targetColumnIndex = prevState.columns.findIndex(
        (item) => item.id === payload.targetColumnId
      );

      const sourceCardIndex = prevState.columns[
        sourceColumnIndex
      ].cards.findIndex((card) => card.id === payload.sourceCardId);
      console.log("sourceCardIndex", sourceCardIndex);
      console.log("targetColumnIndex", targetColumnIndex);

      // delete sourceCardIndex;
      const deletedElement = prevState.columns[sourceColumnIndex].cards.splice(
        sourceCardIndex,
        1
      );
      console.log("deletedElement", deletedElement[0], sourceColumnIndex);
      console.log("payload.targetColumnId", payload);
      // console.log("targetColumnIndex", targetColumnIndex);

      console.log("prevState", prevState);

      const targetCardIndex = 0;
      console.log("targetCardIndex", targetCardIndex);

      prevState.columns[targetColumnIndex].cards.splice(
        targetCardIndex,
        0,
        deletedElement[0]
      );

      console.log("prevState", prevState);

      return prevState;
    }
    default:
      return state;
  }
}
