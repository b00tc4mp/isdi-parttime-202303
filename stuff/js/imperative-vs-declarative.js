const array1 = ['a', 'b', 'c'];


for (let i = 0; i < array1.length; i++) { // imperative
	const element = array1[i]

  	console.log(element)
}

array1.forEach(element => console.log(element)); // declarative

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"