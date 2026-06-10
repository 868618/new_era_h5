export interface IData {
  code: number
  data: {
    faceShape: string
    faceProportion: string
    faceWidthLabel: string
    cheekboneWidthLabel: string
    cheekboneHeightLabel: string
    faceSummary: string
    faceFeatureAndSuggestions: string
    hatRecommend: string
    gender: 0 | 1 | 2

    conclusion: string

    hatRecommend1: string
  }
}

export type GetReportDetailResponseData = ApiResponseData<IData>
