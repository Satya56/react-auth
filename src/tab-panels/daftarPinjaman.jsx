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
import { API_GET_PINJAMAN, API_BASE_URL } from "../constants";
import CreatePinjamanModal from "../modals/CreatePinjamanModal";
import NavBar from "../navbar/Header";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const DaftarPinjaman = () => {
    //inisialisasi pesan ketika memanggil API
    const [message, setMessage] = useState('');
    const [profileId, setProfileId] = useState(0);
    const [komikList, setKomikList] = useState([]);
    const [res, setRes] = useState([]);
    const [error, setError] = useState('');
    const client = axios.create({
        baseURL: API_BASE_URL,
    });

    //useEffect otomatis dieksekusi jika halaman sudah termuat
    useEffect(() => {
        console.log("Starting useEffect");
        //inisialisasi kofigurasi untuk pemanggilan API
        const configuration ={
            method: "get",
            url: API_GET_PINJAMAN,
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

            const getKomik = async () =>{
                try{
                    let response = await client.get('/api/protected/komik', {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setKomikList(response.data.komik);
                    console.log(komikList);
                } catch (error){
                    setError(error);
                    console.log(error);
                }
            }
    
            const getProfile = async () =>{
                try{
                    let response = await client.get('/api/protected/profile', {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfileId(response.data.ID);
                    console.log(profileId);
                } catch (error){
                    setError(error);
                    console.log(error);
                }
            }
            getKomik();
            getProfile();
    },[]);

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
                        Peminjam
                    </Th>
                    <Th>
                        Tanggal Pengembalian
                    </Th>
                    <Th>
                        <CreatePinjamanModal profile={profileId} komiks={komikList} />
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
        </>
    );
}

export default DaftarPinjaman;