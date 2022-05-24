import { ChangeEvent, MouseEvent, useState } from 'react'

interface IUseFormInputProps {
  validateFunction?: (value: string) => boolean
  initialValue: string
}

const useFormInput = ({ validateFunction, initialValue }: IUseFormInputProps) => {
  const [enteredValue, setEnteredValue] = useState(initialValue)
  const [isTouched, setIsTouched] = useState(false)

  let valueIsValid = true
  if (validateFunction) valueIsValid = validateFunction(enteredValue)

  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setEnteredValue(value)
  }

  const valueClickHandler = (e: MouseEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setEnteredValue(value)
  }

  const inputBlurHandler = () => {
    setIsTouched(true)
  }

  return {
    value: enteredValue,
    setValue: setEnteredValue,
    hasError,
    valueChangeHandler,
    valueClickHandler,
    inputBlurHandler,
  }
}

export default useFormInput
