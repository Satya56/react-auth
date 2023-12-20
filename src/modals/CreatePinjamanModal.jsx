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
    Box, FormControl, FormLabel, Input, Select
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function CreatePinjamanModal({profile, komiks}){
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [komikId, setKomikId] = useState(0);
    const [tanggal, setTanggal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, SetError] = useState('');
    const client = axios.create({
        baseURL: API_BASE_URL,
    });

    const tambahPinjaman = async (e) =>{
        try{
            e.preventDefault()
            setIsLoading(true);
            //Mencoba mengirimkan data registrasi
              let response = await client.post('/api/protected/addpinjaman',{
                userID: profile,
                komikID: komikId,
                pengembalian: tanggal,} , {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
              }
              );
              console.log(response);
          }catch(error){
            //jika terjadi error, kode ini akan dieksekusi
              //SetError(error);
              console.log(error);
              setIsLoading(false);
          }
          setIsLoading(false);
          onClose();
    }
    console.log(profile);
    console.log(komikId);
    console.log(komiks);

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
              <form onSubmit={tambahPinjaman}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Judul</FormLabel>
                  <Select onChange={event => setKomikId(event.target.value)}>
                    {
                        komiks.map((komik) => (<option key={komik.ID} value={komik.ID}>{komik.Title}</option>))
                    }
                  </Select>
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Tanggal Pengembalian</FormLabel>
                  <Input
                    type="text"
                    placeholder="01/01/2000"
                    size="lg"
                    onChange={event => setTanggal(event.target.value)}
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

export default CreatePinjamanModal;