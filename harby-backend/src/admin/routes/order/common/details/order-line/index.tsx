import { useEffect, useState } from "react"
import { LineItem } from "@medusajs/medusa"
import Medusa from "@medusajs/medusa-js"
import clsx from "clsx"
import { useAdminGetSession, useOrder } from "medusa-react"
import { formatAmountWithSymbol } from "../../../../personalizer/common/components/utils/prices"
import { medusaUrl } from "../../../../personalizer/common/services/config"

type OrderLineProps = {
  item: LineItem
  currencyCode: string
  cartId: string
}

const DownloadButton = ({ imageUrl, fileName }) => {
  const handleDownload = () => {
    // Create a temporary link element to trigger the download
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button onClick={handleDownload}>
      <img src={imageUrl} className="object-cover" />
    </button>
  )
}

// const FileUpload = ({ order_id }) => {
//   const [file, setFile] = useState<AdminCreateUploadPayload>([]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFile(file);

//     };
//   }

//   const handleUpload = () => {

//     const medusa = new Medusa({ baseUrl: __MEDUSA_BACKEND_URL__, maxRetries: 3 })
//     // must be previously logged in or use api token
//     medusa.admin.uploads.create(file)
//       .then(({ uploads }) => {
//         console.log(uploads.length);
//         console.log(uploads);
//         console.log(uploads[0].url);
//         medusa.carts.update('cart_01H7CC3YH3QQFG6YFABACAH9ER', {
//           context: {
//             "designerImage": uploads[0].url,
//             "user_agent": "PostmanRuntime/7.29.2"
//           },
//         })
//           .then(({ cart }) => {
//             console.log(cart.id);
//             console.log(cart);
//           });

//       });
//   }

//   return (
//     <div className="relative inline-block">
//       <input
//         type="file"
//         id="upload"
//         className="absolute left-[-9999px]"
//         onChange={handleFileChange}
//       />
//       <div className="flex justify-evenly items-center">
//         <label
//           htmlFor="upload"
//           className="px-4 py-2 bg-gray-50 text-black cursor-pointer rounded-md flex justify-center"
//         >
//           <span className={file.name ? 'hidden' : 'mr-2'}>📷</span>
//           <span id="file-name" className={file.name ? '' : 'hidden'}>
//             {file.name || 'Upload File'}
//           </span>
//         </label>
//         <span onClick={() => setFile('')} className={file.name ? 'cursor-pointer' : 'hidden'}>✖</span>
//       </div>
//       {/* <button onClick={handleUpload}>Upload</button> */}
//       <button onClick={handleUpload} className="bg-green-600 px-6 py-2 rounded-full text-white mt-10">Upload</button>
//     </div>
//   );
// };

const OrderLine = ({ item, currencyCode, cartId }: OrderLineProps) => {
  const { user, isLoading } = useAdminGetSession()
  const [customizedURL, setCustomizedURL] = useState("")
  const [designType, setDesignType] = useState("")
  const [customizedTitle, setCustomizedTitle] = useState("")

  useEffect(() => {
    const getCutomizedUrl = async () => {
      try {
        const medusa = new Medusa({
          baseUrl: medusaUrl,
          maxRetries: 3,
        })

        const { cart } = await medusa.carts.retrieve(cartId)
        // console.log(cart?.context)
        setCustomizedURL(cart?.context?.customizedURL as string)
        setCustomizedTitle(cart?.context?.title as string)
        setDesignType(cart?.context?.designType as string)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    getCutomizedUrl()
  }, [])

  if(isLoading){
    return(
      <span>Loading...</span>
    )
  }
  else{
  return (
    <div
      className={clsx(
        "mx-[-5px] mb-1 flex h-[64px] justify-between rounded-rounded py-2 px-[5px] hover:bg-grey-5",
        {
          "mb-10": user?.role === "developer",
          "h-[110px]": customizedURL && item.title === customizedTitle,
        }
      )}
    >
      <div className="flex justify-center space-x-4">
        {/* <div className="flex h-[48px] w-[36px] overflow-hidden rounded-rounded">
          {item.thumbnail ? (
            // <DownloadButton imageUrl={item.thumbnail} fileName={`${item.title}.jpg`} />
            // <img src={item.thumbnail} className="object-cover" />
            <a href={item.thumbnail} download={`${item.title}.png`}>
              {item.variant.product.handle === "customize-shirt." &&
              !undefined ? (
                <img src={customizedURL} alt={item.title} />
              ) : (
                <img src={item.thumbnail} alt={item.title} />
              )}
            </a>
          ) : (
            <ImagePlaceholder />
          )}
        </div> */}
        {item.title === customizedTitle ? (
          <div className="flex h-[48px] w-[36px] rounded-rounded">
            <a href={customizedURL ?? "#"} download={`${item.title}.png`}>
              <img src={customizedURL ?? ""} alt={item.title} />
            </a>
          </div>
        ) : (
          <div className="flex h-[48px] w-[36px] items-center overflow-hidden rounded-rounded">
            <a href={item.thumbnail ?? "#"} download={`${item.title}.png`}>
              <img src={item.thumbnail ?? ""} alt={item.title} />
            </a>
          </div>
        )}
        <div className="flex max-w-[185px] flex-col justify-center">
          <span className="inter-small-regular truncate text-grey-90">
            {`${item.title} ${(designType && designType?.length>0) ? ` | ${designType}` : ""}`}
          </span>
          {item?.variant && (
            <span className="inter-small-regular truncate text-grey-50">
              {`${item.variant.title}${
                item.variant.sku ? ` (${item.variant.sku})` : ""
              }`}
            </span>
          )}
        </div>
      </div>
      {
        user?.role === "admin" ? (
          <div className="flex  items-center">
            <div className="mr-3 flex small:space-x-2 medium:space-x-4 large:space-x-6">
              <div className="inter-small-regular text-grey-50">
                {formatAmountWithSymbol({
                  amount: (item?.total ?? 0) / item.quantity,
                  currency: currencyCode,
                  digits: 2,
                  tax: [],
                })}
              </div>
              <div className="inter-small-regular text-grey-50">
                x {item.quantity}
              </div>
              <div className="inter-small-regular text-grey-90">
                {formatAmountWithSymbol({
                  amount: item.total ?? 0,
                  currency: currencyCode,
                  digits: 2,
                  tax: [],
                })}
              </div>
            </div>
            <div className="inter-small-regular text-grey-50">
              {currencyCode.toUpperCase()}
            </div>
          </div>
        ) : null
        // <div className="flex flex-col items-center">
        //   <FileUpload order_id={order_id} />
        //   {/* <div className="flex justify-end mt-10"> */}
        //   {/* <button className="bg-green-600 px-6 py-2  rounded-full text-white">Done</button> */}
        //   {/* </div> */}
        // </div>
      }
    </div>
  )
}
}

export default OrderLine
