import EventButton from './EventButton';
import logo from './logo.svg';
import './Table.css';

type Props = {
  tableData:any
  onClickHandle:any
}

const ReadOnlyRow = ({tableData, onClickHandle}:Props) => {

  return (
    <tr key={tableData.id}>
      <td>{tableData.name}</td>
      <td>{tableData.points}</td>

      <td>
        <input type="button" value={"Editovat"} onClick={(event) => onClickHandle(event, tableData)}></input>
      </td>
    </tr>
  );
}

export default ReadOnlyRow;
