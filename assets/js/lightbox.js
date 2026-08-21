(function(){
  function ensure(){
    var overlay = document.querySelector('.lb-overlay');
    if(overlay) return overlay;
    overlay = document.createElement('div'); overlay.className='lb-overlay';
    overlay.innerHTML = '<div class="lb-close" aria-label="Schließen">✕</div><img alt=""><div class="lb-caption"></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(ev){ if(ev.target===overlay || ev.target.classList.contains('lb-close')) overlay.classList.remove('open'); });
    return overlay;
  }

  function open(href, alt){
    var overlay = ensure();
    var img = overlay.querySelector('img');
    var cap = overlay.querySelector('.lb-caption');
    img.src = href; img.alt = alt || '';
    cap.textContent = alt || '';
    overlay.classList.add('open');
    current = href;
  }

  var current = null;

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('a.lb');
    if(!t) return;
    e.preventDefault();
    open(t.getAttribute('href'), (t.querySelector('img')||{}).alt || '');
  });

  document.addEventListener('keydown', function(e){
    var overlay = document.querySelector('.lb-overlay');
    if(!overlay || !overlay.classList.contains('open')) return;
    if(e.key === 'Escape') overlay.classList.remove('open');
    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
      var items = Array.from(document.querySelectorAll('a.lb'));
      if(!items.length) return;
      var idx = items.findIndex(function(a){ return a.getAttribute('href')===current; });
      if(idx === -1) idx = 0;
      var next = e.key === 'ArrowLeft' ? items[idx-1] : items[idx+1];
      if(!next){
        next = e.key === 'ArrowLeft' ? items[items.length-1] : items[0];
      }
      open(next.getAttribute('href'), (next.querySelector('img')||{}).alt || '');
    }
  });
})();
