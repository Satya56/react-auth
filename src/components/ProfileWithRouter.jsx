import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
//Mendapatkan token dari login
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function withRouter(ProfileCard)