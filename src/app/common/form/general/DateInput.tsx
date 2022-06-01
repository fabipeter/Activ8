import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";
import { observer } from "mobx-react-lite";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  id,
  inputField,
  setInputField,
  dateValue,
  style,
  placeholder,
  className,
  // date = false,
  // time = false,
  meta: { touched, error },
  ...rest
}) => {
  const changeMethod = (e: any, data: any) => {
    input.onChange(e);

    setInputField({ ...inputField, [data.name]: e });

    // console.log(data.value);
    // console.log(e);
  };
  
  
  return (
    <Form.Field id={id} className={className} error={touched && !!error} style={style}>
      <DateTimePicker
      
        placeholder={placeholder}
        value={input.value || null}
        onChange={(e) => changeMethod(e, input)}
        // onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        // date = {date}
        // time = {time}
        // defaultValue={inputField.endDate}
        {...rest}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default observer(DateInput);
