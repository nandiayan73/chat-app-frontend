import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast
  } from '@chakra-ui/react'
import {VStack} from "@chakra-ui/layout"
import { json } from 'react-router-dom'
const Signup = () => {
    const navigate=useNavigate();
    const handleClick=()=>{
        setShow(!show);
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        if(!name||!email||!password){
            toast({
                title:"Please fill all the details",
                status:"warning",
                duration:2500,
                isClosable:true,
                position:"bottom",
            });
            return;
        }
        setLoading(true);
       try{
         const res=await fetch("http://localhost:3000/api/user",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name,
                email,
                password,
                pic
            })
        });
        const data=await res.json();
        console.log(data.name);
      
        // localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        navigate("/chats");
        toast({
            title:"Registration Successful",
            status:"success",
            duration:2500,
            isClosable:true,
            position:"bottom",
        });
    }
    catch(err){
        console.log(err);
        toast({
            title:"Error",
            status:"warning",
            duration:2500,
            isClosable:true,
            position:"bottom",
        });
        setLoading(false);
    }
        
        
    }
    const [show,setShow]=useState(false);
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [pic,setPic]=useState();
    const [loading, setLoading] = useState(false)
    const toast=useToast();

    const postDetails=async (pic)=>{
        console.log(pic)
        setLoading(true);
            if(pic===undefined){
                toast({
                    title:"Please Select an Image",
                    status:"warning",
                    duration:2500,
                    isClosable:true,
                    position:"bottom",
                });
                setLoading(false)
                return;
            }
            console.log(pic.type);
 if(pic.type==="image/jpeg" || pic.type==="image/png"){
                const data=new FormData();
                data.append("file",pic);
                data.append("upload_preset","my_chat-app");
                data.append("cloud_name","djmmkgei0");
    try{
        const response= await fetch("https://api.cloudinary.com/v1_1/djmmkgei0/image/upload",{
            method:"post",
            body:data,
           });
        console.log(response);
        const info = await response.json();
        console.log(info);
        setLoading(false);
        setPic(info.url.toString());
    }
    catch(err){
        console.log(err);
        setLoading(false);
    }
            }
            else{
                toast({
                    title:pic.type +" is not supported",
                    status:"warning",
                    duration:2500,
                    isClosable:true,
                    position:"bottom",
                });
                setLoading(false);
            }
        }


  return (
    <VStack spacing="5px" color="black">
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter Your Name"
            onChange={(e)=>setName(e.target.value)}
            ></Input>
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter Your Email"
            onChange={(e)=>setEmail(e.target.value)}
            ></Input>
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input 
            type={show?"text":"password"}
            placeholder="Enter Your Password"
            onChange={(e)=>setPassword(e.target.value)}
            ></Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show? "Hide":"Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="pic" >
            <FormLabel>Upload Your Picture</FormLabel>
            <Input type="file"
            p={1.5}
            accept='image/*'//props for accepting only images
            onChange={(e)=>postDetails(e.target.files[0])}
            // onChange={(e)=>postDetails(e)}
            ></Input>
        </FormControl>
        {/* <input type="file"></input> */}
        <Button 
            colorScheme='blue'
            width="100%"
            style={{marginTop:15}}
            isLoading={loading}
            onClick={submitHandler}>
                Sign Up
     </Button>
     <img src={pic} ></img>
    </VStack>      
  )
}

export default Signup;