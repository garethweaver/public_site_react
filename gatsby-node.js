/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    const folioTemplate = path.resolve('src/templates/folio-detail.jsx')
    resolve(
      graphql(`
        {
          allFolioJson {
            edges {
              node {
                id,
                url,
                title,
                thumb {
                  base64,
                  name
                },
                external,
                type,
                year,
                description,
                tools,
                live_site,
                repository,
                images {
                  base64,
                  name,
                  height,
                  width,
                  mobile {
                    name,
                    height,
                    width
                  }
                },
                next_page,
                meta {
                  title,
                  description
                }
              }
            }
          }
        }
      `).then((result) => {

        if (result.errors) { reject(result.errors) }

        result.data.allFolioJson.edges.forEach((edge) => {
          if (!edge.node.external){
            createPage ({
              path: 'folio' + edge.node.url,
              component: folioTemplate,
              context: {
                slug: 'folio' + edge.node.url,
                id: edge.node.id,
                allFolioJson: result.data.allFolioJson
              }
            })
          }
        })

        return
      })
    )
  })
}
