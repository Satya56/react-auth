import { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const daftarKomik = () => {
    //inisialisasi pesan ketika memanggil API
    const [message, setMessage] = useState('');
    const [res, setRes] = useState({});

    //useEffect otomatis dieksekusi jika halaman sudah termuat
    useEffect(() => {
        console.log("Starting useEffect");
        //inisialisasi kofigurasi untuk pemanggilan API
        const configuration ={
            method: "get",
            url: "http://localhost:8080/api/protected/komik",
            headers:{
                Authorization: `Bearer ${token}`,
            },
        };

        //Memanggil API
        axios(configuration)
            .then((result) => {
                setMessage(result.data.message);
                setRes(result.data);
                console.log(result);
            })
            .catch((error) => {
                error = new Error();
                console.log(error);
            });
            console.log(message);
    },[]);

    return(
        <TableContainer>
            <Table variant='simple'>
            <TableCaption>Daftar Komik</TableCaption>
            <Thead>
                <Tr>
                    <Th>
                        Judul
                    </Th>
                    <Th>
                        Penulis
                    </Th>
                    <Th>
                        Penerbit
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {res.map((re) => (
                    <Tr key={re.ID}>
                        <Td>
                            {re.Title}
                        </Td>
                        <Td>
                            {re.Penulis}
                        </Td>
                        <Td>
                            {re.Penerbit}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
            </Table>
        </TableContainer>
    );
}

export default daftarKomik;

