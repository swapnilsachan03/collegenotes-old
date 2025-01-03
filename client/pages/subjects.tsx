import { Button, Container, Flex, Heading, HStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SubjectCard from "@/components/SubjectCard";
import { degrees, years } from "@/others/subjectProps";
import { getAllSubjects } from "@/redux/actions/subject";
import ReactGA from "react-ga4";
import Head from "next/head";

const Subjects = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: document.title })
  }, []);

  const [keywords, setKeywords] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const dispatch = useDispatch();
  const { subjects, error, message, loading } = useSelector((state: any) => state.subjects);

  useEffect(() => {
    dispatch(getAllSubjects(keywords, degree, year) as any);

    if(error) {
      toast.error(error);
      dispatch({ type: "clearError"});
    };

    if(message) {
      toast.success(message);
      dispatch({ type: "clearMessage"});
    };
  }, [dispatch, keywords, degree, year, error, message])

  return (
    <>
      <Head>
        <title>Subject Browser - CollegeNotes</title>
        <meta name='description' content='Browse and search for all the subjects available on CollegeNotes.'/>

        <meta property='og:title' content='Subject Browser - CollegeNotes' key={"og-title"} />
        <meta property='og:description' content='Browse and search for all the subjects available on CollegeNotes.' key={"og-description"} />

        <meta content='Subject Browser - CollegeNotes' name='twitter:title' key={"twitter-title"} />
        <meta content='Browse and search for all the subjects available on CollegeNotes.' name='twitter:description' key={"twitter-description"} />
      </Head>

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
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)} placeholder="Search all subjects"
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
                borderBottom={"2px solid"}
                borderColor={"teal.500"}
                borderRadius={"0"}
                size={"md"}
                rightIcon={<FaChevronDown size={"10px"} />}
                marginLeft={["0", "2"]}
              >
                Degree
              </MenuButton>

              <MenuList>
                {
                  degrees.map((value: string, index: number) => {
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
                borderColor={"teal.500"}
                borderRadius={"0"}
                size={"md"}
                rightIcon={<FaChevronDown size={"10px"} />}
                marginLeft={["0", "2"]}
              >
                Year
              </MenuButton>

              <MenuList boxShadow={"none"}>
                {
                  years.map((value: string, index: number) => {
                    return (
                      <MenuItem key={index} onClick={() => setYear(value)}> {value} </MenuItem>
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
          justifyItems={"center"}
          marginTop={["8", "12"]}
        >
          {
            subjects && subjects.length > 0 ? (
              subjects.map((subject: any, index: number) => {
                return (
                  <SubjectCard
                    key={index}
                    _id={subject._id}
                    title={subject.title}
                    description={subject.description}
                    views={subject.views}
                    imageSrc={subject.icon.url}
                    id={subject.id}
                    creator={subject.creator}
                    notesCount={subject.numOfNotes}
                    loading={loading}
                  />
                )
              })
            ) : (
              <Heading
                size={"lg"}
                fontFamily={"Roboto"}
                fontStyle={"italic"}
                opacity={"0.8"}
                textAlign={"center"}
                children={"No subjects found!"}
              />
            )
          }
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Subjects