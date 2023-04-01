import { Box, Button, Flex, Grid, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { addNotes, deleteNotes } from '../redux/actions/admin';
import { getSubject } from '../redux/actions/subject';
import AdminNotesCard from './AdminNotesCard';

const AdminNotesModal = ({
  subjectID,
  dbSubjectID,
  subjectName,
  notes = [],
  loading,
  isOpen,
  onClose
}: any) => {

  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [notesID, setNotesID] = useState("");
  const [description, setDescription] = useState<string | null>();
  const [contributor, setContributor] = useState<string | null>();
  const [contributorLink, setContributorLink] = useState<string | null>();
  const [institution, setInstitution] = useState("");
  const [document, setDocument] = useState<File | string>();

  const changeDocumentHandler = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDocument(file);
    }
  }

  const addNotesHandler = async (event: any) => {
    event.preventDefault();

    const myForm = new FormData();
    myForm.append("title", title);
    if(description) myForm.append("description", description);
    myForm.append("id", notesID);
    if(contributor) myForm.append("contributor", contributor);
    if(contributorLink) myForm.append("contributorSocial", contributorLink);
    myForm.append("institution", institution);
    myForm.append("file", document!);

    await dispatch(addNotes(myForm, dbSubjectID) as any);
    dispatch(getSubject(subjectID) as any);
  }

  const deleteNotesHandler = async (notesID: string, dbSubjectID: string) => {
    await dispatch(deleteNotes(notesID, dbSubjectID) as any);
    dispatch(getSubject(subjectID) as any);
  }

  const modalCloseHandler = () => {
    setTitle("");
    setNotesID("");
    setDescription(null);
    setContributor(null);
    setContributorLink(null);
    setInstitution("");
    setDocument("");
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={modalCloseHandler}
      size={"full"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={colorMode === "dark" ? "gray.800" : "white"}>
        <ModalHeader> Notes Manager </ModalHeader>
        <ModalCloseButton onClick={modalCloseHandler} />

        <ModalBody padding={["4", "6", "6", "16"]}>
          <Box marginBottom={"10"}>
            <Heading children={subjectName} fontFamily={"Poppins"} size={"2xl"} />
            <Text children={subjectID} fontFamily={"Inter"} size={"sm"} opacity={0.7} />
          </Box>

          <Grid
            templateColumns={["1fr", "1fr", "1fr 1fr", "7fr 4fr", "5fr, 2fr"]}
            gridAutoFlow={["row-reverse", "column"]}
          >
            <Flex direction={"column"} paddingRight={["0", "0", "6", "12"]}>
              <Heading children="Available Notes" fontFamily={"Poppins"} fontWeight={"bold"} size={"lg"} marginBottom={"6"} />

              <VStack spacing={"3"}>
                { notes.length > 0 ? (
                  notes.map((element: any, index: number) => (
                    <AdminNotesCard
                      key={index}
                      title={element.title}
                      id={element.id}
                      _id={element._id}
                      url={element.document.url}
                      dbSubjectID={dbSubjectID}
                      index={index}
                      views={element.views}
                      contributor={element.contributor}
                      description={element.description}
                      deleteNotesHandler={deleteNotesHandler}
                      loading={loading}
                    />
                  ))
                ) : (
                  <Heading
                    children="No notes added till now!"
                    fontFamily={"Inter"}
                    fontStyle={"italic"}
                    size={"sm"}
                    opacity={"0.6"}
                  />
                )}
              </VStack>
            </Flex>

            <Box>
              <form onSubmit={(e) => addNotesHandler(e)}>
                <Heading children="Add Notes" size={"lg"} fontFamily={"Poppins"} textAlign={"center"} marginBottom={"4"} />

                <VStack spacing={"3"} width={"full"}>
                  <Input
                    size={"sm"}
                    borderRadius={"md"}
                    focusBorderColor="cyan.500"
                    placeholder="Enter notes title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <Input
                    size={"sm"}
                    borderRadius={"md"}
                    focusBorderColor="cyan.500"
                    placeholder="Enter notes ID"
                    value={notesID}
                    onChange={(e) => setNotesID(e.target.value)}
                  />
                  
                  <Textarea
                    size={"sm"}
                    borderRadius={"md"}
                    focusBorderColor="cyan.500"
                    rows={3}
                    resize={"none"}
                    placeholder="Notes description (optional)"
                    value={description?.toString()}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Input
                    size={"sm"}
                    borderRadius={"md"}
                    focusBorderColor="cyan.500"
                    placeholder="Enter contributor's name (optional)"
                    value={contributor?.toString()}
                    onChange={(e) => setContributor(e.target.value)}
                  />

                  <Input
                    size={"sm"}
                    borderRadius={"md"}
                    focusBorderColor="cyan.500"
                    placeholder="Enter contributor's social link (optional)"
                    value={contributorLink?.toString()}
                    onChange={(e) => setContributorLink(e.target.value)}
                  />

                  <Input
                    size={"sm"}
                    borderRadius={"md"}
                    focusBorderColor="cyan.500"
                    placeholder="Enter notes' origin institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                  />

                  <HStack alignSelf={"flex-end"} paddingTop={"1"}>
                    <Input
                      display={"none"}
                      borderRadius={"md"}
                      accept="application/pdf"
                      required
                      type={"file"}
                      id={"notes-pdf"}
                      onChange={(e: any) => changeDocumentHandler(e)}
                    />

                    <Button
                      variant={"outline"}
                      cursor={"pointer"}
                      colorScheme={"cyan"}
                      size={"sm"}
                      leftIcon={<HiPlus />}
                    >
                      <label htmlFor="notes-pdf" style={{cursor: "pointer"}}> Add Notes </label>
                    </Button>

                    <Button
                      type={"submit"}
                      cursor={"pointer"}
                      colorScheme={"cyan"}
                      size={"sm"}
                      leftIcon={<FaUpload />}
                      children={"Upload"}
                      isLoading={loading}
                    />
                  </HStack>
                </VStack>
              </form>
            </Box>

          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AdminNotesModal