import { FC } from "react";
import style from './style.module.scss'
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { TextArea } from "../Components/TextArea";
import { Transform } from "../Transforms/Transform";

interface TransformGridItemProp {
  transform: Transform
}

export const TransformGridItem: FC<TransformGridItemProp> = ({ transform }) => {
  return (
    <div className={style.item}>
      <div className={style.toolbar}>
        <Button>&lt;&lt;&lt;</Button>
        <h2 className={style.name}>{transform.name}</h2>
        
        <div className={style.options}>
          <label className={style.optionItem}>hello: <Input type="checkbox" /></label>
          <label className={style.optionItem}>hello: <Input type="text" /></label>
          <label className={style.optionItem}>hello: <Input type="checkbox" /></label>
          <label className={style.optionItem}>hello: <Input type="checkbox" /></label>
        </div>
      </div>

      <TextArea placeholder="(empty)" className={style.input} />
    </div>
  )
}
