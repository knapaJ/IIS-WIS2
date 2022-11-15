import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';

type Props = {
  tableData:any
}

function RegistrationTable({tableData}:Props) {
  
  return (
  <div>
    <table id="registrationTable">
      <thead>
        <tr>
          <th>Skratka predmetu</th>
          <th>Nazov predmetu</th>
          <th>Pocet kreditov</th>
          <th>Registracia</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((td:any) => (
          <tr key={td.id}>
            <td>{td.shortcut}</td>
            <td>{td.fullname}</td>
            <td>{td.points}</td>
            <td><Checkbox id={td.id} checkBoxName="reg-table-check-box"></Checkbox></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default RegistrationTable  ;
