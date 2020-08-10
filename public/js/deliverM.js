document.addEventListener('DOMContentLoaded',()=>{
    const orders = document.getElementById('orders');
    orders.addEventListener('click',(event)=>{
        //console.log(event.target);
        if(event.target.classList.contains('yes')){
            var id=event.target.id;
            var targetRow = event.target.parentNode.parentNode;
            //console.log(targetRow.parentNode)
            fetch('/merchant/orderD',{
                method:'POST',
                credentials: "same-origin",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oId: id,
                    flag:3
                })
            }).then(res=>{
                if(res.status==200){
                    targetRow.parentNode.removeChild(targetRow);
                }
            })
        }
    
    
    })
    })