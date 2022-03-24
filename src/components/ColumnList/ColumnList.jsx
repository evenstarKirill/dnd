import { useDispatch, useSelector } from "react-redux";

import Column from "../Column/Column";
import styles from "./ColumnList.module.scss";
import { swapColumns } from "../../redux/action";

function ColumnList() {
  const dispatch = useDispatch();
  const columns = useSelector((store) => [...store.columns]);

  const moveColumn = (sourceColumnIndex, targetColumnIndex) =>
    dispatch(swapColumns({ sourceColumnIndex, targetColumnIndex }));

  // console.log("columns", columns);

  return (
    <div className={styles.wrapper}>
      {columns.map((col, index) => (
        <Column
          // title={col.title}
          column={col}
          // id_key={col.id}
          key={col.id}
          id={col.id}
          moveColumn={moveColumn}
          cards={[...col.cards]}
          col_index={index}
          // col_id={col.id}
        />
      ))}
    </div>
  );
}

export default ColumnList;
