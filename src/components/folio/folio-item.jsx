import React from 'react'
import { Link } from 'gatsby'
import iconCodepen from 'images/icons/codepen.svg'
import FolioThumbnail from './folio-thumbnail'
import './folio-item.sass'

function externalLink(data) {
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer">
      <FolioThumbnail data={data} />
      <span className="FolioItem__icon">
        <img
          src={iconCodepen}
          alt="Codepen icon" />
      </span>
    </a>
  )
}

function internalLink(data) {
  return (
    <Link to={data.url}>
      <FolioThumbnail data={data} />
    </Link>
  )
}

function FolioItem({ folioItem }) {
  const data = folioItem.frontmatter
  return (
    <div className="FolioItem">
      {data.external ?
        externalLink(data) :
        internalLink(data)
      }
    </div>
  )
}

export default FolioItem
