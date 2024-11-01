import { Input, Fieldset } from "@chakra-ui/react";
import { Field } from "../libs-chakra-ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "../libs-chakra-ui/number-input";

export const ParkingBookingNew = (props) => {
  const { formData, onHandleInputChange } = props;
  return (
    <Fieldset.Root size="lg" maxW="md" marginBottom={"12"}>
      <Fieldset.Content>
        <Field
          label="Nama"
          invalid={!!formData.errors.name}
          errorText={formData.errors.name}
        >
          <Input
            placeholder="Nama"
            name="name"
            value={formData.data.name}
            onChange={onHandleInputChange}
          />
        </Field>
        <Field
          label="Nomor Kendaraan"
          invalid={!!formData.errors.vehicleNumber}
          errorText={formData.errors.vehicleNumber}
        >
          <Input
            placeholder="Nomor Kendaraan"
            name="vehicleNumber"
            value={formData.data.vehicleNumber}
            onChange={onHandleInputChange}
          />
        </Field>
        <Field
          label="Durasi Parkir (Jam)"
          invalid={!!formData.errors.duration}
          errorText={formData.errors.duration}
        >
          <NumberInputRoot width="200px">
            <NumberInputField
              placeholder="Durasi"
              value={formData.data.duration}
              onChange={onHandleInputChange}
              name="duration"
            />
          </NumberInputRoot>
        </Field>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};
