import React, { useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import Card from "../Card/Card";
import { ItemTypes } from "../../itemTypes";
import { SourceBox } from "../SourceBox/SourceBox";
import styles from "./Column.module.scss";
import { swapCards } from "../../redux/action";

function Column({ title, cards, id_key, id, moveColumn }) {
  const dispatch = useDispatch();
  // const columns = useSelector((store) => [...store.columns]);

  const moveCard = (sourceCardId, targetCardId) =>
    dispatch(swapCards({ sourceCardId, targetCardId }));

  const [newTarget, setNewTarget] = useState(id);
  const ref = useRef(null);
  const [{ isDropped }, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      if (!ref.current) {
        // console.log("!ref.current");
        return;
      }
      const sourceId = item.id;
      const targetId = id;

      if (sourceId === targetId) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      console.log("hoverBoundingRect", hoverBoundingRect);
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      console.log("clientOffset", clientOffset);
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      console.log("hoverClientX", hoverClientX);

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
      moveColumn(sourceId, targetId, () => console.log("asd"));
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
        {cards.map((card) => (
          <Card
            moveCard={moveCard}
            text={card.text}
            card_key={card.id}
            id={card.id}
            key={card.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
