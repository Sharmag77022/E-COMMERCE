document.addEventListener('DOMContentLoaded',()=>{
    const msg=document.getElementById('msg');
    const cartBtn = document.querySelector(".cart");
    cartBtn.addEventListener('click',(event)=>{
     const pId = cartBtn.id;
     fetch('/user/addToCart?pId='+pId,{
        method:'GET',
            credentials: "same-origin",
        }).then(res=>{
            return res.json();
            }
        ).then(data=>{
            //console.log(data);
            const div=document.createElement('div');
            div.classList.add('alert','alert-info',"bg-warning",'lead');
            div.innerHTML=data.msg;
            msg.appendChild(div);
            setTimeout(function()
            {
                msg.removeChild(div);
             }, 2000);
        }).catch(err=>{
            const div=document.createElement('div');
            div.classList.add('alert','alert-info',"bg-warning",'lead');
            div.innerHTML="There is some problem in adding Product in cart";
            msg.appendChild(div);
            setTimeout(function()
            {
                msg.removeChild(div);
             }, 2000);
        })
     
    })
})