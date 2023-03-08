import { Button, Container, Flex, Heading, HStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import SubjectCard from "components/SubjectCard";

const subjects = () => {
  const [keyword, setKeyword] = useState("");

  const branches: string[] = ["Computer Science", "Civil", "Mechanical", "Electrical", "Information Technolgy", "Mechatronics", "CS Specializations"]
  const year: string[] = ["First", "Second", "Third", "Fourth"]

  return (
    <Container minH={"95vh"} maxW={"container.lg"} paddingY="8">
      <Heading
        marginY={["5", "7"]}
        size={"2xl"}
        fontFamily={"Inter"}
        children={"Browse Subjects"}
      />

      <Flex alignItems={"center"} direction={["column", "row"]}>
        <InputGroup display={"flex"}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} placeholder=" Search all subjects"
            type={"text"}
            variant={"flushed"}
            focusBorderColor="teal.500"
          />

          <InputRightElement>
            <Button
              variant={"ghost"}
              size={"sm"}
              colorScheme={"teal"}
              children={<FaSearch />}
            />
          </InputRightElement>
        </InputGroup>

        <HStack marginY={["2", "0"]}>
          <Menu>
            <MenuButton
              as={Button}
              variant={"flushed"}
              borderBottom={"2px solid teal"}
              borderRadius={"0"}
              size={"md"}
              rightIcon={<FaChevronDown size={"10px"} />}
              marginLeft={["0", "2"]}
            >
              Branch
            </MenuButton>

            <MenuList>
              {
                branches.map((value, index) => {
                  return (
                    <MenuItem key={index}> {value} </MenuItem>
                  )
                })
              }
            </MenuList>
          </Menu>
          
          <Menu>
            <MenuButton
              as={Button}
              variant={"flushed"}
              borderBottom={"2px solid teal"}
              borderRadius={"0"}
              size={"md"}
              rightIcon={<FaChevronDown size={"10px"} />}
              marginLeft={["0", "2"]}
            >
              Year
            </MenuButton>

            <MenuList>
              {
                year.map((value, index) => {
                  return (
                    <MenuItem key={index}> {value} </MenuItem>
                  )
                })
              }
            </MenuList>
          </Menu>

        </HStack>
      </Flex>

      <SimpleGrid
        minChildWidth={["16.5em", "16.5em", "16.5em", "20em", "20em"]}
        spacing={"3"}
        justifyContent={"center"}
        marginTop={["8", "12"]}
      >
        <SubjectCard
          title="Data Structures"
          description="Data structures is a very important subject is the fiels of computer science. If you're a CS major, then it'll haunt you all the time if you do not master it!"
          views={"3.2K"}
          imageSrc={"https://cdn.eduonix.com/assets/images/header_img/2019032806183511015.jpg"}
          id={324}
          creator={"swapnil"}
          notesCount={9}
          yearOfStudy={2}
        />
        <SubjectCard
          title="DBMS"
          description="Data structures is a very important subject is the fiels of computer science. If you're a CS major, then it'll haunt you all the time if you do not master it!"
          views={"3.2K"}
          imageSrc={"https://cdn.eduonix.com/assets/images/header_img/2019032806183511015.jpg"}
          id={123}
          creator={"swapnil"}
          notesCount={9}
          yearOfStudy={2}
        />
        <SubjectCard
          title="Computer Networks"
          description="Data structures is a very important subject is the fiels of computer science. If you're a CS major, then it'll haunt you all the time if you do not master it!"
          views={"3.2K"}
          imageSrc={"https://cdn.eduonix.com/assets/images/header_img/2019032806183511015.jpg"}
          id={134}
          creator={"swapnil"}
          notesCount={9}
          yearOfStudy={2}
        />
        <SubjectCard
          title="Physics"
          description="Data structures is a very important subject is the fiels of computer science. If you're a CS major, then it'll haunt you all the time if you do not master it!"
          views={"3.2K"}
          imageSrc={"https://cdn.eduonix.com/assets/images/header_img/2019032806183511015.jpg"}
          id={145}
          creator={"swapnil"}
          notesCount={9}
          yearOfStudy={2}
        />
      </SimpleGrid>
    </Container>
  )
}

export default subjects