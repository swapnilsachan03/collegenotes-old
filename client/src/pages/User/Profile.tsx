import { Avatar, Box, Button, Container, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { FaUserEdit, FaDonate, FaUserMinus } from 'react-icons/fa';
import { RiDashboardFill, RiImageEditFill } from 'react-icons/ri';
import { BsPersonCheckFill } from 'react-icons/bs';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, updateProfile } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import ProfileSubjectCard from '../../components/ProfileSubjectCard';
import ProfileNotesCard from '../../components/ProfileNotesCard';

const Profile = ({ user }: any) => {
  document.title = "Member Profile - CollegeNotes";
  
  const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
  const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();
  const memberSince = new Date(user.createdAt);

  return (
    <Container minH={"95vh"} maxW={"container.lg"} paddingY={"8"}>
      <Heading
        as={"h1"}
        marginTop={["3", "7"]}
        size={"2xl"}
        fontWeight={"extrabold"}
        fontFamily={"Inter"}
        children={"Profile"}
        textAlign={"center"}
      />

      <Stack
        justifyContent={["center", "center"]}
        direction={["column", "row"]}
        alignItems={"center"}
        spacing={["8", "12"]}
        marginTop={"10"}
        paddingBottom={"10"}
        borderBottom={"1px solid lightgray"}
      >
        <VStack>
          <Avatar src={user.avatar.url} name={user.name} size={"2xl"} boxSize={"40"} />
        </VStack>

        <VStack
          spacing={"4"}
          alignItems={["center", "flex-start"]}
        >
          <Text fontSize={"4xl"} fontWeight={"light"} children={user.name} />
          <p style={{fontSize:"14px", fontFamily:"Inter", marginTop:"6px"}}>{user.email}</p>
          
          <HStack margin={"0"}>
            <Text fontFamily={"Inter"} children="Member Since: " fontWeight={"bold"} />
            <Text fontFamily={"Inter"} children={ memberSince.toUTCString().slice(0, -12) } />
          </HStack>

          <HStack>
            <Button leftIcon={<FaUserEdit/>} size={"sm"} colorScheme={"teal"} onClick={onEditOpen}>
              Edit Profile
            </Button>
            
            { user.role === "admin" ? (
              <Link to="/admin/dashboard">
                <Button leftIcon={<RiDashboardFill/>} size={"sm"} colorScheme={"cyan"}>
                  Dashboard
                </Button>
              </Link>) : (

              <Link to="/donate">
                <Button leftIcon={<FaDonate/>} size={"sm"} colorScheme={"cyan"}>
                  Support
                </Button>
              </Link>
            )}

          </HStack>
        </VStack>
      </Stack>

      <Heading
        marginTop={"9"}
        marginBottom={"4"}
        fontSize={"24px"}
        fontWeight={"bold"}
        fontFamily={"Inter"}
        children={"Favorite Subjects"}
      />
      { user.favoriteSubjects.length > 0 ? (
        <HStack
          maxWidth={["95vw", "95vw", "container.lg"]}
          overflowX={"auto"}
          paddingBottom={"6"}
          sx={{
            '::-webkit-scrollbar': {
              width: '11px',
              height: 'auto',
            },
            
            '::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            },
            
            '::-webkit-scrollbar-thumb': {
              backgroundColor: '#8e9bac',
              borderRadius: '15px',
              border: '5px solid transparent',
              backgroundClip: 'content-box',
            },
            
            '::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#718096',
            }
          }}
        >
          {
            user.favoriteSubjects.map((subject: any, index: number) => {
              return (
                <ProfileSubjectCard
                  key={index}
                  _id={subject._id}
                  title={subject.title}
                  description={subject.description}
                  views={subject.views}
                  id={subject.id}
                  creator={subject.creator}
                  notesCount={subject.numOfNotes}
                />
              )
            }
          )}
        </HStack> ) :
      (
        <Text
          children="You haven't marked any subjects as favorite."
          fontStyle={"italic"}
          color={"gray"}
          marginY={"10"}
        />
      )}
      
      <Heading
        marginTop={"7"}
        marginBottom={"4"}
        fontSize={"24px"}
        fontWeight={"bold"}
        fontFamily={"Inter"}
        children={"Bookmarked Notes"}
      />
      { user.bookmarkedNotes.length > 0 ? (
        <HStack
          maxWidth={["95vw", "95vw", "container.lg"]}
          overflowX={"auto"}
          sx={{
            '::-webkit-scrollbar': {
              width: '11px',
              height: 'auto',
            },
            
            '::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            },
            
            '::-webkit-scrollbar-thumb': {
              backgroundColor: '#8e9bac',
              borderRadius: '15px',
              border: '5px solid transparent',
              backgroundClip: 'content-box',
            },
            
            '::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#718096',
            }
          }}
        >
          {
            user.bookmarkedNotes.map((notes: any, index: number) => {
              return (
                <ProfileNotesCard
                  key={index}
                  _id={notes._id}
                  views={notes.views}
                  title={notes.title}
                  id={notes.id}
                  contributor={notes.contributor}
                  institution={notes.institution}
                />
              )
            }
          )}
        </HStack>) :
      (
        <Text
          children="You haven't bookmarked any notes yet."
          fontStyle={"italic"}
          color={"gray"}
          marginY={"9"}
        />
      )}

      <UpdateProfile user={user} isEditOpen={isEditOpen} onEditClose={onEditClose} onDeleteOpen={onDeleteOpen} />
      <DeleteProfile isDeleteOpen={isDeleteOpen} onDeleteClose={onDeleteClose} onDeleteOpen={onDeleteOpen} />
    </Container>
  )
}

export default Profile;

const UpdateProfile = ({user, isEditOpen, onEditClose, onDeleteOpen}: any) => {
  const [image, setImage] = useState<File | null>();
  const [imagePrev, setImagePrev] = useState<ArrayBuffer | string | null>();
  const [name, setName] = useState<string>("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state: any) => state.profile);

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({ type: "clearError"});
    }

    if(message) {
      toast.success(message);
      dispatch({ type: "clearMessage"});
    }
  }, [dispatch, error, message]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", image!);

    await dispatch(updateProfile(formData) as any);
    onEditClose();

    if(message !== null && message !== undefined) {
      await delay(700);
      window.location.reload();
    }
  }

  const changeImageHandler = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    }
  }

  return (
    <Modal isOpen={isEditOpen} onClose={onEditClose}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      
      <ModalContent width={["xs", "sm", "md"]}>
        <ModalHeader>
          Edit Profile
        </ModalHeader>

        <ModalCloseButton onClick={() => {
          setName("");
          onEditClose();
        }} />

        <form onSubmit={(e) => submitHandler(e)}>
        <ModalBody>
          <Container width={["2xs", "xs"]} padding={0}>
              <VStack spacing={"6"}>
                { imagePrev ? (<Avatar src={imagePrev.toString()} boxSize={["40", "44"]} />) : (
                  <Avatar src={user.avatar.url} boxSize={["40", "44"]} />
                ) }

                <VStack>
                <Input
                  id={"profile-pic"}
                  type={"file"}
                  accept={"image/png, image/jpg, image/jpeg"}
                  display={"none"}
                  onChange={changeImageHandler}
                />

                <Button
                  cursor={"pointer"}
                  colorScheme={"teal"}
                  size={"sm"}
                  leftIcon={<RiImageEditFill/>}
                >
                  <label htmlFor="profile-pic" style={{cursor: "pointer"}}>New Profile Picture</label>
                </Button>

                <Text fontSize={"sm"} color={"gray.500"} marginTop={"1px"} children={"Only .jpg, .jpeg, .png files are allowed."} />
                </VStack>

                <Box marginY={"6"} width={"full"}>
                  <FormLabel htmlFor="email" children="Name" fontSize={'sm'} marginBottom={"0"} />
                  <Input
                    id="name"
                    variant={"flushed"}
                    size={"sm"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    type={"name"}
                    focusBorderColor={"teal.500"}
                  />
                </Box>

                <Button size={"sm"} variant={"link"} alignSelf={"flex-start"} rightIcon={<HiOutlineArrowUpRight />}>
                  <Link to={"/user/change-password"} target={"_blank"}>Change password</Link>
                </Button>
              </VStack>
          </Container>
        </ModalBody>

        <ModalFooter paddingY={"3"} marginBottom={"4"}>
          <Container width={"xs"} justifyContent={"flex-end"} display={"flex"} padding={0}>
            <Button size={"sm"} colorScheme={"red"} leftIcon={<FaUserMinus />} marginRight={"2"} onClick={async () => {
              onEditClose();
              await delay(250);
              onDeleteOpen();
            }}>
              Delete
            </Button>

            <Button size={"sm"} colorScheme={"teal"} type={"submit"} isLoading={loading} leftIcon={<BsPersonCheckFill />}>
              Update
            </Button>
          </Container>
        </ModalFooter>

        </form>
      </ModalContent>
    </Modal>
  )
}

const DeleteProfile = ({isDeleteOpen, onDeleteClose}: any) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state: any) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({ type: "clearError"});
    }

    if(message) {
      toast.success(message);
      dispatch({ type: "clearMessage"});
    }
  }, [dispatch, error, message]);

  const deleteHandler = async () => {
    await dispatch(deleteProfile() as any);
    onDeleteClose();
    navigate("/");
  }

  return (
    <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      
      <ModalContent width={["xs", "sm", "md"]}>
        <ModalHeader>
          Delete Profile
        </ModalHeader>

        <ModalCloseButton onClick={onDeleteClose} />

        <ModalBody>
          <Text fontSize={"15"} color={"gray.500"} textAlign={"justify"} marginBottom={"2"} children={"Are you sure you want to delete your account? This action cannot be undone."} />
        </ModalBody>

        <ModalFooter paddingY={"2"} marginBottom={"5"}>
            <Button size={"sm"} colorScheme={"red"} type={"submit"} isLoading={loading} onClick={deleteHandler} marginRight={"2"}>
              Yes
            </Button>

            <Button size={"sm"} colorScheme={"teal"} variant={"outline"} onClick={onDeleteClose}>
              No, take me back!
            </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}