import {collection, addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import {db} from '../../../../shared/settings/firebase-config.js';
import { Question } from '../models/question-model.js';
import { questionOperations } from './question-operations.js';
export const questionCrud = {
    async add(question){
        const docRef = await addDoc(collection(db,'questions'),question )
        return docRef;
    },
    async read(){
            const querySnapShot = await getDocs(collection(db, 'questions'));
            querySnapShot.forEach((doc)=>{
                    const obj = doc.data();
                    questionOperations.add(obj);
            });
        }
}