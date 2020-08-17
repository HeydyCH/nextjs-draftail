import React, { useState, useEffect } from 'react'
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"

// const initial = JSON.parse(sessionStorage.getItem("draftail:content"))
const initial = null

const onSave = (content) => {
  console.log("saving", content)
  sessionStorage.setItem("draftail:content", JSON.stringify(content))
}

const Editor = () => {

  // let data = {
  //   "blocks": [
  //     {
  //       "key": "860kj",
  //       "text": "Lorem ipsum dolor, sit amet consectetur",
  //       "type": "unstyled",
  //       "depth": 0,
  //       "inlineStyleRanges": [
  //         {
  //           "offset": 0,
  //           "length": 39,
  //           "style": "BOLD"
  //         }
  //       ],
  //       "entityRanges": [],
  //       "data": {}
  //     }
  //   ],
  //   "entityMap": {}
  // }

  let data = null

  // const [dataDraftail, setDataDraftail] = useState(null);

  let name = "content"

  if (data) {
    if (data != null) {
      console.log("data != null")
      sessionStorage.setItem(`draftail:${name}`, JSON.stringify(data))
    }
  }

  let initial = null
  // console.log("heydy", sessionStorage.getItem(`draftail:${name}`))
  // initial = JSON.parse(sessionStorage.getItem(`draftail:${name}`));
  // console.log("inicial", initial)


  // // setDataDraftail(initial)
  // console.log("GENERAL", JSON.parse(sessionStorage.getItem(`draftail:${name}`)))

  useEffect(() => {
    console.log("useEffect")
    if (data) {
      if (data != null) {
        console.log("data != null")
        sessionStorage.setItem(`draftail:${name}`, JSON.stringify(data))
      }
    }

    console.log("heydy", sessionStorage.getItem(`draftail:${name}`))
    initial = JSON.parse(sessionStorage.getItem(`draftail:${name}`));
    console.log("inicial", initial)
    // setDataDraftail(initial)
    console.log("GENERAL", JSON.parse(sessionStorage.getItem(`draftail:${name}`)))
  }, [])



  return (
    <div>
      {
        JSON.stringify(initial)
      }
      <DraftailEditor
        rawContentState={initial || null}
        onSave={onSave}
        blockTypes={[
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        ]}
        inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }]}
      />
    </div>
  )
}

export default Editor
