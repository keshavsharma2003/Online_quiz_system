import { Question } from "../models/question-model.js"

// All the Operations on Question (CRUD Logic)
export const questionOperations = {
    questions : [],
    add(questionObject){
        const question = new Question(); // Single Question
        for(let key in question){
            question[key] = questionObject[key];
        }
        this.questions.push(question); // Array of objects
        console.log('Instance of Question', question instanceof Question);
        console.log('Instance of Question', questionObject instanceof Question);
    },
    getAllQuestions(){
        return this.questions;
    },
    getSize(){
        return this.questions.length;
    },
    remove(){
        this.questions=this.questions.filter(question=>!question.isMarked);
    },
    update(){
    
    },
    toggleMark(id){
        const questionObject = this.search(id);
        if(questionObject){
            questionObject.isMarked = !questionObject.isMarked;
        }
    },
    countMark(){
        return this.questions.filter(question=>question.isMarked).length;
    },
    countUnMarked(){
        return this.getSize() - this.countMark();
    },
   
    search(id){
        // Array Search by Id
        return this.questions.find(question=>question.id == id);
    },
    sort(){
    }
}