import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../../personalizer/common/components/molecules/input";
import Button from "../../personalizer/common/components/fundamentals/button";
import axios from "axios";
import { medusaUrl } from "../../personalizer/common/services/config";
import Select from "../../personalizer/common/components/molecules/select";

type FormData = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    type: string;
    material: string;
    color: string;
    size: string;
    qty: number;
    print_technique: string;
    desc: string;
    address: string;
    status: string;
    img: string;
};

const EditForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { control, handleSubmit, reset, register, setValue, formState: { isSubmitting } } = useForm<FormData>();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // Fetch initial data
        fetch(`${medusaUrl}/store/custom/bulkOrder?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                reset(data); // Load data into the form
                setImageUrl(data.img); // Set the initial image URL
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id, reset]);

    const onSubmit = (data: FormData) => {
        fetch(`${medusaUrl}/store/custom/bulkOrder`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            //@ts-ignore
            body: JSON.stringify({ ...data, id: id, img: imageUrl, status: data.status.value }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Data updated:", result);
                navigate(-1); // Navigate back to the previous page
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    const convertBase64Img = async (base64: string) => {
        const url = `${medusaUrl}/store/custom/uploadimage`;
        const payload = { base: base64 };

        try {
            const response = await axios.post(url, payload, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const base64 = reader.result as string;
                    const res = await convertBase64Img(base64);
                    setImageUrl(res.fileURL);
                } catch (error) {
                    console.error("Error processing image:", error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const options = [
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "inprogress" },
        { label: "Completed", value: "completed" },
        { label: "Rejected", value: "rejected", },
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="inter-base-semibold">Edit Form</h3>
            <div className="gap-y-xsmall grid grid-cols-1">
                <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                        <InputField label="First Name" {...field} />
                    )}
                />
                <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Last Name" {...field} />
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Phone" {...field} />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Email" {...field} />
                    )}
                />
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Type" {...field} />
                    )}
                />
                <Controller
                    name="material"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Material" {...field} />
                    )}
                />
                <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Color" {...field} />
                    )}
                />
                <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Size" {...field} />
                    )}
                />
                <Controller
                    name="qty"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Quantity" type="number" {...field} />
                    )}
                />
                <Controller
                    name="print_technique"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Print Technique" {...field} />
                    )}
                />
                <Controller
                    name="status"
                    control={control}
                    defaultValue={{ label: "Pending", value: "pending" }}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                        <Select
                            label="Status"
                            options={options}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Address" {...field} />
                    )}
                />
                <Controller
                    name="desc"
                    control={control}
                    render={({ field }) => (
                        <InputField label="Description" {...field} />
                    )}
                />

                <div className="gap-y-xsmall grid grid-cols-1">
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" onChange={handleFileChange} />
                    {imageUrl && (
                        <div className="mt-2">
                            <img src={imageUrl} alt="Selected" className="h-32 w-32 object-cover" />
                        </div>
                    )}
                </div>
            </div>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
            </Button>
        </form>
    );
};

export default EditForm;