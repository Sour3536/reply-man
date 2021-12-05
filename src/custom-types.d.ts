import {
    Text,
    createEditor,
    Node,
    Element,
    Editor,
    Descendant,
    BaseEditor,
  } from 'slate'
  import { ReactEditor } from 'slate-react'
  
  export type LinkElement = { type: 'link'; url: string; children: Descendant[] }
  
