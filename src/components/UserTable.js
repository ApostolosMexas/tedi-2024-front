import {MaterialReactTable} from 'material-react-table';
import React, { useState, useEffect } from "react";
import {apiCallsUser} from "../api/calls/user"
import { Button } from 'reactstrap';
import '../assets/css/components/userTable.css';

export const UserTable = (props) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [users, setUsers] = useState([]);

  const handleCheckboxChange = (event, rowId) => {
    console.log(selectedRows)
    if (event.target.checked) {
        setSelectedRows([...selectedRows, rowId]); // Add row Id to selectedRows array
    } else {
        setSelectedRows(selectedRows.filter(id => id !== rowId)); // Remove row Id from selectedRows array
    }
  };
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await apiCallsUser.User.get_all_users();
          console.log(response);
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchData();
      console.log(users);
    }, []);

    const handlePdfExport = () => {
      console.log(selectedRows);
    };
    const handleExcelExport = () => {
      console.log(selectedRows);
    };


  const columns = [
    {
      accessorKey: 'checkboxes',
      header: <input type="checkbox"/>,
      width: 120,
      Cell: ({ row }) => (
        <input
            type="checkbox"
            checked={selectedRows.includes(row.original.Id)}
            onChange={(e) => handleCheckboxChange(e, row.original.Id)}
        />
      ),
      width: 50,
      sortable: false,
      headerAlign: 'center',
      cellAlign: 'center'
    },
    { accessorKey: 'Name', header: 'Όνομα', width: 130 },
    { accessorKey: 'Surname', header: 'Επώνυμο', width: 130 },
    { accessorKey: 'Email', header: 'Email', width: 130},
    {
      accessorKey: 'Id',
      header: 'Στοιχεία',
      width: 120,
      Cell: ({ row }) => (
        <Button onClick={() => console.log(row.original.Id)}>Στοιχεία Χρήστη</Button>
      )
    }
  ];

  return (
    <>
      <div>
        <Button className="pdf-export" onClick={() => handlePdfExport()}>Pdf Export</Button>
        <Button className="excel-export" onClick={() => handleExcelExport()}>Excel Export</Button>
      </div>

      <MaterialReactTable
          columns={columns}
          data={users}
          enableColumnActions={false}
          enableFullScreenToggle={false}
          enableHiding={false}
          enableDensityToggle={false}
      />
    </>
  );
};


export default UserTable;
