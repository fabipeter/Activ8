import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const FinancingTextNumberInput: React.FC<IProps> = ({
  input,
  disabled,
  inputField,
  setInputField,
  width,
  type,
  placeholder,
  height,
  className,
  fieldClassName,
  meta: { touched, error },
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setInputField({ ...inputField, [e.target.name]: Number(e.target.value) });
    // setInputField(inputField);
  };
  return (
    <Form.Field
      error={touched && !!error}
      type={type}
      style={{ width: width }}
      height={height}
      className={fieldClassName}
      disabled={disabled}
    >
      <div
        className="d-flex"
        style={{
          border: "1px solid rgba(34,36,38,.15)",
          outline: "none",
          borderRadius: "0.285714rem",
        //   padding:"1px"
        }}
      >
        <span
          className={touched && error ? "currencyClassError" : " currencyClass"}
          style={{ textAlign: "center", fontSize: "1em" }}
        >
          NGN
        </span>
        <input
          className={className}
          {...input}
          onInput={handleChange}
          onWheel={(event) => {
            event.currentTarget.blur();
          }}
          placeholder={placeholder}
          style={{ border: "none", outline: "none" }}
        />
      </div>
      {!error && (
        <span className="show_Paddlock pb-1">
          <img src="/images/paddlock.svg" className="padlock"></img>
        </span>
      )}
      <div>
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </div>
    </Form.Field>
  );
};

export default observer(FinancingTextNumberInput);
