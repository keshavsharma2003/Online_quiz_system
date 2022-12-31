// Represent Question Object 
// Class means creating a new type
// Es6 Class Support
export class Question{
    constructor(testName="", id=0, name="" , optionA="", optionB="" , optionC="", optionD="", rightAns="", score=0){
        this.id = id;
        this.name = name;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.rightAns = rightAns;
        this.score = score;
        this.testName = testName;
        this.isMarked = false; // UnMark 
    }
}