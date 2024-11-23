import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getErrorStatus } from "../../../utils/get-error-status";
import useNotification from "../../../hooks/use-notification";
import { medusaUrl } from "../../../../services/config";
import Spinner from "../../../atoms/spinner";
import BackButton from "../../../atoms/back-button";
import InventoryGeneralSection from "../components/InventoryGeneralSection";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notification = useNotification();

  const [product, setProduct] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${medusaUrl}/store/custom/inventory?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.statusText}`);
        }
        const data = await response.json();
        setProduct(data.inventory); // Assuming the response structure has a `product` key
        setStatus("success");
      } catch (error: any) {
        const errorStatus = getErrorStatus(error);
        if (errorStatus?.status === 404) {
          navigate("/404");
          return;
        }
        setStatus("error");
        notification("Error", `Failed to load inventory: ${error.message}`, "error");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [notification]);
//   }, [id, navigate, notification]);

  if (status === "loading" || !product) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
        <Spinner variant="secondary" />
      </div>
    );
  }

  if (status === "error") {
    throw new Error("An unexpected error occurred while loading the product.");
  }

  return (
    <div className="pb-5xlarge">
      <BackButton
        path="/a/custominventory"
        label="Back to Custom Inventory"
        className="mb-xsmall"
      />
      <div className="gap-y-xsmall flex flex-col">
        <div className="gap-x-base grid grid-cols-12">
          <div className="gap-y-xsmall col-span-8 flex flex-col">
            <InventoryGeneralSection product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;