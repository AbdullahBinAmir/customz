import { CheckoutFormValues } from "@lib/context/checkout-context"
import { emailRegex, phoneRegex } from "@lib/util/regex"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { useMeCustomer } from "medusa-react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"
import NativeSelect from "@modules/common/components/native-select"
import { useEffect, useState } from "react"
// import { fetchCountryList } from "@lib/data"
import CitiesList from "../../../../lib/data/citiesList.json"
import citiesData from "../../../../lib/data/districtList.json"

const ShippingAddress = () => {
  const { customer } = useMeCustomer()
  const [selectedCity, setSelectedCity] = useState({
    id: "",
    name: "",
  })
  const [selectedDistricts, setSelectedDistricts] = useState<any>([])

  const getDistrictsByCityId = (cityId: string) => {
    const cityData = citiesData.find((city) => city.cityId === cityId)
    return cityData ? cityData.districts : []
  }

  const handleCityChange = (event: any) => {
    // const selectedID = event.target.options[event.target.selectedIndex].id
    const selectedOption = event.target.options[event.target.selectedIndex]
    const id = selectedOption.getAttribute("id")
    const name = selectedOption.getAttribute("value")
    setSelectedCity({ id: id, name: name })
    localStorage.setItem("city",name)
    // Find districts for the selected city
    const districtsList = getDistrictsByCityId(id)
    setSelectedDistricts(districtsList)
  }

  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4 bg-amber-100 p-4">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-2">
            <Input
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: emailRegex,
              })}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="First name"
                {...register("shipping_address.first_name", {
                  required: "First name is required",
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Last name"
                {...register("shipping_address.last_name", {
                  required: "Last name is required",
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <Input
              label="House#123, 11 Nawal St."
              {...register("shipping_address.address_1", {
                required: "Address is required",
              })}
              autoComplete="organization"
              errors={errors}
              touched={touchedFields}
            />
            {/* <Input
              label="Address"
              {...register("shipping_address.address_1", {
                required: "Address is required",
              })}
              autoComplete="address-line1"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Apartments, suite, etc."
              {...register("shipping_address.address_2")}
              autoComplete="address-line2"
              errors={errors}
              touched={touchedFields}
            /> */}
            {/* <div className="grid grid-cols-[122px_1fr] gap-x-2"> */}
            <div className="grid grid-cols-[50%_1fr] gap-x-2">
              {/* <Input
                label="Postal code"
                {...register("shipping_address.postal_code", {
                  required: "Postal code is required",
                })}
                autoComplete="postal-code"
                errors={errors}
                touched={touchedFields}
              /> */}
              {/* <Input
                label="City"
                {...register("shipping_address.city", {
                  required: "City is required",
                })}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
              /> */}
              <NativeSelect
                placeholder="Select City"
                {...register("shipping_address.city", {
                  required: "City is required",
                })}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
                onChange={handleCityChange}
                // defaultValue={countryCode}
                // defaultValue={""}
              >
                {CitiesList.map((option, i) => {
                  return (
                    <option key={i} value={option.name} id={option._id}>
                      {option.name}
                    </option>
                  )
                })}
              </NativeSelect>

              <NativeSelect
                placeholder="Select District"
                {...register("shipping_address.district", {
                  required: "City is required",
                })}
                // {...register("shipping_address.province")}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
              >
                {selectedDistricts?.map((option: any) => {
                  return (
                    <option
                      key={option.id}
                      value={`${option.zoneName}, ${option.districtName}`}
                    >
                      {option?.districtName}
                    </option>
                  )
                })}
              </NativeSelect>
            </div>
            {/* <CountrySelect
              {...register("shipping_address.country_code", {
                required: "Country is required",
              })}
              autoComplete="country"
              errors={errors}
              touched={touchedFields}
            /> */}
            {/* <Input
              label="State / Province"
              {...register("shipping_address.province")}
              autoComplete="address-level1"
              errors={errors}
              touched={touchedFields}
            /> */}
            <Input
              label="Phone"
              {...register("shipping_address.phone", {
                required: "Phone is required",
                pattern: phoneRegex,
              })}
              autoComplete="tel"
              errors={errors}
              touched={touchedFields}
            />
          </div>
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress
