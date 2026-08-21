document.addEventListener('click', function(e){
  var t = e.target.closest && e.target.closest('a.lb');
  if(!t) return;
  e.preventDefault();
  var href = t.getAttribute('href');
  var alt = t.querySelector('img') ? t.querySelector('img').alt : '';
  var overlay = document.querySelector('.lb-overlay');
  if(!overlay){
    overlay = document.createElement('div'); overlay.className='lb-overlay';
    overlay.innerHTML = '<div class="lb-close" aria-label="Schließen">✕</div><img alt=""><div class="lb-caption"></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(ev){ if(ev.target===overlay || ev.target.classList.contains('lb-close')) overlay.classList.remove('open'); });
  }
  var img = overlay.querySelector('img');
  var cap = overlay.querySelector('.lb-caption');
  img.src = href; img.alt = alt || '';
  cap.textContent = alt || '';
  overlay.classList.add('open');
});
