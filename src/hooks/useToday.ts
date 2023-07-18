export const useToday = () => {
  var today = new Date()
  var year = today.getFullYear().toString()
  var month = (today.getMonth() + 1).toString()
  month = month.length > 2 ? month : '0' + month
  var day = today.getDate().toString()
  day = day.length > 2 ? day : '0' + day

  return year + month + day
}
