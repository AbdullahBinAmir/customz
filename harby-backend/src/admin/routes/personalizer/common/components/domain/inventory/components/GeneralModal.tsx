import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { nestedForm } from "../../../utils/nested-form";
import useNotification from "../../../hooks/use-notification";
import { medusaUrl } from "../../../../services/config";
import Modal from "../../../molecules/modal";
import Button from "../../../fundamentals/button";
import GeneralForm from "./GeneralForm";

type Props = {
  product: any;
  open: boolean;
  onClose: () => void;
};

type GeneralFormWrapper = {
  general: any;
};

const GeneralModal = ({ product, open, onClose }: Props) => {
  const form = useForm<GeneralFormWrapper>({
    defaultValues: getDefaultValues(product),
  });

  const [updating, setUpdating] = useState(false);
  const notification = useNotification();

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form;

  useEffect(() => {
    reset(getDefaultValues(product));
  }, [reset]);

  const onReset = () => {
    reset(getDefaultValues(product));
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    setUpdating(true);

    const updatedData = {
      ...data.general,
      id: product.id,
    };

    try {
      const response = await fetch(`${medusaUrl}/store/custom/inventory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update the product. Status code: ${response.status}`);
      }

      notification("Success", "Product updated successfully.", "success");
      onClose();
    } catch (error: any) {
      notification("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  });

  return (
    <Modal open={open} handleClose={onReset} isLargeModal>
      <Modal.Body>
        <Modal.Header handleClose={onReset}>
          <h1 className="inter-xlarge-semibold m-0">Edit General Information</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            <GeneralForm form={nestedForm(form, "general")} />
          </Modal.Content>
          <Modal.Footer>
            <div className="flex w-full justify-end gap-x-2">
              <Button size="small" variant="secondary" type="button" onClick={onReset}>
                Cancel
              </Button>
              <Button size="small" variant="primary" type="submit" disabled={!isDirty} loading={updating}>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const getDefaultValues = (product: any): GeneralFormWrapper => {
  return {
    general: {
      color: product.color,
      qty: product.qty,
      type: product.type,
      size:product.size
    },
  };
};

export default GeneralModal;