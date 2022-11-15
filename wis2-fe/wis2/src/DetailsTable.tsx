import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type Props = {
    tableValues:any
    tableData:any
}

function DetailsTable({tableData, tableValues}:Props) {
    return (
        <div>
            <table id="detailsTable">
                <thead>
                    {tableValues.map((td:any) => (
                        <tr key={td.id}>
                            <th>{td.shortcut}</th>
                            <th>{td.fullname}</th>
                            <th>{td.credits}</th>
                            <th>{td.link}</th>
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {tableData.map((td:any) => (
                    <tr key={td.id} style={{display: td.visible === "true" ? 'table-row' : 'none' }}>
                        <td>{td.shortcut}</td>
                        <td>{td.fullname}</td>
                        <td>{td.credits}</td>
                        <td><Link to={td.detailsLink + '/' + td.shortcut}>detail</Link></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DetailsTable;
