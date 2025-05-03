import React, {useState} from 'react';
import '../styles/tanstack.css';
import axios from 'axios';
import MyTable from './BaseTable';

const UserList = () => {
    const columns = React.useMemo(() => [
        {
            accessorKey: 'file_name',
            header: () => 'File Name',
            footer: props => props.column.id,
        },
        {
            accessorKey: 'file_size',
            header: () => 'Size',
            footer: props => props.column.id,
        },
        {
            accessorKey: 'uploaded_at',
            header: () => 'Uploaded At',
            footer: props => props.column.id,
        },
        {
            accessorKey: 'description',
            header: () => 'Description',
            footer: props => props.column.id,
        },
        {
            id: 'download',
            header: 'Download',
            cell: ({row}) => {
                const file = row.original;
                const handleDownload = () => {
                    const to_url = `${process.env.REACT_APP_FILE_SERVICE}/file/api/download/${file.file_name}`;
                    window.location.href = to_url;
                };
                return <button onClick={handleDownload}>Download</button>;
            },
            footer: props => props.column.id,
        }
    ], []);


    const [data, setData] = useState([]);

    const fetchdata = async () => {
        try {
            let url = `/file/api/files/`;
            const response = await axios.get(url, {withCredentials: true});
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
            <MyTable data={data} columns={columns}/>
            <hr/>
            <div>
                <button onClick={() => fetchdata()}>Refresh Data</button>
            </div>
        </>
    );
};

export default UserList;
