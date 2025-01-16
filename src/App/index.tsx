import { FC } from 'react'
import { AppLayout } from './AppLayout'
import { Editor } from '../Editor'
import { TransformGrid } from '../TransformGrid'

export const App: FC = () => (
  <AppLayout>
    <Editor />
    <TransformGrid />
  </AppLayout>
)
