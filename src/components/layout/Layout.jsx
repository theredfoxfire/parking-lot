import { Box, Flex, Icon, Image, HStack } from "@chakra-ui/react";
import { FaCar } from "react-icons/fa";

export default function Layout(props) {
  return (
    <Box>
      <Box
        bg="teal.500"
        px={8}
        position="sticky"
        top={0}
        zIndex={1000}
        width="100%"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Box fontWeight="bold" fontSize="lg" color="white">
              <Icon w={12} h={12} marginRight={"4"}>
                <FaCar />
              </Icon>
              PARKINGAPP
            </Box>
          </HStack>
          <Image
            src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            boxSize="36px"
            borderRadius="full"
            fit="cover"
            alt="Admin"
          />
        </Flex>
      </Box>
      <Box>{props.children}</Box>
    </Box>
  );
}
