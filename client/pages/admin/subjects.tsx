import { Box, Button, Flex, Grid, Heading, HStack, Image, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'
import { RiDeleteBin4Fill } from 'react-icons/ri';
import AdminNav from '../../components/AdminNav'

const subjects = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const courses = [
    {
      _id: "y732y7",
      poster: {
        url: "https://cdn.pixabay.com/photo/2023/01/09/12/49/ferns-7707348_960_720.jpg"
      },
      title: "React Course",
      category: "Web Development",
      createdBy: "Swapnil Sachan aur falana dhimkana",
      views: 6321,
      numOfVideos: 12
    },
  ];

  const deleteCourseHandler = (userId: String) => {
    console.log(userId);
  }

  const deleteLectureHandler = ({courseId, lectureId}: any) => {
    console.log(courseId);
    console.log(lectureId);
  }

  const addLectureHandler = ({e, courseId, title, description, video}: any) => {
    e.preventDefault();
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
          children="Subjects Manager"
          size={"xl"}
          paddingBottom={"8"}
          textAlign={"center"}
        />

        <TableContainer  width={["100vw", "100vw", "100vw", "full"]}>
          <Table variant={"simple"} size="lg">

            <TableCaption>
              All registered courses in the DB
            </TableCaption>

            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Subject Name</Th>
                <Th>Degree & Year</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Notes</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {
                courses.map((element, index) => {
                  return (
                    <Row
                      key={index}
                      element={element}
                      deleteCourseHandler={deleteCourseHandler}
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

const Row = ({element, deleteCourseHandler}: any) => {
  return (
    <Tr>
      <Td>{element._id}</Td>
      <Td>{element.title}</Td>
      <Td>{element.category}</Td>
      <Td isNumeric>{element.views}</Td>
      <Td isNumeric>{element.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          
          <Link href={`/subject/${element._id}`} target={"_blank"}>
            <Button size={"sm"} variant={"outline"} colorScheme={"cyan"}>
              Edit Content
            </Button>
          </Link>

          <Button size={"sm"} colorScheme={"cyan"} onClick={() => deleteCourseHandler(element._id)}>
            <RiDeleteBin4Fill />
          </Button>

        </HStack>
      </Td>
    </Tr>
  )
}

export default subjects