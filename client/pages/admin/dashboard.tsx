import { Box, Flex, Grid, Heading, HStack, useColorMode, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import AdminNav from '../../components/AdminNav'
import { DoughnutChart, LineChart } from '../../components/AdminChart'

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "#9DECF9" : "#086F83";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  const Databox = ({title, quantity, quantityPercent, profit}: any) => {
    return (
      <Box
        width={["15em", "10em", "15em"]}
        border={`2px solid ${cardBorderColor}`}
        padding={"5"}
        backgroundColor={cardBgColor}
        borderRadius={"xl"}
      >
        <Text children={title} />

        <HStack>
          <Text fontSize={"xl"} fontWeight={"bold"} children={quantity} />

          <HStack>
            <Text children={`${quantityPercent}%`} />
            { profit ?
              <RiArrowUpLine color='green' /> :
              <RiArrowDownLine color='red' />
            }
          </HStack>
        </HStack>

        <Text children={"Since last month"} fontSize={"sm"} opacity={0.7} />
      </Box>
    );
  }

  return (
    <>
    <AdminNav />
    <Flex
      minH={"100vh"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
    >
      <Stack
        direction={"column"}
        height={"100%"}
        marginX={"3"}
        marginY={["8","10","12","12"]}
        width={["100%", "100%", "container.lg"]}
        alignItems={"center"}
      >
        <Text
          textAlign={"center"}
          marginBottom={"6"}
          opacity={0.5}
          fontSize={["14px", "unset"]}
          children={`Last change was on ${(new Date()).toDateString()}, ${(new Date()).toDateString()}`}
        />

        <Heading
          fontFamily={"Poppins"}
          children="Admin Dashboard"
          size={"xl"}
          paddingBottom={"8"}
          textAlign={["center", "left"]}
        />

        <Stack
          direction={["column", "row"]}
          minH="24"
          justifyContent={"space-evenly"}
          gap={["2", "1", "5"]}
          paddingBottom={["5", "16"]}
        >
          <Databox title={"Views"} quantity={143} quantityPercent={30} profit={true} />
          <Databox title={"Active Users"} quantity={47} quantityPercent={20} profit={true} />
          <Databox title={"Members"} quantity={23} quantityPercent={-34} profit={false} />
        </Stack>

        <Box
          width={"100%"}
          padding={["0", "2"]}
        >
          <Heading
            textAlign={["center", "left"]}
            fontFamily={"Poppins"}
            size={"md"}
            paddingTop={["8", "0"]}
            children="Site Views"
          />

          <LineChart />
        </Box>
      </Stack>
    </Flex>
    </>
  )
}

export default Dashboard