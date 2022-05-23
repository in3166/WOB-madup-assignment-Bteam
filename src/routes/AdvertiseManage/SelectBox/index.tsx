import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { cx } from 'styles'
import styles from './selectBox.module.scss'

interface ISelectBoxProps {
  selectList: string[]
  currentSelect: string
  setCurrentSelect: Dispatch<SetStateAction<string>>
}

const SelectBox = ({ selectList, currentSelect, setCurrentSelect }: ISelectBoxProps): JSX.Element => {
  const [openSelect, setOpenSelect] = useState(false)

  const handleVisibleSelect = () => {
    setOpenSelect((prev) => !prev)
  }

  const handleLiClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedValue = e.currentTarget.dataset.value
    setCurrentSelect(selectedValue ?? selectList[0])
    setOpenSelect(false)
  }

  return (
    <div className={cx(styles.select, { [styles.openSelect]: openSelect })}>
      <button type='button' className={styles.selected} onClick={handleVisibleSelect}>
        <div className={styles.selectedValue}>{currentSelect}</div>
      </button>
      <ul>
        {selectList.map((value) => {
          return (
            <li className={styles.option} key={value}>
              <button type='button' data-value={value} onClick={handleLiClickHandler}>
                {value}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SelectBox
