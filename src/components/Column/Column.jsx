import React, { useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { swapCards, swapCardsToEmptyColumn } from "../../redux/action";
import { useDrag, useDrop } from "react-dnd";

import Card from "../Card/Card";
import InputCard from "../Card/InputCard";
import { ItemTypes } from "../../itemTypes";
import styles from "./Column.module.scss";

function Column({ title, cards, id_key, id, moveColumn, col_id }) {
  const dispatch = useDispatch();
  // const columns = useSelector((store) => [...store.columns]);

  const moveCard = (
    sourceCardId,
    targetCardId,
    sourceColumnId,
    targetColumnId
  ) =>
    dispatch(
      swapCards({ sourceCardId, targetCardId, sourceColumnId, targetColumnId })
    );

  const moveCardToEmptyColumn = (
    sourceCardId,
    sourceColumnId,
    targetColumnId
  ) =>
    dispatch(
      swapCardsToEmptyColumn({ sourceCardId, sourceColumnId, targetColumnId })
    );

  const [newTarget, setNewTarget] = useState(id);
  const [targetColId, setTargetColId] = useState();

  const ref = useRef(null);
  const [{ isDropped }, drop] = useDrop({
    accept: [ItemTypes.COLUMN],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      console.log("item, monitor", item, monitor);
      if (!ref.current) {
        // console.log("!ref.current");
        return;
      }
      const sourceId = item.id;
      const targetId = id;
      setTargetColId(targetId);
      // console.log("targetId", targetId);

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

      if (targetId - sourceId === 1 && hoverClientX > hoverMiddleX) {
        return;
      }

      if (sourceId < targetId && hoverClientX < hoverMiddleX) {
        setNewTarget(targetId - 1);
        // return;
      }

      if (sourceId - targetId === 1 && hoverClientX > hoverMiddleX) {
        return;
      }

      if (sourceId > targetId && hoverClientX < hoverMiddleX) {
        setNewTarget(targetId - 1);
      }
      item.id = targetId;
      // setTargetColId(targetId);
      moveColumn(sourceId, newTarget);
      // console.log("targetId", targetId);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: () => {
      return { id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  console.log("targetColId", targetColId);

  return (
    <div
      className={styles.wrapper}
      key={id_key}
      style={{
        opacity: isDragging ? 0 : 1,
        background: isDropped ? "gray" : "wheat",
      }}
      ref={ref}
    >
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.cards_wrapper}>
        <InputCard moveCardToEmptyColumn={moveCardToEmptyColumn} col_id={id} />
        {cards.map((card) => (
          <Card
            moveCard={moveCard}
            text={card.text}
            card_key={card.id}
            id={card.id}
            key={card.id}
            col_id={id}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
