export default function getInitials(name){
    return name.split(" ").map((n) => n[0]).join("");
}
