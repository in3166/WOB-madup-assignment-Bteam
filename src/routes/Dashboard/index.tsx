import { useQuery } from 'react-query'
import { useState, useMount } from 'hooks'
import { useRecoilState, useSetRecoilState } from 'hooks/state'
import store from 'store'

import { byChannelDataResultState, byChannelFetchState } from 'states/dashboard'
import { getByChannelData } from 'services/ads'

import AdStatus from './AdStatus'
import CalendarModal from './CalendarModal/CalendarModal'
import CurrentStatusOfMedium from './CurrentStatusOfMedium'
import { DownArrow } from 'assets/svgs'
import styles from './dashboard.module.scss'
import Loading from 'routes/_shared/Loading'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')

  const [byChannelFetch, setByChannelFetch] = useRecoilState(byChannelFetchState)
  const setByChannelData = useSetRecoilState(byChannelDataResultState)
  const [byChannelData] = useRecoilState(byChannelDataResultState)

  useMount(() => {
    getByChannelData(currentStartDate, currentEndDate, setByChannelData)
  })

  const { isLoading } = useQuery(
    ['getByChannelData', currentStartDate, currentEndDate],
    () => {
      getByChannelData(currentStartDate, currentEndDate, setByChannelData)
    },
    {
      useErrorBoundary: true,
      enabled: !!byChannelFetch,
      staleTime: 6 * 50 * 1000,
      retryDelay: 7000,
      onSuccess: () => {
        setByChannelFetch(false)
      },
    }
  )

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <header className={styles.header}>
        <h2>대시보드</h2>
        <div className={styles.calendarContainer}>
          <button className={styles.calendarOpenButton} type='button' onClick={handleOpenModal}>
            {`${currentStartDate} ~ ${currentEndDate}`}
            <DownArrow />
          </button>
          {isModalOpen && (
            <div className={styles.calendar}>
              <CalendarModal setIsModalOpen={setIsModalOpen} />
            </div>
          )}
        </div>
      </header>
      <main className={styles.main}>
        {isLoading && <Loading />}

        <AdStatus />
        {byChannelData.length > 0 && <CurrentStatusOfMedium />}
      </main>
    </>
  )
}
export default Dashboard
