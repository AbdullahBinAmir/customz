import { RouteConfig } from "@medusajs/admin"
import Product from "../../icons/product"
import AnalyticsProvider from "../personalizer/common/components/context/analytics"
import { WRITE_KEY } from "../personalizer/common/components/constants/analytics"
import { MedusaProvider } from "medusa-react"
import { FeatureFlagProvider } from "../personalizer/common/components/context/feature-flag"
import { medusaUrl } from "../personalizer/common/services/config"
import queryClient from "../personalizer/common/services/queryClient"
import { SteppedProvider } from "../personalizer/common/components/molecules/modal/stepped-modal"
import { LayeredModalProvider } from "../personalizer/common/components/molecules/modal/layered-modal"
import InventoryRoute from "../personalizer/common/components/domain/inventory"

const InventoryRoutes = ({children})=>{
  return (
    <MedusaProvider
      baseUrl={medusaUrl}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <FeatureFlagProvider>
        <SteppedProvider>
          <LayeredModalProvider>{children}</LayeredModalProvider>
        </SteppedProvider>
      </FeatureFlagProvider>
    </MedusaProvider>
  )
}

const CustomInventoryPage = () => {
  return (
    <InventoryRoutes>
    <AnalyticsProvider writeKey={WRITE_KEY}>
      <InventoryRoute/>
    </AnalyticsProvider>
    </InventoryRoutes>
  )
}

export const config: RouteConfig = {
    link: {
        label: "Inventory",
        icon: Product
    }
}

export default CustomInventoryPage