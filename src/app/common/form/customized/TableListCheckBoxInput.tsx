import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { FieldRenderProps } from "react-final-form";
import {
  Checkbox,
  Form,
  FormFieldProps,
  Label,
  Radio,
} from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TableListCheckBoxInput: React.FC<IProps> = ({
  input,
  label,
  index,
  allStatus,
  handleEntityCheck,
  setAllCheckboxStatus,
  inputField,
  className,
  fieldClassName,
  meta: { touched, error },
}) => {
  const [status, setStatus] = useState(false);

  const handleCheck = () => {
    if (allStatus) {
      setAllCheckboxStatus(false);
      setStatus(false);
    } else {
      setStatus(!status);
    }
  };

  useEffect(() => {
      // console.log(JSON.parse(JSON.stringify(inputField.list)))
    if (allStatus && !status) {
      setStatus(true);
    } else if (
      !allStatus &&
      status &&
      inputField.list.length === 0
    ) {
      setStatus(false);
    }
  }, [allStatus, setStatus, status, inputField]);
  return (
    <Form.Field className={fieldClassName}>
      <Checkbox
        // {...input}
        // // type="checkbox"
        key={index}
        name={`${input.name}${index}`}
        // label={label}
        value={`${status}`}
        checked={status}
        onChange={(e) => {
          handleCheck();
          handleEntityCheck(e, index);
        }}
        // className={allStatus ? `${className} checked` : className}
        className={className}
      />
      {/* {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )} */}
    </Form.Field>
  );
};

export default observer(TableListCheckBoxInput);
