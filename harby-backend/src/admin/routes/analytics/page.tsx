import { RouteConfig } from "@medusajs/admin"
import Analytics from "../../icons/analytics"


const CustomAnalyticsPage = () => {
  return (
    <div>
      <h1>Custom Analytics Page</h1>
    </div>
  )
}

export const config: RouteConfig = {
    link: {
        label: "Analytics",
        icon: Analytics
    }
}

export default CustomAnalyticsPage