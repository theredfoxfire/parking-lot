// src/components/parking/ParkingMap.js
import React, { useState, useCallback, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { toaster, Toaster } from "../libs-chakra-ui/toaster";
import { ParkingSearch } from "./ParkingSearch";
import { parkingSpotsMock } from "../../utils/mocks";
import { ParkingBooks } from "./ParkingBooks";
import { ParkingSpots } from "./ParkingSpots";
const initialFormData = {
  data: {},
  errors: {},
};

const ParkingMap = () => {
  // Data tempat parkir
  const [state, setState] = useState({
    parkingSpots: parkingSpotsMock,
    filteredSpots: parkingSpotsMock,
    selectedSpot: null,
    formData: initialFormData,
    searchCriteria: { id: "", size: "" },
    bookingDetails: [],
    isModalOpen: false,
  });

  const {
    parkingSpots,
    filteredSpots,
    selectedSpot,
    formData,
    searchCriteria,
    bookingDetails,
    isModalOpen,
  } = state;

  const updateStateAction = useCallback(
    (props) => {
      setState((prevState) => {
        return { ...prevState, [props.stateName]: props.newStateValue };
      });
    },
    [setState]
  );
  const setIsModalOpen = useCallback(
    (modalState) => {
      updateStateAction({
        stateName: "isModalOpen",
        newStateValue: modalState,
      });
    },
    [updateStateAction]
  );
  // Fungsi untuk meng-handle perubahan input pemesanan
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      updateStateAction({
        stateName: "formData",
        newStateValue: {
          ...formData,
          data: { ...formData.data, [name]: value },
          errors: {
            name: "wajib diisi!",
            vehicleNumber: "wajib diisi!",
            duration: "wajib diisi!",
            ...formData.errors,
            [name]: value !== "" ? "" : "wajib diisi!",
          },
        },
      });
    },
    [formData, updateStateAction]
  );

  // Fungsi untuk meng-handle select spot
  const handleSelectSpot = useCallback(
    (spot) => {
      updateStateAction({
        stateName: "formData",
        newStateValue: initialFormData,
      });
      updateStateAction({ stateName: "selectedSpot", newStateValue: spot });
    },
    [updateStateAction]
  );

  // Fungsi untuk meng-handle perubahan input pencarian
  const handleSearchChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      updateStateAction({
        stateName: "searchCriteria",
        newStateValue: { ...searchCriteria, [name]: value },
      });
    },
    [searchCriteria, updateStateAction]
  );

  // Fungsi untuk mencari tempat parkir berdasarkan kriteria
  const handleSearch = useCallback(() => {
    const { id, size } = searchCriteria;
    const results = parkingSpots.filter((spot) => {
      const matchId = id ? spot.id === parseInt(id) : true;
      const matchSize = size ? spot.size === size : true;
      return matchId && matchSize;
    });
    updateStateAction({ stateName: "filteredSpots", newStateValue: results });
  }, [searchCriteria, parkingSpots, updateStateAction]);

  // Fungsi untuk submit pemesanan
  const handleSubmit = useCallback(() => {
    const isError =
      Object.keys(formData.errors).filter(
        (field) => formData.errors[field] !== ""
      ).length > 0;
    const isDataOnSet = Object.keys(formData.data).length > 0;

    if (isError || !isDataOnSet) {
      !isDataOnSet &&
        updateStateAction({
          stateName: "formData",
          newStateValue: {
            ...initialFormData,
            errors: {
              name: "wajib diisi!",
              vehicleNumber: "wajib diisi!",
              duration: "wajib diisi!",
            },
          },
        });
      toaster.error({
        title: "Pesanan Gagal",
        description:
          "Pesanan parkir gagal silahkan lengkapi formulir terlebih dahulu!",
        duration: 6000,
        position: "top-right",
      });
    }
    if (selectedSpot && !isError && isDataOnSet) {
      const currentDateTime = new Date();
      const booking = {
        ...formData.data,
        spotId: selectedSpot.id,
        startTime: currentDateTime.toLocaleString(),
      };

      updateStateAction({
        stateName: "filteredSpots",
        newStateValue: filteredSpots.map((spot) =>
          spot.id === selectedSpot.id ? { ...spot, occupied: true } : spot
        ),
      });
      updateStateAction({
        stateName: "parkingSpots",
        newStateValue: parkingSpots.map((spot) =>
          spot.id === selectedSpot.id ? { ...spot, occupied: true } : spot
        ),
      });
      updateStateAction({
        stateName: "bookingDetails",
        newStateValue: [...bookingDetails, booking],
      });
      toaster.success({
        title: "Pesanan Berhasil",
        description: "Pesanan parkir berhasil disimpan!",
        duration: 3000,
        position: "top-right",
      });
      updateStateAction({
        stateName: "formData",
        newStateValue: initialFormData,
      });
      setIsModalOpen(false);
    }
  }, [
    filteredSpots,
    formData,
    bookingDetails,
    selectedSpot,
    parkingSpots,
    updateStateAction,
    setIsModalOpen,
  ]);
  const selectedBooking = useMemo(() => {
    return bookingDetails.find((book) => book.spotId === selectedSpot.id);
  }, [bookingDetails, selectedSpot]);

  return (
    <Box textAlign="center" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Peta Tempat Parkir
      </Text>
      <ParkingSearch
        searchCriteria={searchCriteria}
        onHandleSearch={handleSearch}
        onHandleSearchChange={handleSearchChange}
      />
      <ParkingSpots
        filteredSpots={filteredSpots}
        onSelectSpot={(spot) => {
          handleSelectSpot(spot);
          setIsModalOpen(!isModalOpen);
        }}
      />
      <ParkingBooks
        filteredSpots={filteredSpots}
        onSelectSpot={handleSelectSpot}
        formData={formData}
        onHandleInputChange={handleInputChange}
        onHandleSubmit={handleSubmit}
        onModalAction={setIsModalOpen}
        isModalOpen={isModalOpen}
        selectedBooking={selectedBooking}
        selectedSpot={selectedSpot}
      />
      <Toaster />
    </Box>
  );
};

export default ParkingMap;
