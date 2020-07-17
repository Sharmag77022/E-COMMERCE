document.addEventListener('DOMContentLoaded',()=>{
    const newCat = document.getElementById('newCat');
    const newSubCat= document.getElementById('newSubCat')
    const selectCat =document.getElementById('selectCat');
    const submitCat = document.getElementById('submitcat');
    const submitSubCat = document.getElementById('submitsubcat');
    const categories = document.getElementById('allCats');
    const select = document.getElementById('selectCat')
    fetch('/admin/allcats',{
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
        //for table show
        var row = document.createElement('tr');
        var sNo = document.createElement("td");
        var cName = document.createElement("td");
        var enable = document.createElement("td");
        var anchor = document.createElement("a");
        anchor.setAttribute('href','#');
        row.setAttribute('id',cats[i]._id);
        if(cats[i].flag==1){
            anchor.classList.add("enabled");
            anchor.innerHTML='&#9745';
        }else{
            anchor.classList.add("disabled");
            anchor.innerHTML='&#9744;'
        }
        sNo.innerHTML=i+1;
        cName.innerHTML=cats[i].name;
        enable.appendChild(anchor);
        row.appendChild(sNo);
        row.appendChild(cName);
        row.appendChild(enable);
        categories.appendChild(row);

       }
    }).catch((err)=>{
        console.log(err);
    })
    submitCat.addEventListener('click',(event)=>{
        event.preventDefault();
        var target = event.target;
        if(newCat.value.length>=1){
            fetch('/admin/newcat',{
                credentials: "same-origin",
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: newCat.value
                })
            }).then(res=>{
                return res.json();
                
            }).then(data=>{
                    newCat.value=""
                    let index=categories.lastChild.childNodes[0].textContent;
                    if(isNaN(index)){
                        index=0;
                    }
                    var row = document.createElement('tr');
                    var sNo = document.createElement("td");
                    var cName = document.createElement("td");
                    var enable = document.createElement("td");
                    var anchor = document.createElement("a");
                    anchor.setAttribute('href','#');
                    row.setAttribute('id',data._id);
                    anchor.classList.add("enabled");
                    anchor.innerHTML='&#9745';
                    sNo.innerHTML=parseInt(index)+1;
                    cName.innerHTML=data.name;
                    enable.appendChild(anchor);
                    row.appendChild(sNo);
                    row.appendChild(cName);
                    row.appendChild(enable);
                    categories.appendChild(row);
                    //add category in select option
                    var option = document.createElement('option');
                    option.setAttribute('value',data._id);
                    option.innerHTML=data.name;
                    select.appendChild(option);
            }).catch(err=>{
                console.log(err);
            })
        }
    })
    submitSubCat.addEventListener('click',(event)=>{
        event.preventDefault();
        if(newSubCat.value.length>=1){
            fetch('/admin/newSubcat',{
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
categories.addEventListener('click',(event)=>{
    event.preventDefault();
    var target = event.target;
    let tRow = target.parentNode.parentNode;
    if(target.classList=='enabled'){
        fetch('/admin/toggleCategory',{
            method:'POST',
            credentials: "same-origin",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                catId: tRow.id,
                flag:0
            })
        }).then(res=>{
            if(res.status==200){
                target.className='disabled';
                target.innerHTML='&#9744;' 
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    if(target.classList=='disabled'){
        fetch('/admin/toggleCategory',{
            method:'POST',
            credentials: "same-origin",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                catId: tRow.id,
                flag:1
            })
        }).then(res=>{
            if(res.status==200){
                target.className='enabled';
                target.innerHTML='&#9745;' 
                }
        }).catch(err=>{
            console.log(err);
        })
    }
})

})