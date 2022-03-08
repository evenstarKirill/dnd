import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../../itemTypes";
import styles from "./Card.module.scss";

function Card({ text, card_key, card_id, id, moveCard }) {
  const ref = useRef(null);

  const [newTarget, setNewTarget] = useState(id);

  const [{ isDropped }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    drop(item, monitor) {
      console.log("id, item.id", id, item.id);
      if (!ref.current) {
        return;
      }
      const sourceId = item.id;
      const targetId = id;

      if (sourceId === targetId) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (targetId - sourceId === 1 && hoverClientY > hoverMiddleY) {
        return;
      }

      if (sourceId < targetId && hoverClientY < hoverMiddleY) {
        setNewTarget(targetId - 1);
      }

      if (sourceId - targetId === 1 && hoverClientY > hoverMiddleY) {
        return;
      }

      if (sourceId > targetId && hoverClientY > hoverMiddleY) {
        setNewTarget(targetId - 1);
        return;
      }
      item.id = targetId;
      moveCard(sourceId, targetId);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    canDrag: !!ref,
    item: () => {
      return { id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  console.log("!!isDragging", isDragging);

  return (
    <div
      style={{
        opacity: isDragging ? 0 : 1,
        background: isDropped ? "wheat" : "white",
      }}
      ref={ref}
      className={styles.card}
      key={card_key}
      id={card_id}
    >
      {text}
    </div>
  );
}

export default Card;
