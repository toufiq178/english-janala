const loadLesson = () => {
    
    const url = ("https://openapi.programming-hero.com/api/levels/all")
    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data))
}

const loadWord= (id) =>{

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
        return
    }

    words.forEach(word => {
        
        const card = document.createElement("div");
        card.innerHTML = `

            <div class="card bg-base-100 shadow-sm p-5">
                
                <div class="card-body items-center text-center ">
                    <h2 class="font-bold text-2xl">${word.word ? word.word : "Not Found /"}</h2>
                    <p class="font-semibold">Meaning /Pronounciation</p>
                    <div class="font-bangla text-2xl font-medium text-[#18181B]">"${word.meaning ? word.meaning : "Not Found /"} ${word.pronunciation ? word.pronunciation : "Not Found /"}"</div>

                </div>
                
                <div class="flex justify-between ">
                    <button class="btn  text-[#374957] bg-[#1a90ff10] hover:bg-[#1a90ff80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn text-[#374957] bg-[#1a90ff10] hover:bg-[#1a90ff80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        
        `
        cardContainer.append(card);
        
    });
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