import { Button, Flex, Heading, HStack, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { FaUserMinus } from 'react-icons/fa';
import AdminNav from "../../components/AdminNav"

const users = () => {
  const users = [
    {
      _id: "y732y7",
      name: "Swapnil",
      role: "admin",
      subscription: {
        status: "active"
      },
      email: "swapnil@gmail.com"
    },
    {
      _id: "y732y7",
      name: "Swapnil",
      role: "admin",
      subscription: {
        status: "active"
      },
      email: "swapnil@gmail.com"
    },
    {
      _id: "y732y7",
      name: "Swapnil",
      role: "admin",
      subscription: {
        status: "active"
      },
      email: "swapnil@gmail.com"
    },
  ];

  const changeRoleHandler = (userId: String) => {
    console.log(userId);
  }

  const deleteUserHandler = (userId: String) => {
    console.log(userId);
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
        width={"container.lg"}
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
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {
                users.map((element, index) => {
                  return (
                    <UserRow
                      key={index}
                      element={element}
                      changeRoleHandler={changeRoleHandler}
                      deleteUserHandler={deleteUserHandler}
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

export default users

const UserRow = ({element, changeRoleHandler, deleteUserHandler}: any) => {
  return (
    <Tr>
      <Td>{element._id}</Td>
      <Td>{element.name}</Td>
      <Td>{element.email}</Td>
      <Td>{element.role}</Td>
      <Td>{element.subscription.status === "active" ? "Active" : "Not Active"}</Td>

      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          
          <Button size={"sm"} variant={"outline"} colorScheme={"cyan"} onClick={() => changeRoleHandler(element._id)}>
            Change Role
          </Button>

          <Button size={"sm"} colorScheme={"cyan"} onClick={() => deleteUserHandler(element._id)}>
            <FaUserMinus />
          </Button>

        </HStack>
      </Td>

    </Tr>
  )
}