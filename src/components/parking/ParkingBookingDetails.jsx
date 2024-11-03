import { Box, Text } from "@chakra-ui/react";
export const ParkingBookingDetails = (props) => {
  const { selectedBooking, selectedSpot } = props;
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4} boxShadow="md">
      <Text fontWeight="bold" mb={2}>
        Tempat Parkir: #{selectedBooking.spotId}
      </Text>
      <Text>Nama: {selectedBooking.name}</Text>
      <Text>Ukuran Kendaraan: {String(selectedSpot.size).toUpperCase()}</Text>
      <Text>Nomor Kendaraan: {selectedBooking.vehicleNumber}</Text>
      <Text>Waktu Mulai: {selectedBooking.startTime}</Text>
      <Text>Durasi: {selectedBooking.duration} Jam</Text>
    </Box>
  );
};
