/**
 * This file is unique for each sample browser. It contains the logic specific to each repo for loading the samples as needed.
 */
var jsonPath = "https://pnp.github.io/powerplatform-samples/samples.json";

/**
 * Reads a sample metadata and returns a pre-populated HTML element
 * @param {*} sample 
 * @returns 
 */
function loadSample(sample, filter) {
  try {
    var title = _.escape(sample.title);
    var escapedDescription = _.escape(sample.shortDescription);
    var categories = sample.categories[0];

    // Filter our samples that don't match categories
    if (filter !== "" && categories !== filter) {
      return null;
    }

    var modified = new Date(sample.updateDateTime).toString().substr(4).substr(0, 12);

    var authors = sample.authors;
    var authorsList = "";
    var authorAvatars = "";
    var authorsGitHub = "";

    authors.forEach(author => {
      if (authorsList !== "") {
        authorsList = authorsList + ", ";
      }
      authorsList = authorsList + author.name;
      authorsGitHub = authorsGitHub + " " + author.gitHubAccount;

      var authorAvatar = `<div class="author-avatar">
            <div role="presentation" class="author-coin">
              <div role="presentation" class="author-imagearea">
                <div class="image-400">
                  <img class="author-image" loading="lazy" src="${author.pictureUrl}" alt="${author.name}" title="${author.name}">
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

    var keywords = title + " " + escapedDescription + " " + authorsList + " " + authorsGitHub + " " + tags;
    keywords = keywords.toLowerCase();

    var productTag = "powerfx";
    var productName = "Power Fx";

    switch (categories) {
      case "POWERAPPS":
        productTag = "powerapps";
        productName = "Power Apps";
        break;
      case "POWERAUTOMATE":
        productTag = "powerautomate";
        productName = "Power Automate";
        break;
      default:
        break;
    }

    var $items = $(`
        <a class="sample-thumbnail" href="${sample.url}"  data-modified="${sample.modified}" data-title="${title}" data-keywords="${keywords}" data-tags="${tags}" data-category=${categories}>
        <div class="sample-inner">
          <div class="sample-preview">
            <img src="${sample.thumbnails[0].url}" loading="lazy" alt="${title}">
          </div>
          <div class="sample-details">
            <div class="sampletype-item ${productTag}">${productName}</div>
            <p class="sample-title" title="${sample.title}">${sample.title}</p>
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

    return $items;
  } catch (error) {
    console.log("Error with one sample", error, sample);
  }
  return null;
}