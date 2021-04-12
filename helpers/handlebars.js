let moment = require('moment')
moment.locale('Fr');
var DateFormats = {
  long: "LLL",
};

module.exports = {
  formatDate: (date)=>{
      return moment(date).format(DateFormats.long)
  }
}