const months = ['Jan', 'March', 'April', 'June'];
  splice(months,1, 0, 'Feb');
  // Inserts at index 1
  console.log(months);
  // Expected output: Array ["Jan", "Feb", "March", "April", "June"]
  
  splice(months, 4, 1, 'May');
  // Replaces 1 element at index 4
  console.log(months);
  // Expected output: Array ["Jan", "Feb", "March", "April", "May"]
  