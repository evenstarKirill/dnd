import { useDispatch, useSelector } from "react-redux";

import Column from "../Column/Column";
import styles from "./ColumnList.module.scss";
import { swapColumns } from "../../redux/action";

function ColumnList() {
  // console.log("ColumnList");
  const dispatch = useDispatch();
  const columns = useSelector((store) => [...store.columns]);

  const moveColumn = (sourceColumnId, targetColumnId) =>
    dispatch(swapColumns({ sourceColumnId, targetColumnId }));

  console.log("columns", columns);

  return (
    <div className={styles.wrapper}>
      {columns.map((col) => (
        <Column
          title={col.title}
          id_key={col.id}
          key={col.id}
          id={col.id}
          moveColumn={moveColumn}
          cards={[...col.cards]}
        />
      ))}
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     data: [...state.columns],
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   swapC: (sourceColumnId, targetColumnId) =>
//     dispatch(swapColumns({ sourceColumnId, targetColumnId })),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ColumnList);
export default ColumnList;

// export default connect(mapStateToProps, mapDispatchToProps)(NoteList)
