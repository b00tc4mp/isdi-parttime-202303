const contacts = [
  { id: 1, name: "Paul", age: 12, gender: "male" },
  { id: 2, name: "Anna", age: 22, gender: "female" },
  { id: 3, name: "Margaret", age: 72, gender: "female" },
  { id: 4, name: "John", age: 42, gender: "male" },
  { id: 5, name: "Scarlett", age: 32, gender: "female" },
];

//Pedir nombre de usuario
//Mostrar contactos
//Si somos usuario, nos muestra los contactos
//Si somos admin, podemos crear o borrar contactos

const askForNameAndGreet = () => {
  const userName = prompt("Hello, what is your name");
  console.log(`Hello ${userName}`);
};

const showContacts = () => {
  console.log("***************");
  contacts.forEach((contact) => {
    console.log(
      `${contact.id} - ${contact.name} - ${contact.gender} - ${contact.age}`
    );
    console.log("***************");
  });
};

const askForRole = () => {
  const role = prompt("Are you a USER or an ADMIN");
  if (role === null) {
    askForRole();
  } else if (role.toUpperCase() !== "USER" && role.toUpperCase() !== "ADMIN") {
    askForRole();
  } else {
    return role.toUpperCase();
  }
};

const askForAction = () => {
  const action = prompt("Do you want to CREATE or DELETE?");
  if (action === null) {
    askForActions();
  } else if (
    action.toUpperCase() !== "CREATE" &&
    action.toUpperCase() !== "DELETE"
  ) {
    askForAction();
  } else {
    return action.toUpperCase();
  }
};

const adminActions = () => {
    const adminActionResult = askForAction();
    if (adminActionResult === 'CREATE'){
        const newContact = {};
        newContact.id = contacts.length + 1;
        newContact.name = prompt('NAME');
        newContact.age = prompt('AGE');
        newContact.gender = prompt('GENDER');
        contacts.push(newContact);
        showContacts();
    } else {
        const contactToDelete = +prompt('Insert the ID of the contact you want to delete');
        contacts.splice(contactToDelete-1, 1); //se debe usar la funcion filter en lugar de esta, porque me permite buscar por ID. esta busca por posicion y luego puede que ya no se me corresponda mas
        showContacts();
    }
}

const playApp = () => {
  askForNameAndGreet();
  const userRole = askForRole();
  if (userRole === 'USER'){
    showContacts();
  } else {
    showContacts();
    adminActions();    
  };
  adminActions();
};

playApp();
