// import update from "immutability-helper";
import { MOVE_CARD, MOVE_COLUMN } from "./actionTypes";

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
      cards: [
        {
          id: nanoid(),
          text: "4",
        },
        {
          id: nanoid(),
          text: "5",
        },
        {
          id: nanoid(),
          text: "6",
        },
      ],
    },
    {
      id: nanoid(),
      title: "col3",
      cards: [
        {
          id: nanoid(),
          text: "7",
        },
        {
          id: nanoid(),
          text: "8",
        },
        {
          id: nanoid(),
          text: "9",
        },
      ],
    },
    {
      id: nanoid(),
      title: "col4",
      cards: [
        {
          id: nanoid(),
          text: "10",
        },
        {
          id: nanoid(),
          text: "11",
        },
        {
          id: nanoid(),
          text: "12",
        },
      ],
    },
  ],
};

export default function columns(state = initialState, { type, payload }) {
  switch (type) {
    case MOVE_COLUMN: {
      console.log("MOVE_COLUMN", MOVE_COLUMN);
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
      const cardsState = JSON.parse(JSON.stringify({ ...state }));
      // console.log("cardsState", cardsState.columns.cards.id);

      const sourceCardIndex = cardsState.columns.map((col) =>
        col.cards.splice(
          col.cards.findIndex((card) => card.id === payload.targetCardId),
          1
        )
      );

      const targetCardIndex = state.columns.map((col) =>
        col.cards.findIndex((item) => item.id === payload.targetCardId)
      );

      const newColumns = state.columns.map((col) =>
        col.id === payload.sourceColumnId
          ? {
              ...col,
              cards: col.cards.splice(targetCardIndex, 0, sourceCardIndex[0]),
            }
          : col
      );

      return {
        ...state,
        columns: newColumns,
      };
    }
    default:
      return state;
  }
}
