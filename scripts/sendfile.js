const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput= document.querySelector("#fileInput");
const baseURL = "http://localhost:3000";
// const baseURL = "https://inshare-file-sharing.onrender.com";
const uploadURL = `${baseURL}/api/files`;
const emailUrl = `${baseURL}/api/files/send`;

const progressContainer = document.getElementsByClassName("progress-container")[0];
const bgProgress= document.getElementsByClassName("bg-progress")[0];
const progressBar= document.getElementsByClassName("progress-bar")[0];


const percentDiv =document.getElementById("percent");

const linkUrl= document.getElementById("linkUrl");

const sharingContainer = document.querySelector(".sharing-container");

const copyBtn= document.getElementById("copyBtn");

const emailForm = document.querySelector("#form");

const Toast = document.querySelector(".toast");

dropZone.addEventListener("dragover", (e)=>{

    e.preventDefault();
    // console.log(dropZone.classList)
    if(!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");
    }
});


dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    console.log(e);
    
    const files = e.dataTransfer.files;
    // console.log(files.length);
    console.table(files);
    if(files.length){
        // console.log("TRue");
        fileInput.files= files;
    }
    // else{
    //     console.log(files.length+" provide atleast one file");
    // }
    uploadFile();
   
})
fileInput.addEventListener("change",()=>{
    // console.table(fileInput.files)
    uploadFile();
})

dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
})

browseBtn.addEventListener("click",()=>{
    fileInput.click();
})

const uploadFile=()=>{ 
    progressContainer.style.display="block";
    file=fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile",file);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange= function(){ 
        if(xhr.readyState==XMLHttpRequest.DONE){
           console.log(xhr.response);
           showtoast("file uploaded!")
           showLink(JSON.parse(xhr.response));
        }
    }  
    // updateProgress;
    xhr.upload.onprogress=(e)=>{
        const percent = (e.loaded/e.total)*100;
        // console.log(percent);
        bgProgress.style.width=`${percent}%`;
        progressBar.style.width=`${percent}%`;
        percentDiv.innerText= Math.round(percent);
    }
    

    xhr.open("POST",uploadURL);
    xhr.send(formData); 

    
}

copyBtn.addEventListener('click',()=>{
    linkUrl.select();
    document.execCommand('copy')
    showtoast("copied to clipboard!");
})


const showLink=({file:url})=>{
     console.log(url);
     fileInput.value="";
     progressContainer.style.display="none";
     bgProgress.style.width=`${0}%`;
     progressBar.style.width=`${0}%`;
     sharingContainer.style.display="block";
    emailForm[2].removeAttribute("disabled");

     linkUrl.value= url;
}


emailForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const url = linkUrl.value.split('/').splice(-1,1)[0];
    const formData={
        uuid:url,
        emailFrom:emailForm.elements["fromEmail"].value,
        emailTo:emailForm.elements["toEmail"].value
    }

    emailForm.elements["fromEmail"].value="";
    emailForm.elements["toEmail"].value="";
    emailForm[2].setAttribute("disabled","true");
    console.table(formData);

    fetch(emailUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/JSON"
        },
        body: JSON.stringify(formData)
    }).then(response=>response.json()).then(({success})=>{
        if(success){
            sharingContainer.style.display="none";
        }
    })

    showtoast("Email sent");
})
let tostTimer;
const showtoast=(msg)=>{
    Toast.innerText=msg;
    Toast.classList.add("show");

   toastTimer= setTimeout(()=>{
    Toast.classList.remove("show");

    },2000)
}
