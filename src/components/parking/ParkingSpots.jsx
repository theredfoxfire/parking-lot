import { SimpleGrid, Text, Icon, VStack } from "@chakra-ui/react";
import { FaCar, FaParking } from "react-icons/fa";
export const ParkingSpots = (props) => {
  const { filteredSpots, onSelectSpot } = props;
  return (
    <SimpleGrid columns={[2, 4, 4]} spacing={5}>
      {filteredSpots.map((spot) => (
        <VStack
          key={spot.id}
          bg={spot.occupied ? "red.500" : "green.500"}
          color="white"
          borderRadius="md"
          margin="1"
          p={4}
          boxShadow="md"
          transition="0.3s"
          _hover={{ transform: "scale(1.01)" }}
          cursor={"pointer"}
          onClick={() => onSelectSpot(spot)}
        >
          <Icon w={6} h={6}>
            {spot.occupied ? <FaCar /> : <FaParking />}
          </Icon>
          <Text fontSize="lg" fontWeight="semibold">
            #{spot.id}
          </Text>
          <Text fontSize="sm">
            {String(spot.size).toUpperCase()}
          </Text>
        </VStack>
      ))}
    </SimpleGrid>
  );
};
