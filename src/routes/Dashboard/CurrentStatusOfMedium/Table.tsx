import { IByChannelData } from 'types/dashboard'
import { roundToTwo, fomatting } from 'utils/num'

import styles from './currentStatusOfMedium.module.scss'

const Table = ({
  combinedAllChannelDataArr,
  calculatingSumOfColumns,
}: {
  combinedAllChannelDataArr: IByChannelData[]
  calculatingSumOfColumns: Function
}) => {
  return (
    <div className={styles.tableContent}>
      <table>
        <colgroup>
          <col style={{ width: '124px', minWidth: '124px' }} />
        </colgroup>
        <thead className={styles.tableThead}>
          <tr>
            <th className={styles.tableCell_ml}>
              <span />
            </th>
            <th className={styles.tableCell}>광고비</th>
            <th className={styles.tableCell}>매출</th>
            <th className={styles.tableCell}>광고수익률</th>
            <th className={styles.tableCell}>노출수</th>
            <th className={styles.tableCell}>클릭수</th>
            <th className={styles.tableCell}>클릭률</th>
            <th className={styles.tableCell}>클릭당비용</th>
          </tr>
        </thead>
        <tbody className={styles.tableTbody}>
          {combinedAllChannelDataArr.map((item) => {
            return (
              <tr key={`key ${item.channel}`} data-row-key={`${item.channel}`} className='table-row table-row-level-0'>
                <td title={`${item.channel}`}>
                  <mark className={styles.tableCellContent}>{item.channel.toUpperCase()}</mark>
                </td>
                <td className={styles.tableCell}>{fomatting(item.cost)}원</td>
                <td className={styles.tableCell}>{fomatting(Math.round(item.sales))}원</td>
                <td className={styles.tableCell}>{Math.round(item.roas)}%</td>
                <td className={styles.tableCell}>{fomatting(item.imp)}</td>
                <td className={styles.tableCell}>{fomatting(item.click)}</td>
                <td className={styles.tableCell}>{roundToTwo(item.ctr)}%</td>
                <td className={styles.tableCell}>{fomatting(Math.round(item.cpc))}원</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot className={styles.tableSummary}>
          <tr>
            <td className={styles.tableCell}>총계</td>
            <td className={styles.tableCell}>{fomatting(calculatingSumOfColumns('cost'))}원</td>
            <td className={styles.tableCell}>{fomatting(Math.round(calculatingSumOfColumns('sales')))}원</td>
            <td className={styles.tableCell}>{Math.round(calculatingSumOfColumns('roas') / 4)}%</td>
            <td className={styles.tableCell}>{fomatting(calculatingSumOfColumns('imp'))}</td>
            <td className={styles.tableCell}>{fomatting(calculatingSumOfColumns('click'))}</td>
            <td className={styles.tableCell}>{roundToTwo(calculatingSumOfColumns('ctr') / 4)}%</td>
            <td className={styles.tableCell}>{fomatting(Math.round(calculatingSumOfColumns('cpc') / 4))}원</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table
