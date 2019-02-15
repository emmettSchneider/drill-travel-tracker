const gsaAPI = "https://inventory.data.gov/api/action/datastore_search?resource_id=8ea44bc4-22ba-4386-b84c-1494ab28964b&limit=300000&filters=%7B%22FiscalYear%22:%22"
const jsonHost = "http://localhost:5002"

// let year = 2019
// let zip = 26505



export default {
  getRates(year, zip) {
    return fetch(`${gsaAPI}${year}%22,%22Zip%22:%22${zip}%22%7D`)
      .then(r => r.json())
      // .then(r => console.log(r.result.records[0]))
  },
  getAllUsers() {
    return fetch(`${jsonHost}/users`)
      .then(r => r.json())
  },
  postUser(newUser) {
    return fetch(`${jsonHost}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(p => p.json())
  },
  getAllTrips() {
    let currentUser = sessionStorage.getItem("userId")
    return fetch(`${jsonHost}/trips?userId=${currentUser}`)
      .then(r => r.json())
    // .then(r => console.log(r))
  },
  getUserTrips(id) {
    return fetch(`${jsonHost}/users/${id}?_embed=trips`)
      .then(r => r.json())
      .then(r => console.log(r))
  },
  getOneTrip(id) {
    return fetch(`${jsonHost}/trips/${id}`)
      .then(r => r.json())
      .then(r => console.log(r))
  },
  postTrip(newTrip) {
    return fetch(`${jsonHost}/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTrip)
    }).then(p => p.json())
  },
  deleteTrip(id) {
    return fetch(`${jsonHost}/trips/${id}`, {
      method: "DELETE"
    })
      .then(r => r.json())
  },
  patchTrip(id, trip) {
    return fetch(`${jsonHost}/trips/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip)
    })
  }
}
