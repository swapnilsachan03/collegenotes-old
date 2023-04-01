import ReviewCard from "../../components/ReviewCard"
import { Button, Flex, Heading, HStack, Img, ListIcon, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { RxArrowRight } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { Link } from "react-router-dom";

export default function Home() {
  document.title = "CollegeNotes -  A website for college students"
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: document.title })
  }, []);

  const reviews = [
    {
      content: "CollegeNotes has been an absolute exam-time life saver for me. I can just simply consume video content on YouTube and read notes from here. This saves me a lot of time and spares me the pain of note taking. I would recommend this to everyone.",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Anurag Kumar",
      institution: "Chandigarh University",
      degreeAndYear: "CSE, Second Year"
    },
    {
      content: "CollegeNotes is a good platform for accessing notes, assignments, PYQs and other study materials. The good thing is that all of this is accessible through a single window and that's what makes is more awesome!",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Rohit Singh",
      institution: "Chandigarh University",
      degreeAndYear: "CSE, Second Year"
    },
    {
      content: "The website's UI is minimal and accessible. It is so easy to read notes and content on CollegeNotes on any device, I can also install it on my phone as a web app. It helps me a lot. The best part is the favorite subjects and bookmark notes feature of the website. I can access my favorite subjects and notes easily.",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Shubhkar Sharma",
      institution: "Chandigarh University",
      degreeAndYear: "CSE, Second Year"
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
                loading={"lazy"}
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
              loading={"lazy"}
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