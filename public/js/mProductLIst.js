document.addEventListener('DOMContentLoaded',()=>{
    const container = document.getElementById('pContainer');
    var skip = 5;
    function loadProducts(){
        console.log('hello');
        //Getting Products
        fetch('/merchant/moreProducts?skip='+skip,{
            credentials: "same-origin",
            method: 'GET'
        }).then(res=>{
            if(res.status==200){
                //console.log('success');
             return res.json();   
            }
        }).then(data=>{
            for(let i=0;i<data.length;i++){
              const div1= document.createElement('div') ;
              div1.classList.add('col-sm-6', 'col-lg-3', 'mb-2', 'mx-auto'); 
              const div2= document.createElement('div') ;
              div2.classList.add("card"); 
              div2.style.width = '18rem';
              div2.style.height = 'auto';
              const img= document.createElement('img') ;
              img.setAttribute('src',"/pImg/"+data[i].images[0].filename);
              img.setAttribute('alt',"productImage");
              img.classList.add('card-img-top');
              img.style.maxWidth = '18rem';
              img.style.height = 'auto';
              const div3= document.createElement('div') ;
              div3.classList.add("card-body");
              const p1= document.createElement('p') ;
              p1.classList.add('card-text', 'text-success' ,'text-center', 'h5');
              p1.innerHTML=data[i].name;
              const btn = document.createElement('button');
              btn.classList.add('btn','btn-primary' ,'ml-1','remove');
              btn.innerHTML='Remove';
              btn.setAttribute('id',data[i]._id);
              const div4 = document.createElement('div');
              div4.classList.add('row' ,'justify-content-between')
              const spn= document.createElement('span') ;
              spn.classList.add('card-text','text-right', 'text-danger');
              spn.innerHTML=data[i].price+"&nbsp;&#8377;";
              div4.appendChild(btn);
              div4.appendChild(spn);
              div3.appendChild(p1);
              div3.appendChild(div4);
              div2.appendChild(img);
              div2.appendChild(div3);
              div1.appendChild(div2);
              container.appendChild(div1);
            }
              }).catch(err=>{
                  console.log(err);
              });
              skip= skip+5;
            }
     
    window.addEventListener('scroll',()=>{
        if(window.scrollY+window.innerHeight >= document.documentElement.scrollHeight){
           loadProducts();
        }
    })
   
})