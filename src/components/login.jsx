import { FormControl, FormLabel, Flex, Box, Heading, Input, Button, CircularProgress} from "@chakra-ui/react";
import {Link as ReactRouterLink} from 'react-router-dom';
import {Link as ChakraLink} from '@chakra-ui/react';
import {useState} from "react";
import axios from 'axios';
import ErrorMessage from "./ErrorMessage";
import Cookies from "universal-cookie";
import { API_AUTH_LOGIN } from "../constants";
const cookies = new Cookies();

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, SetError] = useState('');
    const client = axios.create({
        baseURL: "http://localhost:8080"
    });

    const handleLogin = (e) => {
        setIsLoading(true);
        
        e.preventDefault();

        //set configurations
        const configuration = {
          method: "post",
          url: API_AUTH_LOGIN,
          data: {
            email,
            password,
          }, 
        };

        //memanggil API
        axios(configuration)
          .then((result) => {
            //set the cookie
            cookies.set("TOKEN", result.data.token, {
              path:"/",
            });
            window.location.href = "/profile";

            setIsLoading(false);
          })
          .catch((error) => {
            error = new Error();
            setIsLoading(false);
          });
          setIsLoading(false);
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
                  variantcolor="teal"
                  variant="solid"
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
                    'Login'
                  )}
                </Button>
                
              </form>
              <ChakraLink as={ReactRouterLink} to='/register'>
              <Button
                  variantcolor="teal"
                  variant="solid"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  Register
                </Button>
              </ChakraLink>
              
            </Box>
          </>
      </Box>
    </Flex>
    );
}
export default Login;