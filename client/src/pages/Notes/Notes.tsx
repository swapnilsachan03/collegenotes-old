import { Flex, Heading, HStack, Link, Stack, Text, useColorMode, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/Layout/Loader";
import ViewSDKClient from "../../others/ViewSDKClient";
import { getNotes } from "../../redux/actions/subject";

const Notes = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const params = useParams();
  const { notes, error, loading } = useSelector((state: any) => state.subjects);
  document.title = notes ? (notes.title + " - CollegeNotes") : "Loading - CollegeNotes";

  useEffect(() => {
    dispatch(getNotes(params.id) as any);
  }, [dispatch, params.id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, dispatch]);

  const loadPDF = () => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile(
        "pdf-div",
        {
          embedMode: window.innerWidth > 800 ? "SIZED_CONTAINER" : "FULL_WINDOW",
          showAnnotationTools: false,
          showPageControls: true,
          showDownloadPDF: false,
          showPrintPDF: false,
        },
        
        notes.document.url,
        notes.title
      );
    });
  };

  return (
    <>
      {loading || !notes ? (
        <Loader />
      ) : (
        <Flex
          minH={"100vh"}
          width={"100%"}
          direction={"row"}
          justifyContent={"space-around"}
        >
          <Stack
            height={"100%"}
            marginX={"3"}
            marginY={["8", "10", "12", "12", "14"]}
            width={"container.md"}
          >
            <Heading
              size={["xs", "sm"]}
              fontFamily={"Roboto Condensed"}
              children={notes.subject}
              textTransform={"uppercase"}
              paddingBottom={"2px"}
              borderBottom={"3px solid"}
              display={"inline"}
              width={"fit-content"}
            />

            <Heading
              as={"h1"}
              paddingTop={["1", "2"]}
              children={notes.title}
              fontFamily={"Source Serif Pro"}
              fontWeight={"extrabold"}
              size={["2xl", "3xl"]}
            />

            <HStack fontSize={"13px"}>
              <Text fontFamily={"Inter"} children={"Contributed by: "} />
              
              <Link
                target={"_blank"}
                fontFamily={"Inter"}
                color={ colorMode === "light" ? "teal.600" : "teal.300"}
                href={notes.contributorSocial}
              >
                {notes.contributor}
              </Link>
            </HStack>
            

            <Text
              fontSize={"md"}
              fontFamily={"Lusitana"}
              paddingTop={["4", "7"]}
              paddingBottom={["1", "3"]}
              children={notes.description}
            />

            <VStack width={"100%"}>
              <Flex
                id="pdf-div"
                height={"98vh"}
                onLoad={loadPDF()!}
              />
            </VStack>
          </Stack>
        </Flex>
      )}
    </>
  );
};

export default Notes;
