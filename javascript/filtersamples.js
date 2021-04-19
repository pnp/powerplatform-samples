// external js: isotope.pkgd.js

$(document).ready(function () {
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.sample-thumbnail',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function (itemElem) {
        var weight = $(itemElem).find('.weight').text();
        return parseFloat(weight.replace(/[\(\)]/g, ''));
      }
    }
  });

  $.getJSON("/samples.json", function (data) {
    console.log("data", data);
    $.each(data, function (_u, sample) {

      try {
        var title = _.escape(sample.title);
        var escapedDescription = _.escape(sample.shortDescription);
        var categories = sample.categories[0];
        var modified = new Date(sample.modified).toString().substr(4).substr(0, 12);
  
        var authors = sample.authors;
        var authorsList = "";
        var authorAvatars = "";
  
        authors.forEach(author => {
          if (authorsList !== "") {
            authorsList = authorsList + ", ";
          }
          authorsList = authorsList + author.name;
  
          var authorAvatar = `<div class="author-avatar">
            <div role="presentation" class="author-coin">
              <div role="presentation" class="author-imagearea">
                <div class="image-400">
                  <img class="author-image" src="${author.pictureUrl}" alt="${author.name}" title="${author.name}">
                </div>
              </div>
            </div>
          </div>`;
          authorAvatars = authorAvatar + authorAvatars;
        });
  
        var authorName = authors[0].name;
        if (authors.length > 1) {
          authorName = authorName + ` +${authors.length - 1}`;
        }
  
        var tags = "";
        $.each(sample.tags, function (_u, tag) {
          tags = tags + "#" + tag + ",";
        });
  
        var keywords = title + escapedDescription + authorsList + tags;
        keywords = keywords.toLowerCase();

        var productTag = "powerfx";
        var productName = "Power Fx";
        
        switch (categories) {
          case "POWERAPPS":
            productTag = "powerapps";
            productName = "Power Apps";
            break;
        
          default:
            break;
        }
  
        // $("#sample-listing").append(`<a class="sample-thumbnail" href="${sample.url}" id="${sample.name}" data-modified='${sample.modified}' data-title='${title}' data-categories='${categories}' data-description='${escapedDescription}' data-keywords='${keywords}' title='${escapedDescription}'>
        // <div class="sample-preview"><img src="${sample.thumbnails[0].url}" alt="${title}"></div>
        // <div class="sample-details"><div class="producttype-item powerapps">Power Apps</div><p class="sample-title">${sample.title}</p>
        // <p class="sample-description" title='${escapedDescription}'>${sample.shortDescription}</p>
        // <div class="sample-activity">
        // ${authorAvatars}
        // <div class="activity-details">
        // <span class="sample-author" title="${authorsList}">${authorName}</span>
        // <span class="sample-date">Modified ${modified}</span>
        // </div>
        // </div>
        // </div></a>`);
  
        var $items = $(`
        <a class="sample-thumbnail" href="${sample.url}"  data-modified="${sample.modified}" data-title="${title}" data-keywords="${keywords}" data-tags="${tags}" data-category=${categories}>
        <div class="sample-inner">
          <div class="sample-preview">
            <img src="${sample.thumbnails[0].url}" alt="${title}">
          </div>
          <div class="sample-details">
            <div class="producttype-item ${productTag}">${productName}</div>
            <p class="sample-title">${sample.title}</p>
            <p class="sample-description" title='${escapedDescription}'>${sample.shortDescription}</p>
            <div class="sample-activity">
              ${authorAvatars}
              <div class="activity-details">
              <span class="sample-author" title="${authorsList}">${authorName}</span>
              <span class="sample-date">Modified ${modified}</span>
            </div>
          </div>
        </div>
      </div>
    </a>`);
        //$grid.isotope( 'appended', elements );
        $grid.append($items)
          // add and lay out newly appended items
          .isotope('appended', $items);
      } catch (error) {
        console.log("Error with one sample", error);
      }
    }); 
  });




  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
      var number = $(this).find('.number').text();
      return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function () {
      var name = $(this).find('.name').text();
      return name.match(/ium$/);
    }
  };

  // bind filter button click
  $('#filters').on('click', '.filter-choice', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
   // change is-checked class on buttons
  $('.filter-list').each(function (_i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', '.filter-choice', function () {
      $buttonGroup.find('.active').removeClass('active');
      $(this).addClass('active');
    });
  });





  //post-search-input

  // // init Isotope -- new
  // // var $grid = $('#sample-listing').isotope({
  // //   itemSelector: '.sample-thumbnail',
  // //   layoutMode: 'fitRows',
  // //   containerStyle: null,
  // //   resize: true,
  // //   initLayout: false
  // // });

  // // init isotope -- old

  // // init Isotope
  // var $grid = $('.grid').isotope({
  //   itemSelector: '.sample-item',
  //   layoutMode: 'fitRows',
  //   // sortAscending: false,
  //   // sortBy: 'modified',
  //   // getSortData: {
  //   //   title: '[data-title]',
  //   //   // number: '.number parseInt',
  //   //   modified: '[data-modified]'
  //   // }
  // });


  $("#post-search-input").on('change keyup paste', function () {
    var selection = $('#post-search-input').val();
    if (selection !== "") {
      selection = selection.toLowerCase();
      $grid.isotope({ filter: `[data-keywords*='${selection}']` });
    } else {
      $grid.isotope({ filter: '*' });
    }
  });

  // var filterFns = {
  //   hasTech: function () {
  //     return $(this).find(':not([data-technology=""])');
  //   },
  //   // show if number is greater than 50
  //   hasPnPjs: function () {
  //     var name = $(this).attr('data-technology');
  //     return name.indexOf('PnPjs') != -1;
  //   },
  //   hasCognitive: function () {
  //     var name = $(this).attr('data-technology');
  //     return name.indexOf('AzureCognitiveServices') != -1;
  //   },
  //   hasBot: function () {
  //     var name = $(this).attr('data-technology');
  //     return name.indexOf('AzureBotServices') != -1;
  //   },
  //   hasInsights: function () {
  //     var name = $(this).attr('data-technology');
  //     return name.indexOf('AzureAppInsights') != -1;
  //   }, hasFunctions: function () {
  //     var name = $(this).attr('data-technology');
  //     return name.indexOf('AzureFunctions') != -1;
  //   },
  //   hasGitHub: function () {
  //     var name = $(this).attr('data-technology');
  //     return name.indexOf('GitHub') != -1;
  //   }
  // };

  // // bind filter button click
  // $('.filters-button-group').on('click', 'button', function () {
  //   var filterValue = $(this).attr('data-filter');
  //   // use filterFn if matches value
  //   filterValue = filterFns[filterValue] || filterValue;
  //   $grid.isotope({ filter: filterValue });
  // });
  // // change is-checked class on buttons
  // $('.button-group').each(function (i, buttonGroup) {
  //   var $buttonGroup = $(buttonGroup);
  //   $buttonGroup.on('click', 'button', function () {
  //     $buttonGroup.find('.is-checked').removeClass('is-checked');
  //     $(this).addClass('is-checked');
  //   });
  // });

  // // bind sort button click
  // $('.sort-button-group').on('click', 'button', function () {

  //   /* Get the element name to sort */
  //   var sortValue = $(this).attr('data-sort-value');

  //   /* Get the sorting direction: asc||desc */
  //   var direction = $(this).attr('data-sort-direction');

  //   /* convert it to a boolean */
  //   var isAscending = (direction == 'asc');
  //   var newDirection = (isAscending) ? 'desc' : 'asc';

  //   /* pass it to isotope */
  //   $grid.isotope({ sortBy: sortValue, sortAscending: isAscending });

  //   $(this).attr('data-sort-direction', newDirection);
  // });


  // Trigger animation on GIF hover
  // $("a img[data-fullsize$='.gif']").hover((e) => {
  //   // on mouse enter
  //   var img = e.target;
  //   var customdata = $(img).data('fullsize');
  //   $(img).attr('src', customdata);
  // }, (e) => {
  //   // on mouse leave
  //   var img = e.target;
  //   var customdata = $(img).data('orig');
  //   $(img).attr('src', customdata);
  // });

  // $("#author").on('change keyup paste', function () {
  //   console.log('I am pretty sure the text box changed');
  //   var selection = $('#author').val();
  //   if (selection !== "") {
  //     console.log('Selection', selection, `[data-author*='${selection}']`);
  //     $grid.isotope({ filter: `[data-author*='${selection}']` });
  //   } else {
  //     $grid.isotope({ filter: '*' });
  //   }

  // });

  // $("#keyword").on('change keyup paste', function () {
  //   var selection = $('#keyword').val();
  //   if (selection !== "") {
  //     $grid.isotope({ filter: `[data-keywords*='${selection}']` });
  //   } else {
  //     $grid.isotope({ filter: '*' });
  //   }

  // });



  // Make samples data sortal
  $('#samplestable th').each(function (col) {
    $(this).hover(
      function () { $(this).addClass('focus'); },
      function () { $(this).removeClass('focus'); }
    );
    $(this).click(function () {
      if ($(this).is('.asc')) {
        $(this).removeClass('asc');
        $(this).addClass('desc selected');
        sortOrder = -1;
      }
      else {
        $(this).addClass('asc selected');
        $(this).removeClass('desc');
        sortOrder = 1;
      }
      $(this).siblings().removeClass('asc selected');
      $(this).siblings().removeClass('desc selected');
      var arrData = $('table').find('tbody >tr:has(td)').get();
      arrData.sort(function (a, b) {
        var val1 = $(a).children('td').eq(col).text().toUpperCase();
        var val2 = $(b).children('td').eq(col).text().toUpperCase();
        if ($.isNumeric(val1) && $.isNumeric(val2))
          return sortOrder == 1 ? val1 - val2 : val2 - val1;
        else
          return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
      });
      $.each(arrData, function (index, row) {
        $('tbody').append(row);
      });
    });
  });
});