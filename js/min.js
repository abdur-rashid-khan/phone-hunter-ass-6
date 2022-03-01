// clicke search button then road data
const searchBtn=document.getElementById('searchBtn');
const searchInput=document.getElementById('searchInput');
const post =document.getElementById('post');

searchBtn.addEventListener('click',()=>{
   let searchInputValue=searchInput.value;
   searchInput.value='';
   if(searchInputValue===''){
      document.getElementById('header-text').innerText="No Data Found";
      document.getElementById('post').textContent='';
      document.getElementById('loader').style.display='none';
   }else{
      document.getElementById('header-text').innerText=`search result ${searchInputValue}`;
      let covertCapital=searchInputValue.charAt(0).toUpperCase() + searchInputValue.slice(1).toLowerCase();
      let url=`https://openapi.programming-hero.com/api/phones?search=${covertCapital}`
      fetch(url)
      .then(res => res.json())
      .then(data=>getSearchValue(data));
      document.getElementById('loader').style.display='block';
   }
});

// Display Data show 
const getSearchValue=(data)=>{
      if(data.status===false){
         document.getElementById('header-text').innerText="No Data Found";
         document.getElementById('post').textContent='';
         document.getElementById('loader').style.display='none';
      }else{
         //  20 phone display
         let getData=data.data.slice(0,20);
         // console.log(data.data.slice(0,20));
         let post=document.getElementById('post');
         post.textContent='';
         getData.forEach(element => {
            // console.log(element.slug);
            let col=document.createElement('div');
            col.classList.add('col-sm-12');
            col.classList.add('col-md-6');
            col.classList.add('col-lg-4');
            col.classList.add('col-xl-4');
            col.classList.add('py-4');
            col.innerHTML=`
               <div class="card">
                  <img id='imgSize' class='img-fluid pt-2' src="${element.image}" alt="${element.phone_name} of photos">
                  <div class="card-body">
                     <h5 class="card-title">${element.phone_name}</h5>
                     <p class="card-text">powads by ${element.brand}</p>
                  </div>
                  <div class="card-body">
                     <a href='#' onclick="getPhoneId('${element.slug}')" class="card-link">Deteals</a>
                  </div>
               </div>
            `;
            post.appendChild(col);
      });
      document.getElementById('loader').style.display='none';
      }
}

const getPhoneId=(data)=>{
   const phoneIdUrl=`https://openapi.programming-hero.com/api/phone/${data}`;
   fetch(phoneIdUrl)
   .then(res=>res.json())
   .then(GetId=>phoneId(GetId))
   document.getElementById('loader').style.display='block';
};

phoneId=(data)=>{
   document.getElementById('header-text').innerText="";
   let getbrand=data.data.brand;
   let getimage=data.data.image;
   let getname=data.data.name;
   let getreleaseDate=data.data.releaseDate;
   let getmemory=data.data.mainFeatures.memory;
   let getchipSet=data.data.mainFeatures.chipSet;
   let getdisplaySize=data.data.mainFeatures.displaySize;
   let getsensors=data.data.mainFeatures.sensors;
   let getOther=data.data.others;
   if(getOther){
      console.log(getOther);
      const otherData=getOther;
         // show singel mobile items
   let post=document.getElementById('post');
   post.textContent='';
   let ceratPost=document.createElement('div');
   ceratPost.innerHTML=`
   <div id='singalPage' class="card">
   <div. class='row align-items-center py-3'>
      <div class='col-sm-12 col-md-6 text-center'>
         <img id='sigelImg' src="${getimage}" class="card-img-top img-fluid" alt="${getname}">
      </div>
      <div class='col-sm-12 col-md-6 text-center'>
         <div class="card-body text-md-start">
            <h5 class="card-title">Name : ${getname}</h5>
         </div>
         <ul id='ul' class="list-group list-group-flush text-start">
         <li class="list-group-item "> Brand Name : ${getbrand}</li>
         <li class="list-group-item ">Release Date : ${getreleaseDate}</li>
         <li class="list-group-item ">Memory : ${getmemory}</li>
         <li class="list-group-item ">ChipSet  : ${getchipSet}</li>
         <li class="list-group-item ">Display Size : ${getdisplaySize}</li>
         <li class="list-group-item ">Sensor : ${getsensors} </li>
         <li class="ps-3 h5"> Other Data : 
            <li class="ps-3">Bluetooth : ${otherData.Bluetooth}</li>
            <li class="ps-3">WLAN : ${otherData.WLAN}</li>
            <li class="ps-3">Radio : ${otherData.Radio}</li>
            <li class="ps-3">USB :  ${otherData.USB}</li>
            <li class="ps-3">GPS : ${otherData.GPS}</li>
            <li class="ps-3">NFC : ${otherData.NFC}</li>
         </li>
         </ul>
      </div>
   </div.
   </div>
   `;
   post.appendChild(ceratPost);
   document.getElementById('loader').style.display='none';
   }else{
      const otherData='Not Found Other Data';
         // show singel mobile items
   let post=document.getElementById('post');
   post.textContent='';
   let ceratPost=document.createElement('div');
   ceratPost.innerHTML=`
   <div id='singalPage' class="card">
   <div. class='row align-items-center py-3'>
      <div class='col-sm-12 col-md-6 text-center'>
         <img id='sigelImg' src="${getimage}" class="card-img-top img-fluid" alt="${getname}">
      </div>
      <div class='col-sm-12 col-md-6 text-center'>
         <div class="card-body text-md-start">
            <h5 class="card-title">Name : ${getname}</h5>
         </div>
         <ul id='ul' class="list-group list-group-flush text-start">
         <li class="list-group-item"> Brand Name : ${getbrand}</li>
         <li class="list-group-item">Release Date : ${getreleaseDate}</li>
         <li class="list-group-item">Memory : ${getmemory}</li>
         <li class="list-group-item">ChipSet  : ${getchipSet}</li>
         <li class="list-group-item">Display Size : ${getdisplaySize}</li>
         <li class="list-group-item">Other Data : ${otherData}</li>
         <p class="list-group-item">Sensor : ${getsensors} </p>
         </ul>
      </div>
   </div.
   </div>
   `;
   post.appendChild(ceratPost);
   document.getElementById('loader').style.display='none';
   }
}