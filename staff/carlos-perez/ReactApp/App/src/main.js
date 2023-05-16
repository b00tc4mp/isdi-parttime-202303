//Data

import {users} from "./data.js";

const usersJson = JSON.stringify(users);

const almacen=localStorage;
almacen.users=usersJson;

export let activeUser;

export let context = sessionStorage;
