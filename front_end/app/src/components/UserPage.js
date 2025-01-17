import React, { useState } from 'react';
import '../styles/tanstack.css';
import axios from 'axios';
import MyTable from './BaseTable';

const UserList = () => {
  const columns = React.useMemo(() => [
    {
      accessorKey: 'username',
      header: () => 'User',
      footer: props => props.column.id,
    },
    {
      accessorKey: 'date_joined',
      header: () => 'Date Joined',
      footer: props => props.column.id,
    }
  ], []);


  const [data, setData] = useState([]);
  
  const fetchdata = async () => {
    try {
        let url = `http://localhost:8000/api/users/`;
        const response = await axios.get(url);
        if (response.status === 200) {
            setData(response.data);
        } else {
            console.log('error fetching data')
        }
    } catch (error) {
        }
    }
  

  return (
    <>
      <MyTable data={data} columns={columns} />
      <hr />
      <div>
        <button onClick={() => fetchdata()}>Refresh Data</button>
      </div>
    </>
  );
};

export default UserList;
