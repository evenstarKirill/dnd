import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { selected, test } from "../../redux/action";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../../itemTypes";
import styles from "./Card.module.scss";

function Card({
  text,
  card_key,
  id,
  moveCard,
  col_id,
  card,
  card_index,
  col_index,
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const sourceCol = useSelector((store) => [store]);

  // const testTest = () => dispatch(test());
  // console.log("sourceCol", sourceCol[0].selectedElement.card_id);

  const [newTargetIndex, setNewTarget] = useState(card_index);

  const [{ isDropped }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    drop(item, monitor) {
      // console.log("id, item.id", id, item.id);
      // console.log("item", item, id);
      if (!ref.current) {
        return;
      }

      const sourceIndex = item.card_index;
      const targetIndex = card_index;

      const sourceId = item.id;
      const targetId = id;

      console.log("sourceId, targetId", sourceId, targetId);

      if (!targetId) {
        return;
      }

      if (sourceId === targetId) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (targetIndex - sourceIndex === 1 && hoverClientY > hoverMiddleY) {
        return;
      }

      if (sourceIndex < targetIndex && hoverClientY < hoverMiddleY) {
        setNewTarget(targetIndex - 1);
      }

      if (sourceIndex - targetIndex === 1 && hoverClientY > hoverMiddleY) {
        return;
      }

      if (sourceIndex > targetIndex && hoverClientY > hoverMiddleY) {
        setNewTarget(targetIndex - 1);
        return;
      }

      console.log(
        "sourceIndex,newTargetIndex,sourceCol[0].selectedElement.col_index,col_index",
        sourceIndex,
        newTargetIndex,
        sourceCol[0].selectedElement.col_index,
        col_index
      );
      if (sourceIndex && targetIndex) {
        moveCard(
          sourceIndex,
          newTargetIndex,
          sourceCol[0].selectedElement.col_index,
          col_index
        );
        // testTest();
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    canDrag: !!ref,
    item: () => {
      return { id, card_index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  useEffect(() => {
    if (isDragging) {
      dispatch(
        selected({
          selectedElement: {
            card_id: id,
            column_id: col_id,
            // card_index: card_index,
            // col_index: col_index,
            isDraggableCardExist: true,
          },
        })
      );
    } else {
      return null;
    }
  }, [isDragging]);

  // console.log("!!isDragging_CARD", isDragging);

  return (
    <div
      style={{
        opacity: isDragging ? 0 : 1,
        background: isDropped ? "wheat" : "white",
      }}
      ref={ref}
      className={styles.card}
      key={card.id}
      id={card.id}
    >
      {card.text}
    </div>
  );
}

export default Card;
