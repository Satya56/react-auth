import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    CircularProgress,
    Box, FormControl, FormLabel, Input, 
  } from '@chakra-ui/react'
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function CreateKomikModal(){
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [title, setTitle] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [penulis, setPenulis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, SetError] = useState('');
    const client = axios.create({
        baseURL: API_BASE_URL,
    });
    const tambahKomik = async () =>{
        try{
            setIsLoading(true);
            //Mencoba mengirimkan data registrasi
              let response = await client.post('/api/protected/addkomik',{
                title: title,
                penulis: penulis,
                penerbit: penerbit,} , {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
              }
              );
              console.log(response);
          }catch(error){
            //jika terjadi error, kode ini akan dieksekusi
              SetError(error);
              console.log(error);
              setIsLoading(false);
          }
          setIsLoading(false);
          onClose();
    }

    return(
        <>
            <Button onClick={onOpen}> Tambah Komik </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Tambah Komik</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Box my={4} textAlign="left">
              <form onSubmit={tambahKomik}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Judul</FormLabel>
                  <Input
                    type="text"
                    placeholder="Buku Bahasa Indonesia"
                    size="lg"
                    onChange={event => setTitle(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Penulis</FormLabel>
                  <Input
                    type="text"
                    placeholder="Pak Budi"
                    size="lg"
                    onChange={event => setPenulis(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={12}>
                  <FormLabel>Penerbit</FormLabel>
                  <Input
                    type="text"
                    placeholder="Erlangga"
                    size="lg"
                    onChange={event => setPenerbit(event.currentTarget.value)}
                  />
                </FormControl>
                <Button
                  variantcolor="teal"
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
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                             Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateKomikModal;