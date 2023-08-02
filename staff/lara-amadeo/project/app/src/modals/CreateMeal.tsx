import EmptyPhoto from "../library/components/EmptyPhoto"
import ModalFullScreen from "../library/components/ModalFullScreen"
import './CreateMeal.css'
import Link from "../library/components/Link"
import { TrashIcon } from "../library/icons"
import Divider from "../library/components/Divider"
import TextField from "../library/components/TextField"
import TextArea from "../library/components/TextArea"
import CategorySelector from "../library/components/CategorySelector"
import { useRef, useState } from "react"
import ButtonBar from "../library/modules/ButtonBar"
import createMeal from "../logic/createMeal"
import useAppContext from "../logic/hooks/useAppContext"


import { IKImage, IKContext, IKUpload } from "imagekitio-react"
import useHandleError from "../logic/hooks/useHandleError"

const urlEndpoint = 'https://ik.imagekit.io/6zeyr5rgu/yuperApp/'
const publicKey = 'public_9DujXADbFrwoOkNd+rUmvTbT/+U='
const authenticationEndpoint = 'http://localhost:1234/IKAuth'

export default function CreateMeal(): JSX.Element {

    const { loaderOn, loaderOff, navigate, toast } = useAppContext()
    const handleErrors = useHandleError()

    const [categories, setCategories] = useState<string[]>([])
    const [mealImages, setMealImages] = useState<string[]>([])

    const inputRefTest = useRef(null)
    const ikUploadRefTest = useRef(null)

    const formRef = useRef<HTMLFormElement>(null)


    const onCategoryClick = (category: string) => {
        if (categories && categories.includes(category)) {
            const updatedArray = categories.filter(item => item !== category)
            setCategories(updatedArray)
        }
        else setCategories(categories.concat(category))
    }


    const handleAddMeal = () => {
        if (formRef !== null) {
            const form = formRef.current as typeof formRef.current & {
                title: { value: string },
                description: { value: string },
                ingredients: { value: string },
                categories: { value: string },
                bestBefore: { value: string },
                price: { value: string }
            }


            const title = form.title.value
            const description = form.description.value
            const ingredients = form.ingredients.value.split(",").map(item => item.trim())
            const bestBefore = form.bestBefore.value
            const price = form.price.value;

            (async () => {
                loaderOn()
                try {
                    const images = mealImages
                    await createMeal({ images, title, description, ingredients, bestBefore, price, categories })

                    setTimeout(() => {
                        loaderOff()
                        navigate('/')
                        toast('Meal created!', 'success')
                    }, 1000)
                } catch (error: any) {
                    loaderOff()
                    handleErrors(error)
                }
            })()
        }
    }

    const onCloseModal = () => {
        navigate(-1)
    }

    const onImageUploadError = (error: object) => {
        alert('There has been an error uploading your file. Please try again.')
    }
    //@ts-ignore
    const onValidateFile = (res) => {
        if (res.type === 'image/png' && res.size < 500000 || res.type === 'image/jpeg' && res.size < 500000 || res.type === 'image/webp' && res.size < 500000 || res.type === 'image/heic' && res.size < 500000) return true

        else { alert('File format or size not permitted') }
    }
    //@ts-ignore
    const onImageUploadSuccess = (res) => {
        loaderOff()
        setMealImages(mealImages.concat(res.url))
    }
    //@ts-ignore
    const onUploadStart = evt => {
        loaderOn()
    }

    //TODO, review issue with imageKit & Typescript https://github.com/imagekit-developer/imagekit-react/issues/121
    return <>
        <ModalFullScreen onClose={onCloseModal} topBarLabel="Add new meal">
            <div className="page-button-bar">

                {/*Upper-part*/}
                <div className="new-meal-upper-container">

                    {/*Images*/}
                    <div className="new-meal-images-row">
                        {/*//@ts-ignore*/}
                        {inputRefTest && <EmptyPhoto src={mealImages.length > 0 ? mealImages[0] : `https://ik.imagekit.io/6zeyr5rgu/add-photo.svg?updatedAt=1689698891805`} onClick={() => inputRefTest.current!.click()} />}
                        {/*//@ts-ignore*/}
                        {inputRefTest && <EmptyPhoto src={mealImages.length > 1 ? mealImages[1] : `https://ik.imagekit.io/6zeyr5rgu/add-photo.svg?updatedAt=1689698891805`} onClick={() => inputRefTest.current!.click()} />}
                        {/*//@ts-ignore*/}
                        {inputRefTest && <EmptyPhoto src={mealImages.length > 2 ? mealImages[2] : `https://ik.imagekit.io/6zeyr5rgu/add-photo.svg?updatedAt=1689698891805`} onClick={() => inputRefTest.current!.click()} />}
                        {/*//@ts-ignore*/}
                        {inputRefTest && <EmptyPhoto src={mealImages.length > 3 ? mealImages[3] : `https://ik.imagekit.io/6zeyr5rgu/add-photo.svg?updatedAt=1689698891805`} onClick={() => inputRefTest.current!.click()} />}
                        {/*//@ts-ignore*/}
                        {inputRefTest && <EmptyPhoto src={mealImages.length > 4 ? mealImages[4] : `https://ik.imagekit.io/6zeyr5rgu/add-photo.svg?updatedAt=1689698891805`} onClick={() => inputRefTest.current!.click()} />}
                    </div>
                    {/*//@ts-ignore*/}
                    <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
                        {/*//@ts-ignore*/}
                        <IKUpload style={{ display: 'none' }} inputRef={inputRefTest} ref={ikUploadRefTest} className="ik-upload-button" fileName={'meal_'} accept=".jpg, .jpeg, .png, .heic, .webp" validateFile={onValidateFile} onError={onImageUploadError} onUploadStart={onUploadStart} onSuccess={onImageUploadSuccess} />
                    </IKContext>

                    {/*counter & link*/}
                    <div className="new-meal-actions">
                        <div className="new-meal-link">
                            <p className="small-text grey-700">5/5 photos</p>
                            {/*//@ts-ignore*/}
                            {ikUploadRefTest && <Link label="Remove all" state="critical" icon={<TrashIcon className="icon-xs critical-color" />} onClick={() => ikUploadRefTest.current!.abort()} />}
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
                    <input type="number"></input>

                </form>
            </div>
        </ModalFullScreen>
        <ButtonBar firstButton={{ label: "Add meal", onClick: handleAddMeal }} />
    </>
}