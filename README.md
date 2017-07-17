# Payslip

This is a program that generate employee monthly payslip when input the employee's details: first name, last name, annual salary(positive integer) and super rate(0% - 50% inclusive), payment start date


The calculation details will be the following:
<ul>
<li>pay period = per calendar month</li>
<li>gross income = annual salary / 12 months</li>
<li>income tax = based on the tax table provide below</li>
<li>net income = gross income - income tax</li>
<li>super = gross income x super rate</li>
</ul>

Notes: All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar increment, otherwise round down.



## Assumptions
* The month of the start date will be the payment month (similar to employment hero), ignore how many working days for simplicity.
* Start date format YYYY-MM-DD (make more sense), instead of `March 01 - March 31`
* Salary should be integer and > = 0
* Input csv should contain headers: firstName,lastName,annualSalary,superRate,paymentStartDate
* If csv row data failed on validation, write error msg to output.csv

## Installation
1. install latest node.js
2. `cd payslip`
3. run `npm install`

## Usage

### manually input
```shell
cd payslip
node app/app.js Gavin He 60000 9% 2016-05-01
```
### csv input

```shell
cd payslip
node app/app.js csv/input.csv
```
### run unit tests
```shell
cd payslip
npm test
```
## Input csv file example
```csv
firstName,lastName,annualSalary,superRate,paymentStartDate
David,Rudd,60050,9%,2013-03-01
Ryan,Chen,120000,10%,2013-03-01
Gavin,He,1200000,%,2013-03-01
```

## Output csv file example
```csv
firstName,lastName,paymentMonth,grossIncome,incomeTax,netIncome,super
David,Rudd,March,5004,922,4082,450
Ryan,Chen,March,10000,2696,7304,1000
Super Rate should be within 0 and 50% (e.g. 9%),,,,,,
```


## Console output example
`node app/app.js Gavin He 56000 9% 2012-07-01
`
```

Pay Slip Details:
Name: Gavin He
Payment Month : July
Gross income : 4667
Income tax : 812
Net income : 3855
Super : 420

```

### Tax rate table 
Available for 2013, 2017, 2018

```javascript

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
```

### Libs
1. `fast-csv` for parsing csv data
2. `moment` for parsing date

