import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../libs-chakra-ui/dialog";
import { Button, Box, Text } from "@chakra-ui/react";
import { ParkingBookingNew } from "./ParkingBookingNew";

export const ParkingBooks = (props) => {
  const {
    formData,
    onHandleInputChange,
    onHandleSubmit,
    isModalOpen,
    onModalAction,
    selectedBooking,
    selectedSpot,
  } = props;
  if (!isModalOpen) {
    return null;
  }
  return (
    <DialogRoot
      placement={"center"}
      defaultOpen={true}
      motionPreset="slide-in-bottom"
      onInteractOutside={() => onModalAction(!isModalOpen)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedBooking
              ? `Detail Pemesanan`
              : `Formulir Pemesanan Tempat Parkir #${selectedSpot.id}`}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          {selectedBooking && (
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              boxShadow="md"
            >
              <Text fontWeight="bold" mb={2}>
                Tempat Parkir: #{selectedBooking.spotId}
              </Text>
              <Text>Nama: {selectedBooking.name}</Text>
              <Text>Ukuran Kendaraan: {String(selectedSpot.size).toUpperCase()}</Text>
              <Text>Nomor Kendaraan: {selectedBooking.vehicleNumber}</Text>
              <Text>Waktu Mulai: {selectedBooking.startTime}</Text>
              <Text>Durasi: {selectedBooking.duration} Jam</Text>
            </Box>
          )}
          {!selectedBooking && (
            <>
              <Text fontWeight="bold" mb={2}>
                Tempat Parkir Ukuran: {String(selectedSpot.size).toUpperCase()}
              </Text>
              <ParkingBookingNew
                formData={formData}
                onHandleInputChange={onHandleInputChange}
              />
            </>
          )}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              onClick={() => onModalAction(!isModalOpen)}
            >
              Close
            </Button>
          </DialogActionTrigger>
          {!selectedBooking && <Button onClick={onHandleSubmit}>Save</Button>}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
