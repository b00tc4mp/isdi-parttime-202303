# b-Elevenzsd

## Main description

b-Elevenzsb is an employee portal. 

It will allow the company to channel processes related to the Human Resources department like register new employees, consult or modify their data, as well as make monthly payroll payments for each of them. 

Employees to make all the necessary inquiries regarding their personal and company profile, like enter modifications to certain personal data, check monthly payrolls, as well as access the year-to-date Aggregated and the previous year's tax certificate.


![](https://www.canva.com/design/DAFqDLwerac/JDhtOb9wzRGo9rHmVpEX3Q/watch?utm_content=DAFqDLwerac&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)



## Functional description

### Use cases


User
- Check and edit personal information (#UC001)
- Check payrollMonth
- Check annual Aggregate payrolls
- Check tax certicate

Admin
- New employee registration
- Check and edit employee information
- Employee access control 
- Create employee montly payrolls

### User stories

User
- The employee will be able to modify their avatar, address, password, and bank account.

- The employee will be able to access any payroll of the current year, selecting the corresponding month - select option).

- The employee will be able to view the accumulated sum of the current year's payrolls. 

- The employee will be able to obtain the tax certificate from the previous year, detailing the total of all income received, deductions, and withholdings applied.

Admin
- The admin employees will be able to perform the registration of new employees, entering all personal and professional data. They will incorporate relevant information for the company, such as employee portal access control and salary level.

- The admin employee will be able to prepare payrolls for the workers based on their salary level, in a single step, without the need to prepare them employee by employee. Logics will allow the automatic calculation of each corresponding item in each payroll.


### UI design 

TODO Link to Figma

## Technical description

- Two Mongoose Schema. The one corresponding to the employee will have two different profiles, determined by the "role" property: "user" or "admin," which will determine access to different functionalities.

### Data model

 - Employee
    - id (oid)
    - name (string)
    - firstSurname (string)
    - secondSurname (string)
    - birthDate (date)
    - idCardNumber (string)
    - tssNumber (number)
    - adress (string)
    - personalPhoneNumber (number)
    - bankAccountNumber (string)
    - avatar (string)
    - employeeNumber (number)
    - startOfEmploymentData (date)
    - endOfEmploymentData (date)
    - lengthOfEmployment (number)
    - typeOfContract (string)
    - jobPosition (string)
    - department (string)
    - salaryLevel: from 1 to 5 (number)
    - centerAttached (string)
    - superiorHierarchicalManager (oid)
    - roll: user or admin (string)
    - professionalPhoneNumber (number)
    - professionalEmail (string)
    - accessPermissions (string)
    - employeePassword (string)

- PayrollMonth
    - employee (oid)
    - payrollYear (date)
    - payrollMonth (number)
    - salaryLevel (number)
    - monthSalary (number)
    - bonus (number)
    - irpfTax (number)
    - ssTax (number)
    - irpfDeductions (number)
    - ssDeductions (number)
    - totalAmountIncomes (number)
    - totalAmountDeductions (number)
    - netSalary (number)

   

### Test Coverage

<!-- ![](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1077) -->

## Planning

Trello : (https://trello.com/invite/b/XEVB4Fyi/ATTIc3c549532febf63cb82956e9219d9d7a56E3A663/b-elevenzsd)

### Epics & Stories

#### Access control

- Me as an employee (roll: user), I want to login my credentials and access with them to portal home.

##### Tasks

- DONE build html
- TODO build basic css
- DONE implementt authenticateEmployee, retrieveEmployee API Logic and tests
- DONE implementt isLoggedIn, loginEmployee, retrieveEmployee APP
- DONE implement login functionality
- DONE implement home welcome functionality
- DONE implementt logout APP logic 


#### Employee: modify avatar, address, password, and bank account

- Me as an employee(roll: user) I want to modify my avatar, adress, password or bank account


##### Tasks

- DONE build html
- TODO build basic css
- DONE implement modal window (PersonalInformationModal.jsx) for update avatar (inputs: image; button: confirm), adress(inputs: street, postal code, city, country; button: confirm), password (inputs: password, newPassword, confirmNewPassword; button: confirm) and bank account (inputs: bank account, button: confirm)

- DONE implement updateEmployeeAvatar logic to persist the info (image) in database, and API test
- DONE implement updateEmployeeAdress logic to persist the info (employeeAdress) in database, and API test
- DONE implement updateEmployeePassword logic to persist the info (password) in database, and API test
- DONE implement updateEmployeeBankAccount logic to persist the info (bankAccount) in database, and API test

- TODO implement the correct functionality of modal





#### Employee: check payrollMonth, PayrollAnnualAggregate, AnnualTaxCertificate

- Me as an employee (roll: user), want to be able to have the option to view my monthly payrolls, selecting the specific month, as well as the year-to-date summary for the current year and the tax certificate for the previous year.

##### Tasks

- TODO  build html
- TODO build basic css
- TODO implement modal window Modal (PayrollMenuModal.jsx) with three links: one for "Annual Aggregate," the second one to choose the month to view the monthly payroll, and the third one for the tax certificate

- DONE implement retrieveEmployeePayrollsMonthYear and retrievePayrollAnnualAggregate logics to retrieve annual aggregate information, and tests.
- DONE implement retrievePayrollMonth logic to to retrieve the information of the payroll chosen by the employee and test.
- DONE implement retrieveEmployeePayrollsMonthYear logic to retrieve information and obtain the tax certificate for the previous year, and tests.
- TODOcreate Payroll component where the information of any of the three options chosen by the employee will be displayed

- TODO implement the correct functionality of modal




#### Employee: register employee

- Me as an employee (roll: admin), I want to have the option to register new employees.

##### Tasks

- TODO build html
- TODO build basic css
- TODO implement modal window Modal (PersonalDatabaseMenuModal.jsx) with a form and all the necessary fields for their registration.

- DONE implement registerEmployee logic and tests.
- TODO implement the correct functionality of modal



#### Employee: create payrollMonths

- Me as an employee (roll: admin), want to be able to have the option to view my monthly payrolls, selecting the specific month, as well as the year-to-date summary for the current year and the tax certificate for the previous year.

##### Tasks

- DONE build html
- TODO build basic css
- DONE implement modal window Modal (PayrollMenuModal.jsx) I want to be able to create payrolls for all employees of a specific level at once, choosing year, month, and salary level.

- DONE Create a JSX component (Employee). Render the employees obtained from the selective search by salary level
- DONE implement createEmployeePayrollMonth logic to to create employee payroll month and test.
- TODO implement the correct functionality of modal



<!-- 
#### Migrate presentation layer to React

- DONE migrate all pages and components to React -->