import { Button, Input, Fieldset } from "@chakra-ui/react";
import { Field } from "../libs-chakra-ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../libs-chakra-ui/native-select";
export const ParkingSearch = (props) => {
  return (
    <Fieldset.Root size="lg" maxW="md" marginBottom={"12"}>
      <Fieldset.Content>
        <Field label="ID Tempat Parkir">
          <Input
            name="id"
            placeholder="ID"
            value={props.searchCriteria.id}
            onChange={props.onHandleSearchChange}
          />
        </Field>

        <Field label="Ukuran Kendaraan">
          <NativeSelectRoot size="sm">
            <NativeSelectField
              placeholder="Semua Ukuran"
              name="size"
              value={props.searchCriteria.size}
              onChange={props.onHandleSearchChange}
            >
              <option value="small">Kecil</option>
              <option value="medium">Sedang</option>
              <option value="large">Besar</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
      </Fieldset.Content>

      <Button colorScheme="blue" onClick={props.onHandleSearch}>
        Cari
      </Button>
    </Fieldset.Root>
  );
};
