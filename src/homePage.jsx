import React from "react";
import {Button} from "@chakra-ui/button"
import { Container,Box, Text,Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import {useState} from "react"
import axios from "axios"
import Login from "./components/Authentication/login"
import Signup from "./components/Authentication/signup"


const Homepage=()=>{
   return(
    <>
    {/* Container is like div */}
    <Container madWidth='xl' centerContent>
        <Box d="flex"
        justifyContent="center"
        p={3}//padding
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth="1px"
        >
            <center><Text fontFamily="work sans" fontSize={"2xl"} color="black">Jai Shree Krishna</Text></center>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
    <Tabs variant='soft-rounded' >
        <TabList>
            <Tab width="50%">Sign Up</Tab>
            <Tab width="50%">Login</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <Signup></Signup>
            </TabPanel>
            <TabPanel>
                <Login></Login>
            </TabPanel>
        </TabPanels>
</Tabs>
        </Box>
    </Container>
    </>
   )
    
}
export default Homepage;