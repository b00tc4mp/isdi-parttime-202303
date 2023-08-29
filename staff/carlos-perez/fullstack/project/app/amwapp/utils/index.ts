

export async function fetchUpdates(){
        const res = await fetch(`${process.env.API_BASE_URL}updates`)
       
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
       
        return res.json()
    }


export async function fetchUpdate(id : string){
        const res = await fetch(`${process.env.API_BASE_URL}updates/${id}`)
       
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
       
        return res.json()
    }