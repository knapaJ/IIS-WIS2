import { Pagination, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import './Table.css';

type Props = {
  tableData:any
}

function InputTable({tableData}:Props) {
  const [pageNumber, setPageNumber] = useState(1);
	const [maxPagesNumber, setMaxPagesNumber] = useState(1);

  const [tabData, setTableData] = useState(tableData);

	const [pointsId, setPointsId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name:"",
    points:""
  });

  useEffect(() => {console.log("data update:", tabData)}, [tabData])

  const onEdit = (event:any, tableData:any) => {
    event.preventDefault();
    console.log(tableData.id);
    setPointsId(tableData.id);

    const formValues = {
      name: tableData.name,
      points: tableData.points
    }
    console.log("formValues:", formValues);
    setEditFormData(formValues);
  }

  const handleEditFormChange = (event:any) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    if (!isNaN(fieldValue)) {
      console.log("formValue:", fieldValue);

      const newFormData = {...editFormData}
      newFormData[fieldName as keyof typeof editFormData] = fieldValue;

      setEditFormData(newFormData);
    }
  }

  const handleEditFormSubmit = (event:any) => {
    event.preventDefault();

    console.log("submit");

    const editPoints = {
      id: pointsId,
      name: editFormData.name,
      points: editFormData.points
    };

    const newData = [...tabData];

    const index = tabData.findIndex((td:any) => td.id === pointsId);

    newData[index] = editPoints;

    setTableData(newData);
    setPointsId(null);

    console.log(editPoints)

    fetch("/setLecturedCourseDetail", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content_type":"application/json",
			},
			body:JSON.stringify(editPoints)
			}
		)
  };

  const onPaginationChange = (event:any) => {
		//fetchData(event.target.textContent);
	};
  
  return (
    <form onSubmit={handleEditFormSubmit}>
      <Table id="inputTable" sx={{ boxShadow: 2}}>
        <TableHead>
          <TableRow>
            <TableCell>Meno studenta</TableCell>
            <TableCell>Hodnotenie studenta</TableCell>
            <TableCell>Max pocet bodov</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabData.map((td:any) => (
            <Fragment>
              {pointsId == td.id ? <EditableRow tableData={td} editFormData={editFormData} handleEditFormChange={handleEditFormChange}/> 
              : 
              <ReadOnlyRow tableData={td} onClickHandle={onEdit}></ReadOnlyRow>}
            </Fragment>
          ))}
        </TableBody>
        <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Pagination count={maxPagesNumber?? 1} defaultPage={pageNumber?? 1} onChange={(event) => onPaginationChange(event)}></Pagination>
              </TableCell>
            </TableRow>
        </TableFooter>
      </Table>
    </form>
  );
}

export default InputTable;
