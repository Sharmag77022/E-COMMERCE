document.addEventListener('DOMContentLoaded',()=>{
   
    const requests = document.getElementById('merchantRequests');
    const categoryR = document.getElementById('categoryRequests');
    const subCatR = document.getElementById('subCatRequests');
    //console.log(categoryR);
    fetch('/admin/merchantRequests',{
        credentials: "same-origin",
        method:'GET'
    }).then(res=>{
        
        return res.json();
    }).then(data=> {
        for(let i=0;i<data.length;i++){
            var row = document.createElement('tr');
            var sNo = document.createElement("td");
            var mName = document.createElement("td");
            var mEmail= document.createElement("td");
            mEmail.classList.add("email");
            var anchorA = document.createElement("A");
            anchorA.setAttribute('href','#');
            var anchorR = document.createElement("A");
            anchorR.setAttribute('href','#');
            var accept = document.createElement("td");
            accept.classList.add("accept");
            var reject = document.createElement("td");
            reject.classList.add("reject");
            sNo.innerHTML= i+1;
            mName.innerHTML= data[i].name;
            mEmail.innerHTML = data[i].email;
            anchorA.innerHTML = '&#9745;';
            anchorR.innerHTML = '&#10539;';
            accept.appendChild(anchorA);
            reject.appendChild(anchorR);
            row.appendChild(sNo);
            row.appendChild(mName);
            row.appendChild(mEmail);
            row.appendChild(accept);
            row.appendChild(reject);
            requests.appendChild(row);
        }
    })
    .catch(err=>console.log(err));
requests.addEventListener('click',(event)=>{
    event.preventDefault();
    var target = event.target;
   
   var targetRow= target.parentNode.parentNode;
   var targetEmail= target.parentNode.parentNode.childNodes[2].childNodes[0].textContent;
   if(target.parentNode.className=='accept'){
    
    fetch('/admin/acceptM',{
        credentials: "same-origin",
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: targetEmail
        })
    }).then(res=>{
        if(res.status==200){
            console.log('success');
            targetRow.parentNode.removeChild(targetRow);
        }
    }).catch(err=>{
        console.log(err);
    })
    

   }
   else if(target.parentNode.className=='reject'){
    fetch('/admin/rejectM',{
        credentials: "same-origin",
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: targetEmail
        })
    }).then(res=>{
        if(res.status==200){
            console.log('success');
            targetRow.parentNode.removeChild(targetRow);
        }
    }).catch(err=>{
        console.log(err);
    })
}
})
//Load Merchant Category Requests
fetch('/admin/categoryRequestsM',{
    credentials: "same-origin",
    method:'GET'
}).then(res=>{
    
    return res.json();
}).then(data=> {
    console.log(data);
    for(let i=0;i<data.length;i++){
        var row = document.createElement('tr');
        var sNo = document.createElement("td");
        var cName = document.createElement("td");
        var mId= document.createElement("td");
        mId.classList.add("mId");
        var anchorA = document.createElement("A");
        anchorA.setAttribute('href','#');
        var anchorR = document.createElement("A");
        anchorR.setAttribute('href','#');
        var accept = document.createElement("td");
        accept.classList.add("accept");
        var reject = document.createElement("td");
        reject.classList.add("reject");
        sNo.innerHTML= i+1;
        cName.innerHTML= data[i].name;
        mId.innerHTML = data[i].MerchantId;
        anchorA.innerHTML = '&#9745;';
        anchorR.innerHTML = '&#10539;';
        accept.appendChild(anchorA);
        reject.appendChild(anchorR);
        row.appendChild(sNo);
        row.appendChild(cName);
        row.appendChild(mId);
        row.appendChild(accept);
        row.appendChild(reject);
        categoryR.appendChild(row);
    }
})
.catch(err=>console.log(err));
//Accept Reject Categories

categoryR.addEventListener('click',(event)=>{
    event.preventDefault();
    var target = event.target;
   
   var targetRow= target.parentNode.parentNode;
   var targetId= targetRow.childNodes[2].childNodes[0].textContent;
   var categoryName = targetRow.childNodes[1].textContent;
   if(target.parentNode.className=='accept'){
    fetch('/admin/acceptC',{
        credentials: "same-origin",
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:categoryName,
            mId: targetId
        })
    }).then(res=>{
        if(res.status==200){
            console.log('success');
            targetRow.parentNode.removeChild(targetRow);
        }
    }).catch(err=>{
        console.log(err);
    })
    

   }
   else if(target.parentNode.className=='reject'){
    fetch('/admin/rejectC',{
        credentials: "same-origin",
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:categoryName,
            mId: targetId
        })
    }).then(res=>{
        if(res.status==200){
            console.log('success');
            targetRow.parentNode.removeChild(targetRow);
        }
    }).catch(err=>{
        console.log(err);
    })
}
})
//load sub category requests
fetch('/admin/subCatRequests',{
    credentials: "same-origin",
    method:'GET'
}).then(res=>{
    
    return res.json();
}).then(data=> {
    console.log(data);
    for(let i=0;i<data.length;i++){
        let row = document.createElement('tr');
        let sNo = document.createElement("td");
        let cName = document.createElement("td");
        let mId= document.createElement("td");
        let pCat = document.createElement("td");
        pCat.setAttribute('id',data[i].CatId);
        mId.classList.add("mId");
        let anchorA = document.createElement("A");
        anchorA.setAttribute('href','#');
        let anchorR = document.createElement("A");
        anchorR.setAttribute('href','#');
        let accept = document.createElement("td");
        accept.classList.add("accept");
        let reject = document.createElement("td");
        reject.classList.add("reject");
        sNo.innerHTML= i+1;
        cName.innerHTML= data[i].name;
        mId.innerHTML = data[i].mId;
        pCat.innerHTML= data[i].pName;
        anchorA.innerHTML = '&#9745;';
        anchorR.innerHTML = '&#10539;';
        accept.appendChild(anchorA);
        reject.appendChild(anchorR);
        row.appendChild(sNo);
        row.appendChild(cName);
        row.appendChild(mId);
        row.appendChild(pCat);
        row.appendChild(accept);
        row.appendChild(reject);
        subCatR.appendChild(row);
    }
})
.catch(err=>console.log(err));
//Accept/Reject sub category Requests
subCatR.addEventListener('click',(event)=>{
    event.preventDefault();
    var target = event.target;
   
   var targetRow= target.parentNode.parentNode;
   var targetId= targetRow.childNodes[2].childNodes[0].textContent;
   var categoryName = targetRow.childNodes[1].textContent;
   var pCatId= targetRow.childNodes[3].id;
   if(target.parentNode.className=='accept'){
    fetch('/admin/acceptsubCat',{
        credentials: "same-origin",
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:categoryName,
            mId: targetId,
            pCatId:pCatId
        })
    }).then(res=>{
        if(res.status==200){
            console.log('success');
            targetRow.parentNode.removeChild(targetRow);
        }
    }).catch(err=>{
        console.log(err);
    })
   }
   else if(target.parentNode.className=='reject'){
    fetch('/admin/rejectsubCat',{
        credentials: "same-origin",
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:categoryName,
            mId: targetId,
            pCatId:pCatId
        })
    }).then(res=>{
        if(res.status==200){
            console.log('success');
            targetRow.parentNode.removeChild(targetRow);
        }
    }).catch(err=>{
        console.log(err);
    })
}
})

});