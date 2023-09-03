# API

## Endpoints


| action | method | path   | body                                                                                            | status |  
|--------|--------|--------|--------------------------------------------------------------------------------------------------|--------|
| retrieveEmployeeLogged| GET   | /employees/retrieveEmployeeLogged |  | 200   |
| retrieveEmployeePayrollData| GET   | /employees/retrieveEmployeePayrollData |  | 200   |
| retrieveEmployeePayrollToBepaid| GET   | /employees/retrieveEmployeePayrollToBePaid/:id |  | 200   |
| retrieveEmployee| GET   | /employees/retrieveEmployee/:id|  | 200   |
| searchEmployees| GET   | /employees/searchEmployees/:searchPattern |  | 200   |
| getTreeChard| GET   | /employees/getTreeChart/:searchPattern |  | 200   |
| retrievePayrollMonth| GET   | /payrollMonth/retrieveEmployeePayrollMonth/:payrollYear/:payrollMonth |  | 200   |
| retrievePayrollsMonthToBePaid| GET   |'/payrollMonth/retrievePayrollsMonthToBePaid/:payrollYear/:payrollMonth' |  | 200   |
| retrieveEmployeesBySalaryLevel| GET   | /employees/retrieveEmployeesBySalaryLevel/:salaryLevel |  | 200   |
| retrievePayrollAnnualAggregate| GET   | /payrollMonth/retrievePayrollAnnualAggregate/:payrollYear |  | 200   |
| registerEmployee| POST   | /employees | {name: "...", firstSurname: "...", secondSurname: "...", idCardNumber: "...", tssNumber: "...", address: "...",personalPhoneNumber: ..., bankAccountNumber: "...", avatar: "...", employeeNumber: "...", typeOfContract: "...", jobPosition: "...", department: "...",salaryLevel: ..., centerAttached: "...", superiorHierarchicalManager: "...", roll: "...", professionalPhoneNumber: ..., professionalEmail: "...", accessPermissions: "..."} | 201    |
| authenticateEmployee | POST   | /employees/auth | { employeeNumber: "...", password: "..." }      | 200    |
| createEmployeePayrollMonth | POST   | /payrollMonths | { employeeId:"...", payrollYear: ..., payrollMonth: ... }      | 201    |
| updateEmployee | PATCH  | /employees/updateEmployee | {id:"...", name: "...", firstSurname: "...", secondSurname: "...", idCardNumber: "...", tssNumber: "...", address: "...", personalPhoneNumber: ..., bankAccountNumber: "...", avatar: "...", typeOfContract: "...", jobPosition: "...", department: "...", salaryLevel: ..., centerAttached: "...", superiorHierarchicalManager: "...", roll: "...", professionalPhoneNumber: ..., professionalEmail: "...", accessPermissions: "..."}      | 204    |
| updateEmployeeAvatar | PATCH  | /employees/updateAvatar | { avatar: "..."}      | 204    |
| updateEmployeePassword | PATCH  | /employees/updatePassword | { employeePassword: "...", employeeNewPassword: "...", employeeConfirmNewPassword: "..." }      | 204    |
| updateEmployeeAddress | PATCH  | /employees/updateAddress | { employeeStreet: "...", employeePostalCode: "...", employeeCity: "...", employeeCountry: "..." }      | 204    |
| updateEmployeeBankAccountNumber | PATCH  | /employees/updateBankAccountNumber | {employeeNewBankAccountNumber: "..." }      | 204    |
| updatePayrollStatusToPaid | PATCH  | /payrollMonths/updatePayrollStatusToPaid | { id: "..." }      | 204    |
| resetPassword | PATCH  | /employees/resetPassword | { employeeNumber: "..."}      | 204    |
| resetPassword | DELETE | /payrollMonths/deletePayrollMonth/:payrollMonthId |  | 204    |



## Install

MOCHA
npm init --yes
npm i -D mocha chai

NYC INSTAMBUL
npm i -D nyc

EXPRESS
npm i express

.ENV
npm i dotenv

npm i jsonwebtoken
npm i cors

MONGOOSE
npm i mongoose

COM
npm i ../com


### Inspect

MOCHA
- npm run test
- npm run inspect

### Watch

npm run watch
