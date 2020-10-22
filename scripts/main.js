import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var studentsTbody = document.getElementById('students');
var btnfilterByName = document.getElementById('button-filterByName');
var btnSearchByRange = document.getElementById('button-filterByRange');
var inputSearchBox = (document.getElementById('search-box'));
var totalCreditElm = document.getElementById('total-credits');
var inputSearchBoxMin = (document.getElementById('search-box1'));
var inputSearchBoxMax = (document.getElementById('search-box2'));
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnSearchByRange.onclick = function () { return applyFilterByCredit(); };
renderStudentsInTable(dataStudents);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    console.log('Desplegando estudiantes');
    students.forEach(function (student) {
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + student.name + "</td>\n                           <td>" + student.value + "</td>";
        studentsTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = text == null ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === ''
        ? dataCourses
        : courses.filter(function (c) { return c.name.match(nameKey); });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return (totalCredits = totalCredits + course.credits); });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function applyFilterByCredit() {
    var minText;
    var maxText;
    minText = parseInt(inputSearchBoxMin.value);
    maxText = parseInt(inputSearchBoxMax.value);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(minText, maxText, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(minKey, maxKey, courses) {
    return courses.filter(function (c) { return c.credits >= minKey && c.credits <= maxKey; });
}
