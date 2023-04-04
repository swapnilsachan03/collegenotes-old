import ProtectedRoute from '@/others/ProtectedRoute';
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';

const ChangePassword = () => {
  document.title = "Change Password - CollegeNotes";
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, []);
  
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state: any) => state.profile);

  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch({ type: "clearError" });
    }

    if(message) {
      toast.success(message)
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message])

  const submitHandler = async (e: Event) => {
    e.preventDefault();
    dispatch(changePassword({oldPassword, newPassword}) as any);
  }

  return (
    <>
    <Head>
      <title>Change Password - CollegeNotes</title>
      <meta name='description' content='Change your CollegeNotes account passsword using the old one.'/>

      <meta property='og:title' content='Change Password - CollegeNotes'/>
      <meta property='og:description' content='Change your CollegeNotes account passsword using the old one.'/>

      <meta content='Change Password - CollegeNotes' name='twitter:title'/>
      <meta content='Change your CollegeNotes account passsword using the old one.' name='twitter:description'/>
    </Head>
    
    <Container h={"95vh"} width={["90%", "20em"]}>
      <VStack h={"full"} justifyContent={"center"} spacing={"6"}>
        <Heading fontFamily={"Roboto Condensed"} size={"lg"} children={"Change Password"} />

        <form style={{width: "100%"}}>
          <Box marginY={"6"}>
            <FormLabel htmlFor="old-password" children="Old password" fontSize={'sm'} marginBottom={"0"} />
            <Input 
              required 
              id="old-password"
              variant={"flushed"}
              size={"sm"}
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              type={"password"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"4"}>
            <FormLabel htmlFor="new-password" children="New password" fontSize={'sm'} marginBottom={"0"} />
            <Input 
              required
              id="new-password"
              variant={"flushed"}
              size={"sm"}
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              type={"password"}
              focusBorderColor={"teal.500"}
            />
          </Box>

          <Button marginY={"4"} size={"sm"} colorScheme={"teal"} type="submit" isLoading={loading} onClick={(e: any) => submitHandler(e)}>
            Update
          </Button>
        </form>
      </VStack>
    </Container>
    </>
  )
}

export default ProtectedRoute(ChangePassword, true, false);