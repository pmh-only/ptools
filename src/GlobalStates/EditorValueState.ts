import { atom } from 'recoil'

export const EditorValueState = atom({
  key: 'editor_value',
  default: JSON.stringify(
    {
      Hello: 'world!',
    },
    null,
    2,
  ),
})
