const descriptionTitre = document.querySelector(".description");
const alerts = document.querySelector(".alert-contenainer");
const alerts1 = document.querySelector(".alert-contenainer1");
const closeBtn = document.querySelectorAll(".tittle1");

const reArange = (arr) => {
  const array = arr;
  array.forEach((el, index) => {
    el.id = index + 1;
  });
  return array;
};

let id =0;
/* let arrayTask = [];
if(JSON.parse(localStorage.getItem("arrayTask"))){
    arrayTask = JSON.parse(localStorage.getItem("arrayTask"));
} */
/* if (!localStorage.getItem("nouveau")) {
  localStorage.setItem("nouveau", 0);
}
if (!localStorage.getItem("cour")) {
  localStorage.setItem("cour", 0);
}
if (!localStorage.getItem("terminer")) {
  localStorage.setItem("terminer", 0);
}
let countNoueau = JSON.parse(localStorage.getItem("nouveau"));
let countCours = JSON.parse(localStorage.getItem("cour"));
let countTerminer = JSON.parse(localStorage.getItem("terminer"));
 */
let terminer = 0;
let nouveau = 0;
let cour = 0;

function valideInput() {
  const select1 = document.getElementById("select1").value;
  const title = document.getElementById("title").value;
  const date = document.getElementById("date1").value;
  const select2 = document.getElementById("select2").value;
  const description = document.getElementById("description");

  if (select1 === "" && select1 !== "Categorie") {
    alert("Categorie, is required");
    return false;
  }
  if (title === "") {
    alert("Title, iis required");
    return false;
  }
  if (date === "") {
    alert("Date, is required");
    return false;
  }
  if (description.value === "") {
    alert("Description, is required");
    return false;
  }
  if (select2 === ""  && select2 !== "Status") {
    alert("Status, is required");
    return false;
  }

  return true;
}

function showData() {
  var arrayTask;
  if (localStorage.getItem("arrayTask") == null) {
    arrayTask = [];
  } else {
    arrayTask = JSON.parse(localStorage.getItem("arrayTask"));
  }

  const addItem = document.querySelector("tbody");
  addItem.innerHTML = "";
  arrayTask.forEach((element, index) => {
    addItem.innerHTML += `
        <tr class="tr" onclick ="seeDesciption(${index})">
            <td>${element.id}</td>
            <td>${element.date}</td>
            <span ><td>${element.title}</td></span>
            <td>${element.select1}</td>
            <td class="icons d-flex gap-3">
                <span onclick=""><i class="bi bi-eye-slash" onclick = "seeInfo(${index})"></i></span>
                <span onclick="editData(${index})"><i class="bi bi-pencil-fill"></i></span>
                <span onclick="deleteData(${index})"><i class="bi bi-trash3"></i></span>
            </td>
        </tr>
        `;
  });
}

// all data when document or data loaded
document.onload = showData();

function addData() {
  if (valideInput() === true) {
    const select1 = document.getElementById("select1").value;
    const title = document.getElementById("title").value;
    const date = document.getElementById("date1").value;
    const select2 = document.getElementById("select2").value;
    const description = document.getElementById("description").value;

    alerts.classList.add("alert-contenainer-show");

    setTimeout(() => {
      alerts.classList.remove("alert-contenainer-show");
    }, 3000);

    var arrayTask;
    if (localStorage.getItem("arrayTask") == null) {
      arrayTask = [];
    } else {
      arrayTask = JSON.parse(localStorage.getItem("arrayTask"));
    }
    const tache = {
      id: id++,
      date: date,
      title: title,
      select1: select1,
      select2: select2,
      description: description,
    };

    

    arrayTask.push(tache);
    reArange(arrayTask);
    localStorage.setItem("arrayTask", JSON.stringify(arrayTask));

    // push item in chartjs
    updateChart()
    chart()
   /*  updateStatus(); */

    showData();

    document.getElementById("select1").value = "";
    document.getElementById("title").value = "";
    document.getElementById("date1").value = "";
    document.getElementById("select2").value = "";
    document.getElementById("description").value = "";
    
    
  }
  //   clearChart();
  
}
/* window.addEventListener("load", ()=>{
    addData();
}) */
// function to delete Data form local storage

function updateChart(){
    let arrayTask;
    if(localStorage.getItem("arrayTask") == null){
        arrayTask = []
    }else{
        arrayTask = JSON.parse(localStorage.getItem("arrayTask"));
    }
    console.log(arrayTask);
     terminer = 0;
     nouveau = 0;
     cour = 0;
    arrayTask.forEach(el =>{
        if (el.select2 === "Terminer") {
            terminer++;
          }
          if (el.select2 === "Nouveau") {
            nouveau++;
          }
          if (el.select2 === "Cour") {
            cour++;
          } 
    })    

}


function deleteData(index) {
  var arrayTask;
  if (localStorage.getItem("arrayTask") === null) {
    arrayTask = [];
  } else {
    arrayTask = JSON.parse(localStorage.getItem("arrayTask"));
  }
  arrayTask.splice(index, 1);
  reArange(arrayTask);
  descriptionTitre.innerText = ""
  localStorage.setItem("arrayTask", JSON.stringify(arrayTask));
  document.location.reload()
  showData();
}

// function to delete Data form local storage
function editData(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";
  var arrayTask;
  if (localStorage.getItem("arrayTask") === null) {
    arrayTask = [];
  } else {
    arrayTask = JSON.parse(localStorage.getItem("arrayTask"));
  }
  const date = (document.getElementById("date1").value = arrayTask[index].date);
  const title = (document.getElementById("title").value =
    arrayTask[index].title);
  const select1 = (document.getElementById("select1").value =
    arrayTask[index].select1);
  const select2 = (document.getElementById("select2").value =
    arrayTask[index].select2);
  const description = (document.getElementById("description").value =
    arrayTask[index].description);

  document.querySelector("#update").onclick = function () {
    if (valideInput() === true) {
      arrayTask[index].select2 = document.getElementById("select2").value;
      arrayTask[index].date = document.getElementById("date1").value;
      arrayTask[index].title = document.getElementById("title").value;
      arrayTask[index].select1 = document.getElementById("select1").value;
      arrayTask[index].description =
        document.getElementById("description").value;

      localStorage.setItem("arrayTask", JSON.stringify(arrayTask));
      updateChart()
        chart()
      showData();
     

      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";

      document.getElementById("select1").value = "";
      document.getElementById("title").value = "";
      document.getElementById("date1").value = "";
      document.getElementById("select2").value = "";
      document.getElementById("description").value = "";

      alerts1.classList.add("alert-contenainer-show1");

      setTimeout(() => {
        alerts.classList.remove("alert-contenainer-show1");
      }, 3000);

     
    }
  };
  
}

function seeDesciption(index) {
  let arrayTask;
  console.log(index);
  if (localStorage.getItem("arrayTask") === null) {
    arrayTask = [];
  } else {
    arrayTask = JSON.parse(localStorage.getItem("arrayTask"));
  }
  descriptionTitre.innerText = arrayTask[index].description;
}

function seeInfo(index) {
  const information = document.querySelector("#descrition-alert");
  var arrayTask;
  if (localStorage.getItem("arrayTask") === null) {
    arrayTask = [];
  } else {
    arrayTask = JSON.parse(localStorage.getItem("arrayTask"));
  }
  information.innerHTML = `
    <div class="descrition-alert">
    <p class="tittle1 text-center"> Information Tache</p>
    
    <div class="information">
        <div class="d-flex gap-5"><span class="colorText">Date</span> <span>${arrayTask[index].date}</span></div>
        <div class="d-flex gap-5"><span class="colorText">Titre</span> <span>${arrayTask[index].title}</span></div>
        <div class="d-flex gap-5"><span class="colorText">Categorie</span> <span>${arrayTask[index].select1}</span></div>
        <div class="d-flex gap-5"><span class="colorText">Description</span> <span>${arrayTask[index].description}</span></div>
        <div class="d-flex gap-5"><span class="colorText">Statut</span> <span>${arrayTask[index].select2}</span></div>
    </div>

</div>
    `;
   let result = information.classList.toggle("none");
   if(result){
    information.style.display = "block";
   }else{
    information.style.display = "none";
   }
}


function updateStatus() {
  localStorage.setItem("terminer", JSON.stringify(countTerminer));
  localStorage.setItem("nouveau", JSON.stringify(countNoueau));
  localStorage.setItem("cour", JSON.stringify(countCours));
}

updateChart();



// chat
let chartVar;
function chart(){
const ctx = document.getElementById("myChart");

if(chartVar){
    chartVar.destroy();
}

chartVar = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Cour", "Terminer", "Nouveau"],
    datasets: [
      {
        data: [cour, terminer, nouveau],
        backgroundColor: [
          "hsl(155, 20%, 67%)",
          "hsl(60, 1%, 56%)",
          "hsl(34, 94%, 87%)",
        ],
        borderWidth: 1,
      },
    ],
  },
  option: {
    circumference: 360,
    rotation: 360,
    cutout: 0,
  },
});
}
chart()