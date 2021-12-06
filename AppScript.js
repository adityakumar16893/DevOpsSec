var serverAddress = "http://localhost:7000/students";

function showAddForm(){
    document.getElementById("addForm").style.display="block";
    document.getElementById("updateForm").style.display="none";
    document.getElementById("deleteForm").style.display="none";
    document.getElementById("tablearea").style.display="none";
}

function showUpdateForm(){
    document.getElementById("addForm").style.display="none";
    document.getElementById("updateForm").style.display="block";
    document.getElementById("deleteForm").style.display="none";
    document.getElementById("tablearea").style.display="none";
}

function showDeleteForm(){
    document.getElementById("addForm").style.display="none";
    document.getElementById("updateForm").style.display="none";
    document.getElementById("deleteForm").style.display="block";
    document.getElementById("tablearea").style.display="none";
}

function showViewForm(){
    document.getElementById("addForm").style.display="none";
    document.getElementById("updateForm").style.display="none";
    document.getElementById("deleteForm").style.display="none";
    document.getElementById("tablearea").style.display="block";

    fetch(serverAddress, {
      method: "GET"
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      var tablearea = document.getElementById('tablearea'),
      table = document.createElement('table');

      table.setAttribute("id", 'studentTable');

      if(json.students.length > 0){        
        for (var i = 0; i < json.students.length; i++) {
          var tr = document.createElement('tr');
  
          tr.appendChild( document.createElement('td') );
          tr.appendChild( document.createElement('td') );
          tr.appendChild( document.createElement('td') );
          tr.appendChild( document.createElement('td') );
  
          tr.cells[0].appendChild( document.createTextNode(json.students[i].id) );
          tr.cells[1].appendChild( document.createTextNode(json.students[i].name) );
          tr.cells[2].appendChild( document.createTextNode(json.students[i].contactNumber) );
          tr.cells[3].appendChild( document.createTextNode(json.students[i].emailId) );
  
          table.appendChild(tr);
        }
      }else{
        var tr = document.createElement('tr');
  
        tr.appendChild( document.createElement('td') );
        tr.cells[0].appendChild( document.createTextNode('data not available.!') );
        table.appendChild(tr);
      }
      tablearea.appendChild(table);
    })
    .catch(err => {
      console.log(err);
    });

    const parent = document.getElementById("tablearea");
    const tableTag = document.getElementById('studentTable');

    parent.removeChild(tableTag);
}

function addStudent() {
  fetch(serverAddress, {
    method: "POST",
    body: JSON.stringify({
      name: document.forms['addForm'].elements['name'].value,
      contactNumber: document.forms['addForm'].elements['contactNumber'].value,
      emailId: document.forms['addForm'].elements['emailId'].value
    }),
    headers: {
    "Content-type": "text/plain"
    }
  })
  .then(response => response.json())
  .then(json => {console.log(json);})
  .catch(err => {
    console.log(err);
  });
}

function updateStudent() {
  fetch(serverAddress, {
    method: "PUT",
    body: JSON.stringify({
      id: document.forms['updateForm'].elements['studentId'].value,
      name: document.forms['updateForm'].elements['name'].value,
      contactNumber: document.forms['updateForm'].elements['contactNumber'].value,
      emailId: document.forms['updateForm'].elements['emailId'].value
    }),
    headers: {
    "Content-type": "text/plain"
    }
  })
  .then(response => response.json())
  .then(json => {
    console.log(json)
  })
  .catch(err => {
    console.log(err);
  });
}

function deleteStudent() {
  fetch(serverAddress, {
    method: "DELETE",
    body: JSON.stringify({
      id: document.forms['deleteForm'].elements['studentId'].value
    }),
    headers: {
    "Content-type": "text/plain"
    }
  })
  .then(response => response.json())
  .then(json => {console.log(json)})
  .catch(err => {
    console.log(err);
  });
}