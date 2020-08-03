document.addEventListener('DOMContentLoaded',()=>{
    const remove = document.querySelector('.remove');
    document.addEventListener('click',(event)=>{
        const pId = remove.id;
        fetch('/user/removeCart?pId='+pId,{
            method:'GET',
            credentials:'same-origin'
        }).then(res=>{
            if(res.status=200){
                console.log('success');
            }else{
                console.log('fail');
            }
        })
    })
})