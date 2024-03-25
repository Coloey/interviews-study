function makeStudent() {
    console.log('this', this);
    return {
        studentName: 'xiaoming',
        ref: this,
    }
}

let student = makeStudent();
console.log(student.ref, student.ref.studentName)//window undefined


let student2 = new makeStudent()
console.log(student2.ref, student2.ref.studentName)//makeStudent{}  undefined