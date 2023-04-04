import { useEffect } from "react";
import ReactGA from "react-ga4";
import { Flex, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import styles from "../../styles/Subject.module.css"
import parse from "html-react-parser"
import NotesCard from "../../components/NotesCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { getSubject } from '../../redux/actions/subject';
import { toast } from "react-hot-toast";
import Loader from "../../components/Layout/Loader";
import Head from "next/head";

const Subject = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getSubject(id) as any);
  }, [dispatch, id])

  const { subject, error, message, loading } = useSelector((state: any) => state.subjects);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, [subject])

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({ type: "clearError"});
    };
    
    if(message) {
      toast.success(message);
      dispatch({ type: "clearMessage"});
    }
  }, [error, message, dispatch])

  return (
    <>
    <Head>
      <title>{subject ? `${subject.title} - Notes, PYQs and more on CollegeNotes` : `Loading - CollegeNotes`}</title>
      <meta name='description' content={subject?.seoDescriptioin}/>

      <meta property='og:title' content={subject ? `${subject.title} - Notes, PYQs and more on CollegeNotes` : `Loading - CollegeNotes`}/>
      <meta property='og:description' content={subject?.seoDescriptioin}/>

      <meta content={subject ? `${subject.title} - Notes, PYQs and more on CollegeNotes` : `Loading - CollegeNotes`} name='twitter:title'/>
      <meta content={subject?.seoDescriptioin} name='twitter:description'/>
    </Head>

    <Flex
      minH={"100vh"}
      width={"100%"}
      direction={"row"}
      justifyContent={"space-around"}
    >
      { loading || !subject ? (<Loader />) : (
        <Stack
          height={"100%"}
          marginX={"3"}
          marginY={["8","10","12","12","14"]}
          width={"container.md"}
        >
          <Heading
            size={["xs", "sm"]}
            fontFamily={"Roboto Condensed"}
            children={`${subject.degree} - ${subject.year} Year`}
            textTransform={"uppercase"}
            paddingBottom={"2px"}
            borderBottom={"3px solid"}
            display={"inline"}
            width={"fit-content"}
          />

          <Heading
            as={"h1"}
            paddingTop={["1", "3"]}
            children={subject.title}
            fontFamily={"Source Serif Pro"}
            fontWeight={"extrabold"}
            size={["xl", "3xl"]}
          />

          <VStack width={"100%"}>
            <Image
              src={subject.poster.url}
              width={"100%"}
              borderRadius={"10"}
              marginY={["4", "6"]}
            />

            <Stack className={styles.content}>
              {parse(subject.beforeNotesContent)};

              { subject.notes.length > 0 ? (
                <HStack
                  maxWidth={["95vw", "95vw", "container.md"]}
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
                  { subject.notes.map((notes: any) => {
                    return (
                      <NotesCard
                        key={notes._id}
                        _id={notes._id}
                        id={notes.id}
                        title={notes.title}
                        imageSrc={subject.icon.url}
                        views={notes.views}
                        contributor={notes.contributor}
                        institution={notes.institution}
                        loading={loading}
                      />
                    )
                  })}
                </HStack> ) : (

                <Text
                  children={"No notes are available for this subject."}
                  fontFamily={"Inter"}
                  fontSize={["14px", "16px"]}
                  fontStyle={"italic"}
                  alignSelf={"center"}
                  opacity={"0.7"}
                />
              )}

              {parse(subject.afterNotesContent)};
            </Stack>
          </VStack>
        </Stack>
      )}
    </Flex>
    </>
  )
}

export default Subject;