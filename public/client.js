$(function(){

  $.get('/cities', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var cityData = form.serialize();

    $('.alert').hide();

    $.ajax({
      type: 'POST', url: '/cities', data: cityData
    })
    .error(function() {
      $('.alert').show();
    })
    .success(function(cityName){
      appendToList([cityName]);
      form.trigger('reset');
    });
  });

  function appendToList(cities) {
    var list = [];
    var content, city;
    for(var i in cities){
      city = cities[i];
      content = '<a href="/cities/'+city+'">'+city+'</a>'+ // + // example on how to serve static images
        ' <a href="#" data-city="'+city+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.city-list').append(list)
  }


  $('.city-list').on('click', 'a[data-city]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/cities/' + target.data('city')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});
