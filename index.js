import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://endorsement-poster-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const postsInDB = ref(database, "posts")


const textArea = document.getElementById("input-field")
const publishBtn = document.getElementById("publish-btn")
const endorsementsList = document.getElementById("endorsements-list")
const inputSender = document.getElementById("sender")
const inputReciever = document.getElementById("reciever")

function clearInputField(){
    textArea.value = ""
}

function appendPostToList(input){
    endorsementsList.innerHTML += `
        <li>
            <div class="endorsement">
            <span> To ${input.to}<span>
            <br>
                <p>
                ${input.post}
                </p>
                <br>
                <span>From ${input.from}<span>
            </div>
        </li>
    ` 
}

publishBtn.addEventListener("click",()=>{
    let textAreaValue = textArea.value
    if (textAreaValue !=""){
        const postObj ={
            from:inputSender.value,
            to: inputReciever.value,
            post:textAreaValue
        }
        push(postsInDB, postObj)
    }
    else{
        console.log("Write an endorsement")
    }
    clearInputField()
})

onValue(postsInDB, function(snapshot){
        const postsArrayObj = Object.values(snapshot.val())
        const postID = Object.keys(snapshot.val())
        
        for(let i=0; i<postsArrayObj.length; i++){
            appendPostToList(postsArrayObj[i])
        }
        
})



//
