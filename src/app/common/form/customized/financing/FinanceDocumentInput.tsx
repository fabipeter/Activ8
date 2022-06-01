import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const PackagePhotoInput: React.FC<IProps> = ({
  input,
  inputField,
  setInputField,
  className,
  filetype,
}) => {
  const imageHandler = (e: any) => {
    // console.log(e.target.files)
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setInputField({
            ...inputField,
            [input.name]: reader.result!.toString().split(",")[1],
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } catch {
      setInputField({
        ...inputField,
        [input.name]: "",
      });
    }
  };
  return (
    <Form.Field
      // style={{height:"100%"}}
      className=""
    >
      <input
        // {...input}
        accept="image/png, image/jpeg"
        name={input.name}
        type="file"
        onChange={(e: any) => imageHandler(e)}
        className={className}
      />
    </Form.Field>
  );
};

export default observer(PackagePhotoInput);
