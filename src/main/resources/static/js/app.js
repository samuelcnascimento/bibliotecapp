


//BOTÃO DE PESQUISA	
const inputSearch = document.getElementById('inpt_search')
inputSearch.addEventListener('keydown', function(event){
	if(event.key == 'Enter'){
		search();
	}
})

//SEARCH METHOD'https://www.googleapis.com/books/v1/volumes?q=' + nameSearch;
function search(){
	let nameSearch = $('#inpt_search').val();
	if(nameSearch.trim() !== ''){
		var urlbookapi = 'https://www.googleapis.com/books/v1/volumes?q=' + nameSearch;
		$.get(urlbookapi, function(response){
			console.log(response);
		})
	}
}

//SEARCHE LIVE METHOD
function searchLive(){
	let nameSearch = $('#inpt_search').val();
	if(nameSearch.trim() !== ''){
		var urlbookapi = 'https://www.googleapis.com/books/v1/volumes?q=' + nameSearch;
		$.get(urlbookapi, function(response){
			$('#suggestions').empty();
			if(response.items.length > 0){
				for(i=0;i<response.items.length; i++){
					//verificar se existe o ano de publicação
					var yearPublished = response.items[i].volumeInfo.publishedDate ? response.items[i].volumeInfo.publishedDate.slice(0, 4) : "Sem ano de pub.";
					var encodedTitle = encodeURIComponent(yearPublished);
					$('#suggestions').append(
						'<li class="list-group-item d-flex justify-content-between align-items-start" onclick="selectSuggestions(\''+ response.items[i].volumeInfo.title +'\')">'+
						' <div class="ms-2 me-auto"><div class="fw-bold">' + response.items[i].volumeInfo.title + '</div>' +
						response.items[i].volumeInfo.authors + '</div><span class="badge text-bg-primary rounded-pill">' + 
						yearPublished + '</span> </li>'
					); 
				}
			}
		})
	}
}

/**SELECT SUGGESTIONS METHOD**/
function selectSuggestions(titleName){
	$('#inpt_search').val(titleName);
	$('#suggestions').empty();
	search();
	//$('#inpt_search').val('');
}

/*DESIGN DA LOGO E BARRA DE PESQUISA */

$(document).ready(function() {
	// Adiciona a classe active ao label e ao campo de entrada para expandir o campo ao carregar a página
	$(".search").addClass('active');
	$("#inpt_search").focus();

	// Verifica se a barra de pesquisa deve estar expandida
	if (localStorage.getItem('searchExpanded') === 'true') {
		$(".search").addClass('active');
	}

	// Evento para quando o campo de entrada ganha foco
	$("#inpt_search").on('focus', function () {
		$(this).parent('.search').addClass('active');
		localStorage.setItem('searchExpanded', 'true');
	});

	// Evento para quando o campo de entrada perde o foco
	// $("#inpt_search").on('blur', function () {
	// 	if ($(this).val().length >= 0) {
	// 		$(this).parent('.search').removeClass('active');
	// 		localStorage.setItem('searchExpanded', 'false');
	// 	}
	// });
});


