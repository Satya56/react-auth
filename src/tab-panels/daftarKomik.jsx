import { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tr,
    Th,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from "universal-cookie";
import NavBar from "../navbar/Header";
import { API_BASE_URL } from "../constants";
import KomiksList from "./KomiksList";
import withRouter from "../components/WithRouter";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const DaftarKomik = () => {
    //inisialisasi pesan ketika memanggil API
    const [message, setMessage] = useState('');
    const [res, setRes] = useState({});
    const client = axios.create({
        baseURL: API_BASE_URL,
    })

    //useEffect otomatis dieksekusi jika halaman sudah termuat
    useEffect(() => {
        console.log("Starting useEffect");
        //inisialisasi kofigurasi untuk pemanggilan API
        const fetchKomik = async () => {
            try{
                let response = await client.get('/api/protected/komik', {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                setRes(response.data.komik);
                console.log(res);
            } catch(error){
                setMessage(error);
                console.log(message);
            }
        };
        fetchKomik();
    },[]);
    console.log(res);
    console.log(token);
    console.log(message);

    return(
        <>
        <NavBar />
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
            <KomiksList komiks={res} />
            </Table>
        </TableContainer>
        </>
    );
}

export default withRouter(DaftarKomik);

