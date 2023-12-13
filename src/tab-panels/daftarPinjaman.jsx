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

const DaftarPinjaman = () => {
    //inisialisasi pesan ketika memanggil API
    const [message, setMessage] = useState('');
    const [res, setRes] = useState({});

    //useEffect otomatis dieksekusi jika halaman sudah termuat
    useEffect(() => {
        console.log("Starting useEffect");
        //inisialisasi kofigurasi untuk pemanggilan API
        const configuration ={
            method: "get",
            url: "http://localhost:8080/api/protected/pinjaman",
            headers:{
                Authorization: `Bearer ${token}`,
            },
        };

        //Memanggil API
        axios(configuration)
            .then((result) => {
                setMessage(result.data.message);
                setRes(result.data.pinjaman);
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
                        Peminjam
                    </Th>
                    <Th>
                        Tanggal Pengembalian
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {res.map((re) => (
                    <Tr key={re.ID}>
                        <Td>
                            {re.Komik.Title}
                        </Td>
                        <Td>
                            {re.User.Name}
                        </Td>
                        <Td>
                            {re.pengembalian}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
            </Table>
        </TableContainer>
    );
}

export default DaftarPinjaman;