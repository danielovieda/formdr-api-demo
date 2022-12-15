import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
const axios = require('axios').default;

export default function Settings() {
    return (
        <div className="mb-3">
            <Stack spacing={2}>
            <Typography variant="h4" gutterBottom>
        EMR Settings
      </Typography>
      <TextField id="standard-basic" label="EMR Name" variant="standard" placeholder="EMR Name" />
            <TextField id="standard-basic" label="EMR Endpoint" variant="standard" placeholder="EMR Endpoint" />
            <hr />
            <Typography variant="h4" gutterBottom>
        FormDr API Settings
      </Typography>
            <TextField id="standard-basic" label="Client ID" variant="standard" placeholder="Client ID" />
            <TextField id="standard-basic" label="Client Secret" variant="standard" placeholder="Client Secret" />

            <button className="btn btn-primary">Get Token</button>
            
            </Stack>
            
        </div>
    )
}