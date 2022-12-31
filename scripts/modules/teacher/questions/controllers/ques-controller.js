import { fn } from "../../../../shared/services/generator.js";
import { questionOperations } from "../services/question-operations.js";

// DOM 
window.addEventListener('load', init);
function init(){
    printAutoNumber();
    bindEvents();
}
function bindEvents(){
    document.querySelector('#add').addEventListener('click', addQuestion);
}
const fields = ["id", "name", "optionA","optionB","optionC","optionD","rightAns","score"];
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

function printQuestion(questionObject){
    const tbody = document.querySelector('#questions');
    const tr = tbody.insertRow();
    for(let key in questionObject){
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

}

function edit(){
    console.log('Edit Who I am ', this);
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