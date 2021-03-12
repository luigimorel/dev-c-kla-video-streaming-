import axios from "axios";

const create = async (user) => {
  try {
    let response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "aaplication/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch("/api/users", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, credentials, signal) => {
  try {
      let response = await axios('/api/users/' + params.userId, {
          method: 'GET',
          signal: signal,
          headers: {
              "Accept": "application/json",
              "Content-Type": "aplication/json",
              "Authorization" : "Bearer " + credentials.t
          }
      })
      return await response.json()
  } catch (err) {
      console.log(err)
  }
};
