import { Button, TableCell, TableRow } from '@mui/material';
import EventButton from './EventButton';
import logo from './logo.svg';
import './Table.css';

type Props = {
  tableData:any
  onClickHandle:any
}

const ReadOnlyRow = ({tableData, onClickHandle}:Props) => {
  return (
    <TableRow key={tableData.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
      <TableCell>{tableData.name}</TableCell>
      <TableCell>{tableData.points}</TableCell>
      <TableCell sx={{ borderBottom: '0'}}>
        {tableData.maxPoints}
      </TableCell>
      <TableCell>
        <Button value={"Editovat"} onClick={(event) => onClickHandle(event, tableData)}>Editovat</Button>
      </TableCell>
    </TableRow>
  );
}

export default ReadOnlyRow;
