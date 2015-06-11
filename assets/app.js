$(document).ready(function(){

  alert('ready!')

  $(document).on('click', '.btn-search', function(){
    var search = $('#search').val();
    $('.note').hide();
    $('.btn-new').hide();
    $('.btn-clear').show();
    $(".note:contains('" + search + "')").show();
  });

  $(document).on('click','.btn-clear', function() {
    $('#search').val('');
    $('.btn-clear').hide();
    $('.btn-new').show();
    $('.note').show();
  })

  $(document).on('click', '.btn-new', function(){
    $('.allnotes').hide();
    $('.new-note').show();
    $('.btn-search').prop('disabled', true);
    $('#search').attr("placeholder", "Sorry, can't search while you're making a new note!");
    $('#search').prop('disabled', true);
  });

  $('.btn-save').click(function(){
    var title = $('#title').val();
    var tags = $('#tags').val();
    var notes = $('#notes').val();
    var myDate = new Date();
    if (title.length < 1) {
      $('.title-warn').show();
    }
    if (tags.length < 1) {
      $('.tags-warn').show();
    }
    if (notes.length < 1) {
      $('.notes-warn').show();
    }
    if (title.length >= 1 && tags.length >= 1 && notes.length >= 1) {
      $('.allnotes').prepend('<li class="note"><div><h1>' + title + '</h1><div class="date">      <h2>'+ myDate.toDateString() +'</h2><span class="btn btn-edit">Edit</span></div><h3>' + tags + '</h3><p>' + notes + '</p></div></li>');
      $('.allnotes').show();
      $('.new-note').hide();
      $('.title-warn').hide();
      $('.tags-warn').hide();
      $('.notes-warn').hide();
    }
    $('#title').val('');
    $('#tags').val('');
    $('#notes').val('');
    $('#search').prop('disabled', false);
    $('#search').attr("placeholder", "Search by title, tags, date, or even words/sentences in notes");
    $('.btn-search').prop('disabled', false);
  });

  $(document).on('mouseenter', '.date',  function(){
      $(this).children('h2').hide();
      $(this).children('.btn-edit').show();
    });
    $(document).on('mouseleave', '.date', function(){
      $(this).children('h2').show();
      $(this).children('.btn-edit').hide();
    });

  $(document).on('click', '.btn-edit', function(){
    $(this).parents('.note').addClass('edit-note');
    $('.allnotes').hide();
    $('.new-note').show();
    $('.btn-search').prop('disabled', true);
    $('#search').attr("placeholder", "Sorry, can't search while you're making a new note!");
    $('#search').prop('disabled', true);
    $('#title').val($('.edit-note').find('h1').text());
    $('#tags').val($('.edit-note').find('h3').text());
    $('#notes').val($('.edit-note').find('p').text());
    $(this).parents('.note').removeClass('edit-note');
  });

  $(document).on('click', '.btn-delete', function(){
    $('.allnotes').show();
    $('.new-note').hide();
    $('#title').val('');
    $('#tags').val('');
    $('#notes').val('');
    $('#search').prop('disabled', false);
    $('#search').attr("placeholder", "Search by title, tags, date, or even words/sentences in notes");
    $('.btn-search').prop('disabled', false);
  });
});
