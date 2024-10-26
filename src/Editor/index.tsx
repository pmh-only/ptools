import { FC } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useRecoilState } from "recoil";
import { EditorValueState } from "../GlobalStates/EditorValueState";
import { motion } from "framer-motion";

export const Editor: FC = () => {
  const [value, setValue] = useRecoilState(EditorValueState)

  return (
    <motion.div
      transition={{ delay: 1.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <MonacoEditor
        loading={<></>}
        value={value}
        language="yaml"
        onChange={(v) => setValue(v ?? '')}
        options={{
          automaticLayout: true,
          lineNumbersMinChars: 3,
          minimap: { enabled: false },
          theme: "vs-dark",
          fontSize: 24,
          scrollBeyondLastLine: false,
          fontFamily: 'JetBrains Mono Variable',
          fontLigatures: true,
          wordWrap: "on",
          mouseWheelZoom: true,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: 'on',
          cursorBlinking: 'smooth',
          cursorStyle: 'block'
        }}
        theme="vs-dark" />
    </motion.div>
  )
}
