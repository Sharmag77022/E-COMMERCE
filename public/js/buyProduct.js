document.addEventListener('DOMContentLoaded',()=>{
    const buyBtn = document.querySelector(".buy");
    buyBtn.addEventListener('click',(event)=>{
     const pId = buyBtn.id;
     fetch('/user/buy?pId='+pId,{
        method:'GET',
            credentials: "same-origin",
        }).then(res=>{
            if(res.status==200){
             console.log('hello')
            }
        }).catch(err=>{
            console.log(err);
        })
     
    })
})