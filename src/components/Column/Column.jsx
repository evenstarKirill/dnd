import React, { useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { swapCards, swapCardsToEmptyColumn, test } from "../../redux/action";
import { useDrag, useDrop } from "react-dnd";

import Card from "../Card/Card";
import { ItemTypes } from "../../itemTypes";
import styles from "./Column.module.scss";

function Column({ cards, id, moveColumn, col_id, column, col_index }) {
  const dispatch = useDispatch();
  const sourceCol = useSelector((store) => [store]);

  // const columns = useSelector((store) => [...store.columns]);
  const testTest = () => dispatch(test());

  const moveCard = (
    sourceCardIndex,
    targetCardIndex,
    sourceColumnIndex,
    targetColumnIndex
  ) =>
    dispatch(
      swapCards({
        sourceCardIndex,
        targetCardIndex,
        sourceColumnIndex,
        targetColumnIndex,
      })
    );

  const moveCardToEmptyColumn = (
    sourceCardId,
    sourceColumnId,
    targetColumnId
  ) =>
    dispatch(
      swapCardsToEmptyColumn({ sourceCardId, sourceColumnId, targetColumnId })
    );

  const [newTarget, setNewTarget] = useState(col_index);
  // const [targetColId, setTargetColId] = useState();

  const ref = useRef(null);
  const [{ isDropped }, drop] = useDrop({
    accept: [ItemTypes.COLUMN, ItemTypes.CARD],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      if (monitor.getItemType() === ItemTypes.COLUMN) {
        // console.log("item, monitor", item, monitor);

        if (!ref.current) {
          return;
        }
        const sourceIndex = item.col_index;
        const targetIndex = col_index;
        const sourceId = item.id;
        const targetId = id;

        console.log("source", item.col_index);
        console.log("target", col_index);

        if (sourceId === targetId) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // console.log("hoverBoundingRect", hoverBoundingRect);
        const hoverMiddleX =
          (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        // console.log("clientOffset", clientOffset);
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;
        // console.log("hoverClientX", hoverClientX);

        if (targetIndex - sourceIndex === 1 && hoverClientX > hoverMiddleX) {
          return;
        }

        if (sourceIndex < targetIndex && hoverClientX < hoverMiddleX) {
          setNewTarget(targetIndex - 1);
          // return;
        }

        if (sourceId - targetId === 1 && hoverClientX > hoverMiddleX) {
          return;
        }

        if (sourceIndex > targetIndex && hoverClientX < hoverMiddleX) {
          setNewTarget(targetIndex - 1);
        }
        item.id = targetIndex;
        console.log("sourceIndex, newTarget", sourceIndex, newTarget);

        moveColumn(sourceIndex, targetIndex);
      }
      if (monitor.getItemType() === ItemTypes.CARD) {
        const sourceId = item.id;
        // console.log("item.id", item.index);

        // const targetId = cards.id;

        // console.log("targetId_column", targetId);

        // if (col_id) {
        //   return;
        // }
        console.log(sourceCol[0].test);

        if (sourceCol[0].test) {
          testTest();
        } else if (!cards.id && !!sourceId) {
          moveCardToEmptyColumn(
            sourceId,
            sourceCol[0].selectedElement.column_id,
            column.id
          );
        }

        // if (sourceId === targetId) {
        //   return;
        // }

        // if ([...cards].length !== 0) {
        //   return;
        // }

        // moveCardToEmptyColumn(
        //   sourceId,
        //   sourceCol[0].selectedElement.column_id,
        //   col_id
        // );
        // console.log(
        //   "sourceId,targetId,sourceCol[0].selectedElement.column_id,column.id",
        //   sourceId,
        //   targetId,
        //   sourceCol[0].selectedElement.column_id,
        //   column.id
        // );
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: () => {
      return { id, col_index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  // console.log("targetColId", targetColId);

  return (
    <div
      className={styles.wrapper}
      key={column.id}
      style={{
        opacity: isDragging ? 0 : 1,
        background: isDropped ? "gray" : "wheat",
      }}
      ref={ref}
    >
      <h1 className={styles.title}>{column.title}</h1>
      <div className={styles.cards_wrapper}>
        {cards.map((card, index) => (
          <Card
            moveCardToEmptyColumn={moveCardToEmptyColumn}
            moveCard={moveCard}
            card_index={index}
            col_index={col_index}
            // text={card.text}
            card={card}
            // card_key={card.id}
            id={card.id}
            key={card.id}
            col_id={column.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
