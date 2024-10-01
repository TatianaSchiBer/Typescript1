interface User {
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
    address: {
      city?: string;
    };
  }
  
  interface UsersResponse {
    users: User[];
    total: number;
  }
  
  let usersArray: User[] = [];
  
  function renderTable(users: User[]): void {
    const contentDiv = document.getElementById("content-div")!;
    contentDiv.innerHTML = "";
  
    if (users.length > 0) {
      users.forEach((user) => {
        const { firstName, lastName, age, address } = user;
        contentDiv.innerHTML += `<tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${age}</td>
                <td>${address?.city || "N/A"}</td>
            </tr>`;
      });
    } else {
      contentDiv.innerHTML = "<tr><td colspan='4'>Nessun utente trovato.</td></tr>";
    }
  }
  
  function searchUsersByLastName(lastName: string): void {
    if (!lastName) {
      alert("Per favore, inserisci un cognome da cercare.");
      return;
    }
  
    fetch(`https://dummyjson.com/users/search?q=${lastName}`)
      .then((res) => res.json())
      .then((response: UsersResponse) => {
        usersArray = response.users;
        renderTable(usersArray);
      })
      .catch((error) => {
        console.error("Erro durante la ricerca:", error);
      });
  }
  
  document.getElementById("search-button")!.addEventListener("click", () => {
    const lastName = (
      document.getElementById("last-name-input") as HTMLInputElement
    ).value;
    searchUsersByLastName(lastName);
  });
  
  document.getElementById("sort-name-button")!.addEventListener("click", () => {
    const sortedUsers = [...usersArray].sort((a, b) => {
      return a.firstName.localeCompare(b.firstName);
    });
    renderTable(sortedUsers);
  });
  
  document.getElementById("sort-age-button")!.addEventListener("click", () => {
    const sortedUsers = [...usersArray].sort((a, b) => {
      return b.age - a.age;
    });
    renderTable(sortedUsers);
  });
  
  function loadUsers(): void {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((usersResponse: UsersResponse) => {
        usersArray = usersResponse.users;
        renderTable(usersArray);
      });
  }
  
  fetch("https://dummyjson.com/test")
    .then((res) => res.json())
    .then(() => {
      loadUsers();
    });
  