// define StatisticReport Object as it come from api
export interface StatisticReport {
  cameraId: number;
  imagePath: string;
  weatherLocationName: string;
  longitude: number;
  latitude: number;
  windSpeed:  number;
  date:string;
  description:string;
  cameraLocationName:string
}
