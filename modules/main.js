

$.getJSON('https://discordapp.com/api/guilds/762050115564601375/widget.json', function(data) {        
  var count = Object.keys(data.members).length;

  var text = `Date: ${data.name}<br>
              Time: ${count}<br>`
              
  
  document.getElementById("discord-members").innerHTML = text ;
});

function Login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  document.getElementById("cred").innerHTML = username + password;
}

function closeDiscord () { $(".discord-modal").fadeOut(); }
function openDiscord() { $(".discord-modal").fadeIn(); }

