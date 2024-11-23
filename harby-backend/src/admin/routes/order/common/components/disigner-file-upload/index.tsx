import React, { useState, useEffect } from "react"
import Medusa from "@medusajs/medusa-js"
import useNotification from "../../../../personalizer/common/components/hooks/use-notification";
import { medusaUrl } from "../../../../personalizer/common/services/config";

type AdminCreateUploadPayload = /*unresolved*/ any

const FileUpload = ({ cartId }) => {

    const notification = useNotification()

    const [file, setFile] = useState<AdminCreateUploadPayload>([]);
    const [url, setUrl] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);

        };
    }

    const handleUpload = () => {
        const medusa = new Medusa({ baseUrl: medusaUrl, maxRetries: 3 })
        // must be previously logged in or use api token
        medusa.admin.uploads.create(file)
            .then(({ uploads }) => {
                console.log(uploads.length);
                setUrl(uploads[0].url)
                medusa.carts.update(cartId, {
                    context: {
                        designerImage: uploads[0].url,
                        fileName: file.name

                    },
                })
                    .then(({ cart }) => {
                        notification("Success", "File uploaded successfully", "success")
                        console.log(cart.id);
                        console.log(cart);
                    });

            });
    }

    const handleStatusChange = () => {
        const medusa = new Medusa({ baseUrl: medusaUrl, maxRetries: 3 })
        medusa.carts.update(cartId, {
            context: {
                customStatus: "ready_to_print"
            },
        })
            .then(({ cart }) => {
                notification("Success", "Status updated successfully", "success")
                console.log(cart.id);
                console.log(cart);
            });
    }

    useEffect(() => {
        const medusa = new Medusa({ baseUrl: medusaUrl, maxRetries: 3 })
        medusa.carts.retrieve(cartId)
            .then(({ cart }) => {
                // console.log(cart.id);
                // debugger
                if (cart.context.designerImage) {
                    setUrl(cart.context.designerImage as string)
                    setFile(cart.context.fileName as string)
                }
            });
    }, [])

    return (
        <div className="h-full w-5/12 rounded-rounded border border-grey-20 bg-grey-0">
            <h1 className="font-bold pl-4 pt-4">Designer</h1>
            <div className="border-b border-grey-20 py-large px-xlarge text-center min-h-[256px]">
                <div className="relative inline-block">
                    <input
                        type="file"
                        id="upload"
                        className="absolute left-[-9999px]"
                        onChange={handleFileChange}
                    />
                    <div className={file.name ? "flex justify-evenly items-center h-[127.5px]" : "border border-dashed"}>
                        <label htmlFor="upload" className="px-4 py-2 text-black cursor-pointer rounded-md flex justify-center">
                            <span className={file.name || url ? 'hidden' : 'mr-2'}>
                                <svg width="100" height="110" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.1673 46.6666C11.6207 46.6666 8.59509 45.4455 6.09065 43.0033C3.58621 40.5455 2.33398 37.5511 2.33398 34.02C2.33398 30.9866 3.24398 28.28 5.06398 25.9C6.89954 23.52 9.29509 22.0033 12.2507 21.35C13.2307 17.7722 15.1751 14.8789 18.084 12.67C21.0084 10.4455 24.314 9.33331 28.0007 9.33331C32.5584 9.33331 36.4162 10.92 39.574 14.0933C42.7473 17.2511 44.334 21.1089 44.334 25.6666C47.0251 25.9778 49.2495 27.1444 51.0073 29.1666C52.7806 31.1578 53.6673 33.4911 53.6673 36.1666C53.6673 39.0911 52.6484 41.5722 50.6106 43.61C48.5729 45.6478 46.0918 46.6666 43.1673 46.6666H30.334C29.0584 46.6666 27.9618 46.2078 27.044 45.29C26.1262 44.3878 25.6673 43.2911 25.6673 42V29.9833L21.934 33.6L18.6673 30.3333L28.0007 21L37.334 30.3333L34.0673 33.6L30.334 29.9833V42H43.1673C44.8006 42 46.1773 41.4322 47.2973 40.2966C48.4329 39.1766 49.0006 37.8 49.0006 36.1666C49.0006 34.5333 48.4329 33.1566 47.2973 32.0366C46.1773 30.9011 44.8006 30.3333 43.1673 30.3333H39.6673V25.6666C39.6673 22.4466 38.5318 19.6933 36.2607 17.4066C33.9895 15.1355 31.2362 14 28.0007 14C24.7807 14 22.0273 15.1355 19.7407 17.4066C17.4695 19.6933 16.334 22.4466 16.334 25.6666H15.1673C12.9118 25.6666 10.9907 26.4678 9.40398 28.07C7.80176 29.6566 7.00065 31.5778 7.00065 33.8333C7.00065 36.0889 7.80176 38.0333 9.40398 39.6666C10.9907 41.2222 12.9118 42 15.1673 42H21.0007V46.6666" fill="#979797" />
                                </svg>
                            </span>
                            <span id="file-name" className={file.name || url ? '' : 'hidden'}>
                                {url ?
                                    <img src={url} alt="" className="w-20 h-20" /> : file.name || 'Upload File'
                                }
                            </span>
                        </label>
                        <span onClick={() => setFile('')} className={file.name ? 'cursor-pointer' : 'hidden'}>✖</span>
                    </div>
                    <div>
                        {url ? <a href={url}>Download</a> : null}
                    </div>
                    <div className="flex justify-evenly gap-4">
                        <button type="button" disabled={!file.name} onClick={handleUpload} className="bg-green-600 px-6 py-2 rounded-full text-white mt-10 disabled:opacity-50">Upload</button>
                        <button type="button" disabled={!url} onClick={handleStatusChange} className="bg-green-600 px-6 py-2 rounded-full text-white mt-10 disabled:opacity-50">Move to factory</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload