import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom"
import Axios from "axios"

import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"
// const initial = JSON.parse(sessionStorage.getItem("draftail:content"))
const initial = null

const onSave = (content) => {
  console.log("saving", content)
  // sessionStorage.setItem("draftail:content", JSON.stringify(content))
}

const abc = () => {

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

  if (!user) return (
    <div>
      no user
    </div>
  )

  return (
    <div>
      <DraftailEditor
        rawContentState={user || null}
        onSave={onSave}
        blockTypes={[
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        ]}
        inlineStyles={[
          { type: INLINE_STYLE.BOLD },
          { type: INLINE_STYLE.ITALIC }
        ]}
      />
    </div>
  )
}

export default abc
