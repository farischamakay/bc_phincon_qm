function cekTahunKabisat(tahun) {
  return tahun % 4 == 0 && (tahun % 100 != 0 || tahun % 400 == 0)
    ? true
    : false;
}
console.log(cekTahunKabisat(2020));

function hitungFaktorial(n) {
  return n <= 1 ? 1 : n * hitungFaktorial(n - 1);
}
console.log(hitungFaktorial(5)); // Output: 120

function cariBilanganPrima(n) {
  const hasil = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      hasil.push(i);
    }
  }
}
console.log(cariBilanganPrima(7)); // Output: true

// Ekspektasi hasil:
// cekTahunKabisat(2020) => true
// cekTahunKabisat(2021) => false
