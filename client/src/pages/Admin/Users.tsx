import { Button, Flex, Heading, HStack, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-hot-toast';
import { FaUserMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from "../../components/AdminNav";
import { changeRole, deleteUser, getAllUsers } from '../../redux/actions/admin';

const Users = () => {
  document.title = "Users Manager - CollegeNotes";
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, []);
  
  const dispatch = useDispatch();
  const { users, loading, error, message } = useSelector((state: any) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers() as any);
    
    if(error) {
      toast.error(error);
      dispatch({ type: "clearError"});
    };
    
    if(message) {
      toast.success(message);
      dispatch({ type: "clearMessage"});
    };
  }, [dispatch, error, message])

  const changeRoleHandler = (userId: String) => {
    dispatch(changeRole(userId) as any);
  }

  const deleteUserHandler = (userId: String) => {
    dispatch(deleteUser(userId) as any);
  }

  return (
    <>
    <AdminNav />
    <Flex
      minH={"90vh"}
      width={"100%"}
      direction={"row"}
      justifyContent={"space-around"}
    >
      <Stack
        height={"100%"}
        marginX={["3","3","0","0","0"]}
        marginY={["8","10","12","12"]}
        width={"container.xl"}
      >
        <Heading
          fontFamily={"Poppins"}
          children="Users Manager"
          size={"xl"}
          paddingBottom={"8"}
          textAlign={"center"}
        />

        <TableContainer width={["100vw", "100vw", "100vw", "full"]}>
          <Table variant={"simple"} size="lg">

            <TableCaption>
              All registered users in the DB
            </TableCaption>

            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {
                users && users.map((element: any, index: number) => {
                  return (
                    <UserRow
                      key={index}
                      element={element}
                      changeRoleHandler={changeRoleHandler}
                      deleteUserHandler={deleteUserHandler}
                      loading={loading}
                    />
                  )
                })
              }
            </Tbody>

          </Table>
        </TableContainer>
      </Stack>
    </Flex>
    </>
  )
}

export default Users;

const UserRow = ({element, changeRoleHandler, deleteUserHandler, loading}: any) => {
  return (
    <Tr>
      <Td>{element._id}</Td>
      <Td>{element.name}</Td>
      <Td>{element.email}</Td>
      <Td>{element.role}</Td>

      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          
          <Button size={"sm"} variant={"outline"} colorScheme={"cyan"} isLoading={loading} onClick={() => changeRoleHandler(element._id)}>
            Change Role
          </Button>

          <Button size={"sm"} colorScheme={"cyan"} isLoading={loading} onClick={() => deleteUserHandler(element._id)}>
            <FaUserMinus />
          </Button>

        </HStack>
      </Td>

    </Tr>
  )
}