import { useState } from "react";
import useToggleState from "../../../hooks/use-toggle-state";
import useNotification from "../../../hooks/use-notification";
import { useNavigate } from "react-router-dom";
import { medusaUrl } from "../../../../services/config";
import { ActionType } from "../../../molecules/actionables";
import EditIcon from "../../../fundamentals/icons/edit-icon";
import TrashIcon from "../../../fundamentals/icons/trash-icon";
import Section from "../../../organisms/section";
import DelimitedList from "../delimited-list";
import GeneralModal from "./GeneralModal";

type Props = {
  product: any;
};

const InventoryGeneralSection = ({ product }: Props) => {
  const { state: infoState, close: closeInfo, toggle: toggleInfo } = useToggleState();
  const notification = useNotification();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${medusaUrl}/store/custom/inventory?id=${product.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete the product. Status code: ${response.status}`);
      }

      notification("Success", "Product deleted successfully.", "success");
      navigate("/a/custominventory");
    } catch (error: any) {
      notification("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const actions: ActionType[] = [
    {
      label: "Edit Information",
      onClick: toggleInfo,
      icon: <EditIcon size={20} />,
    },
    {
      label: "Delete",
      onClick: onDelete,
      variant: "danger",
      icon: <TrashIcon size={20} />,
      disabled: isDeleting,
    },
  ];

  return (
    <>
      <Section title={product.title} actions={actions} forceDropdown>
        <InventoryDetails product={product} />
      </Section>

      <GeneralModal product={product} open={infoState} onClose={closeInfo} />
    </>
  );
};

type DetailProps = {
  title: string;
  value?: string[] | string | null;
};

const Detail = ({ title, value }: DetailProps) => {
  const DetailValue = () => {
    if (!Array.isArray(value)) {
      return <p>{value ? value : "–"}</p>;
    }

    if (value.length) {
      return <DelimitedList list={value} delimit={2} />;
    }

    return <p>–</p>;
  };

  return (
    <div className="inter-base-regular text-grey-50 flex items-center justify-between">
      <p>{title}</p>
      <DetailValue />
    </div>
  );
};

const InventoryDetails = ({ product }: Props) => {
  return (
    <div className="mt-8 flex flex-col gap-y-3">
      <h2 className="inter-base-semibold">Details</h2>
      <Detail title="Color" value={product.color} />
      <Detail title="Quantity" value={product.qty} />
      <Detail title="Type" value={product.type} />
      <Detail title="Size" value={product.size} />
    </div>
  );
};

export default InventoryGeneralSection;