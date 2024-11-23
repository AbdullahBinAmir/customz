import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useNotification from "../../../hooks/use-notification";
import { getErrorMessage } from "../../../utils/error-messages";
import { nestedForm } from "../../../utils/nested-form";
import GeneralForm, { GeneralFormType } from "../components/GeneralForm";
import { medusaUrl } from "../../../../services/config";
import FocusModal from "../../../molecules/modal/focus-modal";
import Button from "../../../fundamentals/button";
import CrossIcon from "../../../fundamentals/icons/cross-icon";
import Accordion from "../../../organisms/accordion";

type NewProductForm = {
  general: GeneralFormType;
};

type Props = {
  onClose: () => void;
};

const NewInventory = ({ onClose }: Props) => {
  const form = useForm<NewProductForm>({
    defaultValues: createBlank(),
  });
  const navigate = useNavigate();
  const notification = useNotification();

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;

  const closeAndReset = () => {
    reset(createBlank());
    onClose();
  };

  useEffect(() => {
    reset(createBlank());
  }, []);

  const onSubmit = () =>
    handleSubmit(async (data) => {
      try {
        const payload = await createPayload(data);
        const response = await fetch(`${medusaUrl}/store/custom/inventory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to create inventory: ${response.statusText}`);
        }
        const result = await response.json();
        closeAndReset();
        navigate(`/a/custominventory/${result.inventory.id}`);
      } catch (err: any) {
        notification("Error", getErrorMessage(err), "error");
      }
    });

  return (
    <form className="w-full">
      <FocusModal>
        <FocusModal.Header>
          <div className="medium:w-8/12 flex w-full justify-between px-8">
            <Button size="small" variant="ghost" type="button" onClick={closeAndReset}>
              <CrossIcon size={20} />
            </Button>
            <div className="gap-x-small flex">
              <Button
                size="small"
                variant="primary"
                type="button"
                disabled={!isDirty}
                onClick={onSubmit()}
              >
                {"Save Inventory"}
              </Button>
            </div>
          </div>
        </FocusModal.Header>
        <FocusModal.Main className="no-scrollbar flex w-full justify-center py-16">
          <div className="small:w-4/5 medium:w-7/12 large:w-6/12 max-w-[700px]">
            <Accordion defaultValue={["general"]} type="multiple">
              <Accordion.Item value={"general"} title={"General information"} required>
                <div className="mt-xlarge gap-y-xlarge flex flex-col">
                  <GeneralForm form={nestedForm(form, "general")}  />
                </div>
              </Accordion.Item>
            </Accordion>
          </div>
        </FocusModal.Main>
      </FocusModal>
    </form>
  );
};

const createPayload = async (data: NewProductForm): Promise<any> => {
  const payload: any = {
    color: data.general.color,
    qty: data.general.qty,
    type: data.general.type,
    size:data.general.size
  };
  return payload;
};

const createBlank = (): NewProductForm => {
  return {
    general: {
      color: "",
      qty: 0,
      type: "",
      size:""
    }
  };
};

export default NewInventory;