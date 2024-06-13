import { AMMO, CONSTRUCTION, FOOD, K9, RESCUE, SKULL } from "../../assets/generic/missionImages"

export default manageMissionImages = (imageName) => {
    if (imageName === 'ammo') return AMMO
    if (imageName === 'construction') return CONSTRUCTION
    if (imageName === 'food') return FOOD
    if (imageName === 'k9') return K9
    if (imageName === 'rescue') return RESCUE
    if (imageName === 'skull') return SKULL
}