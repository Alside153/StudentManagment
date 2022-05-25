var url = "http://localhost:8000/students";

async function getAllStudents() {
        var resp = await fetch(url);

    if (resp.ok) {
        var students = await resp.json();

        console.log(students);

        var bodyObj = document.getElementById("mainTr");

        var tr = document.createElement("table");
        tr.border = 1;

        //HEADERS for the Table
        var trRow = document.createElement("tr");

        var tdDataName = document.createElement("input");
        var tdDataGrades = document.createElement("td");
        var tdDataFaculty = document.createElement("td");
        var tdDataEdit = document.createElement("td");
        var tdDataDelete = document.createElement("td");

        tdDataName.placeholder = "Full Name";
        tdDataName.style.fontWeight = "bold";
        tdDataName.id="tdSearchBar"
        tdDataGrades.innerHTML = "Grades";
        tdDataGrades.style.fontWeight = "bold";
        tdDataFaculty.innerHTML = "Faculty";
        tdDataFaculty.style.fontWeight = "bold";
        tdDataEdit.innerHTML = "Edit";
        tdDataEdit.style.fontWeight = "bold";
        tdDataDelete.innerHTML = "Delete";
        tdDataDelete.style.fontWeight = "bold";
        // tdDataName.onkeypress = function(){
        //     // console.log(document.getElementById("tdSearchBar").value.length+1),
            
        //     var nameA = a.FullName.toUpperCase(); // ignore upper and lowercase
        //     var nameB = b.FullName.toUpperCase(); // ignore upper and lowercase
        //     if (nameA = nameB) {
        //         console.log("")
        //     }
        //     };
        

        trRow.append( tdDataName, tdDataFaculty, tdDataGrades, tdDataEdit, tdDataDelete);
        tr.appendChild(trRow);



        students.sort((a, b) => {
        var nameA = a.FullName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.FullName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
        });
        
        //creating the table
        students.forEach((student) => {

            var trRow = document.createElement("tr");

            var tdDataName = document.createElement("td");
            var tdDataFaculty = document.createElement("td");
            var tdDataGrades = document.createElement("td");
            var tdDataEdit = document.createElement("td");
            var tdDataDelete = document.createElement("td");

            var GradesButton = document.createElement("button");
            var delButton = document.createElement("button");
            var editButton = document.createElement("button");


            tdDataFaculty.innerHTML= student.Faculty;

            tdDataName.innerHTML= student.FullName;
            tdDataName.onclick = function() {stdFunc(student._id)};
            tdDataName.onmouseenter = function() {tdDataName.style.color = 'blue'}
            tdDataName.onmouseover = function() {tdDataName.style="cursor: pointer;"};
            tdDataName.onmouseleave = function() {tdDataName.style.color = 'black'}

            GradesButton.innerHTML= "Grades";
            GradesButton.onclick = function() {grdFunc(student._id)};
            GradesButton.onmouseover = function() {GradesButton.style="cursor: pointer;"};

            delButton.innerHTML= "Delete";
            delButton.onclick = function() {delFunc(student._id)};
            delButton.onmouseover = function() {delButton.style="cursor: pointer;"};

            editButton.innerHTML = "Edit";
            editButton.onclick = function() {edtFunc(student._id)};
            editButton.onmouseover = function() {editButton.style="cursor: pointer;"};

    
            tdDataGrades.append(GradesButton);
            tdDataEdit.append(editButton);
            tdDataDelete.append(delButton);

            trRow.append( tdDataName, tdDataFaculty, tdDataGrades, tdDataEdit, tdDataDelete);
            tr.appendChild(trRow);
        })
        //creating the 'Create' button
        var createButton = document.createElement("button");
        var tdCreateRow = document.createElement("td");
        // var tdSearchBar = document.createElement("td")

        createButton.innerHTML= "Create New Student";
        createButton.onclick = function() {createNew()};
        createButton.onmouseover = function() {createButton.style="cursor: pointer;"};

        
        // tdCreateRow.append(createButton);
        tr.append(createButton); 
    }
    bodyObj.appendChild(tr);
}

function createNew() {

    window.location.href = "CreatePage.html";
}

function backToPage() {
    window.location.href = "MainPage.html";
}

async function createStudent() {

    var std = {
        FullName: "",
        Email: "",
        Faculty: "",
        Birthday: "",
    }

    std.FullName = document.getElementById("Name").value;
    std.Email = document.getElementById("Email").value;
    std.Faculty = document.getElementById("Faculty").value;
    std.Birthday = document.getElementById("Birthday").value;



        if(std.FullName.length>0 && std.Email.length>0 &&std.Faculty.length>0 &&std.Birthday>= "1.1.1"){        
            var resp = await fetch(url, {
                method: "POST",
                body: JSON.stringify(std),
                headers: { "content-type": "application/json" }
            })

            if (resp.ok === true) {
                var data = await resp.json();
                console.log(data);
            }

            window.location.href = "MainPage.html";
        }
        else console.log("Can not save an incomplete student");
}

function edtFunc(id) {

    sessionStorage.setItem('EditUser',JSON.stringify(id));

    window.location.href = "EditPage2.html";
}

async function setStudent() {
    var id = JSON.parse(sessionStorage.getItem('EditUser'));
    var resp = await fetch(url+ "/"+ id);

    if (resp.ok === true) {
        std = await resp.json();

    }
    else {
        console.log("Error");
    }

    if(std.Birthday>="1.1.1") std.Birthday = std.Birthday.slice(0,10);
    
    document.getElementById("Name").value = std.FullName;
    document.getElementById("Email").value = std.Email;
    document.getElementById("Faculty").value = std.Faculty;
    document.getElementById("Birthday").value = std.Birthday;

    sessionStorage.setItem('TransferStudent', JSON.stringify(std));
}

async function editStudent() {
    var std = JSON.parse(sessionStorage.getItem('TransferStudent'));
    
    std.FullName = document.getElementById("Name").value;
    std.Email = document.getElementById("Email").value;
    std.Faculty = document.getElementById("Faculty").value;
    std.Birthday = document.getElementById("Birthday").value;

    var resp = await fetch(url + "/" + std._id, {
                method: "put",
                body: JSON.stringify(std),
                headers : { "content-type": "application/json" }
            })
            if(resp.ok){
                var data = await resp.json();
                console.log(data);
            }
        

    window.location.href = "MainPage.html";
}

async function delFunc(id) {


    var resp = await fetch(url + "/" + id, {
        method: "delete"
    });

    console.log(resp);

    if (resp.status === 200) {
        var data = await resp.json();
        console.log(data);
    }

    window.location.href = "MainPage.html";
}

async function grdFunc(id){

    sessionStorage.setItem('TransferId', JSON.stringify(id));

    window.location.href = "Grades.html";
}

async function getGrades(){

    var id = JSON.parse(sessionStorage.getItem('TransferId'));

    var resp = await fetch(url+ "/"+ id);

            if (resp.ok === true) {
                student = await resp.json();

            }
            else {
                console.log("Error");
            }

    var GRADES = student.Grades;

    var bodyObj = document.getElementById("mainTr");
    var saveObj = document.getElementById("saveTr");

    var tr = document.createElement("table");
    tr.border = 1;

    //HEADERS for the Table
    var trRow = document.createElement("tr");

    var tdDataScore = document.createElement("td");
    var tdDataDate = document.createElement("td");
    var TdEdit = document.createElement("td");
    var TdDelete = document.createElement("td");

    TdEdit.innerHTML = "Save";
    TdEdit.width =50;
    TdDelete.innerHTML = "Delete";
    tdDataScore.innerHTML = "Score";
    tdDataScore.width = 175;
    tdDataDate.innerHTML = "Date";
    tdDataDate.width = 140;

    trRow.append( tdDataScore,tdDataDate,TdEdit,TdDelete );
    tr.appendChild(trRow);

    GRADES.forEach((test) => {
        console.log(test);
        var trRow = document.createElement("tr");

        var tdDataScore = document.createElement("td");
        var tdDataDate = document.createElement("td");
        var tdDataEdit = document.createElement("td");
        var tdDataDelete = document.createElement("td");
        var delButton = document.createElement("button");
        var editButton = document.createElement("button");
        var TdDateText = document.createElement("input");
        var TdScoreText = document.createElement("input");
        
        if(test.DateOfExame!=undefined)
            test.DateOfExame = test.DateOfExame.slice(0, 10);

        TdDateText.id = `tdDateText${test._id}`;
        TdScoreText.id = `tdScoreText${test._id}`;
        TdScoreText.value = test.Grade;
        TdDateText.value =  test.DateOfExame;
        TdDateText.setAttribute("type", "date");
        delButton.innerHTML= "Delete";
        delButton.onclick = function() {delGradeFunc(student, test)};
        delButton.onmouseover = function() {delButton.style="cursor: pointer;"};
        editButton.innerHTML = "Save";
        editButton.onclick = function() {edtGradeFunc(student, test)};
        editButton.onmouseover = function() {editButton.style="cursor: pointer;"};

        tdDataDate.append(TdDateText);
        tdDataScore.append(TdScoreText);
        tdDataEdit.append(editButton);
        tdDataDelete.append(delButton);

        trRow.append(tdDataScore,tdDataDate,tdDataEdit,tdDataDelete);
        tr.appendChild(trRow);
    })
    var TrAddStudentRow = document.createElement("tr");

    var TdAddButton = document.createElement("td");
    var TdBackButton = document.createElement("td");
    var TdNewDate = document.createElement("td");
    var TdNewItemScore = document.createElement("td");

    var addButton = document.createElement("button");
    var NewGrade = document.createElement("input");
    NewGrade.id = "NewGrade";
    var NewDate = document.createElement("input");
    NewDate.setAttribute("type", "date");
    NewDate.id = "NewGradeDate";
    var BackButton = document.createElement("button");
        
    addButton.innerHTML= "Add";
    addButton.onclick = function() {addGradeFunc()};
    addButton.onmouseover = function() {addButton.style="cursor: pointer;"};
    BackButton.innerHTML= "Back";
    BackButton.onclick = function() {backFunc()};
    BackButton.onmouseover = function() {BackButton.style="cursor: pointer;"};

    TdNewItemScore.append(NewGrade)
    TdNewDate.append(NewDate)
    TdBackButton.append(BackButton)
    TdBackButton.width= 55;
    TdBackButton.align= 'center'
    TdAddButton.append(addButton)
    TdAddButton.width= 50;
    TdAddButton.align= 'center'


    TrAddStudentRow.append(TdNewItemScore, TdNewDate, TdAddButton, TdBackButton);
    saveObj.appendChild(TrAddStudentRow);

    bodyObj.appendChild(tr);
    

    sessionStorage.setItem('TransferStudent', JSON.stringify(student));
}

async function backFunc() {
    window.location.href = "MainPage.html";
}

async function addGradeFunc(){

    var student = JSON.parse(sessionStorage.getItem('TransferStudent'));
    var newGrade = document.getElementById("NewGrade").value; 
    var newGradeDate = document.getElementById("NewGradeDate").value;
    var today = new Date();


    if(newGrade && newGradeDate >= "1.1.1" ){

        if((today.getFullYear() > newGradeDate.slice(0,4)|| 
            (today.getMonth()+1) > newGradeDate.slice(5,7) && today.getFullYear() == newGradeDate.slice(0,4)|| 
            today.getDate() >= newGradeDate.slice(8,10) &&  today.getMonth()+1 == newGradeDate.slice(5,7) &&  today.getFullYear() == newGradeDate.slice(0,4)))
        {
            var newJson = {
            DateOfExame: newGradeDate,
            Grade: newGrade
            }

            student.Grades.push(newJson);

            var resp = await fetch(url + "/" + student._id, {
                method: "put",
                body: JSON.stringify(student),
                headers : { "content-type": "application/json" }
            })
            if(resp.ok){
                var data = await resp.json();
                console.log(data);
            }

            window.location.href = "Grades.html";
        }
        else console.log("Date Error")
    }
    else console.log("Cant enter undefined values.")
}

function stdFunc(id){
    sessionStorage.setItem('TransferId', JSON.stringify(id));

    window.location.href = "StudentInfo.html";
}

async function setInfo(){
    var id = JSON.parse(sessionStorage.getItem('TransferId'));
    var student = {};
    var resp = await fetch(url+ "/"+ id);

            if (resp.ok === true) {
                student = await resp.json();

            }
            else {
                console.log("Error");
            }

    document.getElementById("Id").innerHTML = student._id;
    document.getElementById("Name").innerHTML = student.FullName;
    document.getElementById("Email").innerHTML = student.Email
    document.getElementById("Faculty").innerHTML = student.Faculty
    document.getElementById("Birthday").innerHTML = student.Birthday.slice(0, 10);

    //buttons functions
    document.getElementById("MainPageGrades").onclick = function() {grdFunc(student._id)}
    document.getElementById("MainPageEdit").onclick = function() {edtFunc(student._id)};
    document.getElementById("MainPageDelete").onclick = function() {delFunc(student._id)}




}

function backToMain(){
  
    window.location.href = "MainPage.html";
}

async function delGradeFunc(arr, grade){

    var tempArr = arr.Grades;

    tempArr = tempArr.filter(element => {
        if(element._id != grade._id){
            return element;
        }
    })

    arr.Grades = tempArr;

    var resp = await fetch(url + "/" + arr._id, {
        method: "put",
        body: JSON.stringify(arr),
        headers : { "content-type": "application/json" }
    })
    if(resp.ok){
        var data = await resp.json();
        console.log(data);
    }

    window.location.href = "Grades.html";
}

async function edtGradeFunc(arr, grade){

    var Date = document.getElementById(`tdDateText${grade._id}`).value
    var Score = document.getElementById(`tdScoreText${grade._id}`).value
    var tempArr = arr.Grades;

    tempArr = tempArr.filter(element => {
        if(element._id == grade._id){
            element.DateOfExame = Date;
            element.Grade = Score;
            return element;
        }
    })

    arr.Grades = tempArr;

    var resp = await fetch(url + "/" + arr._id, {
        method: "put",
        body: JSON.stringify(arr),
        headers : { "content-type": "application/json" }
    })
    if(resp.ok){
        var data = await resp.json();
        console.log(data);
    }

        window.location.href = "Grades.html";

}