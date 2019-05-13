export function formatDate(date) {
    let format = new Date(date)
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var monthIndex = format.getMonth();
    var year = format.getFullYear();
  
    return monthNames[monthIndex] + '-' + year;
  }

  export function formatDateProper(date){
    let format = new Date(date)
    var monthNames = [
      "01", "02", "03",
      "04", "05", "06", "07",
      "08", "09", "10",
      "11", "12"
    ];
  
    var day = format.getDay();
    var monthIndex = format.getMonth();
    var year = format.getFullYear();
  
    return year + "/" + monthNames[monthIndex] + '/' + day;
  }