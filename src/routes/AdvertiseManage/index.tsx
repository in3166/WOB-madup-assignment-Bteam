import ContentCard from './ContentCard'
import styles from './advertiseManage.module.scss'
import { MouseEvent, useState } from 'react'
import { cx } from 'styles'
import SelectBox from './SelectBox'

const SELECT_LIST = ['전체 광고', '진행 광고', '중단 광고']

const AdvertiseManage = (): JSX.Element => {
  const [openSelect, setOpenSelect] = useState(false)
  const [currentSelect, setCsurrentSelect] = useState(SELECT_LIST[0])

  const handleVisibleSelect = () => {
    setOpenSelect((prev) => !prev)
  }

  const handleLiClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedValue = e.currentTarget.dataset.value
    setCsurrentSelect(selectedValue ?? SELECT_LIST[0])
    setOpenSelect(false)
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <SelectBox selectList={SELECT_LIST} setCurrentSelect={setCsurrentSelect} currentSelect={currentSelect} />

        <button type='button' className={styles.headerButton}>
          광고 만들기
        </button>
      </header>
      <main className={styles.cards}>
        <ContentCard />
        <ContentCard />
        <ContentCard />
        <ContentCard />
      </main>
    </main>
  )
}

export default AdvertiseManage
