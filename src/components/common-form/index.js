import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CommonForm({
  action,
  buttonText,
  isBtnDisabled,
  formControls,
  buttonText,
  btnType,
  formData,
  setFormData,
}) {
  function renderInputByComponentType(getCurrentControl) {
    let content = null;
    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative felx items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
            />
          </div>
        );
        break;

        case "file":
            content= <Label>
                <h2></h2>
            </Label>
        break;

      default:
        break;
    }
  }

  return (
    <form action={action}>
      {formControls.map((control) => renderInputByComponentType(control))}
      <div className="mt-6 w-full">
        <Button
          type={btnType || "submit"}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
          disabled={isBtnDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
