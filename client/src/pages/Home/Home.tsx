import ReviewCard from "../../components/ReviewCard"
import { Button, Flex, Heading, HStack, Img, ListIcon, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { RxArrowRight } from 'react-icons/rx';
import { useState } from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  const reviews = [
    {
      content: "Lecturenote is a good platform for sharing notes, assignments and conducting Institute classrooms in a single platform where we can share, Learn and gain knowledge.",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Swapnil Sachan",
      institution: "Chandigarh University",
      degreeAndYear: "CSE, Second Year"
    },
    {
      content: "It is such an amazing experience to do online learning on lecture notes.Lecture Notes has been a superb website for online learning. It's very effective in that the online learning materials are easily accessible. It's very efficient for recorded classes since one can review them at a convenient time.Its an excellent website.",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Random Person",
      institution: "IIT Kanpur",
      degreeAndYear: "Mechanical, First Year"
    },
    {
      content: "The app is good but sometimes it doesn't work properly, maybe due to some network issue. Otherwise all the features of the app are really good. And the best part is the help desk of the app. They actually resolve all the issues I have. It helps me a lot.",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Random Person",
      institution: "IIT Kanpur",
      degreeAndYear: "Mechanical, First Year"
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? reviews.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === reviews.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const ReviewCarousel = ({reviews}: any) => {
    return (
      <ReviewCard review={reviews[currentIndex]} />
    );
  }

  return (
    <>
      <main style={{fontFamily: "Inter"}}>
        <Flex
          width={"100%"}
          direction={"row"}
          justifyContent={"space-around"}
        >
          <Flex
            height={"100%"}
            marginTop={["12","10","12","12","16"]}
            marginBottom={["8","10","12","12","14"]}
            paddingX={["5", "8", "16"]}
            width={"container.xl"}
          >
            <Flex
              gap={["3em", "3em", "1em", "6em", "9em"]}
              direction={["column-reverse", "column-reverse", "row"]}
            >
              <VStack
                gap={"4"}
                alignItems={"flex-start"}
                justifyContent={"center"}
              >
                <Heading
                  as={"h1"}
                  size={"2xl"}
                  lineHeight={"xs"}
                  fontFamily={"Poppins"}
                  children={"Power your preparation!"}
                />

                <Text>
                  Good notes are the backbone of all your exams' preparation. CollegeNotes provides you with just that - notes, books, PYQs and more - everything you need to ace your semesters without worrying about the resources!
                </Text>

                <HStack>
                  <a href={"/subjects"}>
                    <Button size={"sm"} colorScheme={"teal"} children={"All Subjects"} rightIcon={<HiArrowRight />} />
                  </a>
                  
                  <Link to={"/about"}>
                    <Button size={"sm"} colorScheme={"teal"} variant={"outline"} children={"The Story"} />
                  </Link>
                </HStack>
              </VStack>
              
              <Img
                width={["300px", "300px", "300px", "400px"]}
                alignSelf={"center"}
                objectFit={"scale-down"}
                src={"/images/home-hero-image.png"}
              />
            </Flex>
          </Flex>
        </Flex>
        
        <Flex
          width={"100%"}
          direction={"row"}
          justifyContent={"space-around"}
          background={"gray.700"}
        >
          <Flex
            height={"100%"}
            marginTop={["12","10","12","12","16"]}
            marginBottom={["8","10","12","12","14"]}
            paddingX={["5", "8", "16"]}
            width={"container.xl"}
            gap={["2em", "2em", "5em"]}
            direction={["column", "column", "row"]}
            color={"white"}
          >
            <Img
              width={["full", "400px", "300px", "500px"]}
              alignSelf={"center"}
              objectFit={"scale-down"}
              src={"/images/upcoming-features-illustration.png"}
            />
            
            <VStack alignItems={"flex-start"} justifyContent={"center"}>
              <Heading
                size={"xl"}
                lineHeight={"xs"}
                marginBottom={"4"}
                fontFamily={"Poppins"}
                children={"Features for the future."}
              />

              <UnorderedList listStylePos={"inside"} listStyleType={"none"} spacing={"4"}>
                <ListItem>
                  <ListIcon as={RxArrowRight} />
                  Users will be able to rate notes and they'll be sorted accordingly for better accessibility to the readers.
                </ListItem>
                
                <ListItem>
                  <ListIcon as={RxArrowRight} />
                  When traffic is enough, CollegeNotes will be monetised to incentivise the contributors according to their notes' views.
                </ListItem>
                
                <ListItem>
                  <ListIcon as={RxArrowRight} />
                  A community and more support for learners to streamline their studies and speed up their exam preparation.
                </ListItem>
              </UnorderedList>
            </VStack>
          </Flex>
        </Flex>
        
        <Flex
          width={"100%"}
          direction={"row"}
          justifyContent={"space-around"}
        >
          <Flex
            height={"100%"}
            marginTop={["12","10","12","12","16"]}
            marginBottom={["8","10","12","12","14"]}
            width={"container.xl"}
          >
            <Flex
              marginX={["5", "8", "16"]}
              gap={["3em", "3em", "1em", "6em", "9em"]}
              direction={["column", "column", "row"]}
            >
              <VStack
                gap={"8"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
              >
                <Heading
                  fontFamily={"Poppins"}
                  size={"lg"}
                  children={"Testimonials"}
                  borderBottom={"4px solid"}
                />

                <Text>
                  See what thousands of college and university students studying with CollegeNotes have to say about us.
                </Text>

                <HStack>
                  <Button
                    id={"slide-left"}
                    onClick={goToPrevious}
                    size={"sm"}
                    colorScheme={"teal"}
                    children={<HiArrowLeft />}
                  />
                  
                  <Button
                    id={"slide-right"}
                    onClick={goToNext}
                    size={"sm"}
                    colorScheme={"teal"}
                    children={<HiArrowRight />}
                  />
                </HStack>
              </VStack>
              
              <ReviewCarousel reviews={reviews} />
            </Flex>
          </Flex>
        </Flex>
      </main>
    </>
  )
}