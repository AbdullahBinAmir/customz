import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import Medusa from "@medusajs/medusa-js"
import { useAdminGetSession, useAdminOrders } from "medusa-react"
import ReactCountryFlag from "react-country-flag"
import { getColor } from "../../utils/color"
import { isoAlpha2Countries } from "../../utils/countries"
import { formatAmountWithSymbol } from "../../utils/prices"
import Tooltip from "../../atoms/tooltip"
import StatusDot from "../../fundamentals/status-indicator"
import CustomerAvatarItem from "../../molecules/customer-avatar-item"
import AddOrderStatus from "../add-order-status/AddOrderStatus"

const useOrderTableColums = () => {
  // const [status, setStatus] = useState('')
  // console.log("status...:", status);
  const { user,isLoading } = useAdminGetSession()
  // const { orders } = useAdminOrders()
  // console.log("orders...:", orders);

  // const [status, setStatus] = useState('');

  // useEffect(() => {
  //   const medusa = new Medusa({ baseUrl: __MEDUSA_BACKEND_URL__, maxRetries: 3 })
  //   medusa.carts.retrieve("cart_01H7T4P1GWN6HMJBFHRYWT2VHD")
  //     .then(({ cart }) => {
  //       debugger
  //       // console.log(cart.id);
  //       if (cart) {
  //         if (cart.context.customStatus) {
  //           setStatus(cart.context.customStatus as string)
  //         }
  //         else {
  //           setStatus("Pending")
  //         }
  //       }
  //     });
  // }, [])

  const decideStatus = (status) => {
    switch (status) {
      case "captured":
        return <StatusDot variant="success" title={"Paid"} />
      case "awaiting":
        return <StatusDot variant="default" title={"Awaiting"} />
      case "requires_action":
        return <StatusDot variant="danger" title={"Requires action"} />
      case "canceled":
        return <StatusDot variant="warning" title={"Canceled"} />
      default:
        return <StatusDot variant="primary" title={"N/A"} />
    }
  }

  if(isLoading){
      return(
        <span>Loading...</span>
      )
  }

  const columns = useMemo(
    () => [
      {
        Header: <div className="pl-2">Order</div>,
        accessor: "display_id",
        Cell: ({ cell: { value } }) => (
          <p className="min-w-[100px] pl-2 text-grey-90 group-hover:text-violet-60">{`#${value}`}</p>
        ),
      },
      {
        Header: "Date added",
        accessor: "created_at",
        Cell: ({ cell: { value } }) => (
          <div>
            <Tooltip content={moment(value).format("DD MMM YYYY hh:mm a")}>
              {moment(value).format("DD MMM YYYY")}
            </Tooltip>
          </div>
        ),
      },
      {
        // Header: "Customer" ,
        Header: () => <>{user?.role === "admin" && <div>Customer</div>}</>,
        accessor: "customer",
        Cell: ({ row, cell: { value } }) => (
          <div>
            {user?.role === "admin" && (
              <CustomerAvatarItem
                customer={{
                  first_name:
                    value?.first_name ||
                    row.original.shipping_address?.first_name,
                  last_name:
                    value?.last_name ||
                    row.original.shipping_address?.last_name,
                  email: row.original.email,
                }}
                color={getColor(row.index)}
              />
            )}
          </div>
        ),
      },
      {
        Header: "Fulfillment",
        // Header: () => (<>{user?.role === "admin" && <div>Fulfillment</div>}</>),
        accessor: "fulfillment_status",
        // Cell: ({ cell: { value } }) => (<>{user?.role === "admin" && value}</>),
        Cell: ({ cell: { value } }) => value,
      },
      {
        // Header: "Payment status",
        Header: () => (
          <>{user?.role === "admin" && <div>Payment status</div>}</>
        ),
        accessor: "payment_status",
        // Cell: ({ cell: { value } }) => decideStatus(value),
        Cell: ({ cell: { value } }) => (
          <>{user?.role === "admin" && decideStatus(value)}</>
        ),
      },
      {
        // Header: "Sales Channel",
        Header: () => <>{user?.role === "admin" && <div>Sales Channel</div>}</>,
        accessor: "sales_channel",
        // Cell: ({ cell: { value } }) => value?.name ?? "N/A",
        Cell: ({ cell: { value } }) => (
          <>{user?.role === "admin" && <>{value?.name ?? "N/A"}</>}</>
        ),
      },
      {
        Header: () => {
          user?.role === "admin" && <div className="text-right">Total</div>
        },
        accessor: "total",
        Cell: ({ row, cell: { value } }) => (
          <div className="text-right">
            {user?.role === "admin" && (
              <>
                {formatAmountWithSymbol({
                  amount: value,
                  currency: row.original.currency_code,
                  digits: 2,
                })}
              </>
            )}
          </div>
        ),
      },
      {
        Header: "",
        accessor: "currency_code",
        Cell: ({ cell: { value } }) => (
          <div className="text-right text-grey-40">
            {user?.role === "admin" && <>{value.toUpperCase()}</>}
          </div>
        ),
      },
      {
        Header: "",
        accessor: "country_code",
        Cell: ({ row }) => (
          <div className="pr-2">
            {user?.role === "admin" && (
              <div className="flex w-full justify-end rounded-rounded">
                <Tooltip
                  content={
                    isoAlpha2Countries[
                      row.original.shipping_address?.country_code?.toUpperCase()
                    ] ||
                    row.original.shipping_address?.country_code?.toUpperCase()
                  }
                >
                  <ReactCountryFlag
                    className={"rounded"}
                    svg
                    countryCode={row.original.shipping_address?.country_code}
                  />
                </Tooltip>
              </div>
            )}
          </div>
        ),
      },
      {
        Header: <div className="text-right">Status</div>,
        accessor: "cart_id",
        Cell: ({ row, cell: { value } }) => {
          // console.log("row.....:", row.original);
          // const medusa = new Medusa({ baseUrl: __MEDUSA_BACKEND_URL__, maxRetries: 3 })
          // orders?.map((o) => (
          //   medusa.carts.retrieve(o.cart_id)
          //     .then(({ cart }) => {
          //       // console.log("cart.id", cart.id);
          //       // console.log("order.id", o.id);
          //       // console.log(cart.context.customStatus);
          //       // console.log("Equal.................:", o.id === row.original.id);
          //       if (o.id === row.original.id) {
          //         setStatus(cart.context.customStatus as string)
          //       }
          //     })))
          //  let [newValue,setNewVal] = useState('')
          //   useEffect(()=>{
          //     fetch(`https://api-meamade.devstarx.com/store/getOrdersWithCart?order_id=${row.original.id}`)
          //     .then(response => response.text())
          //     .then(result => {
          //       //@ts-ignore
          //        //console.log(JSON.parse(result))
          //        setNewVal(JSON.parse(result).context.customStatus?JSON.parse(result).context.customStatus.toLowerCase().replace(/_/g, ' '):row.original.status)
          //     })
          //     .catch(error => console.log('error', error));
          //   },[])
          // return (
          //   <div className="text-right text-grey-40">{newValue}</div>
          // )
          return (
            <AddOrderStatus
              order_id={row.original.id}
              status={row.original.status}
            />
          )
        },
      },
    ],
    []
  )

  return [columns]
}

export default useOrderTableColums
