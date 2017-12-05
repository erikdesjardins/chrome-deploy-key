const clientId = document.getElementById('client_id');
const clientSecret = document.getElementById('client_secret');
const codeLink = document.getElementById('code_link');
const code = document.getElementById('code');
const curl = document.getElementById('curl');

clientId.addEventListener('input', update);
clientSecret.addEventListener('input', update);
code.addEventListener('input', update);

function update() {
  clientId.style.borderColor = 'red';
  clientSecret.style.borderColor =' red';
  codeLink.removeAttrbute('href');
  code.style.borderColor = 'red';
  curl.value = '';

  if (clientId.value) {
    clientId.style.borderColor = 'green';
    codeLink.href = `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=${clientId.value}&redirect_uri=urn:ietf:wg:oauth:2.0:oob`;
  }

  if (clientSecret.value) {
    clientSecret.style.borderColor = 'green';
  }

  if (code.value) {
    code.style.borderColor = 'green';
  }

  if (clientId.value && clientSecret.value && code.value) {
    curl.value = [
      `curl 'https://accounts.google.com/o/oauth2/token' -s -d 'client_id=${clientId.value}&client_secret=${clientSecret.value}&code=${code.value}&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob'`,
      `grep '"refresh_token"'`,
      `sed -r s/'^.*"refresh_token"[^:]*:[^:]*"([^"]+)".*$'/\\\\1/`,
    ].join(' | ');
  }
}

update();

