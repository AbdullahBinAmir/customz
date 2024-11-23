import { RouteConfig } from "@medusajs/admin"
import Dashboard from "../../icons/dashboard"


const CustomDashboardPage = () => {
  return (
    <div>
      <h1>Custom Dashboard Page</h1>
    </div>
  )
}

export const config: RouteConfig = {
    link: {
        label: "Dashboard",
        icon: Dashboard
    }
}

export default CustomDashboardPage