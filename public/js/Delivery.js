document.addEventListener('DOMContentLoaded',()=>{
   const editBtn = document.getElementById('editAddress');
   const cancelBtn= document.getElementById('cancelEdit');
   const uDelivery = document.getElementById('updateDelivery');
   const cDelivery = document.getElementById('currentAddress');
   editBtn.addEventListener('click',(event)=>{
     event.preventDefault();
     cDelivery.classList.add('d-none');
     uDelivery.classList.remove('d-none');
   });
   cancelBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    uDelivery.classList.add('d-none');
    cDelivery.classList.remove('d-none');
  })
})