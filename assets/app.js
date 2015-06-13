function search() {
  $('.note').toggle();
  $('.btn-new').toggle();
  $('.btn-clear').show();
}

function main() {

  $.extend($.expr[":"], {
    "contains": function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });

  $('#search-form').submit(function () {
    return false;
  });

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

  $('#save').click(function(){
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
    $(this).parents('.note').addClass('edited-note');
    $('.allnotes').hide();
    $('.edit-note').show();
    $('.btn-search').prop('disabled', true);
    $('#search').attr("placeholder", "Sorry, can't search while you're making a new note!");
    $('#search').prop('disabled', true);
    $('#edit-title').val($('.edited-note').find('h1').text());
    $('#edit-tags').val($('.edited-note').find('h3').text());
    $('#edit-notes').val($('.edited-note').find('p').text());
    // $(this).parents('.note').removeClass('edit-note');
  });

  $('#edit').click(function(){
    var title = $('#edit-title').val();
    var tags = $('#edit-tags').val();
    var notes = $('#edit-notes').val();
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
      $('.edited-note').html('<div><h1>' + title + '</h1><div class="date">      <h2>'+ myDate.toDateString() +'</h2><span class="btn btn-edit">Edit</span></div><h3>' + tags + '</h3><p>' + notes + '</p></div>');
      $('.allnotes').show();
      $('.edit-note').hide();
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
    $('.edited-note').removeClass('edited-note');
  });

  $(document).on('click', '.btn-delete', function(){
    $('.allnotes').show();
    $('.new-note').hide();
    $('.edit-note').hide();
    $('.edited-note').addClass('deleted-note').removeClass('edited-note');
    $('.deleted-note').hide();
    $('#title').val('');
    $('#tags').val('');
    $('#notes').val('');
    $('#search').prop('disabled', false);
    $('#search').attr("placeholder", "Search by title, tags, date, or even words/sentences in notes");
    $('.btn-search').prop('disabled', false);
  });
}

$(document).ready(main());
