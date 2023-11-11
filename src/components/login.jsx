import { FormControl, FormLabel, Flex, Box, Heading, Input, Button, CircularProgress} from "@chakra-ui/react";
import React, {useState} from "react";
import axios from 'axios';
import ErrorMessage from "./ErrorMessage";
import Cookies from "universal-cookie";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
const cookies = new Cookies();

const Login = () => {
 //inisialisasi base url
  const client = axios.create({
    baseURL: "http://localhost:8080"
});
    
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, SetError] = useState('');

    useEffect(() => {
      userRef.current.focus();
    },[]);

    useEffect(() => {
      SetError('');
    },[email, password]);

    const handleLogin = async (e) => {
        setIsLoading(true);
        
        e.preventDefault();

        try{
          const response = await client.post('/api/public/login', 
              JSON.stringify({email, password}),
              {
                headers: {'Content-Type':'application/json'},
                withCredentials: true
              }  
          );
          console.log(JSON.stringify(response?.data));
          const accessToken = response?.data?.accessToken;
          setAuth({email, password, accessToken});
          setEmail('');
          setPassword('');
          navigate(from, {replace: true});
        }
        catch (err) {
          if (!err?.response) {
              SetError('No Server Response');
          } else if (err.response?.status === 400) {
              SetError('Missing Username or Password');
          } else if (err.response?.status === 401) {
              SetError('Unauthorized');
          } else {
              SetError('Login Failed');
          }
          errRef.current.focus();
      } 
        
    }

    console.log(cookies);

    return(
        <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <>
            <Box textAlign="center">
              <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleLogin}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="test@test.com"
                    size="lg"
                    onChange={event => setEmail(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="*******"
                    size="lg"
                    onChange={event => setPassword(event.currentTarget.value)}
                  />
                </FormControl>
                <Button
                  variantColor="teal"
                  variant="outline"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    'Register'
                  )}
                </Button>
              </form>
            </Box>
          </>
      </Box>
    </Flex>
    );
}
export default Login;