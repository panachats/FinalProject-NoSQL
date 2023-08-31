function loadTable(page = 1, size = 100) {
  $.ajax({
    url: `http://localhost:3000/Llist?skip=${(page - 1) * 5}&limit=${size}`,
    type: 'GET',

    success: function (objects) {
      var trHTML = '';
      var num = ((page - 1) * 100) + 1;
      for (let object of objects) {
        // if(typeof(object["percentage_laid_off"]) == "undefined"){
        //   //console.log(5555)
        // }else{
          var percentage = parseFloat(object["percentage_laid_off"]).toFixed(2);
          trHTML += "<tr>";
          trHTML += "<td>" + num + "</td>";
          trHTML += "<td>" + object["company"] + "</td>";
          // trHTML += "<td>" + object["location"] + "</td>";
          trHTML += "<td>" + object["industry"] + "</td>";
          trHTML += "<td>" + object["total_laid_off"] + "</td>";
          //trHTML += "<td>" + parseFloat(object["percentage_laid_off"]).toFixed(2) + "</td>";
          trHTML += "<td>" + percentage + "</td>";
          trHTML += "<td>" + object["date"] + "</td>";
          // trHTML += "<td>" + object["stage"] + "</td>";
          trHTML += "<td>" + object["country"] + "</td>";
          // trHTML += "<td>" + object["funds_raised"] + "</td>";
          trHTML += "<td>";
          trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="UpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
          trHTML += '<a type="button" class="btn btn-outline-danger" onclick="DeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
          trHTML += "<tr>";
  
          num++;
        // }
        
       
      }
      var paginationHTML = ''
      // paginationHTML += `<li class="page-item" onclick="loadTable()" ><a class="page-link" href="#">Previous</a></li>`
      for (let pageNumber of [...Array(page = 17).keys()].map(i => i + 1)) {
        paginationHTML += `<li class="page-item" ><a class="page-link" href="#" onclick="loadTable(${pageNumber},100)">${pageNumber}</a></li>`
      }
      // paginationHTML += '<li class="page-item"><a class="page-link" href="#">Next</a></li>'
      document.getElementById("pagination").innerHTML = paginationHTML;
      document.getElementById("mytable").innerHTML = trHTML;
      // loadGraph();
    }
  });
}

function loadQueryTable() {
  document.getElementById("mytable").innerHTML = '<tr><th scope="row" colspan="5">Loading...</th></tr>';
  const searchText = document.getElementById("searchTextBox").value;
  if (searchText != "") {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/Llist/industry/" + searchText);

    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var trHTML = '';
        var num = 1;
        const objects = JSON.parse(this.responseText).Complaint;
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + num + "</td>";
          trHTML += "<td>" + object["company"] + "</td>";
          // trHTML += "<td>" + object["location"] + "</td>";
          trHTML += "<td>" + object["industry"] + "</td>";
          trHTML += "<td>" + object["total_laid_off"] + "</td>";
          trHTML += "<td>" + object["percentage_laid_off"] + "</td>";
          trHTML += "<td>" + object["date"] + "</td>";
          // trHTML += "<td>" + object["stage"] + "</td>";
          trHTML += "<td>" + object["country"] + "</td>";
          // trHTML += "<td>" + object["funds_raised"] + "</td>";
          trHTML += "<td>";
          trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="UpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
          trHTML += '<a type="button" class="btn btn-outline-danger" onclick="DeleteBox(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
          trHTML += "<tr>";
          num++;

        }
        console.log(trHTML);
        document.getElementById("mytable").innerHTML = trHTML;

      }
    };
  }else{
    loadTable();
  }
}



function CreateBox() {
  var d = new Date();

  Swal.fire({
    title: 'Create Layoff Transaction',
    html: 

      '<div class="mb-3"><label for="company" class="form-label">company</label>' +
      '<input class="form-control" id="company" placeholder="company"></div>' +

      '<div class="mb-3"><label for="location" class="form-label">location</label>' +
      '<input class="form-control" id="location" placeholder="location"></div>' +

      '<div class="mb-3"><label for="industry" class="form-label">industry</label>' +
      '<input class="form-control" id="industry" placeholder="industry"></div>' +

      '<div class="mb-3"><label for="total_laid_off" class="form-label">total_laid_off</label>' +
      '<input class="form-control" id="total_laid_off" placeholder="total_laid_off"></div>' +

      '<div class="mb-3"><label for="percentage_laid_off" class="form-label">percentage_laid_off</label>' +
      '<input class="form-control" id="percentage_laid_off" placeholder="percentage_laid_off"></div>' +

      '<div class="mb-3"><label for="date" class="form-label">date</label>' +
      '<input class="form-control" id="date" placeholder="date"></div>' +

      '<div class="mb-3"><label for="stage" class="form-label">stage</label>' +
      '<input class="form-control" id="stage" placeholder="stage"></div>' +

      '<div class="mb-3"><label for="country" class="form-label">country</label>' +
      '<input class="form-control" id="country" placeholder="country"></div>' +

      '<div class="mb-3"><label for="funds_raised" class="form-label">funds_raised</label>' +
      '<input class="form-control" id="funds_raised" placeholder="funds_raised"></div>',

    focusConfirm: false,
    preConfirm: () => {
      LlistCreate();
    }
  });
}

function LlistCreate() {

  // const Created_Date = document.getElementById('Created_Date').value;

  const company = document.getElementById('company').value;
  const location = document.getElementById('location').value;
  const industry = document.getElementById('industry').value;
  const total_laid_off = document.getElementById('total_laid_off').value;
  const percentage_laid_off = document.getElementById('percentage_laid_off').value;
  const date = document.getElementById('date').value;
  const stage = document.getElementById('stage').value;
  const country = document.getElementById('country').value;
  const funds_raised = document.getElementById('funds_raised').value;

  console.log(JSON.stringify({
    // Created_Date: Created_Date,
    company: company,
    location: location,
    industry: industry,
    total_laid_off: total_laid_off,
    percentage_laid_off: percentage_laid_off,
    date: date,
    stage: stage,
    country: country,
    funds_raised: funds_raised
  }));

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/Llist/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    // Created_Date: Created_Date,
    company: company,
    location: location,
    industry: industry,
    total_laid_off: total_laid_off,
    percentage_laid_off: percentage_laid_off,
    date: date,
    stage: stage,
    country: country,
    funds_raised: funds_raised
  }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Create Student Information Successfully!',
        'success'
      );
      loadTable();
    }
  };
}

function DeleteBox(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Delete(id);
    }
  })
}

function Delete(id) {
  console.log("Delete: ", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/Llist/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "_id": id
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Delete Student Information Successfully!',
        'success'
      );
      loadTable();
    }
  };
}

function UpdateBox(id) {
  console.log("edit", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/Llist/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText).Complaint;
      console.log("UpdateBox", object);
      Swal.fire({

        title: 'Update Student Transaction',
        html: '<input id="id" class="swal2-input" placeholder="OID" type="hidden" value="' + object['_id'] + '"><br>' +

      

          '<div class="mb-3"><label for="company" class="form-label">company</label>' +
          '<input class="form-control" id="company" placeholder="StudentID" value="' + object['company'] + '"></div>' +

          '<div class="mb-3"><label for="locatioc" class="form-label">location</label>' +
          '<input class="form-control" id="location" placeholder="location" value="' + object['location'] + '"></div>' +

          '<div class="mb-3"><label for="industry" class="form-label">industry</label>' +
          '<input class="form-control" id="industry" placeholder="industry" value="' + object['industry'] + '"></div>' +

          '<div class="mb-3"><label for="total_laid_off" class="form-label">total_laid_off</label>' +
          '<input class="form-control" id="total_laid_off" placeholder="total_laid_off" value="' + object['total_laid_off'] + '"></div>' +

          '<div class="mb-3"><label for="percentage_laid_off" class="form-label">percentage_laid_off</label>' +
          '<input class="form-control" id="percentage_laid_off" placeholder="percentage_laid_off" value="' + object['percentage_laid_off'] + '"></div>' +

          '<div class="mb-3"><label for="date" class="form-label">date</label>' +
          '<input class="form-control" id="date" placeholder="date" value="' + object['date'] + '"></div>' +

          '<div class="mb-3"><label for="stage" class="form-label">stage</label>' +
          '<input class="form-control" id="stage" placeholder="stage" value="' + object['stage'] + '"></div>' +


          '<div class="mb-3"><label for="country" class="form-label">country</label>' +
          '<input class="form-control" id="country" placeholder="country" value="' + object['country'] + '"></div>' +

          '<div class="mb-3"><label for="funds_raised" class="form-label">funds_raised</label>' +
          '<input class="form-control" id="funds_raised" placeholder="funds_raised" value="' + object['funds_raised'] + '"></div>',

        focusConfirm: false,
        preConfirm: () => {
          Update();
        }
      });
    }
  };
}


function Update() {

  const id = document.getElementById("id").value;
  const company = document.getElementById('company').value;
  const location = document.getElementById('location').value;
  const industry = document.getElementById('industry').value;
  const total_laid_off = document.getElementById('total_laid_off').value;
  const percentage_laid_off = document.getElementById('percentage_laid_off').value;
  const date = document.getElementById('date').value;
  const stage = document.getElementById('stage').value;
  const country = document.getElementById('country').value;
  const funds_raised = document.getElementById('funds_raised').value;

  console.log(JSON.stringify({
    "_id": id,

    company: company,
    location: location,
    industry: industry,
    total_laid_off: total_laid_off,
    percentage_laid_off: percentage_laid_off,
    date: date,
    stage: stage,
    country: country,
    funds_raised: funds_raised
  }));


  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/Llist/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "_id": id,
    company: company,
    location: location,
    industry: industry,
    total_laid_off: total_laid_off,
    percentage_laid_off: percentage_laid_off,
    date: date,
    stage: stage,
    country: country,
    funds_raised: funds_raised
  }));



  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Update Student Information Successfully!',
        'success'
      );
      loadTable();
    }
  };
}


//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}