require(["gitbook", "jQuery"], function(gitbook, $) {
  // 添加收起展开按钮
  var chapterCaret = '<svg class="chapter-caret" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="_13gjrqj"><g><polyline points="9 18 15 12 9 6"></polyline></g></svg>';

  function addCaret() {
    $('li.chapter').each(function(){
      var $chapter = $(this);
      var $chapterLink = $(this).children('a');
      var $children = $chapter.children('ul.articles');
      if ($children.length > 0) {
        $chapterLink.append(chapterCaret);
      }
    });
    $('li.chapter svg').click(function(e){
      e.preventDefault();
      e.stopPropagation();
      var $subMenus = $(this).parent().next();
      if ($(this).hasClass('chapter-caret-expanded')) {
        $subMenus.hide();
        $(this).removeClass('chapter-caret-expanded');
      } else {
        $subMenus.show();
        $(this).addClass('chapter-caret-expanded');
      }
    });
  }

  function expandCaret() {
    $('li.chapter').each(function(){
      var $chapter = $(this);
      var $subMenus = $chapter.find('ul.articles');
      if ($subMenus.length > 0) {
        $subMenus.each(function(){
          if ($(this).css('display') !== 'none') {
            $(this).prev().children('svg').addClass('chapter-caret-expanded')
          }
        })
      }
    });
  }

  function expand(chapter) {
    chapter.show();

    if (chapter.parent().attr('class') != 'summary' &&
      chapter.parent().attr('class') != 'book-summary' &&
      chapter.length != 0
    ) {
      expand(chapter.parent());
    }
  }

  gitbook.events.bind("page.change", function() {
    addCaret();

    $('li.chapter').children('ul.articles').hide();
    $chapter = $('li.chapter.active');
    $children = $chapter.children('ul.articles');
    $parent = $chapter.parent();
    $siblings = $chapter.siblings().children('ul.articles');
    expand($chapter);

    if ($children.length > 0) {
      $children.show();
    }
    expandCaret();
  });

});
