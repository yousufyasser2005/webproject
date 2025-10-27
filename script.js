function handleContact(e){
  e.preventDefault();
  // جلب القيم (لو عاوز تتوسع بعد كده)
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const msgEl = document.getElementById('formMsg');

  if(!name || !email || !message){
    msgEl.style.color = 'crimson';
    msgEl.textContent = 'من فضلك املأ جميع الحقول';
    return false;
  }

  // هنا ممكن تبعت البيانات للـ Backend عند وجوده
  // الآن نعرض رسالة نجاح بشكل وهمي
  msgEl.style.color = 'green';
  msgEl.textContent = 'تم استقبال رسالتك! سنرد عليك قريبًا.';
  
  // نعدِّل الفورم (نمسح الحقول)
  document.getElementById('contactForm').reset();

  // نزيل الرسالة بعد 4 ثواني
  setTimeout(()=>{ msgEl.textContent = ''; }, 4000);

  return false;
}
