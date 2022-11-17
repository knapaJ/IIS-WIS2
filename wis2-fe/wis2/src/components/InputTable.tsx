import { Fragment, useEffect, useState } from 'react';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import './Table.css';

type Props = {
  tableData:any
}

function InputTable({tableData}:Props) {
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
  
  return (
    <form onSubmit={handleEditFormSubmit}>
      <table id="registrationTable" className='wisTable'>
        <thead>
          <tr>
            <th>Meno studenta</th>
            <th>Hodnotenie studenta</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tabData.map((td:any) => (
            <Fragment>
              {pointsId == td.id ? <EditableRow tableData={td} editFormData={editFormData} handleEditFormChange={handleEditFormChange}/> 
              : 
              <ReadOnlyRow tableData={td} onClickHandle={onEdit}></ReadOnlyRow>}
            </Fragment>
          ))}
        </tbody>
      </table>
    </form>
  );
}

export default InputTable;
