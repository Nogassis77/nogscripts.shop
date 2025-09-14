document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const moneyEls = document.querySelectorAll('.payment-money');
  const pointsEls = document.querySelectorAll('.payment-points');
  const hover = new Audio('sounds/hover.mp3');
  const click = new Audio('sounds/click.mp3');
  const trans = new Audio('sounds/transition.mp3');
  const bgm = new Audio('sounds/bgm.mp3');
  bgm.loop = true;

  // play bgm only after first user click (browser policy)
  let bgmStarted = false;
  function ensureBgm() {
    if(!bgmStarted) {
      bgm.play().catch(()=>{});
      bgmStarted = true;
    }
  }

  function playSound(a) {
    try { a.currentTime = 0; a.play(); } catch(e) {}
  }

  tabBtns.forEach(btn=>{
    btn.addEventListener('mouseenter', ()=> playSound(hover));
    btn.addEventListener('click', (e)=>{
      playSound(click);
      ensureBgm();
      tabBtns.forEach(b=>b.classList.remove('active'));
      tabContents.forEach(c=>c.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.getAttribute('data-tab');
      const target = document.getElementById(id);
      if(target){ target.classList.add('active'); target.scrollIntoView({behavior:'smooth', block:'center'}); }
      playSound(trans);
    });
  });

  toggleBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      playSound(click);
      toggleBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.getAttribute('data-payment');
      if(type === 'money') {
        moneyEls.forEach(e=> e.style.display='block');
        pointsEls.forEach(e=> e.style.display='none');
      } else {
        moneyEls.forEach(e=> e.style.display='none');
        pointsEls.forEach(e=> e.style.display='block');
      }
    });
    btn.addEventListener('mouseenter', ()=> playSound(hover));
  });

  // buttons sounds (select & whatsapp)
  document.querySelectorAll('.select-btn, .whatsapp-btn').forEach(b=>{
    b.addEventListener('mouseenter', ()=> playSound(hover));
    b.addEventListener('click', ()=> { playSound(click); ensureBgm(); });
  });

  // start bgm on first interaction anywhere (if not already started)
  document.addEventListener('click', function startBgmOnce() {
    ensureBgm();
    document.removeEventListener('click', startBgmOnce);
  }, { once:true });

  // Video fallback: hide if not playable
  const vid = document.getElementById('bg-video');
  vid.addEventListener('error', ()=> { vid.style.display='none'; });
  vid.addEventListener('loadeddata', ()=> { vid.style.display='block'; });
});