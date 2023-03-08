import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaUserEdit, FaDonate } from 'react-icons/fa';
import { RiDeleteBin7Fill, RiDashboardFill } from 'react-icons/ri';
import { fileUploadCSS } from '@/styles/fileUploadCSS';

const profile = () => {
  const user = {
    name: "Swapnil Sachan",
    email: "swapnilsachan03@gmail.com",
    joinedOn: String(new Date().toLocaleDateString()),
    role: "user",
    favSubjects: [
      {
        subject: "ds101",
        poster: "image url"
      }
    ],
    playlist: [
      {
        course: "'hsh778", poster: "https://cdn.pixabay.com/photo/2023/01/09/12/49/ferns-7707348_960_720.jpg"
      }
    ]
  };

  const {isOpen, onOpen, onClose} = useDisclosure();

  const picSubmitHandler = (e: any, image: File) => {
    e.preventDefault();
    console.log("nothing");
  }

  return (
    <Container minH={"95vh"} maxW={"container.lg"} paddingY={"8"}>
      <Heading
        as={"h1"}
        marginY={["5", "7"]}
        size={"2xl"}
        fontWeight={"extrabold"}
        fontFamily={"Inter"}
        children={"Profile"}
      />

      <Stack
        justifyContent={["center", "flex-start"]}
        direction={["column", "row"]}
        alignItems={"center"}
        spacing={["8", "16"]}
        marginTop={"10"}
        paddingBottom={"10"}
        borderBottom={"1px solid lightgray"}
      >
        <VStack>
          <Avatar boxSize={"40"} />
        </VStack>

        <VStack
          spacing={"4"}
          alignItems={["center", "flex-start"]}
        >
          <Text fontSize={"4xl"} fontWeight={"light"} children={user.name} />
          <p style={{fontSize:"14px", fontFamily:"Inter", marginTop:"6px"}}>{user.email}</p>
          
          <HStack margin={"0"}>
            <Text fontFamily={"Inter"} children="Member Since: " fontWeight={"bold"} />
            <Text fontFamily={"Inter"} children={user.joinedOn} />
          </HStack>

          <HStack>
            <Button leftIcon={<FaUserEdit/>} size={"sm"} colorScheme={"teal"} onClick={onOpen}>
              Edit Profile
            </Button>
            
            { user.role === "admin" ? (
              <Link href="/admin/dashboard">
                <Button leftIcon={<RiDashboardFill/>} size={"sm"} colorScheme={"cyan"}>
                  Dashboard
                </Button>
              </Link>) : (

              <Link href="/donate">
                <Button leftIcon={<FaDonate/>} size={"sm"} colorScheme={"cyan"}>
                  Support
                </Button>
              </Link>
            )}

          </HStack>
        </VStack>
      </Stack>

      <Heading
        marginY={"10"}
        fontSize={"24px"}
        fontWeight={"bold"}
        fontFamily={"Inter"}
        children={"Favorite Subjects"}
      />
      { user.favSubjects.length > 0 ? (
        <Stack
          flexWrap={"wrap"}
          direction={["column", "row"]}
          alignItems={"center"}
          padding={"4"}
        >
          {
            user.favSubjects.map((element) => {
              return (
                <VStack width={"48"} margin={"2"} key={element.subject}>
                  <Image boxSize={"full"} objectFit={"contain"} src={element.poster} />

                  <HStack>
                    <Link href={`/course/${element.subject}`}>
                      <Button variant={"ghost"} colorScheme={"yellow"}>
                        Watch Now
                      </Button>
                    </Link>

                    <Button>
                      <RiDeleteBin7Fill />
                    </Button>
                  </HStack>
                </VStack>
              )
            }
          )}
        </Stack> ) :
      (
        <Text children="You haven't marked any subjects as favorite." />
      )}
      
      <Heading
        marginY={["5", "7"]}
        fontSize={"24px"}
        fontWeight={"bold"}
        fontFamily={"Inter"}
        children={"Bookmarked Notes"}
      />
      { user.favSubjects.length > 0 && (
        <Stack
          flexWrap={"wrap"}
          direction={["column", "row"]}
          alignItems={"center"}
          padding={"4"}
        >
          {
            user.playlist.map((element) => {
              return (
                <VStack width={"48"} margin={"2"} key={element.course}>
                  <Image boxSize={"full"} objectFit={"contain"} src={element.poster} />

                  <HStack>
                    <Link href={`/course/${element.course}`}>
                      <Button variant={"ghost"} colorScheme={"yellow"}>
                        Watch Now
                      </Button>
                    </Link>

                    <Button>
                      <RiDeleteBin7Fill />
                    </Button>
                  </HStack>
                </VStack>
              )
            }
          )}
        </Stack>
      )}

      <ChangeProfilePic isOpen={isOpen} onClose={onClose} picSubmitHandler={picSubmitHandler} />
    </Container>
  )
}

export default profile

const ChangeProfilePic = ({isOpen, onClose, picSubmitHandler}: any) => {
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const changeImageHandler = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    }
  }

  const modalCloseHandler = () => {
    onClose();
    setImage("");
    setImagePrev("");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      
      <ModalContent>
        <ModalHeader>
          Change Profile Picture
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Container>
            <form onSubmit={(e) => picSubmitHandler(e, image)}>
              <VStack spacing={"8"}>
                { imagePrev && <Avatar src={imagePrev} boxSize={"48"} /> }

                <Input
                  type={"file"}
                  css={{"&::file-selector-button": fileUploadCSS}}
                  onChange={changeImageHandler}
                />

                <Button width={"full"} colorScheme={"yellow"} type={"submit"}>
                  Update
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button marginRight={"3"} onClick={modalCloseHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}