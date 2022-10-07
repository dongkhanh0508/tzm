/* eslint-disable react/prop-types */
import { DatePickerProps, DateRangePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  rules?: any;
  defaultValue?: any;
};

const DateRangePickerField: React.FC<Props & Partial<DatePickerProps>> = ({
  name,
  label = null,
  rules,
  defaultValue = [null, null],
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <DateRangePicker
          calendars={2}
          {...field}
          value={field.value ?? [null, null]}
          renderInput={(startProps, endProps) => (
            <>
              <TextField size="small" {...startProps} label="ssss" placeholder="ssss" />
              <TextField size="small" {...endProps} label="to time" placeholder="to time" />
            </>
          )}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default DateRangePickerField;
