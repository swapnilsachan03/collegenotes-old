import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import 'react-quill/dist/quill.snow.css';
import { Button, Flex, Heading, HStack, Image, Input, Select, Stack, Textarea, useDisclosure, VStack } from '@chakra-ui/react';
import { RiImageAddFill } from 'react-icons/ri';
import { MdUpdate } from 'react-icons/md';
import { HiPlus } from 'react-icons/hi';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { editSubject } from '../../redux/actions/admin';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { getSubject } from '../../redux/actions/subject';
import Loader from '../../components/Layout/Loader';
import AdminNotesModal from '../../components/AdminNotesModal';
import { BsFilePdfFill } from 'react-icons/bs';
import { degrees, years } from '../../others/subjectProps';

const EditSubject = () => {
  const [ queryParams ] = useSearchParams();
  const id = queryParams.get("id");
  const dispatch = useDispatch();

  const [subjectName, setSubjectName] = useState("");
  const [beforeNotes, setBeforeNotes] = useState("");
  const [afterNotes, setAfterNotes] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [_id, setID] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [notes, setNotes] = useState<any[]>();
  const [poster, setPoster] = useState<File>();
  const [posterPrev, setPosterPrev] = useState("");
  const [icon, setIcon] = useState<File>();
  
  const { subject, error: subjectError, loading: subjectLoading } = useSelector((state: any) => state.subjects);
  document.title = subject ? `Edit ${subject.title} - CollegeNotes` : "Loading - CollegeNotes";

  useEffect(() => {
    dispatch(getSubject(id) as any);
  }, [dispatch, id])

  useEffect(() => {
    setSubjectName(subject?.title);
    setBeforeNotes(subject?.beforeNotesContent);
    setAfterNotes(subject?.afterNotesContent);
    setSubjectID(subject?.id);
    setID(subject?._id);
    setDegree(subject?.degree);
    setYear(subject?.year);
    setDescription(subject?.description);
    setSeoDescription(subject?.seoDescription);
    setKeywords(subject?.seoKeywords);
    setNotes(subject?.notes);
    setPosterPrev(subject?.poster.url);

    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
    // eslint-disable-next-line
  }, [subject?.title]);

  const { loading: adminLoading, error: adminError, message: adminMessage } = useSelector((state: any) => state.admin);

  useEffect(() => {
    if(adminError) {
      toast.error(adminError);
      dispatch({ type: "clearError" });
    }
    
    if(adminMessage) {
      toast.success(adminMessage);
      dispatch({ type: "clearMessage" });
    }

    if(subjectError) {
      toast.error(subjectError);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, adminError, adminMessage, subjectError])

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

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.append("title", subjectName);
    myForm.append("description", description);
    myForm.append("seoDescription", seoDescription);
    myForm.append("seoKeywords", keywords);
    myForm.append("id", subjectID);
    myForm.append("degree", degree);
    myForm.append("year", year);
    myForm.append("beforeNotesContent", beforeNotes);
    myForm.append("afterNotesContent", afterNotes);
    myForm.append("poster", poster!);
    myForm.append("icon", icon!);

    await dispatch(editSubject(myForm, _id) as any);
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Flex
      minH={["125vh", "95vh"]}
      width={"100%"}
      direction={"row"}
      justifyContent={"space-around"}
    >
      { subjectLoading ? <Loader color={"cyan.400"} /> : (
        <>
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
            children="Edit Subject"
            size={"xl"}
            paddingBottom={"8"}
            textAlign={"center"}
          />

          <form onSubmit={(e: any) => submitHandler(e)}>
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
                  id={"poster-btn"}
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
                  <label htmlFor="poster-btn" style={{cursor: "pointer"}}>Poster</label>
                </Button>
              </HStack>

              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please enter a subject description"
                marginBottom={"3"}
                borderRadius={"4px"}
                resize={"none"}
                rows={2}
                focusBorderColor="cyan.500"
                size={"sm"}
              />

              <Textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Please enter a SEO oriented subject description"
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
                  placeholder='SEO Keywords (comma-seperated)'
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
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  width={"auto"}
                  borderRadius={"md"}
                  fontWeight={"medium"}
                  focusBorderColor={"cyan.500"}
                >
                  {
                    degrees.map((value, index) => {
                      return (
                        <option key={index} value={value}> {value} </option>
                      )
                    })
                  }
                </Select>

                <Select
                  placeholder="Year"
                  variant={"filled"}
                  size={"sm"}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  width={"auto"}
                  borderRadius={"md"}
                  fontWeight={"medium"}
                  focusBorderColor={"cyan.500"}
                >
                  {
                    years.map((value, index) => {
                      return (
                        <option key={index} value={value}> {value} </option>
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

                <Button
                  cursor={"pointer"}
                  colorScheme={"cyan"}
                  size={"sm"}
                  leftIcon={<BsFilePdfFill />}
                  onClick={onOpen}
                >
                  Notes
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
                  <Button type={"submit"} onClick={submitHandler} isLoading={adminLoading} leftIcon={<MdUpdate />} colorScheme={"cyan"} size={"sm"}>
                    Update
                  </Button>
                </HStack>

              </VStack>
            </Flex>
          </form>

          <AdminNotesModal
            subjectName={subjectName}
            subjectID={subjectID}
            dbSubjectID={_id}
            notes={notes}
            loading={adminLoading}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Stack>
        </>
      )}
    </Flex>
    </>
  )
}

export default EditSubject;