function formatDate(date) {
   return date.toString().split("T")[0].split("01:00")[0]
}

module.exports = { formatDate }