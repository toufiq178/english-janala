

const createElement = (arr) => {

    const htmlElements = arr.map(elem => `<span class=" rounded-md  p-2  bg-[#1a90ff10]">${elem}</span>`)
    return htmlElements.join(" ")
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const removeHidden = (status) => {

    if (status == true) {
        
        document.getElementById("loading-container").classList.remove("hidden");
        document.getElementById("cards-section").classList.add("hidden");
    } else{

        document.getElementById("cards-section").classList.remove("hidden");
        document.getElementById("loading-container").classList.add("hidden");

        return
    }
}



const loadLesson = () => {
    
    const url = ("https://openapi.programming-hero.com/api/levels/all")
    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data))
}

const loadWord= (id) =>{

     removeHidden(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then((res) => res.json())
    .then((data) =>{

        removeActive()
        const clickBtn = document.getElementById(`lesson-Btn-${id}`)
        // console.log(clickBtn);
        clickBtn.classList.add("active")
        displayWord(data.data)
    })
    
}


const removeActive = () => {

    const lessonBtn = document.querySelectorAll(".lesson-btn");
    // console.log(lessonBtn);

    lessonBtn.forEach(btn => {
        
        btn.classList.remove('active')
    });
    
    

}



const loadDetailWord = async(id) => {

    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const detail = await res.json();
    displayDetails(detail.data);
    

}




// "status": true,
// "message": "successfully fetched a word details",
// "data": {
// "word": "Tranquil",
// "meaning": "শান্ত / নিরিবিলি",
// "pronunciation": "ট্রাঙ্কুইল",
// "level": 6,
// "sentence": "The park was a tranquil place to relax.",
// "points": 4,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "peaceful",
// "calm",
// "serene"
// ],
// "id": 20
// }
// }






const displayDetails = (word) => {

    // console.log(word);
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML =` 

                <h1 class="text-4xl font-semibold ">${word.word} <span>(<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</span></h1>
                
                <div class="">
                    <p class="text-2xl font-semibold">Meaning</p>
                    <p class="text-2xl font-medium font-bangla">${word.meaning}</p>
                </div>
                <div class="">
                    <p class="text-2xl font-semibold">Example</p>
                    <p class="text-2xl">${word.sentence}</p>
                </div>
                <div class="">
                    <p class="text-2xl font-medium font-bangla">সমার্থক শব্দ গুলো</p>
                    <div class="mt-3" >
                        
                        ${createElement(word.synonyms)}
                    </div>
                </div>
                <button class="btn btn-primary">Complete Learning</button>

     `
    document.getElementById("my_modal_5").showModal()
}

const displayWord = (words) => {

    

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""

    if (words.length == 0) {
        
        cardContainer.innerHTML = `
        
            <div class="text-center py-20 space-y-5 col-span-full">

                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="font-bangla text-xl text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-bangla font-medium text-4xl text-[#292524]">নেক্সট Lesson এ যান</h1>
            </div>

        `

         removeHidden(false);
        return
    }

    words.forEach(word => {
        
         removeHidden(true);
        const card = document.createElement("div");
        card.innerHTML = `

            <div class="card bg-base-100 shadow-sm p-5">
                
                <div class="card-body items-center text-center ">
                    <h2 class="font-bold text-2xl">${word.word ? word.word : "Not Found /"}</h2>
                    <p class="font-semibold">Meaning /Pronounciation</p>
                    <div class="font-bangla text-2xl font-medium text-[#18181B]">"${word.meaning ? word.meaning : "Not Found /"} ${word.pronunciation ? word.pronunciation : "Not Found /"}"</div>

                </div>
                
                <div class="flex justify-between ">
                    <button onclick="loadDetailWord(${word.id})" class="btn  text-[#374957] bg-[#1a90ff10] hover:bg-[#1a90ff80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn text-[#374957] bg-[#1a90ff10] hover:bg-[#1a90ff80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        
        `
        cardContainer.append(card);
      
    });

     removeHidden(false);
}



const displayLessons = (lessons) => {

    const lessonsContainer = document.getElementById("lesson-container");
    lessonsContainer.innerHTML = "";

    for(const lesson of lessons){

        // console.log(lesson);
        
        // console.log(lesson);

        const  btnDiv = document.createElement('div');
        btnDiv.innerHTML = `

            <button id ="lesson-Btn-${lesson.level_no}" 
            onclick ="loadWord(${lesson.level_no})" 
            class = "btn btn-primary btn-outline lesson-btn">
            <i class="fa-solid fa-book-open"></i> 
            Lesson ${lesson.level_no}</button>
        
        `
        lessonsContainer.append(btnDiv)
    }
}

loadLesson()





document.getElementById("search-btn").addEventListener("click",() => {

    removeActive()

    const inputSearch = document.getElementById("search-input");
    const searchValue = inputSearch.value.toLowerCase().trim()
    // console.log(searchValue);
    
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
        
        const allWord = data.data ;
        // console.log(allWord);
        
        const filterWord = allWord.filter(word => word.word.toLowerCase().includes(searchValue))
        // console.log(filterWord);
        displayWord(filterWord)
    })

})