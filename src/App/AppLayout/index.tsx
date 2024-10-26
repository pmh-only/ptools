import { FC, ReactNode } from "react";

import style from './style.module.scss'

interface AppLayoutProp {
  children?: ReactNode
}

export const AppLayout: FC<AppLayoutProp> = ({ children }) =>
  <div className={style.container}>
    {children}
  </div>
