import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import withRouter from "./WithRouter";
//Mendapatkan token dari login
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const Profile = () => {
    //inisialisasi pesan ketika memanggil API
    const [message, setMessage] = useState('');
    const [res, setRes] = useState({});

    console.log(token);

    //useEffect otomatis dieksekusi jika halaman sudah termuat
    useEffect(() => {
        console.log("Starting useEffect");
        //inisialisasi kofigurasi untuk pemanggilan API
        const configuration ={
            method: "get",
            url: "http://localhost:8080/api/protected/profile",
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

    //inisialisasi kofigurasi untuk pemanggilan API
    // const configuration ={
    //     method: "get",
    //     url: "http://localhost:8080/api/protected/profile",
    //     headers:{
    //         Authorization: `Bearer ${token}`,
    //     },
    // };

    // //Memanggil API
    // axios(configuration)
    //     .then((result) => {
    //         setMessage(result.data.message);
    //         console.log(result);
    //         setRes(result.data);
    //     })
    //     .catch((error) => {
    //         error = new Error();
    //     });
    //     console.log(message);
    // console.log(res);
    

    //logout
    const logout = () =>{
        //Menghancurkan cookie
        cookies.remove("TOKEN", {path: "/"});
        //mengarahkan pengguna ke landing page
        window.location.href = "/";
    }

    return(
        <Box boxShadow="lg">
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                <ProfileCard name={res.name} email={res.email} onSignOut={logout}/>
            </SimpleGrid>
        </Box>
    );
}
export default withRouter(Profile);
