let common = {
  setDivHeightFun: function (screenHeight, className, otherHeight) {
    let oDiv = document.getElementsByClassName(className)
    if (oDiv[0]) {
      oDiv[0].style.minHeight = (Number(screenHeight) - otherHeight) + 'px'
    }
  },
  formatDate: function (timestamp) {
    let date = new Date(timestamp)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return year + (month < 10 ? '-0' : '-') + month + (day < 10 ? '-0' : '-') + day
  },
  dateChange: function (time) {
    if (time) {
      let date = new Date(Date.parse(time))
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      let H = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      return Y + '-' +
    (M > 9 ? M : ('0' + M)) + '-' +
    (D > 9 ? D : ('0' + D)) + ' ' +
    (H > 9 ? H : ('0' + H)) + ':' +
    (m > 9 ? m : ('0' + m)) + ':' +
    (s > 9 ? s : ('0' + s))
    }
  }
}
export {
  common
}
