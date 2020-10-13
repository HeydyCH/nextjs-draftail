import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE, ENTITY_TYPE } from "draftail"
// import Link from './Link'

import LinkSource from '../component/LinkSource'
import Link from '../component/Link'

const initialData = {
  blocks: [
    {
      key: '16d0k',
      text: 'Ingrese text.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 23, style: 'BOLD' }],
      entityRanges: [],
      data: {},
    }
  ],
  entityMap: {},
}

// const Link = ({ entityKey, contentState, children }) => {
//   console.log("Link")
// }

// const LinkSource = () => {
//   // const { url } = contentState.getEntity(entityKey).getData()
//   console.log("LinkSource")
//   return null
// }

const ControlEditor = () => {

  console.log('ControlEditor');

  const [number, setNumber] = useState(0)
  const [user, setUser] = useState()

  useEffect(() => {
    Axios.get(`http://localhost:3001/usersDraftail/1`)
      .then(resp => {
        setUser(resp.data.bio_text)
      })
    console.log("mayuuuu")
    setNumber(number + 1)
  }, [])

  // if (number == 0) return (
  if (!user) return (
    <div>
      no user
    </div>
  )

  return (
    <div>
      {/* {
        JSON.stringify(user)
      } */}
      <DraftailEditor
        rawContentState={user || null}
        // onSave={onSave}
        blockTypes={[
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        ]}
        inlineStyles={[
          { type: INLINE_STYLE.BOLD },
          { type: INLINE_STYLE.ITALIC }
        ]}
        entityTypes={[
          {
            type: ENTITY_TYPE.LINK,
            icon: "icon-link",
            source: LinkSource,
            decorator: Link,
            attributes: ["url"],
            whitelist: {
              href: "^(?![#/])",
            },
          }
        ]}
      />
    </div>
  )
}

export default ControlEditor
