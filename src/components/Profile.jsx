import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
//Mendapatkan token dari login
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const Profile = () => {
    

    //inisialisasi pesan ketika memanggil API
    const [message, setMessage] = useState([]);

    console.log(token);
    const client = axios.create({
        baseURL: "http://localhost:8080"
    });

    //useEffect otomatis dieksekusi jika halaman sudah termuat
    useEffect(() => {
        const fetchProfile = async () => {
            try{
                let response = await client.get('/api/protected/profile', {
                    headers:{
                        Authorization: `bearer ${token}`,
                    },
                });
                setMessage(response.data);
                console.log(token);
            }
            catch(error){
                console.log(error);
            }
            
        }
        fetchProfile();
        console.log(message);
    },[message]);
    console.log(message);

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
                <ProfileCard name={result.data.name} email={result.data.email} onSignOut={logout}/>
            </SimpleGrid>
        </Box>
    );
}
export default Profile;
