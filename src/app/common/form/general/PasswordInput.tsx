import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  Button,
  Form,
  FormFieldProps,
  Grid,
  Header,
  Icon,
  Label,
  Popup,
} from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const PasswordInput: React.FC<IProps> = ({
  input,
  isPasswordShown,
  togglePasswordVisiblity,
  disabled,
  style,
  onChange,
  type,
  placeholder,
  height,
  iconClassName,
  className,
  fieldClassName,
  popup,
  meta: { touched, error },
}) => {
  return (
    <Form.Field
      error={touched && !!error}
      type={type}
      style={style}
      height={height}
      className={fieldClassName}
      disabled={disabled}
    >
      <input
        // className={className}
        {...input}
        // style={{position:"absolute"}}
        maxLength={30}
        className={
          isPasswordShown ? `${className}` : `${className} passwordDiscToggle`
        }
        onInput={onChange}
        placeholder={placeholder}
      />
      <Icon
        name={isPasswordShown ? "eye slash outline" : "eye"}
        size="large"
        className={iconClassName}
        onClick={() => togglePasswordVisiblity(!isPasswordShown)}
      />
     
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default observer(PasswordInput);
