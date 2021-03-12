import axios from "axios";

const signIn = async (user) => {
  try {
    let response = await axios("auth/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Credentials: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const signOut = async () => {
  try {
    let response = await axios("/auth/signout", {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};


export {signOut, signIn}