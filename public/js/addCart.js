document.addEventListener('DOMContentLoaded',()=>{
     
    const msg=document.getElementById('msg');
    const cartBtn = document.querySelector(".cart");
    cartBtn.addEventListener('click',(event)=>{
        const crt= document.querySelector('#new1');
        const cartBadge=crt.childNodes[1].childNodes[0];
     const pId = cartBtn.id;
     fetch('/user/addToCart?pId='+pId,{
        method:'GET',
            credentials: "same-origin",
        }).then(res=>{
            return res.json();
            }
        ).then(data=>{
            if(data.flag==0){
            const cartQuantity = parseInt(cartBadge.textContent);
            cartBadge.innerHTML=cartQuantity+1;
            }
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
            div.classList.add('alert','alert-info',"bg-warning",'lead','text-danger');
            div.innerHTML="! Please Login for cart services";
            msg.appendChild(div);
            setTimeout(function()
            {
                msg.removeChild(div);
             }, 2000);
        })
     
    })
})