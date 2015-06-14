function main() {

    var $allNotes = $('.allnotes'),
        $btnNew = $('.btn-new'),
        $btnClear = $('.btn-clear'),
        $btnDelete = $('.btn-delete'),
      $btnSearch = $('.btn-search'),
      $editNote = $('.edit-note'),
      $newNote = $('.new-note'),
      $note = $('.note'),
      $noteWarn = $('.notes-warn'),
      $search = $('#search'),
      $tagsWarn = $('.tags-warn'),
      $titleWarn = $('.title-warn'),
      title,
      tags,
      notes,
      myDate;

  $.extend($.expr[":"], {
    "contains": function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });

  $('#search-form').submit(function (e) {
    e.preventDefault();
  });

  $btnSearch.on('click', function(){
    var search = $search.val();
    $note = $('.note');
    $note.hide();
    $btnNew.hide();
    $btnClear.show();
    $(".note:contains('" + search + "')").show();
  });

  $btnClear.on('click', function() {
    $search.val('');
    $btnClear.hide();
    $btnNew.show();
    $(note).show();
  })

  $btnNew.on('click', function(){
    title = $('#title').val();
    tags = $('#tags').val();
    notes = $('#notes').val();
    $allNotes.hide();
    $newNote.show();
    $btnSearch.prop('disabled', true);
    $search.attr("placeholder", "Sorry, can't search while you're making a new note!");
    $search.prop('disabled', true);
    $editNote.hide();
    // Work on this!
    if ($editNote.is(':visisble') == true) {
      alert('Your changes have been lost, this is something I will work on');
    };
  });

  $('#post').on('click', function(){
    myDate = new Date();
    if(title.length < 1 && tags.length < 1 && notes.length < 1){
      title = $('#title').val();
      tags = $('#tags').val();
      notes = $('#notes').val();
    }
    if (title.length < 1) {
      $titleWarn.show();
    }
    if (tags.length < 1) {
      $tagsWarn.show();
    }
    if (notes.length < 1) {
      $noteWarn.show();
    }
    if (title.length >= 1 && tags.length >= 1 && notes.length >= 1) {
      $allNotes.prepend('<li class="note"><div><h1>' + title + '</h1><div class="date"><h2>'+ myDate.toDateString() +'</h2><button class="btn btn-edit">Edit</button></div><h3>' + tags + '</h3><p>' + notes + '</p></div></li>');
      $allNotes.show();
      $newNote.hide();
      $titleWarn.hide();
      $tagsWarn.hide();
      $noteWarn.hide();
      $search.prop('disabled', false);
      $search.attr("placeholder", "Search by title, tags, date, or even words/sentences in notes");
      $btnSearch.prop('disabled', false);
      title = $('#title').val('');
      tags = $('#tags').val('');
      notes = $('#notes').val('');
    }
  });

  $('.btn-save').on('click', function(){
    $allNotes.show();
    $newNote.hide();
    $btnSearch.prop('disabled', false);
    $search.attr("placeholder", "Search by title, tags, date, or even words/sentences in notes");
    $search.prop('disabled', false);
    $titleWarn.hide();
    $tagsWarn.hide();
    $noteWarn.hide();
  });

// Use on document to work with dynamically added DOM elements

  $(document).on('mouseenter', '.date', function() {
      $(this).children('h2').hide();
      $(this).children('.btn-edit').show();
  });
  $(document).on('mouseleave', '.date', function() {
      $(this).children('h2').show();
      $(this).children('.btn-edit').hide();
  });

  $(document).on('click', '.btn-edit', function(){
    $(this).parents('.note').addClass('edited-note');
    $allNotes.hide();
    $editNote.show();
    $btnSearch.prop('disabled', true);
    $search.attr("placeholder", "Sorry, can't search while you're making a new note!");
    $search.prop('disabled', true);
    $('#edit-title').val($('.edited-note').find('h1').text());
    $('#edit-tags').val($('.edited-note').find('h3').text());
    $('#edit-notes').val($('.edited-note').find('p').text());
    myDate = $('.edited-note').find('h2').text();
  });

  $('#edit').on('click', function(){
    title = $('#edit-title').val();
    tags = $('#edit-tags').val();
    notes = $('#edit-notes').val();
    if (title.length < 1) {
      $titleWarn.show();
    }
    if (tags.length < 1) {
      $tagsWarn.show();
    }
    if (notes.length < 1) {
      $noteWarn.show();
    }
    if (title.length >= 1 && tags.length >= 1 && notes.length >= 1) {
      $('.edited-note').html('<div><h1>' + title + '</h1><div class="date"><h2>'+ myDate +'</h2><span class="btn btn-edit">Edit</span></div><h3>' + tags + '</h3><p>' + notes + '</p></div>');
      $allNotes.show();
      $editNote.hide();
      $titleWarn.hide();
      $tagsWarn.hide();
      $noteWarn.hide();
      $search.prop('disabled', false);
      $search.attr("placeholder", "Search by title, tags, date, or even words/sentences in notes");
      $btnSearch.prop('disabled', false);
      $('.edited-note').removeClass('edited-note');
    }
  });

  $btnDelete.on('click', function(){
    $allNotes.show();
    $newNote.hide();
    $editNote.hide();
    $('.edited-note').addClass('deleted-note').removeClass('edited-note');
    $('.deleted-note').hide();
    $('#title').val('');
    $('#tags').val('');
    $('#notes').val('');
    $search.prop('disabled', false);
    $search.attr("placeholder", "Search by title, tags, date, or even words/sentences in notes");
    $btnSearch.prop('disabled', false);
  });

}

$(document).ready(main());
