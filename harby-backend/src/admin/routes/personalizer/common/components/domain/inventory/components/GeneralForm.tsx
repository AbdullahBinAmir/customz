import InputField from "../../../molecules/input";
import FormValidator from "../../../utils/form-validator";
import { NestedForm } from "../../../utils/nested-form";

export type GeneralFormType = {
  color: string;
  qty: number;
  type: string;
  size:string;
};

type Props = {
  form: NestedForm<GeneralFormType>;
};

const GeneralForm = ({ form }: Props) => {
  const {
    register,
    path,
    formState: { errors },
  } = form;

  return (
    <div>
      <div className="gap-x-large mb-small grid grid-cols-2">
        <InputField
          label="Color"
          placeholder="Color"
          required
          {...register(path("color"), {
            required: "Color is required",
            minLength: {
              value: 1,
              message: "Color must be at least 1 character",
            },
            pattern: FormValidator.whiteSpaceRule("Color"),
          })}
          errors={errors}
        />
        <InputField
          label="Quantity"
          placeholder="Quantity"
          required
          type="number"
          {...register(path("qty"), {
            required: "Quantity is required",
            min: {
              value: 1,
              message: "Quantity must be a positive number",
            },
            valueAsNumber: true,
          })}
          errors={errors}
        />
        <InputField
          label="Type"
          placeholder="Type"
          required
          {...register(path("type"), {
            required: "Type is required",
            minLength: {
              value: 1,
              message: "Type must be at least 1 character",
            },
            pattern: FormValidator.whiteSpaceRule("Type"),
          })}
          errors={errors}
        />
        <InputField
          label="Size"
          placeholder="Size"
          required
          {...register(path("size"), {
            required: "Size is required",
            minLength: {
              value: 1,
              message: "Size must be at least 1 character",
            },
            pattern: FormValidator.whiteSpaceRule("Size"),
          })}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default GeneralForm;