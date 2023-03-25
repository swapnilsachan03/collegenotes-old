import { Avatar, Box, Button, Container, FormLabel, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/auth';
import { fileUploadCSS } from "../../styles/fileUploadCSS";

const Register = () => {
  document.title = "Register - CollegeNotes";
  
  const [name, setName] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState<File>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const fileUploadStyle = {
    "&::file-selector-button": fileUploadCSS
  }

  const changeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result ? (reader.result).toString() : "");
      setImage(file);
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", image!);

    dispatch(register(formData) as unknown as any);
  }

  return (
    <Container h={"95vh"} width={["90%", "20em"]}>
      <VStack h={"full"} justifyContent={"center"} spacing={"8"}>

        <form style={{width: "100%"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}>
          <Box marginY={"4"} display={"flex"} justifyContent={"center"} >
            <Avatar src={imagePrev} size={"2xl"} />
          </Box>
          
          <Box marginY={"6"}>
            <FormLabel htmlFor="name" fontSize={'sm'} children="Name" marginBottom={"0"} />
            <Input 
              required
              variant={"flushed"}
              size={"sm"}
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              type={"text"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"6"}>
            <FormLabel htmlFor="email" fontSize={'sm'} children="Email address" marginBottom={"0"} />
            <Input 
              required
              variant={"flushed"}
              size={"sm"}
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              type={"email"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"6"}>
            <FormLabel htmlFor="password" fontSize={'sm'} children="Password" marginBottom={"0"} />
            <Input 
              required
              variant={"flushed"}
              size={"sm"}
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type={"password"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"4"}>
            <FormLabel htmlFor="chooseAvatar" fontSize={'sm'} children="Choose Avatar" />
            <Input
              accept="image/*"
              required
              size={"sm"}
              borderRadius={"5px"}
              id="password"
              type={"file"}
              focusBorderColor={"teal.500"}
              css={fileUploadStyle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => changeImageHandler(e)}
            />
          </Box>
      
          <Button marginY={"4"} size={"sm"} colorScheme={"teal"} type="submit">
            Sign Up
          </Button>

          <Box marginY={"4"} fontSize={"sm"}>
            Already a member? {" "}
            <a href="/auth/login">
              <Button variant="link" size={"sm"} colorScheme={"teal"}>
                Log in
              </Button>
            </a>
            {" "} here
          </Box>
        </form>
      </VStack>
    </Container>
  )
}

export default Register;