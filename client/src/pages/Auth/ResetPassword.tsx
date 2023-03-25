import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {
  document.title = "Reset Password - CollegeNotes";

  const [cnfPassword, setCnfPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const params = useParams();
  const { loading, message, error } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if(message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })
    }
    
    if(error) {
      toast.error(error)
      dispatch({ type: "clearError" })
    }
  }, [dispatch, error, message])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password) as any);
  }

  return (
    <Container h={"95vh"} width={["90%", "20em"]}>
      <VStack h={"full"} justifyContent={"center"} spacing={"6"}>
        <Heading
          fontFamily={"Roboto Condensed"}
          size={"lg"}
          children={"Reset Password"}
        />

        <form style={{width: "100%"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          if(password === cnfPassword) {
            submitHandler(e);
          } else {
            e.preventDefault();
            toast.error("Passwords do not match");
          }
        }}>
          <Box marginY={"6"}>
            <FormLabel htmlFor="password" children="Password" fontSize={'sm'} marginBottom={"0"} />
            <Input 
              required 
              id="password"
              variant={"flushed"}
              size={"sm"}
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              type={"password"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"6"}>
            <FormLabel htmlFor="password" children="Confirm password" fontSize={'sm'} marginBottom={"0"} />
            <Input 
              required 
              id="password"
              variant={"flushed"}
              size={"sm"}
              value={cnfPassword} 
              onChange={(e) => setCnfPassword(e.target.value)}
              placeholder="Confirm your new password"
              type={"password"}
              focusBorderColor={"teal.500"}
            />
          </Box>

          <Button marginY={"3"} size={"sm"} colorScheme={"teal"} isLoading={loading} type="submit">
            Reset
          </Button>
        </form>
      </VStack>
    </Container>
  )
}

export default ResetPassword;