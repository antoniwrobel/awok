import { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useLocalStorage } from "src/hooks/useLocalStorage";

const tempColumnsIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const tempColumnsNames = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

export const ManageColumnsVisibility = () => {
  const [selectedColumns, setSelectedColumns] = useLocalStorage(
    "selectedColumns",
    tempColumnsNames
  );
  const [columnsVisible, setColumnsVisible] = useLocalStorage(
    "columnsVisible",
    tempColumnsIds
  );

  const isClearButtonDisabled =
    selectedColumns.length === columnsVisible.length;

  const handleChange = (event: SelectChangeEvent<typeof selectedColumns>) => {
    const {
      target: { value },
    } = event;
    setSelectedColumns(value);
  };

  useEffect(() => {
    const currentIds = tempColumnsNames.map((columnName, id) => {
      if (selectedColumns.includes(columnName)) {
        return id;
      }
    });

    setColumnsVisible(currentIds);
  }, [selectedColumns]);

  return (
    <Box display="grid" gridTemplateColumns="1fr 0fr" gap="10px">
      <FormControl>
        <InputLabel>Wybierz kolumny</InputLabel>

        <Select
          multiple
          value={selectedColumns}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          input={<OutlinedInput label="Wybierz kolumny" />}
        >
          {tempColumnsNames.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedColumns.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        disabled={isClearButtonDisabled}
        onClick={() => {
          setSelectedColumns(tempColumnsNames);
          setColumnsVisible(tempColumnsIds);
        }}
      >
        <DeleteOutlineSharpIcon />
      </Button>
    </Box>
  );
};
