import { IAdsItem } from 'types/advertiseManage'
import { axios } from 'hooks/worker'

const DATA_URL = 'http://localhost:3004/adlist'

export const getAdsItemList = () => axios.get<{ count: number; ads: IAdsItem[] }>(DATA_URL)

interface IPutAdsItemListParams {
  id: number
  adType: string
  title: string
  budget: number
  status: string
  startDate: string
  endDate: string | null
  report: {
    cost: number
    convValue: number
    roas: number
  }
}
export const putAdsItemList = (params: IPutAdsItemListParams) =>
  axios.patch(DATA_URL, {
    params: {
      ...params,
    },
  })
