import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMUUCNabY_8yOSntBQITklkXmnlHQ_ZRA",
  authDomain: "tombola-jdrel.firebaseapp.com",
  projectId: "tombola-jdrel",
  storageBucket: "tombola-jdrel.appspot.com",
  messagingSenderId: "742604571910",
  appId: "1:742604571910:web:7eb42cbf0a3e31ff7a4a87""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const spinSound = document.getElementById("spinSound");

const prizes = ["10 LEI","NIMIC","5 LEI","RETRY","20 LEI","NIMIC"];
const colors = ["#f44336","#607d8b","#4caf50","#ff9800","#9c27b0","#03a9f4"];
const sliceAngle = 2*Math.PI/prizes.length;
let angle = 0, spinning = false;

/* thumbnails */
const thumbsDiv = document.getElementById("thumbs");
prizes.forEach(p=>{
  const d=document.createElement("div");
  d.className="thumb";
  d.innerText=p;
  thumbsDiv.appendChild(d);
});

/* desen */
function drawWheel(){
  ctx.clearRect(0,0,300,300);
  for(let i=0;i<prizes.length;i++){
    ctx.beginPath();
    ctx.fillStyle=colors[i];
    ctx.moveTo(150,150);
    ctx.arc(150,150,150,angle+i*sliceAngle,angle+(i+1)*sliceAngle);
    ctx.fill();

    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(angle+i*sliceAngle+sliceAngle/2);
    ctx.fillStyle="#fff";
    ctx.textAlign="right";
    ctx.font="14px Arial";
    ctx.fillText(prizes[i],140,5);
    ctx.restore();
  }
}
drawWheel();

/* verificare 1 spin */
auth.onAuthStateChanged(async user=>{
  if(!user){ location.href="register.html"; return; }
  const ref = doc(db,"spins",user.uid);
  const snap = await getDoc(ref);
  if(snap.exists()){
    alert("Ai rotit deja: "+snap.data().prize);
    spinBtn.disabled=true;
  }
});

/* spin */
spinBtn.onclick = async ()=>{
  if(spinning) return;
  spinning=true;
  spinBtn.disabled=true;
  spinSound.play();

  const target = Math.random()*Math.PI*10 + Math.PI*10;
  const start = Date.now(), duration = 4000;

  function anim(){
    const t=(Date.now()-start)/duration;
    angle = target*(1-Math.pow(1-t,3));
    drawWheel();
    if(t<1) requestAnimationFrame(anim);
    else finish();
  }
  anim();
};

async function finish(){
  spinning=false;
  spinSound.pause();
  const index = prizes.length - Math.floor((angle%(2*Math.PI))/sliceAngle) -1;
  document.querySelectorAll(".thumb").forEach(t=>t.classList.remove("active"));
  thumbsDiv.children[index].classList.add("active");

  const user = auth.currentUser;
  await setDoc(doc(db,"spins",user.uid),{
    prize: prizes[index],
    hasSpun:true,
    created: Date.now()
  });

  alert("Ai câștigat: "+prizes[index]);	

