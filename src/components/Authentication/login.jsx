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

const Login = () => {
  const navigate=useNavigate();
    const handleClick=()=>{
      setShow(!show);
  }
  const postDetails=(pic)=>{
      console.log(pic);
  }
  const submitHandler=async()=>{
    if(!email || !password){
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
    console.log(email);
    console.log(password);
    try{
        const res=await fetch("http://localhost:3000/api/user/login",{
            method:"POST",
           headers:{
               "Content-Type":"application/json",
           },
           body:JSON.stringify({
               email,
               password,
            })
        });
       console.log("ok!");
       const data=await res.json();
       console.log(data.name);
     
       localStorage.setItem("userInfo",JSON.stringify(data));
       setLoading(false);
       navigate("/chats");
       toast({
           title:"Login Successful",
           status:"success",
           duration:2500,
           isClosable:true,
           position:"bottom",
       });
   }
   catch(err){
       console.log(err);
       toast({
           title:"Password didn't match",
           status:"warning",
           duration:2500,
           isClosable:true,
           position:"bottom",
       });
       setLoading(false);
   }

  }
  const [show,setShow]=useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading, setLoading] = useState(false)
  const toast=useToast();
  // const [email,setEmail]=useState();
  // const [email,setEmail]=useState();
return (
  <VStack spacing="5px" color="black">
     
      <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter Your Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input  value={password}
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

      
      {/* <input type="file"></input> */}
      <Button 
          colorScheme='blue'
          width="100%"
          style={{marginTop:15}}
          isLoading={loading}
          onClick={submitHandler}>
              Login
          </Button>
          <Button 
            colorScheme='red'
            width="100%"
            variant="solid"
            style={{marginTop:15}}
            onClick={()=>{
                setEmail("guest@example.com")
                setPassword("123456");
            }}>
                Get User Credentials
     </Button>
  </VStack>      

  )
}

export default Login;
