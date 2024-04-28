#! /usr/bin/env node 

import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.italic.rgb(255, 102, 0).bold(`\n\t\t\t\t----------------------------------------------------------------------\n\t\t\t\t\t  <--------  SCHOOL   MANAGEMENT   SYSTEM  -------->\n\t\t\t\t---------------------------------------------------------------------- \n`));
// main function where choices will given that what do you want to do in school management 
function mainFunc() {
    inquirer.prompt([{
            name: "function",
            type: "list",
            message: chalk.italic.rgb(238, 232, 170)("Select Any Of The Choices.. \n"),
            choices: ["ADD STUDENT", "ENROLL COURCE", "VIEW BALANCE", "PAY FEE", "SHOW STATUS", "EXIT"]
            // switch statement 
        }]).then(answer => {
        switch (answer.function) {
            case 'ADD STUDENT':
                addstudents();
                break;
            case 'ENROLL COURCE':
                enroolStudent();
                break;
            case 'PAY FEE':
                payfee();
                break;
            case 'VIEW BALANCE':
                vieewBlance();
                break;
            case 'SHOW STATUS':
                showSttus();
                break;
            case 'EXIT':
                console.log(chalk.italic.bold.rgb(226, 167, 128)(`\n Make Sure Feel Free To Ask Any Inquiries....\n Thank you And Goodbye....  `));
                console.log(chalk.italic.bold.rgb(255, 102, 0)(`\n\t\t\t\t----------------------------------------------------------------------\n\t\t\t  <--------  THANK YOU FOR USING THIS STUDENT MANAGEMENT SYSTEM   -------->\n\t\tt---------------------------------------------------------------------- \n`));
                break;
        }
    });
}
mainFunc();
// here we create a class of student information this is the only one class whhich use in whole code 
class student_Info {
    student = [];
    cource = [];
    paids;
    constructor() {
        this.paids = [0];
        this.cource = [
            { name: "Math", fee: 500 },
            { name: "Biology", fee: 600 },
            { name: "Physics", fee: 700 },
            { name: "Chemistry", fee: 800 },
            { name: "Computer Science", fee: 900 }
        ];
    }
    // method to get student 
    getstudent() {
        return this.student;
    }
    // method to get cource 
    getCource() {
        return this.cource;
    }
    // here random id will generate for the specific student 
    generateId() {
        let generate_Num = Math.floor((Math.random() * 100000) + 1.).toString();
        return generate_Num;
    }
    //  add all student method  data  like name ,fname,age,etc..
    addstudent(name, fname, age, classe) {
        const id = this.generateId();
        const stud = {
            id,
            name,
            fname,
            age,
            classe,
            cource: [],
            balance: 0
        };
        // push all the data into class property which is student 
        this.student.push(stud);
        console.log(chalk.italic.rgb(26, 267, 228)(`\n  student ${chalk.underline.bold.rgb(226, 67, 128)(name.toUpperCase())} information has been included with this ID address : ${chalk.underline.bold.rgb(226, 67, 128)(id)}\n`));
    }
    //  Enrool a students method  in a course like maths, biology, physics 
    enrolstudent(studentid, courseid) {
        const student = this.student.find(s => s.id === studentid); //changing name to id 
        const cous = this.cource.find(c => c.name == courseid);
        if (student && cous) {
            student.cource.push(cous); //again push all the cources which student will select to class property cource
            student.balance += cous.fee;
            console.log(chalk.italic.rgb(26, 267, 228)(`\nStudent ${chalk.underline.bold.rgb(226, 67, 128)(student.name.toUpperCase())} (ID :${chalk.bold.rgb(226, 67, 128)(student.id)}) enrolled in ${chalk.underline.bold.rgb(226, 67, 128)(courseid)} which fee is ${chalk.italic.bold.rgb(226, 67, 128)(cous.fee)}.\n`));
        }
        else {
            console.log(chalk.italic.red('\n\t--------> Student or course not found --------->\n'));
        }
    }
    // pay tution fee method  
    payTutionFee(studentID, amount) {
        const sTUDent = this.student.find(p => p.id === studentID); //checking  to id 
        if (sTUDent) { //if amount is greater than the student balance so this message will print 
            if (amount > sTUDent.balance) {
                let amounts = amount - sTUDent.balance;
                let need = amount - amounts;
                console.log(chalk.italic.rgb(26, 267, 228)(`\nTake Your Remained Cash That You Paid Extra : ${chalk.bold.rgb(226, 67, 128)(amounts)}  Your Fee is: ${chalk.italic.rgb(226, 67, 128)(need)}\n`));
                sTUDent.balance -= need;
            }
            else {
                // let amounts =  sTUDent.balance - amount
                let paids = sTUDent.balance -= amount;
                console.log(chalk.italic.rgb(26, 267, 228)(`\n Student ${chalk.bold.rgb(226, 67, 128)(studentID)} Paid Rs.${chalk.bold.rgb(226, 67, 128)(amount)} and Her/His remaining due amount for course is: Rs.${chalk.bold.rgb(226, 67, 128)(paids)}\n`));
            }
        }
        else {
            console.log(chalk.italic.red(`\n -----> ERROR !!  STUDENT NOT FOUND \n`));
        }
        let cahnge = Number(amount) + sTUDent.balance;
        let sumbit = cahnge - sTUDent.balance;
        this.paids.push(sumbit); //this.paids is in a constructor and we create this to show paid balance in show status  
    }
    // in the view balance method 
    viewBalance(stUDENTID) {
        console.log(chalk.underline.overline.italic.rgb(26, 267, 228)(`\nSearching for student with ID : ${chalk.overline.italic.bold.rgb(226, 67, 128)(stUDENTID)}\n `));
        const studen = this.student.find(v => v.id == stUDENTID);
        if (studen) {
            console.log(chalk.italic.rgb(26, 267, 228)(`Student ${chalk.underline.bold.rgb(226, 67, 128)(studen.name.toUpperCase())} : remaining balance for course fee is to pay Rs.${chalk.underline.bold.rgb(226, 67, 128)(studen.balance)}\n  `));
        }
        else {
            console.log(chalk.italic.red(` -----> ERROR !!  STUDENT NOT FOUND \n `));
        }
    }
    // show status show information about student which user gave us 
    showStatus(STUDENTID) {
        console.log(chalk.underline.italic.rgb(26, 267, 228)(`\n\tsearching for student with id is : ${chalk.italic.bold.rgb(226, 67, 128)(STUDENTID)}\n`));
        const myStud = this.student.find(s => s.id == STUDENTID); //checking if the user give correct id then all these data will show 
        if (myStud) {
            //if id is correct then all the data will show to the user 
            console.log(chalk.italic.rgb(26, 267, 228)(`\tSTUDENT ID : " ${chalk.italic.rgb(226, 67, 128)(myStud.id)} "`));
            console.log(chalk.italic.rgb(26, 267, 228)(`\tSTUDENT NAME  : " ${chalk.italic.rgb(226, 67, 128)(myStud.name)}  "`));
            console.log(chalk.italic.rgb(26, 267, 228)(`\tFATHER NAME  : " ${chalk.italic.rgb(226, 67, 128)(myStud.fname)} "`));
            console.log(chalk.italic.rgb(26, 267, 228)(`\tAGE  : " ${chalk.italic.rgb(226, 67, 128)(myStud.age)} "`));
            console.log(chalk.italic.rgb(26, 267, 228)(`\tCLASS : " ${chalk.italic.rgb(226, 67, 128)(myStud.classe)} "`));
            myStud.cource.forEach((coutse) => {
                console.log(chalk.italic.rgb(26, 267, 228)(`\tCOURSE  : " ${chalk.italic.rgb(226, 67, 128)(coutse.name)} "`));
                console.log(chalk.italic.rgb(26, 267, 228)(`\tFEE of ${coutse.name} : " ${chalk.italic.rgb(226, 67, 128)(coutse.fee)} "`));
            });
            console.log(chalk.italic.rgb(26, 267, 228)(`\tBALANCE   : " ${chalk.italic.rgb(226, 67, 128)(myStud.balance)} "`));
            console.log(chalk.italic.rgb(26, 267, 228)(`\tPAID BALANCE   : " ${chalk.italic.rgb(226, 67, 128)(this.paids.reduce((val1, val2) => val1 + val2))} "\n`));
        }
        else { // and if the id is incorrect then else block will run 
            console.log(chalk.italic.red(` -----> ERROR !! STUDENT NOT FOUND`));
        }
    }
}
// here we call our class but with 0 arguments because there is no parameter in constructor of the class 
const sim = new student_Info();
//  now take data from student through inquirer 
function addstudents() {
    inquirer.prompt([{
            name: "num",
            type: "input",
            message: chalk.italic.rgb(238, 232, 170)("Give a Student Name : "),
            validate: (input) => {
                if (/^[A-Za-z\s]+$/.test(input)) { // checking that user will not give integar number in their name 
                    return true;
                }
                else {
                    return chalk.italic.red(`Kindly Use Just Alphabetic Words. `);
                }
            }
        }, {
            name: "father",
            type: "input",
            message: chalk.italic.rgb(238, 232, 170)("Give a Father Name : "),
            validate: (input) => {
                if (/^[A-Za-z\s]+$/.test(input)) { // checking that user will not give  a integar number in their father name we need just alphabetic words 
                    return true;
                }
                else {
                    return chalk.italic.red(`Kindly Use Just Alphabetic Words. `);
                }
            }
        }, {
            name: "age",
            type: "input",
            message: chalk.italic.rgb(238, 232, 170)("Give Your Age :  "),
            validate: (input) => {
                if (/^\d+$/.test(input)) { //checking that user will give only numbers not alphabetic worda in their age 
                    return true;
                }
                else {
                    return chalk.italic.red(`Kindly Use Just Integar Words. `);
                }
            }
        }, {
            name: "class",
            type: "input",
            message: chalk.italic.rgb(238, 232, 170)("Give Your Class Name : "),
            validate: (input) => {
                if (/^\d+$/.test(input)) { //chacking that user will give only integar numbers in theri class 
                    if (input > 12) { // here we are saying that class number should be 1 to 12 like one class two class this is basically a grade of student
                        return chalk.italic.red("OO choose your class between 1 to 12 ");
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return chalk.italic.red(`Kindly Use Just Integar Words. `);
                }
            }
        }]).then(answer => {
        // we re just giving arguments in our class methods using inquirer prompt 
        sim.addstudent(answer.num, answer.father, answer.age, answer.class);
        mainFunc();
    });
}
// now give options to student to and take user decision through inquirer 
function enroolStudent() {
    const studn = sim.getstudent();
    const cor = sim.getCource();
    if (studn.length == 0 || cor.length == 0) {
        console.log(chalk.red.bold.italic(" ------> NO STUDENT AND COURCE  FOUND HERE <------ "));
    }
    inquirer.prompt([{
            type: "list",
            name: "studentId",
            message: chalk.italic.rgb(238, 232, 170)("Select Student Name "),
            choices: studn.map((ans) => ({ name: ans.name, value: ans.id })) //here we are giving options to select student 
            // like which student want to get course 
        }, {
            type: "list",
            name: "CourceId",
            message: chalk.italic.rgb(238, 232, 170)("Select Cources Name "),
            choices: cor.map((answ) => ({ name: answ.name, value: answ.name })) //then same thing is going here 
        }]).then(allow => { sim.enrolstudent(allow.studentId, allow.CourceId), mainFunc(); } // then we give arguments of oue class method parameters 
    );
}
;
// pay fee function through inquirer 
function payfee() {
    inquirer.prompt([{
            name: "studentId",
            type: "input",
            message: chalk.italic.rgb(238, 232, 170)("TYPE STUDENT ID : "),
            validate: function (input) {
                if (/^\d+$/.test(input)) {
                    return true;
                }
                else {
                    return (chalk.italic.red(` -----> ERROR !! Please Enter Only Numerical Digits `));
                }
            }
        }, {
            name: "amount",
            type: "input",
            message: chalk.italic.rgb(238, 232, 170)(" INSERT  THE  AMOUNT THAT  YOU WANT TO BE PAID : "),
            validate: function (input) {
                if (/^\d+$/.test(input)) {
                    return true;
                }
                else {
                    return (chalk.italic.red(`-----> ERROR !! Please Enter Only Numerical Digits `));
                }
            }
        }]).then(answer => {
        const students = sim.getstudent();
        const student = students.find(student => student.id === answer.studentId);
        if (student) {
            sim.payTutionFee(answer.studentId, answer.amount);
        }
        else {
            console.log(chalk.italic.red('---------> Student not found <---------'));
        }
        mainFunc(); //call the main function
    });
}
// view balance 
function vieewBlance() {
    inquirer.prompt([{
            name: "ID",
            type: "input",
            message: chalk.italic.rgb(238, 232, 170)("TYPE STUDENT ID : "),
            validate: function (input) {
                if (/^\d+$/.test(input)) {
                    return true;
                }
                else {
                    return chalk.red.italic(`Please Enter Only Numerical Digits for The Amount `);
                }
            }
        }]).then(responce => {
        const student = sim.getstudent();
        //console.log("Found Student:", student); // Logging the found student
        if (student) {
            sim.viewBalance(responce.ID);
        }
        else {
            console.log(chalk.italic.red('---------> Student not found <---------'));
        }
        mainFunc(); //call the main function
    });
}
//  show status function after taking correct id from the student through inquirer
function showSttus() {
    inquirer.prompt([{
            name: "IID",
            type: "input",
            message: chalk.italic.rgb(238, 232, 170)("ENTER STUDENT ID "),
            validate: function (input) {
                if (/^\d+$/.test(input)) { //checking that user will only give numbers for their id 
                    return true;
                }
                else {
                    return chalk.italic.red(`Please Enter Only Numerical Digits For The Amount `);
                }
            }
        }]).then(action => {
        const act = sim.getstudent(); //here we call the class in class there is a method ehich is get student 
        if (act) { //
            sim.showStatus(action.IID);
        }
        else {
            console.log(chalk.italic.red(" ---------> STUDENT NOT FOUND <---------  "));
        }
        mainFunc(); // call the main function 
    });
}
