export const tokenValidation= () => {
  const hours = 72; // to clear the localStorage after 3 day
  const now = new Date().getTime();
  // console.log("now",now)
  const setupTime = JSON.parse(localStorage.getItem("user"));
  const tokenCreated=Date.parse(setupTime?.tokenCreated);
  // console.log("user",JSON.parse(localStorage.getItem("user")))
  // console.log("date",Date.parse(setupTime?.tokenCreated))
  if (now - tokenCreated > hours * 60 * 60 * 1000) {
    localStorage.clear();
  }
};
