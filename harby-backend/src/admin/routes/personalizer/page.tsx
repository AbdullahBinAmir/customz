import { RouteConfig } from "@medusajs/admin"
import Personalizer from "../../icons/personalizer"
import { Route, Routes } from "react-router-dom"
import Edit from "./common/components/domain/personalizer/edit"
import Overview from "./common/components/domain/personalizer/overview"
import AnalyticsProvider from "./common/components/context/analytics"
import { WRITE_KEY } from "./common/components/constants/analytics"
import { MedusaProvider } from "medusa-react"
import { FeatureFlagProvider } from "./common/components/context/feature-flag"
import { medusaUrl } from "./common/services/config"
import queryClient from "./common/services/queryClient"

const CustomPersonalizerPage = () => {
  return (
    <MedusaProvider
    baseUrl={medusaUrl}
    queryClientProviderProps={{
      client: queryClient,
    }}
  >
    <FeatureFlagProvider>
    <AnalyticsProvider writeKey={WRITE_KEY}>
    <Routes>
      <Route index element={<Overview />} />
      <Route path="/:id" element={<Edit />} />
    </Routes>
    </AnalyticsProvider>
    </FeatureFlagProvider>
    </MedusaProvider>
  )
}

export const config: RouteConfig = {
    link: {
        label: "Personalizer",
        icon: Personalizer
    }
}

export default CustomPersonalizerPage