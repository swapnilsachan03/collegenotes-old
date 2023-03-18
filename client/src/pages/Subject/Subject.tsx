import { Flex, Heading, Image, Stack, VStack } from '@chakra-ui/react'
import styles from "../../styles/Subject.module.css"
import parse from "html-react-parser"
import NotesCard from "../../components/NotesCard";

const Subject = () => {
  const subject = {
    name: "Discrete Mathematics",
    degree: "Engineering",
    notesAvailable: 7,
    yearOfStudy: 2,
    contentBeforeNotes:`<p>Discrete mathematics is the branch of mathematics dealing with objects that can consider only distinct, separated values. It is an important subject across all engineering curriculums, and especially in Computer Science and related courses. It is also a part of GATE (Graduate Aptitude Test in Engineering) exam syllabus, which again, is a very important benchmark for engineering graduates in India.</p> <p>If you want to study Discrete Mathematics, finding good notes &amp; resources becomes very difficult. That's why, we have handwritten notes, both complete and chapterwise, problems/solutions, book recommendations, et cetera, that you'll need to ace the subject. You can access all of this content just by logging on to the CollegeNotes website, anytime, for free!</p> <h2>Discrete Mathematics Notes - NPTEL</h2>`,
    contentAfterNotes: `<h2>Some Other Random Heading</h2> <p>These are the NPTEL notes you'll need to ace your exams!</p> <ol><li><a href="www.collegenotes.co.in" rel="noopener noreferrer" target="_blank">Week 1: Counting</a></li><li><a href="www.google.com" rel="noopener noreferrer" target="_blank">Week 2: Set Theory</a></li><li><a href="www.bing.com" rel="noopener noreferrer" target="_blank">Week 3: P&amp;C</a></li></ol>`,
    imageSrc: "https://www.collegenotes.co.in/image-src/discrete-math-photo.png",
  }

  var year: String = "";
  switch (subject.yearOfStudy) {
    case 1:
      year = "First";
      break;
    case 2:
      year = "Second";
      break;
    case 3:
      year = "Third";
      break;
    case 4:
      year = "Fourth";
      break;
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
          children={`${subject.degree} - ${year} Year`}
          textTransform={"uppercase"}
          paddingBottom={"2px"}
          borderBottom={"3px solid"}
          display={"inline"}
          width={"fit-content"}
        />

        <Heading
          as={"h1"}
          paddingTop={["1", "3"]}
          children={subject.name}
          fontFamily={"Source Serif Pro"}
          fontWeight={"extrabold"}
          size={["xl", "3xl"]}
        />

        <VStack width={"100%"}>
          <Image
            src={subject.imageSrc}
            width={"100%"}
            borderRadius={"10"}
            marginY={["4", "6"]}
          />
          <Stack className={styles.content}>
            {parse(subject.contentBeforeNotes)};
            <NotesCard
              title="Data Structures BE Notes"
              views={"3.2K"}
              imageSrc={"https://cdn.eduonix.com/assets/images/header_img/2019032806183511015.jpg"}
              id={324}
              contributor={"Swapnil Sachan"}
              institution={"Chandigarh University"}
            />
            {parse(subject.contentAfterNotes)};
          </Stack>
        </VStack>
      </Stack>
    </Flex>
  )
}

export default Subject;