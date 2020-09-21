// Navbar
const navTogglerBtn = document.querySelector(".toggler"),
      sidebar = document.querySelector(".sidebar");

navTogglerBtn.addEventListener("click", sideBarTogglerBtn)

function sideBarTogglerBtn(){
    sidebar.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
}

// Gallery
let galleryImages = document.querySelectorAll('.gallery-cell');
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

galleryImages.forEach(function(image, index){
    image.onclick = function(){

        getLatestOpenedImg = index + 1;
        
        let container = document.body;
        let newImgWindow = document.createElement('div');
        container.appendChild(newImgWindow);
        newImgWindow.setAttribute('class', 'img-window');
        newImgWindow.setAttribute('onclick', 'closeImg()');

        let newImg = image.firstElementChild.cloneNode();
        newImgWindow.appendChild(newImg);
        newImg.classList.remove('gallery-img');
        newImg.classList.add('popup-img');
        newImg.setAttribute('id', 'current-img');
        
        newImg.onload = function() {

            let newNextBtn = document.createElement('a');
            newNextBtn.innerHTML = '<i class="fas fa-chevron-right next"></i>';
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute('class', 'img-btn-next');
            newNextBtn.setAttribute('onclick', 'changeImg(1)');

            let newPrevBtn = document.createElement('a');
            newPrevBtn.innerHTML = '<i class="fas fa-chevron-left next"></i>';
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute('class', 'img-btn-prev');
            newPrevBtn.setAttribute('onclick', 'changeImg(0)');
        }
    }
})

function closeImg(){
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove();
}

function changeImg(change){
    document.querySelector('#current-img').remove();

    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img');
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(change === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){
            calcNewImg = 1;
        }
    }
    else if(change === 0){
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute('src', 'img/portfolio/liuriver-actor-headshot-' + calcNewImg + '.jpg');
    newImg.setAttribute('class', 'popup-img');
    newImg.setAttribute('id', 'current-img');

    getLatestOpenedImg = calcNewImg;
}

// Form
const name = document.querySelector('#name');
name.addEventListener('keyup', function(){

    const nameTick = document.querySelector('.nametick');
    const nameCross = document.querySelector('.namecross');
    
    if (name.value.length === 0 || name.value.length < 4){
        return false;
    } else {
        nameTick.style.visibility = 'visible';
        nameCross.style.visibility = 'hidden';
    }
})

const email = document.querySelector('#email');
email.addEventListener('keyup', function(){

    const emailTick = document.querySelector('.emailtick');
    const emailCross = document.querySelector('.emailcross');
    
    if (email.value.length === 0 || email.value.length < 6){
        return false;
    } else if(!validateEmail(email.value)){
        return false;
    } else {
        emailTick.style.visibility = 'visible';
        emailCross.style.visibility = 'hidden';
    }
})

const subject = document.querySelector('#subject');
subject.addEventListener('keyup', function(){

    const subTick = document.querySelector('.subtick');
    const subCross = document.querySelector('.subcross');
    
    if (subject.value.length === 0 || subject.value.length < 4){
        return false;
    } else {
        subTick.style.visibility = 'visible';
        subCross.style.visibility = 'hidden';
    }
})

const message = document.querySelector('#message');
message.addEventListener('keyup', function(){

    const msgTick = document.querySelector('.msgtick');
    const msgCross = document.querySelector('.msgcross');
    
    if (message.value.length === 0 || message.value.length < 4){
        return false;
    } else {
        msgTick.style.visibility = 'visible';
        msgCross.style.visibility = 'hidden';
    }
})

const form = document.querySelector('.contact-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const nameTick = document.querySelector('.nametick');
    const nameCross = document.querySelector('.namecross');
    const emailTick = document.querySelector('.emailtick');
    const emailCross = document.querySelector('.emailcross');
    const subTick = document.querySelector('.subtick');
    const subCross = document.querySelector('.subcross');
    const msgTick = document.querySelector('.msgtick');
    const msgCross = document.querySelector('.msgcross');

    if (name.value.length === 0 || name.value.length < 4){
        nameTick.style.visibility = 'hidden';
        nameCross.style.visibility = 'visible';
        return false;
    } else if (email.value.length === 0 || email.value.length < 6){
        emailTick.style.visibility = 'hidden';
        emailCross.style.visibility = 'visible';
        return false;
    } else if (!validateEmail(email.value)){
        emailTick.style.visibility = 'hidden';
        emailCross.style.visibility = 'visible';
        return false;
    } else if (subject.value.length === 0 || subject.value.length < 4){
        subTick.style.visibility = 'hidden';
        subCross.style.visibility = 'visible';
        return false;
    } else if (message.value.length === 0 || message.value.length < 4){
        msgTick.style.visibility = 'hidden';
        msgCross.style.visibility = 'visible';
        return false;
    } else { e.currentTarget.submit();
    }
})

function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email);
}
