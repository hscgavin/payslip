// 0 - $18,200     Nil
// $18,201 - $37,000       19c for each $1 over $18,200
// $37,001 - $80,000       $3,572 plus 32.5c for each $1 over $37,000
// $80,001 - $180,000      $17,547 plus 37c for each $1 over $80,000
// $180,001 and over       $54,547 plus 45c for each $1 over $180,000


const taxRateTable = {
  "2018": [
    {max: 18200, min: 0, fixed: 0, rate: 0},
    {max: 37000, min: 18200, fixed: 0, rate: 0.19},
    {max: 87000, min: 37000, fixed: 3572, rate: 0.325},
    {max: 180000, min: 87000, fixed: 19822, rate: 0.37},
    {max: 9999999999, min: 180000, fixed: 54232, rate: 0.45}
  ],
  "2017": [
    {max: 18200, min: 0, fixed: 0, rate: 0},
    {max: 37000, min: 18200, fixed: 0, rate: 0.19},
    {max: 87000, min: 37000, fixed: 3572, rate: 0.325},
    {max: 180000, min: 87000, fixed: 19822, rate: 0.37},
    {max: 9999999999, min: 180000, fixed: 54232, rate: 0.45}
  ],
  "2013": [
    {max: 18200, min: 0, fixed: 0, rate: 0},
    {max: 37000, min: 18200, fixed: 0, rate: 0.19},
    {max: 80000, min: 37000, fixed: 3572, rate: 0.325},
    {max: 180000, min: 80000, fixed: 17547, rate: 0.37},
    {max: 9999999999, min: 180000, fixed: 54547, rate: 0.45}
  ]
}

module.exports = taxRateTable