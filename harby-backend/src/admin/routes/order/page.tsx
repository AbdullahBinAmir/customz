import { RouteConfig } from "@medusajs/admin"
import Analytics from "../../icons/analytics"
import Orders from "./common"
import AnalyticsProvider from "../personalizer/common/components/context/analytics"
import { WRITE_KEY } from "../personalizer/common/components/constants/analytics"
import { MedusaProvider } from "medusa-react"
import { FeatureFlagProvider } from "../personalizer/common/components/context/feature-flag"
import { medusaUrl } from "../personalizer/common/services/config"
import queryClient from "../personalizer/common/services/queryClient"
import type { PropsWithChildren } from "react"
import { SteppedProvider } from "../personalizer/common/components/molecules/modal/stepped-modal"
import { LayeredModalProvider } from "../personalizer/common/components/molecules/modal/layered-modal"

const Page = ({ children }: PropsWithChildren) => {
  return (
    <MedusaProvider
      baseUrl={medusaUrl}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <FeatureFlagProvider>
        <SteppedProvider>
        <AnalyticsProvider writeKey={WRITE_KEY}>
          <LayeredModalProvider>{children}</LayeredModalProvider>
          </AnalyticsProvider>
        </SteppedProvider>
      </FeatureFlagProvider>
    </MedusaProvider>
  )
}


const CustomOrderPage = () => {
  return (
      <Page>
        <Orders/>
      </Page>
  )
}

export const config: RouteConfig = {
    link: {
        label: "Order",
        icon: Analytics
    }
}

export default CustomOrderPage