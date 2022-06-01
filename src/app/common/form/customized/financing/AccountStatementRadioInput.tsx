import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label, Radio } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const AccountStatementRadioInput: React.FC<IProps> = ({
  input,
  label,
  displayLabel,
  status,
  inputField,
  setInputField,
  className,
  fieldClassName,
  meta: { touched, error },
}) => {
  const changeMethod = (e: any, data: any) => {
    input.onChange(data.value);

    if (label === "Disabled") {
      input.onChange(data.value);
      setInputField({
        ...inputField,
        [input.name]: "false",
      });
      //   console.log(e);
    } else {
      setInputField({
        ...inputField,
        [input.name]: "true",
      });
    }

    //  console.log(change(e))
  };
  return (
    <Form.Field className={fieldClassName}>
      <Radio
        // {...input}
        key={label!.toString()}
        name={input.name}
        label={displayLabel}
        // value={status === undefined ? false : status}
        checked={status === inputField.accountStatementStatus}
        onChange={(e, data) => changeMethod(e, data)}
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

export default observer(AccountStatementRadioInput);
