import styles from './contentCard.module.scss'

interface Props {}

const ContentCard = ({}: Props): JSX.Element => {
  return (
    <article className={styles.card}>
      <header>title</header>
      <dl>
        <dt>상태</dt>
        <dd>진행중</dd>
      </dl>
      <dl>
        <dt>광고 생성일</dt>
        <dd>진행중</dd>
      </dl>
      <dl>
        <dt>일 희망 예산</dt>
        <dd>진행중</dd>
      </dl>
      <dl>
        <dt>광고 수익률</dt>
        <dd>진행중</dd>
      </dl>
      <dl>
        <dt>매출</dt>
        <dd>진행중</dd>
      </dl>
      <dl>
        <dt>광고 비용</dt>
        <dd>진행중</dd>
      </dl>
      <button type='button'>수정하기</button>
    </article>
  )
}

export default ContentCard
