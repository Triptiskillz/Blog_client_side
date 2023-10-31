import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useState,useContext } from 'react';
import { API } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 1px 10px 4px rgb(0 0 0/ 0.1);
`;

const Image = styled('img')({
  width: 100,
  display: 'flex',
  margin: 'auto',
  padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
  username: '',
  password: ''
};

const signupInitialValues = {
  name: '',
  username: '',
  password: '',
};

const Login = ({ isUserAuthenticated }) => {

  const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  const [account, toggleAccount] = useState("login")
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState('');

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    showError(false);
}, [login])

  const toggleSigup = (value) => {
    toggleAccount(value)
  }

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value })

  }
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })

  }
  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
    if (response.isSuccess) {
        showError('');
        setSignup(signupInitialValues);
        toggleAccount('login');
    } else {
        showError('Something went wrong! please try again later');
    }
    } catch (error) {
      console.error(error);
    }
   
}

const loginUser = async () => {
  let response = await API.userLogin(login);
  if (response.isSuccess) {
      showError('');
      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
      //setAccount({ name: response.data.name, username: response.data.username });
      
       (true)
      setLogin(loginInitialValues);
      navigate('/');
  } else {
      showError('Something went wrong! please try again later');
  }
}

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt='login' />
        {account === 'login' ?
          <Wrapper>
            <TextField type="text" variant="standard" onChange={(e) => onValueChange(e)} name='username' label="Enter Username" />
            <TextField type="password" variant="standard" onChange={(e) => onValueChange(e)} name='password' label="Enter Password" />
            
            {error && <Error>{error}</Error>}
            {/*onClick={() => loginUser()} */}
            <LoginButton variant='contained' onClick={() => loginUser()} >Login</LoginButton>
            <Typography style={{ textAlign: 'center' }}>OR</Typography>
            <SignupButton onClick={() => toggleSigup('signup')}>Create an account</SignupButton>
          </Wrapper>
          :
          <Wrapper>
            <TextField variant="standard" name='name' onChange={(e) => onInputChange(e)} label='Enter Name' />
            <TextField variant="standard" name='username' onChange={(e) => onInputChange(e)} label='Enter Username' />
            <TextField variant="standard" name='password' onChange={(e) => onInputChange(e)} label='Enter Password' />

            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSigup('login')}>Already have an account</LoginButton>
          </Wrapper>
        }
      </Box>
    </Component>
  )
}

export default Login
