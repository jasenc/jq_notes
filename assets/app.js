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

blog = {

  searching: function() {
  $btnClear.show();
  $btnNew.hide();
  $note.hide();
  var search = $search.val();
  $note = $('.note');
  $(".note:contains('" + search + "')").show();
  },

  clearing: function() {
    $btnClear.hide();
    $btnNew.show();
    $note.show();
    $search.val('');
  },

  toNewNote: function() {
    $allNotes.toggle();
    $newNote.toggle();
  },

  toEditNote: function() {
    $allNotes.toggle();
    $editNote.toggle();
  },

  disableSearch: function() {
    $btnSearch.prop('disabled', true);
    $search.attr("placeholder", "Sorry, can't search while you're making a new note!");
    $search.prop('disabled', true);
  },

  enableSearch: function () {
    $search.prop('disabled', false);
    $search.attr("placeholder", "Search by title, tags, date, or even words/sentences in notes");
    $btnSearch.prop('disabled', false);
  },

  warnings: function() {
    if (title.length < 1) {
      $titleWarn.show();
    }
    if (tags.length < 1) {
      $tagsWarn.show();
    }
    if (notes.length < 1) {
      $noteWarn.show();
    }
  },

  closeWarnings: function() {
    $titleWarn.hide();
    $tagsWarn.hide();
    $noteWarn.hide();
  },

  clearNote: function() {
    title = $('#title').val('');
    tags = $('#tags').val('');
    notes = $('#notes').val('');
  },

  checkNotes: function() {
    title = $('#title').val();
    tags = $('#tags').val();
    notes = $('#notes').val();
  },
}

function main() {

  $.extend($.expr[":"], {
    "contains": function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });

  $('#search-form').submit(function (e) {
    e.preventDefault();
  });

  $btnSearch.on('click', function(){
    blog.searching($(this));
  });

  $btnClear.on('click', function() {
    blog.clearing($(this));
  })

  $btnNew.on('click', function(){
    blog.checkNotes($(this));
    blog.disableSearch($(this));
    blog.toNewNote($(this));
    $btnNew.prop('disabled', true);
  });

  $('#post').on('click', function(){
    myDate = new Date();
    if(title.length < 1 && tags.length < 1 && notes.length < 1){
      blog.checkNotes($(this));
    }
    blog.warnings($(this));
    if (title.length >= 1 && tags.length >= 1 && notes.length >= 1) {
      $allNotes.prepend('<li class="note"><article><h1>' + title + '</h1><div class="date"><h2>'+ myDate.toDateString() +'</h2><button class="btn btn-edit">Edit</button></div><h3>' + tags + '</h3><div class=\'content\'>' + notes + '</div></article></li>');
      blog.toNewNote($(this));
      blog.closeWarnings($(this));
      blog.enableSearch($(this));
      blog.clearNote($(this));
      $btnNew.prop('disabled', false);
    }
  });

  $('.btn-save').on('click', function(){
    blog.toNewNote($(this));
    blog.enableSearch($(this));
    blog.closeWarnings($(this));
    $btnNew.prop('disabled', false);
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
    blog.toEditNote($(this));
    blog.disableSearch($(this));
    $('#edit-title').val($('.edited-note').find('h1').text());
    $('#edit-tags').val($('.edited-note').find('h3').text());
    $('#edit-notes').val($('.edited-note').find('p').text());
    myDate = $('.edited-note').find('h2').text();
    $btnNew.prop('disabled', true);
  });

  $('#edit').on('click', function(){
    title = $('#edit-title').val();
    tags = $('#edit-tags').val();
    notes = $('#edit-notes').val();
    blog.warnings($(this));
    if (title.length >= 1 && tags.length >= 1 && notes.length >= 1) {
      $('.edited-note').html('<artcile><h1>' + title + '</h1><div class="date"><h2>'+ myDate +'</h2><span class="btn btn-edit">Edit</span></div><h3>' + tags + '</h3><div content=\'content\'>' + notes + '</div></artcile>');
      blog.toEditNote($(this));
      blog.closeWarnings($(this));
      blog.enableSearch($(this));
      $('.edited-note').removeClass('edited-note');
    }
    $btnNew.prop('disabled', false);
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
    blog.enableSearch($(this));
    $btnNew.prop('disabled', false);
  });

}

$(document).ready(main());
