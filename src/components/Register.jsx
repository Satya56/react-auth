import { FormControl, FormLabel, Flex, Box, Heading, Input, Button, CircularProgress} from "@chakra-ui/react";
import React, {useState} from "react";
import axios from 'axios';
import ErrorMessage from "./ErrorMessage";


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, SetError] = useState('');
    const client = axios.create({
        baseURL: "http://localhost:8080"
    });

    const register = async () => {
        setIsLoading(true);
        try{
            let response = await client.post('/public/signup',{
                name: name,
                email: email,
                password: password,
            }
            );
        }catch(error){
            SetError(error);
            console.log(error);
        }
        setIsLoading(false);
    }

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
              <form onSubmit={register}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Nama</FormLabel>
                  <Input
                    type="text"
                    placeholder="john doe"
                    size="lg"
                    onChange={event => setName(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="test@test.com"
                    size="lg"
                    onChange={event => setEmail(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={12}>
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
export default Register;