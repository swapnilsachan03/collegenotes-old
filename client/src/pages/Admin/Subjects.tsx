import { Button, Flex, Heading, HStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-hot-toast';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../../components/AdminNav'
import { deleteSubject } from '../../redux/actions/admin';
import { getAllSubjects } from '../../redux/actions/subject';

const Subjects = () => {
  document.title = "Subjects Manager - CollegeNotes";
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, []);
  
  const [keywords, setKeywords] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [subjectID, setSubjectID] = useState<string>("");

  const branches: string[] = ["All", "Computer Science", "Civil", "Mechanical", "Electrical", "Information Technolgy", "Mechatronics", "CS Specializations"]
  const years: string[] = ["All", "First", "Second", "Third", "Fourth"]

  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useDispatch();
  const { subjects, error: subjectsError } = useSelector((state: any) => state.subjects);
  const { loading: adminLoading, error: adminError, message: adminMessage } = useSelector((state: any) => state.admin);

  useEffect(() => {
    dispatch(getAllSubjects(keywords, degree, year) as any);
    
    if(subjectsError) {
      toast.error(subjectsError);
      dispatch({ type: "clearError"});
    };
    
    if(adminError) {
      toast.error(adminError);
      dispatch({ type: "clearError"});
    };
    
    if(adminMessage) {
      toast.success(adminMessage);
      dispatch({ type: "clearMessage"});
    };
  }, [dispatch, keywords, degree, year, subjectsError, adminError, adminMessage])

  const deleteSubjectHandler = async (subjectID: String) => {
    await dispatch(deleteSubject(subjectID) as any);
    onClose();
    getAllSubjects(keywords, degree, year);
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
        marginX={["3","3","3","0","0"]}
        marginY={["8","10","12","12"]}
        width={"container.xl"}
      >
        <Heading
          fontFamily={"Poppins"}
          children="Subjects Manager"
          size={"xl"}
          paddingBottom={"8"}
          textAlign={"center"}
        />

        <Flex
          alignItems={"center"}
          direction={["column", "row"]}
          paddingBottom={"8"} 
          paddingX={["3","3","3","3","0"]}
        >
          <InputGroup display={"flex"}>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)} placeholder="Search all subjects"
              type={"text"}
              variant={"flushed"}
              focusBorderColor="cyan.500"
            />

            <InputRightElement>
              <Button
                variant={"ghost"}
                size={"sm"}
                colorScheme={"cyan"}
                children={<FaSearch />}
              />
            </InputRightElement>
          </InputGroup>

          <HStack marginY={["2", "0"]}>
            <Menu>
              <MenuButton
                as={Button}
                variant={"flushed"}
                borderBottom={"2px solid"}
                borderColor={"cyan.500"}
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
                      <MenuItem key={index} onClick={() => setDegree(value)}> {value} </MenuItem>
                    )
                  })
                }
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                variant={"flushed"}
                borderBottom={"2px solid"}
                borderColor={"cyan.500"}
                borderRadius={"0"}
                size={"md"}
                rightIcon={<FaChevronDown size={"10px"} />}
                marginLeft={["0", "2"]}
              >
                Year
              </MenuButton>

              <MenuList boxShadow={"none"}>
                {
                  years.map((value, index) => {
                    return (
                      <MenuItem key={index} onClick={() => setYear(value)}> {value} </MenuItem>
                    )
                  })
                }
              </MenuList>
            </Menu>

          </HStack>
        </Flex>

        <TableContainer  width={["100vw", "100vw", "100vw", "full"]}>
          <Table variant={"simple"} size="lg">

            <TableCaption>
              All saved subjects in the DB
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
                subjects.map((element: any, index: number) => {
                  return (
                    <Row
                      key={index}
                      element={element}
                      onOpen={onOpen}
                      setSubjectID={setSubjectID}
                    />
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>

        <ConfirmDeleteModal
          loading={adminLoading}
          isOpen={isOpen}
          onClose={onClose}
          subjectID={subjectID}
          setSubjectID={setSubjectID}
          deleteSubjectHandler={deleteSubjectHandler} 
        />
      </Stack>
    </Flex>
    </>
  )
}

const Row = ({element, onOpen, setSubjectID}: any) => {
  return (
    <>
    <Tr>
      <Td>{element.id}</Td>
      <Td>{element.title}</Td>
      <Td>{element.degree}, {element.year} year</Td>
      <Td isNumeric>{element.views}</Td>
      <Td isNumeric>{element.numOfNotes}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          
          <a href={`/admin/edit?id=${element.id}`}>
            <Button size={"sm"} variant={"outline"} colorScheme={"cyan"}>
              Edit Content
            </Button>
          </a>

          <Button size={"sm"} colorScheme={"cyan"} onClick={() => {
            setSubjectID(element._id);
            onOpen();
          }}>
            <RiDeleteBin4Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
    </>
  )
}

const ConfirmDeleteModal = ({isOpen, onClose, loading, subjectID, deleteSubjectHandler}: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter={"blur(10px)"} />

      <ModalContent width={["xs", "sm", "md"]}>
        <ModalHeader>Delete Subject</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Text fontSize={"15"} color={"gray.500"} textAlign={"justify"} marginBottom={"2"} children={"Are you sure you want to delete this subject? This action cannot be undone."} />
        </ModalBody>

        <ModalFooter paddingY={"2"} marginBottom={"5"}>
          <Button
            size={"sm"}
            colorScheme={"red"}
            type={"submit"}
            isLoading={loading}
            onClick={() => deleteSubjectHandler(subjectID)}
            marginRight={"2"}
          >
            Yes
          </Button>

          <Button size={"sm"} colorScheme={"teal"} variant={"outline"} onClick={onClose}>
            No, take me back!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Subjects;