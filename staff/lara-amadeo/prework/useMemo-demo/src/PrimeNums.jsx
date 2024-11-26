import { useEffect, useState } from "react"
import calculatePrimeNums from "./calculatePrimeNums"

export const PrimeNums = () => {

    const [nums, setNums] = useState()

    useEffect(() => {
        try {
            const nums = calculatePrimeNums()
            setNums(nums)
        } catch (error) {
            alert(error)
        }
    },[])

    return <>
    {nums && <>
    {console.log('Printing prime numbers')}
    <p className="prime-nums-title">Prime numbers</p>
    <p className="prime-nums">{nums}</p>
    </>}
    </>
}