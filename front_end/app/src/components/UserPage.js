import React, { useState } from 'react';
import axios from 'axios';
import MyTable from './BaseTable';
import SendMessageModal from './SendMessageModal';

const UserList = () => {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            let url = `/auth/api/users/`;
            const response = await axios.get(url, { withCredentials: true });
            if (response.status === 200) {
                setData(response.data);
            } else {
                console.log('Error fetching data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const columns = React.useMemo(() => [
        {
            accessorKey: 'username',
            header: () => 'User',
        },
        {
            accessorKey: 'date_joined',
            header: () => 'Date Joined',
        },
        {
            accessorKey: 'send_message',
            header: () => 'Send Message',
            cell: ({ row }) => (
                <button onClick={() => openModal(row.original)}>Send</button>
            ),
        },
    ], []);

    return (
        <>
            <MyTable data={data} columns={columns} />
            <hr />
            <button onClick={fetchData}>Refresh Data</button>

            {/* Send Message Modal */}
            <SendMessageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                receiver={selectedUser}
            />
        </>
    );
};

export default UserList;
