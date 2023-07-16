import EmptyPhoto from "../library/components/EmptyPhoto"
import ModalFullScreen from "../library/components/ModalFullScreen"
import './CreateMeal.css'
import Link from "../library/components/Link"
import { CameraIcon } from "../library/icons"
import Divider from "../library/components/Divider"
import TextField from "../library/components/TextField"
import TextArea from "../library/components/TextArea"
import CategorySelector from "../library/components/CategorySelector"
import { useContext, useRef, useState } from "react"
import ButtonBar from "../library/modules/ButtonBar"
import createMeal from "../logic/createMeal"
import Context from "../Context"

export default function CreateMeal(): JSX.Element {

    const { loaderOn, loaderOff, navigate } = useContext(Context)
    const [categories, setCategories] = useState<string[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    const imgRef = {
        img0: useRef<HTMLImageElement>(null),
        img1: useRef<HTMLImageElement>(null),
        img2: useRef<HTMLImageElement>(null),
        img3: useRef<HTMLImageElement>(null),
        img4: useRef<HTMLImageElement>(null),
    }

    const onCategoryClick = (category: string) => {
        if (categories && categories.includes(category)) {
            const updatedArray = categories.filter(item => item !== category)
            setCategories(updatedArray)

        }
        else setCategories(categories.concat(category))
    }


    const handleAddMeal = () => {
        if (imgRef !== null) {
            const images = [imgRef.img0.current?.src, imgRef.img1.current?.src, imgRef.img2.current?.src, imgRef.img3.current?.src, imgRef.img4.current?.src]

            if (formRef !== null) {
                const form = formRef.current as typeof formRef.current & {
                    title: { value: string },
                    description: { value: string },
                    ingredients: { value: string },
                    categories: { value: string },
                    bestBefore: { value: string },
                    price: { value: string }
                }

                if (form !== null) {
                    const title = form.title.value
                    const description = form.description.value
                    const ingredients = form.ingredients.value.split(",").map(item => item.trim())
                    const bestBefore = form.bestBefore.value
                    const price = form.price.value

                    try {
                        loaderOn()
                        createMeal({ images, title, description, ingredients, bestBefore, price, categories })
                            .then(() => {
                                navigate('/')
                                loaderOff()
                            })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    }

    const onCloseModal = () => {
        navigate('/')
    }

    return <>
        <ModalFullScreen onClose={onCloseModal}>
            <div className="page new-meal-container">

                {/*Upper-part*/}
                <div className="new-meal-upper-container">

                    {/*Images*/}
                    <div className="new-meal-images-row">
                        <EmptyPhoto ref={imgRef.img0} id="img0" src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/E24FB5AA-0B36-4FC8-8677-63825E4C9C94/Derivates/E7533C66-4A41-4AF8-927A-8390B1CB4448.jpg" />
                        <EmptyPhoto ref={imgRef.img1} id="img1" src="https://imag.bonviveur.com/ensalada-de-lechuga-y-tomate-foto-cerca.jpg" />
                        <EmptyPhoto ref={imgRef.img2} id="img2" src="https://www.cocinacaserayfacil.net/wp-content/uploads/2023/06/Pechugas-de-pollo-en-salsa-agridulce.jpg" />
                        <EmptyPhoto ref={imgRef.img3} id="img3" src="https://s1.ppllstatics.com/elcorreo/www/multimedia/201906/28/media/cortadas/despensa28-kfAE-U806333285241gG-1248x770@El%20Correo.jpg" />
                        <EmptyPhoto ref={imgRef.img4} id="img4" src="https://biotrendies.com/wp-content/uploads/2015/07/lechuga.jpg" />
                    </div>

                    {/*counter & link*/}
                    <div className="new-meal-actions">
                        <div className="new-meal-link">
                            <p className="small-text grey-700">5/5 photos</p>
                            <Link label="Add photos" state="default" icon={<CameraIcon className="icon-xs primary-color" />} />
                        </div>
                        <Divider width="100%" />
                    </div>
                </div>

                {/*Lower-part*/}
                <form className="create-meal-form" ref={formRef}>
                    <TextField label="Title" type="default" name="title" />
                    <TextArea label="Description" name="description" />
                    <TextArea label="Ingredients" name="ingredients" />

                    {/*categories*/}
                    <div className="create-meal-categories-label-selectors">
                        <p className="body-text grey-700">Categories</p>
                        <div className="create-meal-categories">
                            <div className="create-meal-categories-pair">
                                <CategorySelector category="vegan" onClick={() => onCategoryClick("vegan")} selected={categories.includes("vegan") && true} />
                                <CategorySelector category="gluten" onClick={() => onCategoryClick("gluten")} selected={categories.includes("gluten") && true} />
                            </div>
                            <div className="create-meal-categories-pair">
                                <CategorySelector category="vegetarian" onClick={() => onCategoryClick("vegetarian")} selected={categories.includes("vegetarian") && true} />
                                <CategorySelector category="alergen" onClick={() => onCategoryClick("alergen")} selected={categories.includes("alergen") && true} />
                            </div>
                        </div>
                    </div>

                    <TextField label="Best before" type="default" name="bestBefore" />
                    <TextField label="Price" type="default" name="price" />

                </form>
            </div>
        </ModalFullScreen>
        <ButtonBar firstButton={{ label: "Add meal", onclick: handleAddMeal }} />
    </>
}