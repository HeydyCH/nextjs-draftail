import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"

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

const ControlEditor = () => {

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

  console.log('controlEditor user', user);
  console.log('controlEditor number', number);
  // if (number == 0) return (
  if (!user) return (
    <div>
      no user
    </div>
  )

  return (
    <div>
      {
        JSON.stringify(user)
      }
      <DraftailEditor
        rawContentState={user || null}
        // onSave={onSave}
        blockTypes={[
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        ]}
        inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }]}
      />
    </div>
  )
}

export default ControlEditor
