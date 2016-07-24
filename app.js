$(() => {
  const clientId = $('#client_id');
  const clientSecret = $('#client_secret');
  const codeLink = $('#code_link');
  const code = $('#code');
  const curl = $('#curl');

  clientId.on('input', update);
  clientSecret.on('input', update);
  code.on('input', update);

  function update() {
    clientId.css('border-color', 'red');
    clientSecret.css('border-color', 'red');
    codeLink.removeAttr('href');
    code.css('border-color', 'red');
    curl.val('');

    if (clientId.val()) {
      clientId.css('border-color', 'green');
      codeLink.attr('href', `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=${clientId.val()}&redirect_uri=urn:ietf:wg:oauth:2.0:oob`);
    }
    
    if (clientSecret.val()) {
      clientSecret.css('border-color', 'green');
    }

    if (code.val()) {
      code.css('border-color', 'green');
    }

    if (clientId.val() && clientSecret.val() && code.val()) {
      curl.val([
        `curl 'https://accounts.google.com/o/oauth2/token' -s -d 'client_id=${clientId.val()}&client_secret=${clientSecret.val()}&code=${code.val()}&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob'`,
        `grep '"refresh_token"'`,
        `sed -r s/'^.*"refresh_token"[^:]*:[^:]*"([^"]+)".*$'/\\\\1/`,
      ].join(' | '));
    }
  }

  update();
});
