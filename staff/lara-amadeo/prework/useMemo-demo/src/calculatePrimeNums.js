export default function calculatePrimeNums(){
    let array = []
    let count=0
    let i,j 
    for(j=2;j<=100;j++){
        for( i=1;i<=j;i++){
            if(j%i==0)
            count++
        }
    
        if(count==2)
    
        array.push(j === 97? j : `${j}, `)
        count=0
    }
    return array
}