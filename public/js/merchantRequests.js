document.addEventListener('DOMContentLoaded',()=>{
   
    const requests = document.getElementById('merchantRequests');
   
    fetch('/admin/merchantRequests',{
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
   // console.log(target.parentNode.previousSibling.childNodes[0]);
   var targetEmail= target.parentNode.parentNode.childNodes[2].childNodes[0];
   console.log(targetEmail);
})
});