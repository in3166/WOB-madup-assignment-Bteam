import ContentCard from './ContentCard'
import styles from './advertiseManage.module.scss'

const AdvertiseManage = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <select className={styles.filterSelect}>
          <option>전체 광고</option>
          <option>진행 광고</option>
          <option>중단 광고</option>
        </select>
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
