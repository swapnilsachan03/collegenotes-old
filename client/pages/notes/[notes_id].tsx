import { Flex, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'

const notes_id = () => {
  const notes = {
    title: "Discrete Mathematics NPTEL Notes",
    subjectName: "Discrete Mathematics",
    notesId: "839urrf",
    contributor: "Swapnil Sachan",
    contributorLink: "https://www.github.com/maybe-swapnil/",
    notes_link: "uiernbve"
  }

  return (
    <Flex
      minH={"100vh"}
      width={"100%"}
      direction={"row"}
      justifyContent={"space-around"}
    >
      <Stack
        height={"100%"}
        marginX={"3"}
        marginY={["8","10","12","12","14"]}
        width={"container.md"}
      >
        <Heading
          size={["xs", "sm"]}
          fontFamily={"Roboto Condensed"}
          children={`${notes.subjectName}`}
          textTransform={"uppercase"}
          paddingBottom={"2px"}
          borderBottom={"3px solid"}
          display={"inline"}
          width={"fit-content"}
        />

        <Heading
          as={"h1"}
          paddingTop={["1", "3"]}
          children={notes.title}
          fontFamily={"Source Serif Pro"}
          fontWeight={"extrabold"}
          size={["xl", "3xl"]}
        />

        <VStack width={"100%"}>
          {/* <div id="adobe-dc-view"></div>
          <script src="https://documentservices.adobe.com/view-sdk/viewer.js"></script>
          <script type="text/javascript">
              const adobePreviewConfig = {
                showDownloadPDF: false,
                showPrintPDF: false,
                showAnnotationTools: false
              }

              document.addEventListener("adobe_dc_view_sdk.ready", function() {
                var adobeDCView = new AdobeDC.View({clientId: "b608cf9eb7744e8a946d00185f230786", divId: "adobe-dc-view"});
                adobeDCView.previewFile(
                {
                  content: {location: {url: "/cse/second-year/discrete-math/chapterwise-swapnil/notes-pdf/week-1.pdf"}},
                  metaData: {fileName: "week-1.pdf"}
                }, adobePreviewConfig);
              });
          </script> */}
        </VStack>
      </Stack>
    </Flex>
  )
}

export default notes_id