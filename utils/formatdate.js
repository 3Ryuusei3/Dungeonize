function formatDate(date) {
   return date.toString().split("T")[0].split("00:00")[0]
}

module.exports = { formatDate }