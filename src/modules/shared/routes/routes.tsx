import sharedRoutes from './sharedRoutes'

import dashboardRoutes from '../../dashboard/routes/routes'

const routes = [...sharedRoutes, ...dashboardRoutes]

export default routes
