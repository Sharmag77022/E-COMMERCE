document.addEventListener('DOMContentLoaded',()=>{
    const remove = document.getElementById('productList');
    const subTotal = document.getElementById('subTotal');
    
    productList.addEventListener('click',(event)=>{
        const card = event.target.parentNode.parentNode.parentNode;
        const crt= document.querySelector('#new1');
        const cartBadge=crt.childNodes[1].childNodes[0];
        const cartQuantity = parseInt(cartBadge.textContent);
       // console.log(cartBadge);
        const pId = event.target.id;
        if(event.target.classList.contains('remove')){
            sAmount=parseInt(subTotal.textContent);
            const price=parseInt(event.target.parentNode.parentNode.childNodes[3].childNodes[3].textContent);
        fetch('/user/removeCart?pId='+pId,{
            method:'GET',
            credentials:'same-origin'
        }).then(res=>{
            console.log(res.status);
            if(res.status==200){
                return res.json();
            }
        }).then(data=>{
            if(data){
            console.log(data);
            subTotal.innerHTML=sAmount-data.quantity*price;
            card.parentNode.removeChild(card);
            cartBadge.innerHTML=cartQuantity - data.quantity;
            }
        }).catch(err=>{
            console.log(err);
        })
     }
    })
})