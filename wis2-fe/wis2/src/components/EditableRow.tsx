import './Table.css';

type Props = {
  tableData:any,
  editFormData:any,
  handleEditFormChange:any
}

const EditableRow = ({tableData, editFormData, handleEditFormChange}: Props) => {

  
  return (
    <tr key={tableData.id}>
      <td>
        {tableData.name}
      </td>
      <td>
        <input type="text" placeholder="zadaj body" value={editFormData.points} name="points" onChange={handleEditFormChange}></input>
      </td>
      <td>
        <button type="submit">Save</button>
      </td>
    </tr>
  );
}

export default EditableRow;
