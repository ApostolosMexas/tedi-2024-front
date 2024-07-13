import {MaterialReactTable} from 'material-react-table';
import React, { useState, useEffect } from "react";
import {apiCallsUser} from "../api/calls/user"
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../assets/css/components/userTable.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {apiCallsData} from "../api/calls/data"

export const UserTable = (props) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

  const handleCheckboxChange = (event, rowId) => {
    if (event.target.checked) {
        setSelectedRows([...selectedRows, rowId]); // Add row Id to selectedRows array
    } else {
        setSelectedRows(selectedRows.filter(id => id !== rowId)); // Remove row Id from selectedRows array
    }
  };
  const handleViewUserDetails = (userId) => {
    navigate(`index/user/${userId}`);
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

  const exportToPdf = async (data) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPos = 20;

    // Set font size and add title
    doc.setFontSize(16);
    doc.text('User Data Report', 20, yPos);
    yPos += 10;

    // Set font size for body text
    doc.setFontSize(12);

    const addTextToDoc = (text) => {
        const lines = doc.splitTextToSize(text, 180);
        lines.forEach(line => {
            if (yPos > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(line, 20, yPos);
            yPos += 10;
        });
    };

    data.forEach(item => {
        addTextToDoc('User Data:');
        addTextToDoc(JSON.stringify(item.userData, null, 2));
        
        addTextToDoc('User Posts:');
        addTextToDoc(JSON.stringify(item.userPosts, null, 2));
        
        addTextToDoc('User Comments:');
        addTextToDoc(JSON.stringify(item.userComments, null, 2));
        
        addTextToDoc('User Offers:');
        addTextToDoc(JSON.stringify(item.userOffers, null, 2));

        yPos += 10;
    });

    doc.save('UserData.pdf');
  };
  const exportToExcel = async (data) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'UserData');
      XLSX.writeFile(workbook, 'UserData.xlsx');
  };
  const handleExport = async (type) => {
    try {
        const selectedData = users.filter(user => selectedRows.includes(user.Id));
        const userIds = selectedData.map(user => user.Id);
        let Data = [];
        for (let userId of userIds) {
            const userPosts = await apiCallsData.Data.getPosts(userId);
            const userComments = await apiCallsData.Data.getComments(userId);
            const userOffers = await apiCallsData.Data.getOffers(userId);

            Data.push({
                userData: selectedData,
                userPosts: userPosts.data,
                userComments: userComments.data,
                userOffers: userOffers.data,
            });
        }
        if(type === 'pdf'){
          await exportToPdf(Data);
        }else{
          await exportToExcel(selectedData);
        }
    } catch (error) {
        console.error('Error exporting data:', error);
    }
  }


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
        <Button onClick={() => handleViewUserDetails(row.original.Id)}>Στοιχεία Χρήστη</Button>
      )
    }
  ];

  return (
    <>
      <div>
        <Button className="pdf-export" onClick={() => handleExport('pdf')}>Pdf Export</Button>
        <Button className="excel-export" onClick={() => handleExport('excel')}>Excel Export</Button>
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
