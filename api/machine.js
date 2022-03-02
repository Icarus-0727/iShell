const baseurl = "http://localhost:32123/machine/";

const getMachines = () =>
  new Promise((resolve, reject) =>
    fetch(baseurl)
      .then((res) => res.json().then(resolve))
      .catch(reject)
  );

const getMachine = (id) =>
  new Promise((resolve, reject) =>
    fetch(`${baseurl}${id}`)
      .then((res) => res.json().then(resolve))
      .catch(reject)
  );

const addMachine = (machine) =>
  new Promise((resolve, reject) =>
    fetch(baseurl, {
      method: "POST",
      body: JSON.stringify(machine),
    })
      .then((res) => res.json().then(resolve))
      .catch(reject)
  );

const updateMachine = (machine) =>
  new Promise((resolve, reject) =>
    fetch(baseurl, {
      method: "PUT",
      body: JSON.stringify(machine),
    })
      .then((res) => res.json().then(resolve))
      .catch(reject)
  );

const deleteMachine = (id) =>
  new Promise((resolve, reject) =>
    fetch(`${baseurl}${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json().then(resolve))
      .catch(reject)
  );

export { getMachines, getMachine, addMachine, updateMachine, deleteMachine };
