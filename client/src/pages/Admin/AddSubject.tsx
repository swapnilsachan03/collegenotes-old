import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button, Flex, Heading, HStack, Image, Input, Select, Stack, Textarea, useDisclosure, VStack } from '@chakra-ui/react';
import { RiDraftFill, RiImageAddFill } from 'react-icons/ri';
import { MdPublish } from 'react-icons/md';
import AdminNav from '../../components/AdminNav';
// import NotesModal from '../../components/NotesModal';
import { HiPlus } from 'react-icons/hi';
import ReactQuill from 'react-quill';

const AddSubject = () => {
  const [beforeNotes, setBeforeNotes] = useState("");
  const [afterNotes, setAfterNotes] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [poster, setPoster] = useState<File>();
  const [posterPrev, setPosterPrev] = useState("");
  const [icon, setIcon] = useState<File>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: '3' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const changePosterHandler = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPosterPrev(reader.result ? reader.result.toString() : "");
      setPoster(file);
    }
  }
  
  const changeIconHandler = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIcon(file);
    }
  }

  const degrees = ["Engineering", "BSc", "BBA"];
  const year = ["First", "Second", "Third"];

  return (
    <>
    <AdminNav/>
    <Flex
      minH={["125vh", "95vh"]}
      width={"100%"}
      direction={"row"}
      justifyContent={"space-around"}
    >
      <Stack
        direction={"column"}
        height={"100%"}
        marginX={"3"}
        marginY={["8","10","12","12"]}
        width={["100%", "100%", "container.lg"]}
        alignItems={"center"}
      >
        <Heading
          fontFamily={"Poppins"}
          children="Add Subject"
          size={"xl"}
          paddingBottom={"8"}
          textAlign={"center"}
        />

        <form>
          <Flex direction={"column"}>
            
            <HStack marginBottom={"3"}>
              <Input
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Name of the subject"
                type={"text"}
                borderRadius={"4px"}
                focusBorderColor="cyan.500"
                size={"sm"}
              />

              <Input
                id={"actual-btn"}
                accept="image/png, image/jpg, image/jpeg"
                required
                type={"file"}
                display={"none"}
                onChange={changePosterHandler}
              />

              <Button
                width={"7em"}
                cursor={"pointer"}
                colorScheme={"cyan"}
                size={"sm"}
                leftIcon={<RiImageAddFill/>}
              >
                <label htmlFor="actual-btn" style={{cursor: "pointer"}}>Poster</label>
              </Button>
            </HStack>

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please enter subject description (SEO oriented)"
              marginBottom={"3"}
              borderRadius={"4px"}
              resize={"none"}
              rows={2}
              focusBorderColor="cyan.500"
              size={"sm"}
            />

            <Stack direction={["column", "row"]}>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder='SEO Keywords (space-seperated)'
                type={"text"}
                borderRadius={"4px"}
                focusBorderColor="cyan.500"
                size={"sm"}
              />
            
              <Input
                value={subjectID}
                onChange={(e) => setSubjectID(e.target.value)}
                placeholder='Subject ID'
                type={"text"}
                borderRadius={"4px"}
                focusBorderColor="cyan.500"
                size={"sm"}
                width={["100%", "45%"]}
              />
            </Stack>

            <HStack gap={"1"} marginTop={"5"} marginBottom={"7"}>
              <Select
                placeholder="Degree"
                variant={"filled"}
                size={"sm"}
                width={"auto"}
                borderRadius={"md"}
                fontWeight={"medium"}
                focusBorderColor={"cyan.500"}
              >
                {
                  degrees.map((value, index) => {
                    return (
                      <option key={index} value={index}> {value} </option>
                    )
                  })
                }
              </Select>

              <Select
                placeholder="Year"
                variant={"filled"}
                size={"sm"}
                width={"auto"}
                borderRadius={"md"}
                fontWeight={"medium"}
                focusBorderColor={"cyan.500"}
              >
                {
                  year.map((value, index) => {
                    return (
                      <option key={index} value={index}> {value} </option>
                    )
                  })
                }
              </Select>

              <Input
                id={"icon-btn"}
                accept="image/*"
                required
                type={"file"}
                display={"none"}
                onChange={changeIconHandler}
              />

              <Button
                cursor={"pointer"}
                colorScheme={"cyan"}
                size={"sm"}
                leftIcon={<HiPlus/>}
              >
                <label htmlFor="icon-btn" style={{cursor: "pointer"}}>Icon</label>
              </Button>
            </HStack>
            
            { posterPrev && (
              <Image src={posterPrev} width={"container.md"} borderRadius={"lg"} />
            )}

            <VStack
              height={["1150px","1150px","1100px","1100px","1100px"]}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginTop={"5"}
              width={["auto", "auto", "container.md"]}
            >
              <Flex height={"450px"} width={["auto", "auto", "100%"]}>
                <ReactQuill modules={modules} value={beforeNotes} onChange={setBeforeNotes} theme="snow" style={{width: "100%"}} />
              </Flex>

              <Flex height={"450px"} width={["auto", "auto", "100%"]}>
                <ReactQuill modules={modules} value={afterNotes} onChange={setAfterNotes} theme="snow" style={{width: "100%"}} />
              </Flex>

              <HStack width={"full"} justifyContent={"flex-end"}>
                <Button leftIcon={<RiDraftFill/>} colorScheme={"cyan"} size={"sm"} variant={"outline"} >
                  Save Draft
                </Button>

                <Button leftIcon={<MdPublish/>} colorScheme={"cyan"} size={"sm"}>
                  Publish
                </Button>
              </HStack>

            </VStack>
          </Flex>
        </form>

        {/* <NotesModal
          subjectID={subject.subjectID}
          subjectTitle={subject.title}
          isOpen={isOpen}
          onClose={onClose}
          deleteNotesHandler={deleteNotesHandler}
          addNotesHandler={addNotesHandler}
        /> */}
      </Stack>
    </Flex>
    </>
  )
}

export default AddSubject;