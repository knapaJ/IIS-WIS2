import { Button, TableCell, TableRow } from '@mui/material';
import './Table.css';

type Props = {
  tableData:any,
  editFormData:any,
  handleEditFormChange:any
}

const EditableRow = ({tableData, editFormData, handleEditFormChange}: Props) => {

  
  return (
    <TableRow key={tableData.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
      <TableCell sx={{ borderBottom: '0'}}>
        {tableData.name}
      </TableCell>
      <TableCell sx={{ borderBottom: '0'}}>
        <input type="text" placeholder="zadaj body" value={editFormData.points} name="points" onChange={handleEditFormChange}></input>
      </TableCell>
      <TableCell sx={{ borderBottom: '0'}}>
        {tableData.maxPoints}
      </TableCell>
      <TableCell sx={{ borderBottom: '0'}}>
      <Button type="submit" >Ulozit</Button>
      </TableCell>
    </TableRow>
  );
}

export default EditableRow;
