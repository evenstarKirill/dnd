// import update from "immutability-helper";
import {
  MOVE_CARD,
  MOVE_CARD_TO_EMPTY_COLUMN,
  MOVE_COLUMN,
  SELECTED,
  TEST,
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
    case TEST: {
      // console.log("SELECTED", SELECTED);
      // console.log("selected", payload.selectedElement);
      return {
        ...state,
        test: false,
      };
    }
    case SELECTED: {
      // console.log("SELECTED", SELECTED);
      // console.log("selected", payload.selectedElement);
      return {
        ...state,
        selectedElement: { ...payload.selectedElement },
      };
    }
    case MOVE_COLUMN: {
      console.log("MOVE_COLUMN", MOVE_COLUMN);
      const nextState = JSON.parse(JSON.stringify({ ...state }));
      console.log("payload", payload);
      const deletedElement = nextState.columns.splice(
        payload.sourceColumnIndex,
        1
      );
      // const targetIndex = state.columns.findIndex(
      //   (item) => item.id === payload.targetColumnId
      // );
      nextState.columns.splice(payload.targetColumnIndex, 0, deletedElement[0]);

      return nextState;
    }
    case MOVE_CARD: {
      console.log("MOVE_CARD", MOVE_CARD);
      const prevState = JSON.parse(JSON.stringify({ ...state }));
      // console.log("prevState", prevState);

      // const sourceColumnIndex = prevState.columns.findIndex(
      //   (item) => item.id === payload.sourceColumnId
      // );

      // const targetColumnIndex = prevState.columns.findIndex(
      //   (item) => item.id === payload.targetColumnId
      // );

      // const sourceCardIndex = prevState.columns[
      //   sourceColumnIndex
      // ].cards.findIndex((card) => card.id === payload.sourceCardId);
      // console.log("sourceCardIndex", sourceCardIndex);
      // console.log("targetColumnIndex", targetColumnIndex);

      // delete sourceCardIndex;
      const deletedElement = prevState.columns[
        payload.sourceColumnIndex
      ].cards.splice(payload.sourceCardIndex, 1);
      // console.log("deletedElement", deletedElement[0], sourceColumnIndex);
      // console.log("payload.targetColumnId", payload);
      // console.log("targetColumnIndex", targetColumnIndex);

      // console.log("prevState", prevState);

      // if (payload.targetCardId) {
      //   targetCardIndex = state.columns[targetColumnIndex].cards.findIndex(
      //     (card) => card.id === payload.targetCardId
      //   );
      // }

      // console.log(
      //   "prevState.columns[targetColumnIndex].cards",
      //   prevState.columns[targetColumnIndex].cards.length
      // );

      // console.log("payload.targetCardId", payload.targetCardId);
      // const targetCardIndex = state.columns[targetColumnIndex].cards.findIndex(
      //   (card) => card.id === payload.targetCardId
      // );

      // console.log("targetCardIndex", targetCardIndex);

      // if (prevState.columns[targetColumnIndex].cards.length < 1) {
      //   return;
      // }

      prevState.columns[payload.targetColumnIndex].cards.splice(
        payload.targetCardIndex,
        0,
        deletedElement[0]
      );

      // prevState.columns[targetColumnIndex].cards.splice(
      //   targetCardIndex,
      //   0,
      //   deletedElement[0]
      // );

      // console.log("prevState", prevState);
      // prevState.test = true;
      // console.log("prevState", prevState);

      return prevState;
    }
    case MOVE_CARD_TO_EMPTY_COLUMN: {
      console.log("MOVE_CARD_TO_EMPTY_COLUMN", MOVE_CARD_TO_EMPTY_COLUMN);
      // if (payload.targetCardId) {
      //   return;
      // }
      console.log("payload.targetCardId", payload.targetCardId);
      const prevState = JSON.parse(JSON.stringify({ ...state }));

      const sourceColumnIndex = prevState.columns.findIndex(
        (item) => item.id === payload.sourceColumnId
      );

      const targetColumnIndex = prevState.columns.findIndex(
        (item) => item.id === payload.targetColumnId
      );

      const sourceCardIndex = prevState.columns[
        sourceColumnIndex
      ].cards.findIndex((card) => card.id === payload.sourceCardId);
      // console.log("sourceCardIndex", sourceCardIndex);
      // console.log("targetColumnIndex", targetColumnIndex);

      // delete sourceCardIndex;
      const deletedElement = prevState.columns[sourceColumnIndex].cards.splice(
        sourceCardIndex,
        1
      );
      console.log("deletedElement", deletedElement[0]);

      // if (prevState.columns[targetColumnIndex].cards.length > 1) {
      //   return;
      // }
      // console.log(
      //   "prevState",
      //   prevState.columns[targetColumnIndex].cards.length
      // );
      // console.log("deletedElement", deletedElement[0], sourceColumnIndex);
      // console.log("payload.targetColumnId", payload);
      // console.log("targetColumnIndex", targetColumnIndex);

      // console.log("prevState", prevState);

      // const targetCardIndex = 0;
      // console.log("targetCardIndex", targetCardIndex);

      prevState.columns[targetColumnIndex].cards.push(deletedElement[0]);

      // console.log("prevState", prevState);

      return prevState;
    }
    default:
      return state;
  }
}
