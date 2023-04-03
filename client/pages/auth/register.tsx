import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, Container, FormLabel, HStack, Input, useDisclosure, VStack } from '@chakra-ui/react';
import ReactGA from "react-ga4";
import React, { useState, useEffect } from 'react';
import { FaExclamation } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/auth';
import { fileUploadCSS } from "../../styles/fileUploadCSS";
import ProtectedRoute from '@/others/ProtectedRoute';

const Register = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, []);
  
  const [name, setName] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState<File>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

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

          <HStack>  
            <Button marginY={"4"} size={"sm"} colorScheme={"teal"} type="submit">
              Sign Up
            </Button>

            <Button onClick={onOpen} size={"sm"} colorScheme={"orange"} type="button" children={<FaExclamation />} />
          </HStack>

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

      <AlertDialog
        motionPreset='slideInBottom'
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay />

        <AlertDialogContent marginX={["2", "0"]}>
          <AlertDialogHeader>Disclosure</AlertDialogHeader>
          <AlertDialogCloseButton />

          <AlertDialogBody fontFamily={"Inter"} fontSize={["14px", "15px"]}>
            The present authentication system is just for providing functionality to the users and requires no email verification, thus the account recovery doesn't work with the accounts you create now.<br/><br/>

            Your account and associated information will be deleted once a permanent authentication system is implemented.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button size={"sm"} colorScheme={"orange"} variant={"outline"} onClick={onClose}>
              Okay
            </Button>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </Container>
  )
}

export default ProtectedRoute(Register, false, false, "/user/profile");