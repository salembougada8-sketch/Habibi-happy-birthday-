(() => {
 const pages = [...document.querySelectorAll('.page')];
 const prev = document.getElementById('prev');
 const next = document.getElementById('next');
 const counter = document.getElementById('counter');
 const progress = document.getElementById('progress');
 const book = document.getElementById('book');
 const song = document.getElementById('song');
 const songHelp = document.getElementById('songHelp');
 let current = 0, startX = 0;
 function render(){
   pages.forEach((p,i)=>{
     p.classList.toggle('turned', i < current);
     p.classList.toggle('active', i === current);
     p.style.zIndex = i < current ? String(i+1) : String(pages.length-i+10);
   });
   counter.textContent = current === 0 ? 'Cover' : `${String(current).padStart(2,'0')} / ${String(pages.length-1).padStart(2,'0')}`;
   progress.style.width = `${current/(pages.length-1)*100}%`;
   prev.disabled = current === 0;
   next.disabled = current === pages.length-1;
 }
 function turn(delta){ current = Math.max(0, Math.min(pages.length-1, current+delta)); render(); }
 next.addEventListener('click',()=>turn(1));
 prev.addEventListener('click',()=>turn(-1));
 book.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});
 book.addEventListener('touchend',e=>{
   const dx=e.changedTouches[0].clientX-startX;
   if(Math.abs(dx)>45) turn(dx<0?1:-1);
 },{passive:true});
 document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')turn(1);if(e.key==='ArrowLeft')turn(-1)});
 song.addEventListener('error',()=>{songHelp.textContent='The music file is not uploaded yet. Add your legally obtained MP3 as assets/music/halet-hob.mp3 and it will appear here.';});
 fetch('assets/music/halet-hob.mp3',{method:'HEAD'}).then(r=>{if(r.ok)songHelp.textContent='Enjoy your song ♡';}).catch(()=>{});
 render();
})();