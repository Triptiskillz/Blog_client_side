import logo from './logo.svg';
import './App.css';


//component
import Login from './components/account/Login';
import { Box } from '@mui/material';
import DataProvider from './context/DataProvider';
function App() {
  return (
    <Box style={{ marginTop: 64 }}>
      <DataProvider>
        <Login />
      </DataProvider>
    </Box>
  );
}

export default App;
