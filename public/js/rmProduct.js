document.addEventListener('DOMContentLoaded',()=>{
    const products = document.getElementById('pContainer');
    pContainer.addEventListener('click',(event)=>{
        if(event.target.classList.contains('remove')){
            var id = event.target.id;
            var targetCard =event.target.parentNode.parentNode.parentNode;
            fetch('/merchant/pRemove?pId='+id,{
               method:'GET',
               credentials:'same-origin' 
            }).then(res=>{
                if(res.status==200){
                    targetCard.parentNode.parentNode.removeChild(targetCard.parentNode);
                }
            })
        }
    })
})