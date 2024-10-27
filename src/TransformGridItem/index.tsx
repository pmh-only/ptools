import { ChangeEvent, FC, useState } from "react";
import style from './style.module.scss'
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { TextArea } from "../Components/TextArea";
import { TransformCheckboxOption, TransformOption, TransformTextboxOption, WrappedTransform } from "../Transforms/Transform";
import { useRecoilState } from "recoil";
import { EditorValueState } from "../GlobalStates/EditorValueState";
import clsx from "clsx";

interface TransformGridItemProp {
  transform: WrappedTransform
}

export const TransformGridItem: FC<TransformGridItemProp> = ({ transform }) => {
  const [value, setValue] = useRecoilState(EditorValueState)
  const [options, setOptions] = useState(new Map<string, TransformOption>())

  const result = transform.fn(value, options)

  const onCheckboxOptionChanged =
    (option: TransformCheckboxOption) =>
    (event: ChangeEvent<HTMLInputElement>) => {
    
    options.set(option.key, {
      ...option,
      value: event.target.checked
    })

    setOptions(new Map(options))
  }

  
  const onTextboxOptionChanged =
    (option: TransformTextboxOption) =>
    (event: ChangeEvent<HTMLInputElement>) => {
    
    options.set(option.key, {
      ...option,
      value: event.target.value
    })

    setOptions(new Map(options))
  }

  const onForwardButtonPressed = () => {
    if (result.error)
      return

    setValue(result.value)
  }

  return (
    <div className={style.item}>
      <div className={style.toolbar}>
        <Button disabled={result.error} onClick={onForwardButtonPressed}>
          &lt;&lt;&lt;
        </Button>
        
        <h2 className={style.name}>{transform.name}</h2>
        
        <div className={style.options}>
          {transform.options
            ?.filter((option) => option.type === 'CHECKBOX')
            .map((option, i) => (
              <label key={i} className={style.optionItem}>
                <p>{option.label ?? option.key}:</p>

                <Input
                  onChange={onCheckboxOptionChanged(option)}
                  type="checkbox" />
              </label>))}
          
          {transform.options
            ?.filter((option) => option.type === 'TEXTBOX')
            .map((option, i) => (
              <label key={i} className={style.optionItem}>
                <p>{option.label ?? option.key}:</p>

                <Input
                  onChange={onTextboxOptionChanged(option)}
                  type="checkbox" />
              </label>))}
        </div>
      </div>

      <TextArea
        value={result.value}
        readOnly
        placeholder="(empty)"
        className={clsx(result.error && style.error)} />
    </div>
  )
}
