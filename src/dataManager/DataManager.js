const gsaAPI = "https://inventory.data.gov/api/action/datastore_search?resource_id=8ea44bc4-22ba-4386-b84c-1494ab28964b&limit=300000&filters=%7B%22FiscalYear%22:%22"

let year = 2019
let zip = 26505

export default {
  getRates() {
    fetch(`${gsaAPI}${year}%22,%22Zip%22:%22${zip}%22%7D`)
    .then(r => r.json())
    .then(r => console.log(r.result.records[0]))
  }
}
