import { ChangeEvent, FC, useEffect, useState } from "react";
import style from './style.module.scss'
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { TextArea } from "../Components/TextArea";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { EditorValueState } from "../GlobalStates/EditorValueState";
import {
  TransformCheckboxOption,
  TransformIntboxOption,
  TransformRadioOption,
  TransformTextboxOption,
  WrappedTransform,
  WrappedTransformResult
} from "../Transforms/Transform";

interface TransformGridItemProp {
  transform: WrappedTransform
}

export const TransformGridItem: FC<TransformGridItemProp> = ({ transform }) => {
  const [value, setValue] = useRecoilState(EditorValueState)
  const [options, setOptions] = useState(transform.options)
  const [result, setResult] = useState<WrappedTransformResult>({
    error: false,
    value: ''
  })
  
  useEffect(() => {
    transform
      .fn(value, options)
      .then(setResult.bind(this))
  }, [value, options])

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
  
  const onIntboxOptionChanged =
    (option: TransformIntboxOption) =>
    (event: ChangeEvent<HTMLInputElement>) => {
    
    options.set(option.key, {
      ...option,
      value: parseInt(event.target.value)
    })

    setOptions(new Map(options))
  }
  
  const onRadioOptionChanged =
    (option: TransformRadioOption) =>
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
          {[...options.values()]
            ?.filter((v) => v.type === 'CHECKBOX')
            .map((option, i) => (
              <label key={i} className={style.optionItem}>
                <p>{option.label ?? option.key}:</p>

                <Input
                  checked={option.value}
                  onChange={onCheckboxOptionChanged(option)}
                  type="checkbox" />
              </label>))}
          
          {[...options.values()]
            ?.filter((v) => v.type === 'TEXTBOX')
            .map((option, i) => (
              <label key={i} className={style.optionItem}>
                <p>{option.label ?? option.key}:</p>

                <Input
                  value={option.value}
                  onChange={onTextboxOptionChanged(option)}
                  type="text" />
              </label>))}

              
          {[...options.values()]
            ?.filter((v) => v.type === 'INTBOX')
            .map((option, i) => (
              <label key={i} className={style.optionItem}>
                <p>{option.label ?? option.key}:</p>

                <Input
                  min={1}
                  value={option.value}
                  onChange={onIntboxOptionChanged(option)}
                  type="number" />
              </label>))}

              
          {[...options.values()]
            ?.filter((v) => v.type === 'RADIO')
            .map((option, i) => (
              <div
                key={i}
                onChange={onRadioOptionChanged(option)}
                className={style.optionItem}>
                {option.radios.map((radio, i2) => (
                  <label key={i2}>
                    <p>{radio.label ?? radio.value}:</p>

                    <Input
                      min={1}
                      name={option.key}
                      defaultChecked={radio.value === option.value}
                      value={radio.value}
                      type="radio" />
                  </label>
                ))}

              </div>))}
        </div>
      </div>

      <TextArea
        readOnly
        value={result.value}
        placeholder="(empty)"
        className={clsx(result.error && style.error)} />
    </div>
  )
}
