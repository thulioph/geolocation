// Script que solicita a geolocalização do usuário
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error('not supported');
}

// Função de sucesso para a geolocalização.
function success(position) {
  // crio uma variável status que recebe o #status
  var status = document.querySelector('#status');

  // se #status receber a classe success, retorne a função success
  if (status.className == 'success') {
    return;
  }

  // insiro no html o que estiver dentro da String.
  status.innerHTML = "Sua localização está no mapa abaixo.";

  // insiro uma class com o nome success no meu #status
  status.className = 'success';

  // Exibir mapa;
  // como coordenadas passo o retorno da API (position.coords.latitude, position.coords.longitude)
  var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  // Parâmetros do mapa
  var mapOptions = {
    zoom: 17,
    center: myLatlng,
    panControl: false,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

   // Parâmetros do texto que será exibido no clique;
  var contentString = '<h2>Você está aqui</h2>' +
                      '<p>Este foi um exemplo de como pegar a geolocalização do usuário</p>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 700
  });

  // Exibir o mapa na div #mapuser;
  var map = new google.maps.Map(document.getElementById('mapuser'), mapOptions);

  // Marcador personalizado;
  var image = 'https://cdn2.iconfinder.com/data/icons/snipicons/500/map-marker-128.png';
  var marcadorPersonalizado = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: image,
    animation: google.maps.Animation.BOUNCE
  });

  // Exibir texto ao clicar no pin;
  google.maps.event.addListener(marcadorPersonalizado, 'click', function() {
    infowindow.open(map,marcadorPersonalizado);
  });

}

// Função de error caso o navegador não suporte a geolocalização
function error(msg) {
  var status = document.querySelector('status');
  status.innerHTML = typeof msg == 'string' ? msg : "Você não permitiu ser localizado.";
  status.className = 'fail';
}


// Função para carregamento assíncrono
  function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyDeHb17So0QupSGO_d6b8X-OyvJ32UQehs&sensor=true&callback=initialize';

  document.body.appendChild(script);
}

  window.onload = loadScript;