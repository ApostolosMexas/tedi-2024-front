import {MaterialReactTable} from 'material-react-table';
import React, { useState, useEffect } from "react";
import {apiCallsUser} from "../api/calls/user"
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../assets/css/components/userTable.css';
import '../assets/css/components/networkTable.css';


export const NetworkTable = (userId) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleViewUserDetails = (userId) => {
      navigate(`index/user/${userId}`);
    };

    useEffect(() => {
      async function fetchData() {
        try {
          const userId = localStorage.getItem('userId')
          const response = await apiCallsUser.User.getNetwork(userId);
          console.log(response);
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchData();
      console.log(users);
    }, [userId]);

  const columns = [
    { accessorKey: 'Name', header: 'Όνομα', width: 80 },
    { accessorKey: 'Surname', header: 'Επώνυμο', width: 80 },
    { accessorKey: 'Position', header: 'Επαγγελματική Θέση', width:110},
    { accessorKey: 'Company', header: 'Φορέας Απασχόλησης', width:110},
    {
      accessorKey: 'Avatar',
      header: 'Εικόνα',
      width:50,
      Cell:({row})=>(
        <img
          className='profil-img'
          src={`${process.env.REACT_APP_API_LINK}users/uploads/${row.original.Avatar}`}
          alt="User Avatar"
        />
      )
    },
    {
      accessorKey: 'Id',
      header: 'Στοιχεία',
      width: 100,
      Cell: ({ row }) => (
        <Button onClick={() => handleViewUserDetails(row.original.Id)}>Στοιχεία Χρήστη</Button>
      )
    }
  ];

  return (
    <>
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


export default NetworkTable;
