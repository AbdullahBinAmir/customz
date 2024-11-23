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
import ProductsRoute from "../personalizer/common/components/domain/products"

const ProductRoutes = ({children})=>{
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

const CustomProductsPage = () => {
  return (
    <ProductRoutes>
    <AnalyticsProvider writeKey={WRITE_KEY}>
      <ProductsRoute/>
    </AnalyticsProvider>
    </ProductRoutes>
  )
}

export const config: RouteConfig = {
    link: {
        label: "Products",
        icon: Product
    }
}

export default CustomProductsPage