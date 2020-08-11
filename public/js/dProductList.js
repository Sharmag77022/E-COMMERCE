document.addEventListener('DOMContentLoaded',()=>{
    const container = document.getElementById('pContainer');
    var skip = 12;
    function loadProducts(){
        //Getting Products
        fetch('/moreProducts?skip='+skip,{
            credentials: "same-origin",
            method: 'GET'
        }).then(res=>{
            if(res.status==200){
                //console.log('success');
             return res.json();   
            }
        }).then(data=>{
            for(let i=0;i<data.length;i++){ 
              const plink = document.createElement('a');
              plink.classList.add('m-1');
              plink.setAttribute('href','/product?p='+data[i]._id);
              plink.style.textDecoration ='none';
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
              container.appendChild(plink);
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
