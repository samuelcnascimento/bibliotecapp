


//BOTÃO DE PESQUISA PELO ENTER
const inputSearch = document.getElementById('inpt_search')
inputSearch.addEventListener('keydown', function(event){
	if(event.key == 'Enter'){
		search();
	}
})

//SEARCH METHOD
function search(){
	let nameSearch = $('#inpt_search').val();
	if(nameSearch.trim() !== ''){
		var urlbookapi = 'https://www.googleapis.com/books/v1/volumes?q=' + nameSearch;
		$.get(urlbookapi, function(response){
			console.log(response);
			
		})
	}
}

//DETAILS METHOD
function bookDetails(){
	let nameSearch = $('#inpt_search').val();
	if(nameSearch.trim() !== ''){
		var urlbookapi = 'https://www.googleapis.com/books/v1/volumes?q=' + nameSearch;
		$.get(urlbookapi, function(response){
			console.log(response);
			$('#cardInfo >').remove();
			if(response.items.length > 0){
				$('#cardInfo').append('<img src="'+ response.items[0].volumeInfo.imageLinks.thumbnail +'">'+
					'<div><h5>' + response.items[0].volumeInfo.title + '</h5>'+ 
					'<p>' + response.items[0].volumeInfo.subtitle + '</p></div>'+
					'<ul class="list-group list-group-flush" id="listInfoBook">'+
                    '<li class="list-group-item">' + response.items[0].volumeInfo.authors + '</li>'+
                    '<li class="list-group-item">' + response.items[0].volumeInfo.publishedDate + '</li>'
				  );
			}

		})
	} else {
            toastr.error("Campo de pesquisa está vazio!");
            $('#modalView').modal('hide');
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
	bookDetails();
	$('#modalView').modal('show');

	//$('#inpt_search').val('');
}

/*SCRIPT DA BARRA DE PESQUISA */

$(document).ready(function() {
	// Adiciona a classe active ao label e ao campo de entrada para expandir o campo ao carregar a página
	$(".search").addClass('active');
	$("#inpt_search").focus();


});


