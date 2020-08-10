document.addEventListener('DOMContentLoaded',()=>{
const orders = document.getElementById('orderRequests');
orderRequests.addEventListener('click',(event)=>{
    //console.log(event.target);
    //Accept Order
    if(event.target.classList.contains('accept')){
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
                flag:1
            })
        }).then(res=>{
            if(res.status==200){
                targetRow.parentNode.removeChild(targetRow);
            }
        })
    }
    //Reject Order
    if(event.target.classList.contains('reject')){
        var id=event.target.id;
        var targetRow = event.target.parentNode.parentNode;
        fetch('/merchant/orderD',{
            method:'POST',
            credentials: "same-origin",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oId: id,
                flag:2
            })
        }).then(res=>{
            if(res.status==200){
                targetRow.parentNode.removeChild(targetRow);
            }
        })
    }
})
})