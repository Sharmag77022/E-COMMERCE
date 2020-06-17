document.addEventListener('DOMContentLoaded',()=>{

const LoginForm = document.getElementById('loginForm');
 LoginForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    
    const formData = new FormData(event.target);
    //console.log("sanju sharma");
    let jsonForm = await f2Json(formData);
    console.log(jsonForm);
    fetch('/login',{
        method: 'post',
        headers:{
            'Content-type' : 'application/json'
        },
        body: jsonForm
    }).then((response)=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    })
 })
function f2Json(formData)
    {
    let obj = {};
    for(let key of formData.keys()){
        //console.log(key,formData.get(key));
        obj[key] = formData.get(key);
       
    }
    return JSON.stringify(obj);
    }

    
})


