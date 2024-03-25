"use strict";

function makeStudent() {
  console.log('this', this);
  return {
    studentName: 'xiaoming',
    ref: this
  };
}

var student = makeStudent();
console.log(student.ref, student.ref.studentName); //window undefined

var student2 = new makeStudent();
console.log(student2.ref, student2.ref.studentName); //makeStudent{}  undefined