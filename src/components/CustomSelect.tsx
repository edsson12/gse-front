/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { formatValueToDecimals } from "@/utils/FormatValueToDecimals";

export interface CustomSelectProps {
  id?: string;
  name?: string;
  update?: string | number | null;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  url?: string | undefined;
  defaultLabel?: string;
  onItemClicked?: (value: string) => void;
  onInputChanged?: (value: any) => void;
  items: SelectItemProps[];
  returnProperty?: keyof SelectItemProps;
  keyProperty?: keyof SelectItemProps;
  isNameWithValue?: boolean;
  menuItemName?: string;
  noOptionsText?: string;
  returnWholeObject?: boolean;
  disabledOptions?: { _id: string; name: string }[];
  onBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

export interface SelectItemProps {
  id: string | number;
  name?: string | [string];
  value?: number;
  [key: string]: any;
}

const styles = {
  "& 	.MuiSelect-filled": {
    backgroundColor: "white",
    borderRadius: "4px",
    transition: "200ms",
    input: {
      "&:-webkit-autofill": {
        boxShadow: "0 0 0 100px #FAF9FA inset",
      },
    },
    "&:hover": {
      backgroundColor: "#E8E8E8",
    },
    "&.Mui-disabled": {
      backgroundColor: "#E0E0E0",
    },
  },

  "& .MuiFormHelperText-root": {
    margin: "3px 0px 0px",
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 1,
    },
  },
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  name,
  label,
  items,
  onInputChanged,
  onItemClicked,
  update,
  returnProperty = "_id",
  keyProperty = "_id",
  isNameWithValue = false,
  returnWholeObject = false,
  menuItemName = "name",
  required,
  disabled,
  disabledOptions = [],
  noOptionsText = "No hay opciones disponibles",
  onBlur,
  ...props
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    if (onInputChanged) {
      onInputChanged(event.target.value);
    }
  };
  const showAsterisk = required;
  return (
    <>
      {items && Array.isArray(items) && items.length ? (
        <FormControl variant="filled" sx={{ width: 1 }} size="small">
          <InputLabel disabled={disabled} id="inp-select1">
            {label}
            {showAsterisk && (
              <span style={{ color: "paynetBlack.main" }}> *</span>
            )}
          </InputLabel>
          <Select
            {...props}
            MenuProps={MenuProps}
            labelId="demo-select-small"
            id={id}
            name={name}
            value={update}
            label={label}
            disabled={disabled}
            onChange={handleChange as any}
            defaultValue={""}
            sx={styles}
            onBlur={onBlur}
          >
            {items.map((CustomSelectProps) => (
              <MenuItem
                id={"sel-" + CustomSelectProps._id}
                key={CustomSelectProps[keyProperty]}
                disabled={disabledOptions.some(
                  (option: any) => option._id === CustomSelectProps._id
                )}
                value={
                  returnWholeObject
                    ? CustomSelectProps
                    : CustomSelectProps[returnProperty]
                }
                onClick={() => {
                  if (onItemClicked) {
                    onItemClicked(
                      CustomSelectProps[keyProperty]?.toString() || ""
                    );
                  }
                }}
              >
                {isNameWithValue
                  ? CustomSelectProps[menuItemName] +
                    " - " +
                    formatValueToDecimals(CustomSelectProps?.value || 0)
                  : CustomSelectProps[menuItemName]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <FormControl variant="filled" sx={{ width: 1 }} size="small">
          <InputLabel disabled={disabled} id="inp-select2">
            {label}
            {showAsterisk && (
              <span style={{ color: "paynetBlack.main" }}> *</span>
            )}
          </InputLabel>
          <Select
            {...props}
            MenuProps={MenuProps}
            labelId="demo-select-small"
            id={id}
            name={name}
            value={update}
            disabled={disabled}
            label={label}
            onChange={handleChange as any}
            defaultValue={""}
            sx={styles}
            onBlur={onBlur}
          >
            <MenuItem value="" disabled>
              {noOptionsText}
            </MenuItem>
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default CustomSelect;
