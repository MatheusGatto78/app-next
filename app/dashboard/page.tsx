import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { OrdersTable } from "@/components/orders-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

async function getDashboardData() {
  try {
    const res = await fetch('http://localhost:3000/api/dashboard/stats', {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch dashboard data')
    }
    
    return await res.json()
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return {
      totalProducts: 0,
      totalCategories: 0,
      totalOrders: 0,
      totalRevenue: 0,
      recentOrders: [],
      chartData: []
    }
  }
}

export default async function Page() {
  const dashboardData = await getDashboardData()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards stats={{
                totalProducts: dashboardData.totalProducts,
                totalCategories: dashboardData.totalCategories,
                totalOrders: dashboardData.totalOrders,
                totalRevenue: dashboardData.totalRevenue
              }} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive data={dashboardData.chartData} />
              </div>
              <OrdersTable orders={dashboardData.recentOrders} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
