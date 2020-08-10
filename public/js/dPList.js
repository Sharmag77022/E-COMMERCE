document.addEventListener('DOMContentLoaded',()=>{
    const container = document.getElementById('pContainer');
    var skip = 12;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cId = urlParams.get('cId')
    function loadProducts(){
        console.log('hello');
        //Getting Products
        fetch('/mProducts?skip='+skip+'&cId='+cId,{
            credentials: "same-origin",
            method: 'GET'
        }).then(res=>{
            if(res.status==200){
                //console.log('success');
             return res.json();   
            }
        }).then(data=>{
           // console.log(data[11].desc.replace(/\n/g,"<br/>"));
            for(let i=0;i<data.length;i++){
              const div1= document.createElement('div') ;
              div1.classList.add('col-sm-6', 'col-lg-4', 'mb-2', 'col-xl-3','pt-2','col-xs-12'); 
              const plink = document.createElement('a');
              plink.setAttribute('href','/product?p='+data[i]._id);
              plink.style.textDecoration ='none';
              plink.classList.add("d-flex","justify-content-center")
              const div2= document.createElement('div') ;
              div2.classList.add("card"); 
              div2.style.width = '20rem';
              const img= document.createElement('img') ;
              img.setAttribute('src',"/pImg/"+data[i].images[0].filename);
              img.setAttribute('alt',"productImage");
              img.classList.add('card-img-top');
              const div3= document.createElement('div') ;
              div3.classList.add("card-body");
              const p1= document.createElement('p') ;
              p1.classList.add('card-text', 'text-success' ,'text-center', 'h3');
              p1.innerHTML=data[i].name;
              const p2= document.createElement('p') ;
              p2.classList.add('card-text','text-right', 'text-danger');
              p2.innerHTML=data[i].price+"&nbsp;&#8377;";
              div3.appendChild(p1);
              div3.appendChild(p2);
              div2.appendChild(img);
              div2.appendChild(div3);
              plink.appendChild(div2);
              div1.appendChild(plink);
              container.appendChild(div1);
            }
              }).catch(err=>{
                  console.log(err);
              });
              skip= skip+12;
            }
     
    window.addEventListener('scroll',()=>{
        if(window.scrollY+window.innerHeight >= document.documentElement.scrollHeight){
           loadProducts();
        }
    })
   
})