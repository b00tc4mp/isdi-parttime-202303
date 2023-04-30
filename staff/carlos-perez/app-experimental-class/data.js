//Data

export class Like{
    #likeId;
    #userId;
    #userLikeId;
    //Habrá que añadir el id del post, dados los cambios hechos hoy

    constructor(likeId, userId, userLikeId){
        this.#likeId=likeId;
        this.#userId=userId;
        this.#userLikeId=userLikeId;
    }

    get getLikeId(){
        return this.#likeId;
    }
    get getUserId(){
        return this.#userId;
    }
    get getUserLikeId(){
        return this.#userLikeId;
    }

    //No tiene sentido ningún setter, porque no vamos a modificar los valores de un Like
    //Un Like se creará o destruirá, no se modificará
}

export class Likes{
    likes;

    constructor(likes){
        if(likes.length===0){
            likes=[];
        }
        else{
            this.likes=likes;
        }
    }

    searchLike(likeId){
        for(let i=0; i<this.likes.length; i++){
            if(likes[i].getLikeId===likeId){
                return i;
            }
        }
        return -1;
    }

    //Revisar esto

    addLike(likeID,userID, userLikeId){
        if(this.searchLike(userLikeId)===-1){
        this.likes.push(new Like(userLikeId+likeID,userID, userLikeId));
        }
        else{ //Si el usuario le da a like una segunda vez, el like ya existe, así que elimina el like, porque ya no le gusta
            this.removeLike(userLikeId);
        }
    }

    removeLike(userLikeId){
        const likePosition=this.searchLike(userLikeId);
        if(likePosition!=-1){
            this.likes.splice(likePosition,1);
        }
        else{
            throw new Error('Like not found');
        }
    }
    
}

export class Post {
    #id;
    #userId;
    #text;
    #imageURL;
    #date;
    likes=[];
    likeCounter=0;

    constructor(id, userId, text, imageURL) {
        if (id != undefined && userId != undefined) {
            this.#id = id;
            this.#userId = userId;
            this.#text = text;
            this.#imageURL = imageURL;
            this.#date=new Date();
        }
        else {
            throw new Error("ID and userID are required");
        }
    }

    get getID(){
        return this.#id;
    }

    get getUserID(){
        return this.#userId;
    }

    get getText(){
        return this.#text;
    }

    get getImgURL(){
        return this.#imageURL;
    }

    get getDate(){
        return this.#date;
    }

    //set setId no tiene sentido, porque el ID del post es PK, no se modifica y se asigna al crearse;
    //set setUserID tampoco tiene sentido, el cambio de autor de un post no está contemplado

    set setText(text){
        this.#text=text;
    }

    set setImgURL(ImgURL){
        this.#imageURL=ImgURL;
    }

    set setDate(date){
        this.#date=date;
    }

    searchLike(userLikeId){
        for(let i=0; i<this.likes.length; i++){
            if(likes[i].getUserLikeId===userLikeId){
                return i;
            }
        }
        return -1;
    }

    addLike(userID, userLikeId){
        if(this.searchLike(userLikeId)===-1){
        this.likeCounter++;
        this.likes.push(new Like(this.likeCounter,userID, userLikeId));
        return this.likeCounter;
        }
        else{ //Si el usuario le da a like una segunda vez, el like ya existe, así que elimina el like, porque ya no le gusta
            this.removeLike(userLikeId);
        }
    }

    removeLike(userLikeId){
        const likePosition=this.searchLike(userLikeId);
        if(likePosition!=-1){
            this.likes.splice(likePosition,1);
        }
        else{
            throw new Error('Like not found');
        }
    }
}

export class Posts{
    posts;

    constructor(posts) {
        if (posts === undefined) {
            this.posts = [];
        }
        else {
            this.posts=posts;
        }
    }

    get getPosts(){
        return this.posts;
    }

    addPost(id, userId, text, imageURL){
        this.posts.push(new Post(id, userId, text, imageURL));
    }

    searchPostPosition(id){
        for(let i=0; i<this.posts.length; i++){
            if(this.posts[i].getID===id){
                return i;
            }
        }
        return -1;
    }

    deletePost(id, userId){
        const postPosition=this.searchPostPosition(id);
        if(postPosition!=-1 && this.posts[postPosition].getUserID===userId){
            this.posts.splice(postPosition,1);
        }
        else{
            throw new Error("El post no se encuentra");
        }
    }

    retrievePostbyID(id){
        const postPosition=this.searchPostPosition(id);
        if(postPosition!=-1){
            return this.posts[postPosition];
        }
    }

    retrieveUserPosts(userID){
        const result=[];
        for(let i=0; i<this.posts.length; i++){
            if(this.posts[i].getUserID===userID){
                result.push(this.posts[i]);
            }
        }
        return result;
    }
}

export class User {
    #id;
    #name;
    #email;
    #password;
    likes=[];

    constructor(id, name, email, password) {

        if (id != undefined) {
            this.#id = id;
            this.#name = name;
            this.#email = email;
            this.#password = password;
        }
        else {
            throw new Error("id es un campo obligatorio");
        }
    }

    get getId() {
        return this.#id;
    }

    get getName() {
        return this.#name;
    }

    get getEmail() {
        return this.#email;
    }

    get getPassword() {
        return this.#password;
    }

    //set setId no tiene sentido, porque es PK, y no cambia una vez creado el objeto.

    set setName(name) {
        this.#name = name;
    }

    set setEmail(email) {
        this.#email = email;
    }

    set setPassword(password) {
        this.#password = password;
    }

    searchLike(postID){
        for(let i=0; i<this.likes.length; i++){
            if(likes[i]===postID){
                return i;
            }
        }
        return -1;
    }

    like(postID){
        if(this.searchLike(postID)===-1){
        this.likes.add(postID);
        }
        else{
            this.unlike(postID); //Si el usuario le da a like una segunda vez, el like ya existe, así que elimina el like, porque ya no le gusta
        }
    }

    unlike(postID){
        const likePosition = this.searchLike(postID);
        if(likePosition!=-1){
            this.likes.splice(likePosition,1);
        }
        else{
            throw new Error("You do not like this");
        }
    }
}

export class Users {
    users;
    admins = [];
    idCounter = 0;

    constructor(users) {
        if (users === undefined) {
            this.users = [];
        }
        else {
            this.users = users;
            this.idCounter = users.length - 1;
        }
    }

    addUser = (name, email, password) => {
        this.users.push(new User(this.idCounter, name, email, password));
        this.idCounter++;
    }

    set setAdmin(admin) {
        this.admins.push(admin);
        addUser(admin.getName, admin.getEmail, admin.getPassword);
    }
}

export let appUsers = new Users();
//Test Users
appUsers.addUser('Wendy Darling', 'wendy@darling.com', '123123123');
appUsers.addUser('Peter Pan', 'peter@pan.com', '123123123');
appUsers.addUser('Pepito Grillo', 'pepito@grillo.com', '123123123');