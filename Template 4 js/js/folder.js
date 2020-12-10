//Local Storage for main color

let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {

    document.documentElement.style.setProperty("--main-color", mainColors);

    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");


        if (element.dataset.color === mainColors) {
            element.classList.add("active")
        }
    });



};

let backgroundOption = true;

let bakgroundInterval;

//Local Storage For background Colors


let backgroundLocalItem = localStorage.getItem("background-option");



if (backgroundLocalItem !== null) {


    //Remove Active Class From All Spans

    document.querySelectorAll(".optionBackRandom span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === "true") {
        backgroundOption = true;

        document.querySelector(".optionBackRandom .yes").classList.add("active")



    } else {
        backgroundOption = false;

        document.querySelector(".optionBackRandom .no").classList.add("active")


    }





};

//Local Storage For bullets


let bulletLocalItem = localStorage.getItem("displayCase");

let bulletsContainer = document.querySelector(".nav-bullets");

if (bulletLocalItem !== null) {

    document.querySelectorAll(".bullets-option span").forEach(element => {
        //Remove Acive Class From All Buttons 
        element.classList.remove("active");
    });


    if (bulletLocalItem === "block") {

        //Show Bullets
        bulletsContainer.style.display = "block";

        //Add Active Class To "Yes" Button
        document.querySelector(".bullets-option .yes").classList.add("active")

    } else {

        // hide bullets
        bulletsContainer.style.display = "none";

        // Add Active Class to "No" Button
        document.querySelector(".bullets-option .no").classList.add("active")

    }





};

// Toggle Spin Class on Icon

document.querySelector('.setting-box .fa-gear').onclick = function() {
    this.classList.toggle("fa-spin");
    document.querySelector('.setting-box').classList.toggle("open-setting")
}


//Switch Colors 
const colorsLi = document.querySelectorAll(".colors-list li");

//change the main color when choose it from the opion colors

colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        //Set Color in Local Storage
        localStorage.setItem("color-option", e.target.dataset.color);

        // handle Active Class when click
        handleActive(e);




    })
});

//Switch background randomly
const backgroundRandomOption = document.querySelectorAll(".optionBackRandom span");

//change the main color when choose it from the opion colors

backgroundRandomOption.forEach(span => {

    span.addEventListener("click", (e) => {

        // handle Active Class when click
        handleActive(e);

        if (e.target.dataset.background == "yes") {

            backgroundOption = true;

            localStorage.setItem("background-option", true);

            randomizeImgs()




        } else {
            backgroundOption = false;

            localStorage.setItem("background-option", false);

            clearInterval(bakgroundInterval)
        }


    })
});



// Select Landing Page Element

let landingPage = document.querySelector(".landing-page");

// create Images Array
let imagesArray = ["image-1.jpg", "image-2.jpg", "image-3.jpg", "image-4.jpg", "image-5.jpg"];

// background Random option

function randomizeImgs() {

    if (backgroundOption === true) {

        bakgroundInterval = setInterval(function() {

            //Get Random Number

            let randomNumber = Math.floor(Math.random() * imagesArray.length);

            // change URL Randomly

            landingPage.style.backgroundImage = `url("images/${imagesArray[randomNumber]}")`

        }, 10000)
    }
};
randomizeImgs();

// Select Skills Selector

let ourSkills = document.querySelector(".our-skills");

window.onscroll = function() {

    //Skills Offset Top

    let skillsOffsetTop = ourSkills.offsetTop;
    // console.log(skillsOffsetTop);

    // Outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight;

    // console.log(skillsOuterHeight);

    // Window Height

    let windowHeight = window.innerHeight

    //window scroll top

    let windowScrollTop = window.pageYOffset;


    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".our-skills .skill-progress span");

        // set the width  for each skill

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    };
}

// Create  popup imagrs in he gallery

let galleryImages = document.querySelectorAll(".gallery .image-box img");

galleryImages.forEach(img => {

        img.addEventListener("click", (e) => {

            // Create Overlay Element 

            let overlay = document.createElement("div");

            overlay.className = "popup-overlay";

            document.body.appendChild(overlay);

            //Creat Popup Box
            let popupBox = document.createElement("div");

            //Add Class to popup Box
            popupBox.className = "popup-box";

            if (img.alt !== null) {
                // create Heading
                let ImgHeading = document.createElement("h4");

                let HeadingText = document.createTextNode(img.alt);

                ImgHeading.appendChild(HeadingText);

                popupBox.appendChild(ImgHeading);



            }



            // Creat Popup Image
            let popupImage = document.createElement("img");

            //set Image src
            popupImage.src = img.src;

            //Append the popup Image to he popup Box
            popupBox.appendChild(popupImage);

            //Append the popip box to the body
            document.body.appendChild(popupBox);




            // create the close button
            let closeButton = document.createElement("span");

            let closeText = document.createTextNode("X");

            closeButton.appendChild(closeText);

            closeButton.className = "close-button";

            popupBox.appendChild(closeButton);

        });
    })
    // close popup

document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {

        // close the current popup

        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove()
    }
});

// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select all Links
let allLinks = document.querySelectorAll(".links a");


// scroll to a section when click its link
function scollToElement(elements) {

    elements.forEach(element => {
        element.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    });
};
scollToElement(allBullets);
scollToElement(allLinks);

//Handle Active  Statue

function handleActive(eve) {
    //Remove Class Active from All Children

    eve.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    // Add Class Active to the Clickable Element itself

    eve.target.classList.add("active");


}



// choose Bullets Spans 
let bulletsSpan = document.querySelectorAll(".bullets-option span");




bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        if (span.dataset.display == "show") {
            bulletsContainer.style.display = "block";

            localStorage.setItem("displayCase", "block")

        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("displayCase", "none")

        }

        handleActive(e)

    })
});

//Reset Local Storage

document.querySelector(".reset-options").onclick = function() {
    localStorage.clear();

    window.location.reload();
}

// toggle menu

let toggleButton = document.querySelector(".toggle-menu ");

let theList = document.querySelector(".header-area .links");

toggleButton.onclick = function(e) {



    e.stopPropagation();

    this.classList.toggle("menu-active");

    theList.classList.toggle("open");


}


document.addEventListener("click", function(e) {
    if (e.target !== toggleButton && e.target !== theList) {

        if (theList.classList.contains("open")) {
            toggleButton.classList.toggle("menu-active");

            theList.classList.toggle("open");


        }

    }
})

//Stop Propagation on menu
theList.onclick = function(e) {
    e.stopPropagation();

}