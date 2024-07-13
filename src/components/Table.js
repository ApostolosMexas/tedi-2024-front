import {MaterialReactTable} from 'material-react-table';
import React, { useState, useEffect } from "react";
import {apiCallsUser} from "../api/calls/user"
import { Button } from 'reactstrap';
import '../assets/css/components/userTable.css';

export const Table = (props) => {
    const [users, setUsers] = useState([]);

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

  const columns = [
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
    <h2 className='title'>Εγγεγραμμένοι Χρήστες</h2>
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


export default Table;
