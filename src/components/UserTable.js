import {MaterialReactTable} from 'material-react-table';
import React, { useState, useEffect } from "react";
// import {apiCallsUser} from "../api/calls/user"

export const UserTable = (props) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const {} = props;
  const columns = [
    { accessorKey: 'id', header: 'ID', width: 70 , width: 130},
    { accessorKey: 'firstName', header: 'First name', width: 130 },
    { accessorKey: 'lastName', header: 'Last name', width: 130 },
    { accessorKey: 'age', header: 'age', width: 100},
  ]
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await apiCallsUser.User.get_all_users();
//       setTableData(response.data);
//     }
//     fetchData();
//   }, []);

  return (
    <MaterialReactTable
        enableRowSelection
        // onRowSelectionChange={setSelectedRows}
        columns={columns}
        data={rows}
        enableColumnActions={false}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableDensityToggle={false}
    />
  );
};


export default UserTable;
