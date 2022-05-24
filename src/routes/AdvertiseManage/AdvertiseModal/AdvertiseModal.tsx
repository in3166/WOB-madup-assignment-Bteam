import {
  ChangeEvent,
  Children,
  Dispatch,
  FormEvent,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import ReactDOM from 'react-dom'

import { IAdsItem } from 'types/ads'
import { CloseIcon, InputCancelIcon } from 'assets/svgs/index'
import styles from './advertiseModal.module.scss'
import { cx } from 'styles'
import { useMount } from 'hooks'
import { useRecoil } from 'hooks/state'
import { adsListState } from 'states/adsItem'
import Modal from '../Modal'
import useFormInput from 'routes/AdvertiseManage/AdvertiseModal/useFormInput'

interface IAdsModalProps {
  selectedAdId: string
  openModal: boolean
  setVisibleModal: Dispatch<SetStateAction<boolean>>
}

const AdvertiseModal = ({ selectedAdId, setVisibleModal, openModal }: IAdsModalProps): JSX.Element => {
  const [ads] = useRecoil(adsListState)
  const {
    value: adsType,
    setValue: setAdsType,
    valueClickHandler: typeClickHandler,
  } = useFormInput({ initialValue: 'web' })

  const { value: url, hasError: urlHasError, valueChangeHandler: urlChangeHandler } = useFormInput({ initialValue: '' })
  const {
    value: title,
    hasError: titleHasError,
    setValue: setTitle,
    valueChangeHandler: titleChangeHandler,
  } = useFormInput({ initialValue: '' })

  const [budget, setBudget] = useState(0)

  const handleChangeBudget = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.currentTarget.value))
  }

  useEffect(() => {
    if (selectedAdId === '') return undefined
    const selectedAd = ads.find((value) => value.id === Number(selectedAdId))
    const selectedAdTitle = selectedAd?.title
    const selectedAdType = selectedAd?.adType
    const selectedAdBudget = selectedAd?.budget

    setTitle(selectedAdTitle || '')
    setAdsType(selectedAdType || 'web')
    setBudget(selectedAdBudget || 0)
    return undefined
  }, [ads, selectedAdId, setAdsType, setTitle])

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(e.currentTarget)
    console.log(title)
    setVisibleModal(false)
  }

  const onCancel = () => {
    setAdsType('web')
    setTitle('')
    setBudget(0)
    setVisibleModal(false)
  }

  return (
    <Modal onCancel={onCancel} openModal={openModal}>
      <header className={styles.header}>
        <h3>생성할 광고 유형을 선택하세요.</h3>
        <button type='button' onClick={onCancel} className={styles.cancelButton}>
          <CloseIcon />
        </button>
      </header>

      <div className={styles.content}>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.inputForm}>
            <h3>광고 유형</h3>
            <div className={styles.inputRadio}>
              <input
                type='radio'
                id='type1'
                name='type'
                value={1}
                defaultChecked={adsType === 'web'}
                onClick={typeClickHandler}
              />
              <label htmlFor='type1'>웹사이트</label>
              <input
                type='radio'
                id='type2'
                name='type'
                value={2}
                defaultChecked={!adsType}
                onClick={typeClickHandler}
              />
              <label htmlFor='type2'>애플리케이션</label>
            </div>
          </div>

          <div className={styles.inputForm}>
            <label htmlFor='url'>웹사이트 주소(URL)</label>
            <input type='text' id='url' value={url} onChange={urlChangeHandler} />
            <InputCancelIcon className={cx({ [styles.iconHidden]: url === '' })} />
          </div>

          <div className={styles.inputForm}>
            <label htmlFor='name'>광고명</label>
            <input type='text' id='name' value={title} onChange={titleChangeHandler} />
            <InputCancelIcon className={cx({ [styles.iconHidden]: title === '' })} />
          </div>

          <div className={styles.inputForm}>
            <label htmlFor='budget'>일 희망 예산</label>
            <input type='number' name='budget' placeholder='0' value={budget} onChange={handleChangeBudget} />
            <InputCancelIcon className={cx({ [styles.iconHidden]: budget <= 0 })} />
          </div>

          <footer className={styles.footer}>
            <button type='button' onClick={onCancel} className={styles.cancelButton}>
              취소
            </button>
            <button type='submit' className={styles.confirmButton}>
              확인
            </button>
          </footer>
        </form>
      </div>
    </Modal>
  )
}

export default AdvertiseModal
