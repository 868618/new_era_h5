import type * as Report from "./type"
import { request } from "@/http/axios"

export function getReportDetail(detectionId: string) {
  return request<Report.GetReportDetailResponseData>({
    url: `h5/report/detection/${detectionId}`,
    method: "get"
  })
}
