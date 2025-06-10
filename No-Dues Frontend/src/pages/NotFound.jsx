// NotFoundPage.jsx

import { Typography, Button } from '@mui/material';

export default function NotFoundPage() {

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <div className='flex flex-col items-center'>
            <Typography variant="h4">
                404: Page Not Found
            </Typography>

            <Typography variant="subtitle1">
                Sorry, the page you are looking for could not be found.
            </Typography>

            <Button variant="contained" color="primary" href="/">
                Go to Homepage
            </Button>
            </div>
        </div>
    );

}
