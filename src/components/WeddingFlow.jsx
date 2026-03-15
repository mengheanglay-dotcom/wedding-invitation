import React, { useEffect } from "react";
import {
  Users,
  ScrollText,
  Flower,
  HandHeart,
  Theater,
  Scissors,
  PartyPopper,
  Utensils,
  Wine
} from "lucide-react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@300;400;700&display=swap');

*{box-sizing:border-box;margin:0;padding:0;}

.wf-root{
  position:relative;
  width:100%;
  min-height:100svh;
  background:#fdf8f0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:28px 16px 40px;
  overflow:hidden;
}

.wf-card{
  position:relative;
  z-index:3;
  width:100%;
  max-width:460px;
  background:#fffef8;
  border:2px solid rgba(185,148,70,0.65);
  border-radius:48% 48% 46% 46% / 6% 6% 5% 5%;
  box-shadow:
  0 0 0 5px rgba(201,160,48,0.1),
  0 0 0 8px rgba(201,160,48,0.05),
  inset 0 0 40px rgba(201,160,48,0.04);
  padding:48px 32px 56px;
  text-align:center;
}

.wf-title{
  font-family:'Moul',serif;
  font-size:clamp(1.3rem,5vw,1.7rem);
  line-height:1.8;
  margin-bottom:16px;
  background:linear-gradient(180deg,#c9a030,#8b6400);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.wf-list{
  display:flex;
  flex-direction:column;
  gap:14px;
  text-align:left;
}

.wf-item{
  display:grid;
  grid-template-columns:34px 95px 1fr;
  gap:10px;
  align-items:flex-start;
}

.wf-icon{
  display:flex;
  align-items:center;
  justify-content:center;
  color:#c9a030;
}

.wf-time{
  font-family:'Battambang',serif;
  font-size:clamp(.95rem,3.6vw,1.1rem);
  font-weight:700;
  color:#b8922a;
  line-height:1.7;
}

.wf-desc{
  font-family:'Battambang',serif;
  font-size:clamp(.95rem,3.6vw,1.1rem);
  color:#5a3a08;
  line-height:1.7;
}

.wf-desc strong{
  font-weight:700;
  color:#4a2808;
}

.wf-sep{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  margin:6px auto;
  max-width:180px;
}

.ws-line{
  flex:1;
  height:.5px;
  background:linear-gradient(90deg,transparent,#c9a030);
}

.ws-line.r{
  background:linear-gradient(90deg,#c9a030,transparent);
}

.ws-dot{
  width:4px;
  height:4px;
  background:#c9a030;
  border-radius:50%;
}
`;

const schedule = [
{
icon:<Users size={24}/>,
time:"៦:០០ ព្រឹក",
desc:"ជួបជុំភ្ញៀវកិតិ្តយស ដើម្បីរៀបចំក្រុងពាលី"
},
{
icon:<ScrollText size={24}/>,
time:"៦:៣០ ព្រឹក",
desc:"ពិធីក្រុងពាលី"
},
{
icon:<Flower size={24}/>,
time:"៧:០០ ព្រឹក",
desc:<>ពិធីហែជំនួន​ (កំណត់) និងអញ្ជើញភ្ញៀវ<br/><strong>កិតិយសពិសាអាហារពេលព្រឹក</strong></>
},

{sep:true},

{
icon:<HandHeart size={24}/>,
time:"៨:០០ ព្រឹក",
desc:"ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត"
},
{
icon:<Theater size={24}/>,
time:"៨:៣០ ព្រឹក",
desc:"ពិធីជាវខាន់ស្លា"
},
{
icon:<Scissors size={24}/>,
time:"៩:០០ ព្រឹក",
desc:"ពិធីកាត់សក់បង្កក់សេរី"
},

{sep:true},

{
icon:<PartyPopper size={24}/>,
time:"១០:៣០ ព្រឹក",
desc:<>ពិធីសំពះពិលា បើកវាំងនន បាចផ្កាស្លា<br/>បង្វិលពពិល គួចចំណងដៃ​ និងព្រះថោងតោងស្បៃ</>
},

{sep:true},

{
icon:<Utensils size={24}/>,
time:"១២:០០ ថ្ងៃត្រង់",
desc:<>អញ្ជើញភ្ញៀវកិត្តិយសចូលរួមពិសាអាហារថ្ងៃត្រង់</>
},

{sep:true},

{
icon:<Wine size={24}/>,
time:"០៥:០០ ល្ងាច",
desc:<>អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាអាហារនៅ <strong>AEON III មានជ័យ ផ្លូវ 60m (Hall A+B)</strong><br/>ដោយមេត្រី ។​  <strong>ចប់កម្មវិធី</strong></>
}
];

export default function WeddingFlow(){

useEffect(()=>{
const tag=document.createElement("style");
tag.innerHTML=styles;
document.head.appendChild(tag);
return()=>document.head.removeChild(tag);
},[]);

return(
<div className="wf-root">

<div className="wf-card">

<h1 className="wf-title">
កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
</h1>

<div className="wf-list">

{schedule.map((item,i)=>{

if(item.sep){
return(
<div key={i} className="wf-sep">
<div className="ws-line"/>
<div className="ws-dot"/>
<div className="ws-dot"/>
<div className="ws-dot"/>
<div className="ws-line r"/>
</div>
);
}

return(
<div key={i} className="wf-item">

<div className="wf-icon">
{item.icon}
</div>

<div className="wf-time">
{item.time}
</div>

<div className="wf-desc">
{item.desc}
</div>

</div>
);

})}

</div>

</div>

</div>
);
}