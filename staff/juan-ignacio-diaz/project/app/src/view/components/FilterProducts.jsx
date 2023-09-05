import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label, Select} from '../library'
import { Stores, ProductTypes } from '../components'

import { retrieveProduct, deleteProductToList, editProductToList } from '../../logic'

export default ({ onResetFilter, onCancel, onModifiedFilter, filterList }) => {
    const { alert, freeze, unfreeze } = useAppContext()

    const handleFilterProducts = (event) => {
        event.preventDefault()

        filterList = {
            storesCheck: event.target.storesCheck.checked,
            stores: [...event.target.stores.selectedOptions].map(option => option.value),
            typeCheck: event.target.typeCheck.checked,
            type: [...event.target.type.selectedOptions].map(option => option.value),
            statesCheck: event.target.statesCheck.checked,
            states: [...event.target.states.selectedOptions].map(option => option.value),
            likesCheck: event.target.likesCheck.checked,
            likes: event.target.likes.value
        }
        onModifiedFilter(filterList)
    }

    const handleReset = (event) => {  
        event.preventDefault()

        onResetFilter({})
    }

    const handleCancel = (event) => {  
        event.preventDefault()

        onCancel()
    }

    return <>
        <Container className = "modal">
            <Container tag="section">
                {/*<Button type="button" onClick={handleReset}>Reset</Button>*/}
                <Form onSubmit={handleFilterProducts}>                
                    <Label htmlFor="stores"><Input type="checkbox" name="storesCheck" defaultChecked={filterList.storesCheck?filterList.storesCheck: 0} /> Stores:</Label>                    
                    <Stores state={(filterList.stores?filterList.stores:[])} multiple={true} />           

                    <Label htmlFor="type"><Input type="checkbox" name="typeCheck" defaultChecked={filterList.type} /> Types:</Label>                               
                    <ProductTypes state={(filterList.type?filterList.type:[])} multiple={true} />  

                    <Label htmlFor="states"><Input type="checkbox" name="statesCheck" defaultChecked={filterList.statesCheck} /> State:</Label>                                
                    <Select name="states"  
                        options={[{id: "", name: "Out of cart"}
                            , {id: "selected", name: "In cart"}
                            , {id: "bought", name: "Bought"}]}
                        state={(filterList.state?filterList.state:'')}
                        multiple={false}
                    />

                    <Label htmlFor="likes"><Input type="checkbox" name="likesCheck" defaultChecked={filterList.likesCheck} /> Nª likes</Label>
                      
                    <Input type="number" name="likes" min="1" step="1" defaultValue={filterList.likes?filterList.likes:''} />
       
                    <Button type="submit">Apply</Button>                     
                </Form>
                <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
            </Container>
        </Container>
    </>
}