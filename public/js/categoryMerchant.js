document.addEventListener('DOMContentLoaded',()=>{
    const select = document.getElementById('selectCat');
    const submitSubCat = document.getElementById('submitsubcat');
    const newSubCat= document.getElementById('newSubCat');
    fetch('/merchant/allcats',{
        credentials: "same-origin",
        method: 'GET'
    }).then((res)=>{
        return res.json();
    }).then((cats)=>{
       for(let i=0;i<cats.length;i++){
           //for select element
        var option = document.createElement('option');
        option.setAttribute('value',cats[i]._id);
        option.innerHTML=cats[i].name;
        select.appendChild(option);
       }
    }).catch((err)=>{
        console.log(err);
    })
    //submit sub category Request
    //////////////////////////////////
    ///////////////////////////////////
    submitSubCat.addEventListener('click',(event)=>{
        event.preventDefault();
        if(newSubCat.value.length>=1){
            fetch('/merchant/catRequest',{
                credentials: "same-origin",
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    PId: selectCat.value,
                    name: newSubCat.value
                })
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                newSubCat.value="";
                //console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
        }

    })
})