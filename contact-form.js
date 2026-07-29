(function () {
  var portalId = '246896085';
  var formGuid = '7dfb953b-635c-4ced-a997-dad1f650880d';

  document.addEventListener('submit', function (e) {
    var form = e.target && e.target.id === 'contact-form' ? e.target : null;
    if (!form) return;
    e.preventDefault();

    var status = form.querySelector('#form-status');
    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    var fields = [
      { name: 'firstname', value: form.querySelector('#firstname').value },
      { name: 'lastname', value: form.querySelector('#lastname').value },
      { name: 'email', value: form.querySelector('#email').value },
      { name: 'company', value: form.querySelector('#company').value },
      { name: 'phone', value: form.querySelector('#phone').value },
      { name: 'message', value: form.querySelector('#message').value }
    ];

    fetch('https://api.hsforms.com/submissions/v3/integration/submit/' + portalId + '/' + formGuid, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: fields,
        context: { pageUri: window.location.href, pageName: document.title }
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Submission failed');
        form.querySelectorAll('.field, button[type="submit"]').forEach(function (el) {
          el.style.display = 'none';
        });
        status.style.display = 'block';
        status.style.color = '';
        status.textContent = "Thanks — we've got it and will be in touch shortly.";
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
        status.style.display = 'block';
        status.style.color = '#b3261e';
        status.textContent = "Something went wrong sending that. Please try again, or email ryanoconnor@groundtruthadvisory.co directly.";
      });
  });
})();
