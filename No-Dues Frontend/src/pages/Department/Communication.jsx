import { TextField, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { List, TextFields } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Header from '../../components/Nav';

export default function CommunicationPage() {

    const [message, setMessage] = useState(defaultMessage);
    const [menuData, setMenuData] = useState([
        {
            id: 1,
            name: 'Something',
            icon: <List />
        },
        {
            id: 2,
            name: 'Something',
            icon: <TextFields />
        },
        {
            id: 3,
            name: 'Something',
            icon: <List />
        }
    ]);
    const handleSave = () => {
        // Save logic
    }

    // useEffect(() => {
    //     // Fetch menu data from API
    //     const fetchData = async () => {
    //         const response = await fetch('/api/menu');
    //         const data = await response.json();
    //         setMenuData(data);
    //     }
    //     // fetchData();
    // }, []);

    return (
        <div>
        <Header label={"REMINDER PAGE"} isDep={true}/>
            <Box sx={{ p: 4, bgcolor: 'grey.100' }}>
                <div className='flex flex-row'>
                    <div className='flex flex-col w-5/6 pr-4'>
                        <div className='pb-4'>
                            <TextField
                                fullWidth
                                multiline
                                rows={24}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>

                    <Box className="flex flex-col w-1/6 border border-gray-300 rounded-md">
                        {menuData.map((item) => (
                            <ListItem
                                key={item.id}
                                className="flex items-center justify-center border-b border-gray-300 hover:bg-blue-100"
                            >
                                <span className="px-4 py-2 text-gray-700 text-sm font-medium">{item.name}</span>
                            </ListItem>
                        ))}
                    </Box>

                </div>
            </Box>
        </div>
    );

}

const defaultMessage = `
  Hello,

  This is a default message that can be edited.

  Regards,
  John
`;
