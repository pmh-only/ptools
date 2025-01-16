import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'
import { createRoot } from 'react-dom/client'

import 'normalize.css/normalize.css'
import 'react-tooltip/dist/react-tooltip.css'
import '@fontsource-variable/jetbrains-mono/index.css'

// ---

import './main.css'
import { App } from './App'
import { LandingAnimation } from './LandingAnimation'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <App />

      <LandingAnimation />
    </RecoilRoot>
  </StrictMode>
)
