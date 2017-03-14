import { STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/util'

export default initialState => `
  <!doctype html>
  <html class="no-js" lang="">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Admin Template</title>
    <meta name="description" content="Admin template with Material design">

    <!-- Use minimum-scale=1 to enable GPU rasterization -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
    >
    <link href="${STATIC_PATH}/css/material-ui.css" rel="stylesheet">
    <link href="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/style.css" rel="stylesheet">
  </head>

  <body>
    <div id="app"></div>

    <!-- This script adds the Roboto font to our project. For more detail go to this site:  http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500 -->
    <script>
      var WebFontConfig = {
        google: { families: [ 'Roboto:400,300,500:latin' ] }
      };
    </script>
    <script src="${STATIC_PATH}/js/webfont.js"></script>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/bundle.js"></script>
  </body>

  </html>
`
