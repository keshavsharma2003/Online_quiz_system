import { fn } from "../../../../shared/services/generator.js";
import { questionOperations } from "../services/question-operations.js";
import { questionCrud } from "../services/question-crud.js";

// DOM 
window.addEventListener('load', init);
function init(){
    printAutoNumber();
    bindEvents();
    disableButtons();
}
function bindEvents(){
    document.querySelector('#add').addEventListener('click', addQuestion);
    document.querySelector('#delete').addEventListener('click', removeQuestions);
    document.querySelector('#update').addEventListener('click', updateQuestion);
    document.querySelector('#save').addEventListener('click', saveQuestions);
    document.querySelector('#load').addEventListener('click', loadQuestions);
    document.querySelector('#save-db').addEventListener('click', saveToDB);
    document.querySelector('#load-db').addEventListener('click', loadFromDB);
}
function disableButtons(){
    document.querySelector('#delete').disabled = true;
    document.querySelector('#update').disabled = true;
}

function removeQuestions(){
    questionOperations.remove();
    printQuestions();
    showCounts();
}
function updateQuestion(){
    for(let key in questionObjectForUpdate){
        if(key ==="isMarked"){
            continue;
        }
        questionObjectForUpdate[key]=document.querySelector(`#${key}`).value;
    }
    printQuestions();
    showCounts();
}

function  saveQuestions(){
    if(window.localStorage){
        localStorage.questions = JSON.stringify(questionOperations.getAllQuestions());
        alert("Data Saved...");
    }
    else{
        alert("Outdated Browser no support of storage...");
    }
}

function loadQuestions(){
    if(window.localStorage){
        if(localStorage.questions){
            const questions = JSON.parse(localStorage.questions);
            for(let question of questions){
                questionOperations.add(question);
            }
            printQuestions();
            showCounts();
        }
        else{
            alert("NO data to Load...");
        }
    }
    else{
        alert("Outdated Browser no support of storage...");
    }
}

async function saveToDB(){
    for(let question of questionOperations.getAllQuestions()){
        const obj = {};
        for(let key in question){
           if(key === 'isMarked'){
            continue;
           }
            obj[key] = question[key];
            
         }
         const dbRef = await questionCrud.add(obj);
            console.log('Saved to DB ', dbRef);
    }
    alert("Saved to DB....");
}

async function loadFromDB(){
    await questionCrud.read();
    printQuestions();
    showCounts();
}

const fields = ["id", "testName" ,"name", "optionA","optionB","optionC","optionD","rightAns","score"];
function addQuestion(){
    const questionObject= {}; // Object Literal
    for(let field of fields){
        let value = document.querySelector(`#${field}`).value;
        questionObject[field] = value;
    }
    console.log('Question Object is ', questionObject);
    console.log('Type of ', typeof questionObject, ' Instance of ', questionObject instanceof Object);
    questionOperations.add(questionObject);
    printQuestion(questionObject);
    printAutoNumber();
    showCounts();
    // Read all the fields
    // DRY
    // document.querySelectorAll(".form-control")
    // let name = document.querySelector('#name').value;
    // let id = document.querySelector('#id').value;
    // let optionA = document.querySelector('#option-a').value;
}

function showCounts(){
    document.querySelector('#total').innerText = questionOperations.getSize();
    // Marked 
    document.querySelector('#mark').innerText = questionOperations.countMark();
    // UnMarked
    document.querySelector('#unmark').innerText = questionOperations.countUnMarked();
}

function printQuestions(){
    const tbody=document.querySelector("#questions");
    tbody.innerHTML="";
    const questions=questionOperations.getAllQuestions();
    questions.forEach(printQuestion);
}

function printQuestion(questionObject){
    const tbody = document.querySelector('#questions');
    const tr = tbody.insertRow();
    for(let key in questionObject){
        if(key==="testName"||key==="isMarked"){
            continue;
        }
        const td = tr.insertCell();
        td.innerText = questionObject[key];
    }
    const tdForOperations = tr.insertCell();
    tdForOperations.appendChild(createIcon('trash me-2',toggleDelete, questionObject.id));
    tdForOperations.appendChild(createIcon('pen-to-square', edit, questionObject.id));
}

function printAutoNumber(){
    document.querySelector('#id').value = fn();
}

// this is a keyword , and it hold the current object reference
function toggleDelete(){
    console.log('Del Who I am  ', this.getAttribute('question-id'));
    const questionId  = this.getAttribute('question-id');
    questionOperations.toggleMark(questionId);
    const currentIcon = this;
    const tr = currentIcon.parentNode.parentNode;
    //tr.className = 'alert-danger';
    tr.classList.toggle('alert-danger');
    showCounts();
    if(questionOperations.countMark()>0)
    {
        document.querySelector("#delete").disabled=false;
    }
    else{
        document.querySelector("#delete").disabled=true;
    }
}
let questionObjectForUpdate;
function edit(){
    //console.log('Edit Who I am ', this);
    const questionId  = this.getAttribute('question-id');
    questionObjectForUpdate = questionOperations.search(questionId);
    for(let key in questionObjectForUpdate){
        if(key === 'testName' || key=== 'isMarked'){
            continue;
        }
        document.querySelector(`#${key}`).value = questionObjectForUpdate[key];
    }
    document.querySelector('#update').disabled = false;
}

function createIcon(className, callBackFn, questionId){
    // <i class="fa-solid fa-trash"></i>
    //<i class="fa-solid fa-pen-to-square"></i>
    const iconTag = document.createElement('i');
   // iconTag.id = questionId;
   iconTag.setAttribute('question-id', questionId); // Create Custom Attribute 
    iconTag.className = `fa-solid fa-${className} hand`;
    iconTag.addEventListener('click', callBackFn);
    return iconTag;
}
