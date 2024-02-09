import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppSelector } from '@src/modules/shared/store'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const App = () => {
  // get translation.json file from public/locales
  const { i18n } = useTranslation('translation')

  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)

  return (
    <div id={theme}>
      <Helmet>
        <title>Welcome - React starter</title>
      </Helmet>

      {renderRoutes(routes)}
    </div>
  )
}

export default App
