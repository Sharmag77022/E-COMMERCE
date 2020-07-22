document.addEventListener('DOMContentLoaded',()=>{
    const select = document.getElementById('selectCat'); 
    const selectSubCat = document.getElementById('selectSubCat'); 
    //fetching all categories
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
       // option.setAttribute('id',cats[i].name);
        option.innerHTML=cats[i].name;
        select.appendChild(option);
       }
    }).catch((err)=>{
        console.log(err);
    })
    //Sub Categories
    
    select.addEventListener('change',(event)=>{
        selectSubCat.innerHTML="";
        var op = document.createElement('option');
        op.innerHTML="Select Sub Category";
        selectSubCat.appendChild(op);
       fetch('/merchant/allSubCats',{
        credentials: "same-origin",
        method: 'Post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            PId: selectCat.value
        })
    }).then((res)=>{
        return res.json();
    }).then((cats)=>{
       for(let i=0;i<cats.length;i++){
        var option = document.createElement('option');
        option.setAttribute('value',cats[i]._id);
        option.innerHTML=cats[i].name;
        selectSubCat.appendChild(option);
       }
    }).catch((err)=>{
        console.log(err);
    }) 
  })
    
    
})