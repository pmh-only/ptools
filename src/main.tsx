import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'normalize.css/normalize.css'
import '@fontsource-variable/jetbrains-mono/index.css'

// ---

import './main.css'
import { App } from './App'
import { LandingAnimation } from './LandingAnimation'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <App />

      <LandingAnimation />
    </RecoilRoot>
  </StrictMode>,
)
