# b-Elevenzsd

## Repositories

[isdi-parttime-202303](https://github.com/sarad11/isdi-parttime-202303)


## Main description

b-Elevenzsd is an employee portal. 

It will allow the company to channel processes related to the Human Resources department like register new employees, consult or modify their data, as well as make monthly payroll payments for each of them. 

Employees to make all the necessary inquiries regarding their personal and company profile, like enter modifications to certain personal data, check monthly payrolls, as well as access the year-to-date Aggregated and the previous year's tax certificate.

![](https://media.giphy.com/media/KtFuqZ3JK497geHYhe/giphy.gif)

## Functional description

### Use cases


User
- Check and edit personal information (#UC001)
- Check payrollMonth
- Check annual Aggregate payrolls

Admin
- New employee registration
- Search employee, check and edit personal information
- Employee access control 
- Create employee montly payrolls
- Restore employee password

### User stories

User
- The employee will be able to modify their avatar, address, password, and bank account.

- The employee will be able to access any payroll of the current year, selecting the corresponding month - select option).

- The employee will be able to view the accumulated sum of the current year's payrolls. 


Admin
- The admin employees will be able to perform the registration of new employees, entering all personal and professional data. They will incorporate relevant information for the company, such as employee portal access control and salary level.

- The admin employee will be able to prepare payrolls for the workers based on their salary level, in a single step, without the need to prepare them employee by employee. Logics will allow the automatic calculation of each corresponding item in each payroll.

- The admin can search for the employee, check their profile and internal report, and reset their password.


### UI design 

https://www.figma.com/file/hFWEshDh0QBxferledpJMk/App?type=design&node-id=201%3A439&mode=design&t=aV6UjEf1tzdMqkYB-1

https://www.figma.com/proto/hFWEshDh0QBxferledpJMk/App?page-id=0%3A1&type=design&node-id=195-53&viewport=2468%2C91%2C0.75&t=ltwruTxJQi3DcMxV-1&scaling=scale-down&starting-point-node-id=201%3A102&mode=design

## Technical description

- Two Mongoose Schema. The one corresponding to the employee will have two different profiles, determined by the "role" property: "User" or "Admin," which will determine access to different functionalities.

### Data model

 - Employee
    - id (oid)
    - name (string)
    - firstSurname (string)
    - secondSurname (string)
    - idCardNumber (string)
    - tssNumber (string)
    - address (string)
    - personalPhoneNumber (number)
    - bankAccountNumber (string)
    - avatar (string)
    - employeeNumber (string)
    - typeOfContract (string)
    - jobPosition (string)
    - department (string)
    - salaryLevel: from 1 to 5 (number)
    - centerAttached (string)
    - superiorHierarchicalManager (oid)
    - roll: User or Admin (string)
    - professionalPhoneNumber (number)
    - professionalEmail (string)
    - accessPermissions (string)
    - employeePassword (string)
    - employeePasswordToChange (boolean)

- PayrollMonth
    - employee (oid)
    - payrollYear (number)
    - payrollMonth (number)
    - salaryLevel (number)
    - status created or paid (string)
    - monthSalary (number)
    - bonus (number)
    - irpfTax (number)
    - ssTax (number)
    - irpfDeductions (number)
    - ssDeductions (number)
    - totalAmountIncomes (number)
    - totalAmountDeductions (number)
    - netSalary (number)

   

<!-- ### Test Coverage -->

<!-- ![](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1077) -->

## Planning

https://trello.com/b/XEVB4Fyi/b-elevenzsd

### Epics & Stories

#### Access control

- Me as an employee (roll: User), I want to login my credentials and access with them to portal home.

##### Tasks

- DONE build html
- DONEbuild basic tailwind
- DONE implementt authenticateEmployee, retrieveEmployee API Logic and tests
- DONE implementt isLoggedIn, loginEmployee, retrieveEmployee APP
- DONE implement login functionality
- DONE implement home welcome functionality
- DONE implementt logout APP logic 


#### Employee: modify avatar, address, password, and bank account

- Me as an employee(roll: User) I want to modify my avatar, address, password or bank account


##### Tasks

- DONE build html
- DONE build basic tailwind
- DONE implement modal window (PersonalInformationModal.jsx) for update avatar (inputs: image; button: confirm), address(inputs: street, postal code, city, country; button: confirm), password (inputs: password, newPassword, confirmNewPassword; button: confirm) and bank account (inputs: bank account, button: confirm)

- DONE implement updateEmployeeAvatar logic to persist the info (image) in database, and API test
- DONE implement updateEmployeeAddress logic to persist the info (employeeaddress) in database, and API test
- DONE implement updateEmployeePassword logic to persist the info (password) in database, and API test
- DONE implement updateEmployeeBankAccount logic to persist the info (bankAccount) in database, and API test

- DONE implement the correct functionality of modal


#### Employee: check payrollMonth, PayrollAnnualAggregate

- Me as an employee (roll: user), want to be able to have the option to view my monthly payrolls, selecting the specific month, as well as the year-to-date summary for the current year.

##### Tasks

- DONE  build html
- DONE build basic tailwind
- DONE implement modal window Modal (PayrollMenuModal.jsx) with two links: one for "Annual Aggregate," the second one to choose the month to view the monthly payroll.

- DONE implement retrieveEmployeePayrollsMonthYear and retrievePayrollAnnualAggregate logics to retrieve annual aggregate information, and tests.
- DONE implement retrievePayrollMonth logic to to retrieve the information of the payroll chosen by the employee and test.
- DONE create Payroll component where the information of any of the two options chosen by the employee will be displayed

- DONE implement the correct functionality of modal


#### Employee: create payrollMonths and process payrolls month payments

- Me as an employee (roll: Admin), want to be able to have the option to create monthly payrolls, selecting the specific year, month and employees salary level (exists an option to select all employees from all salary levels). I will have the option to remove employees from the list whose payroll I do not want to create. The created payrolls will have the status 'created' and will not be visible to the employee until they have the status 'paid'.

- Me as an employee (roll: Admin), want to be able to have the option to process monthly payrolls, selecting the specific year and month. I will have the option to remove payrolls from the list  I do not want to process. The processed payrolls will have the status 'paid' and will become visible to the employees. Payrolls deleted in this process to prevent processing will be completely removed from the database, so to be processed eventually, they will need to be recreated.


##### Tasks
- DONE build html
- DONE build basic css
- DONE implement modal window Modal (ManagePayrollMenuModal.jsx) I want to be able to create payrolls for all employees of a specific level at once, choosing year, month, and salary level.

- DONE Create a JSX components (Employee and PayrollsMonthListToBePaid). Render the employees obtained from the selective search by salary level, and render payrolls created to be paid.
- DONE implement createEmployeePayrollMonth and and deletePayrollMonth logics and test.
- DONE implement the correct functionality of modal



#### Employee: search (check and update employee), register employee and reset employeePassword

- Me as an employee (roll: Admin), I want to have the ability to search for employees by any parameter, and once I obtain the data, be able to view their curriculum vitae and personal information, as well as modify employee parameters. I also want to be able to register new employees and reset the password for any employee who needs it

##### Tasks

- DONE build html
- DONE build basic tailwind
- DONE implement JSX components (EmployeeDatabaseMenuModal.jsx) with three options. All components: SeachEmployeesModal (EmployeeFoundedModal, EmployeeModal, UpdateEmployeeModal), RegisterEmployeeModal and ResetPasswordModal
- DONE implement searchEmployee, updateEmployee, registerEmployee, resetPassword, logics files and tests.
- DONE implement the correct functionality of modal



#### Employee: chart Menu 

- Me as an employee, I want to be able to visualize my company's chart.

##### Tasks

- DONE build html
- DONE build basic tailwind
- DONE implement JSX components (ChartMenuModal.jsx and ChildrenChart), 
- DONE implement: create a class with its constructor in 'com' folder
- TODO implement logics files and tests.
- TODO implement the correct functionality of modal
