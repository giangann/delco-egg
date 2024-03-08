import moment from 'moment';

export default class DateTimeUtility {
  static getCurrentTimeStamp() {
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  }
  static getCurrentDate() {
    return moment(Date.now()).add(1, 'day').format('YYYY-MM-DD');
  }
  static getDateAfterNDay(nDays: number) {
    return moment(Date.now()).add(nDays, 'day').format('YYYY-MM-DD');
  }
  static sqlFormatToViewer(date:string){
    let arr = date.split('-')
    return arr.reverse().join('-')
  }
  // static dateToTime(isoFormat){
  //   return moment(new Date(isoFormat)).toDate()
  // }
}
