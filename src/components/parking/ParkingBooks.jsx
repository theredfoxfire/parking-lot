import { useCallback, useEffect, useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../libs-chakra-ui/dialog";
import { Button, Text } from "@chakra-ui/react";
import { ParkingBookingNew } from "./ParkingBookingNew";
import { ParkingBookingDetails } from "./ParkingBookingDetails";

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
      setIsSubmitted(() => false);
  }, [selectedSpot]);

  const handleSubmit = useCallback(() => {
    onHandleSubmit();
    setIsSubmitted(() => true);
  }, [onHandleSubmit, setIsSubmitted]);

  const handleCloseModal = useCallback(() => {
    onModalAction(false);
    setIsSubmitted(() => false);
  }, [onModalAction, setIsSubmitted]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <DialogRoot
      placement={"center"}
      defaultOpen={true}
      motionPreset="slide-in-bottom"
      onInteractOutside={handleCloseModal}
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
            <ParkingBookingDetails
              selectedBooking={selectedBooking}
              selectedSpot={selectedSpot}
            />
          )}
          {!selectedBooking && (
            <>
              <Text fontWeight="bold" mb={2}>
                Tempat Parkir Ukuran: {String(selectedSpot.size).toUpperCase()}
              </Text>
              <ParkingBookingNew
                isSubmitted={isSubmitted}
                formData={formData}
                onHandleInputChange={onHandleInputChange}
              />
            </>
          )}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleCloseModal}>
              Close
            </Button>
          </DialogActionTrigger>
          {!selectedBooking && <Button onClick={handleSubmit}>Save</Button>}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
