ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));

    return that;
  },

  showReviews: function() {
    var that = this;

    LLC.comments.each(function(comment) {
      var commentRange = document.createRange();
      var noteBodyNode = document.getElementById('noteBodyParentNode').lastChild;
      commentRange.setStart(noteBodyNode, comment.get('anchorOffset'));
      commentRange.setEnd(noteBodyNode, comment.get('focusOffset'));
      var commentDiv = document.createElement("span");
      commentDiv.className = "comment comment" + comment.id;
      commentRange.surroundContents(commentDiv);

      var $commentedRange = $('.comment' + comment.id);
      var $commentPocket = $('<span class="commentPocket"></span>');
      $commentedRange.prepend($commentPocket);
      that.setReviewListener(that, $commentedRange, $commentPocket, comment.id, true);
    });

  },



  //   LLC.comments.each(function(comment) {
  //     that['commentStyler' + comment.id] = rangy.createCssClassApplier("comment comment" + comment.id);
  //     var range = rangy.deserializeRange(comment.attributes.range);
  //     that['commentStyler' + comment.id].applyToRange(range);
  //   })

  //   LLC.revisions.each(function(revision) {
  //     that['revisionStyler' + revision.id] = rangy.createCssClassApplier("revision revision" + revision.id);
  //     var range = rangy.deserializeRange(revision.attributes.range);
  //     that['revisionStyler' + revision.id].applyToRange(range);
  //   })

  //   LLC.comments.each(function(comment) {
  //     var $commentedRange =  $('.comment' + comment.id);
  //     var $commentPocket = $('<span class="commentPocket"></span>');
  //     $commentedRange.prepend($commentPocket);
  //     that.setReviewListener(that, $commentedRange, $commentPocket, comment.id, true);
  //   })

  //   LLC.revisions.each(function(revision) {
  //     var $revisionedRange =  $('.revision' + revision.id);
  //     var originalText = $revisionedRange.html();
  //     $revisionedRange.html(revision.get('body'));
  //     var $revisionPocket = $('<span class="revisionPocket"></span>');
  //     $revisionedRange.prepend($revisionPocket);
  //     that.setReviewListener(that, $revisionedRange, $revisionPocket, revision.id, false, originalText);
  //   })
  // },



  setReviewListener: function(that, $reviewedRange, $reviewPocket, markId, isComment, originalText) {
    var that = this;

    $reviewedRange.on('mouseover',
      that.showReviewText.bind(that, $reviewedRange, $reviewPocket, markId, isComment, originalText));
  },

  maxWordLength: function(reviewText) {
        maxWordLength = 0;
    consecutiveNonWhitespaceChar = 0;
    for(i = 0; i < reviewText.length; i++) {
      if(reviewText.substring(i, i+1) == " ") {
        if(consecutiveNonWhitespaceChar > maxWordLength) {
          maxWordLength = consecutiveNonWhitespaceChar;
        }
        consecutiveNonWhitespaceChar = 0;
      } else {
        consecutiveNonWhitespaceChar++;
      }
    }
    if(consecutiveNonWhitespaceChar > maxWordLength) {
      maxWordLength = consecutiveNonWhitespaceChar;
    }

    // constant accounts for em not being average character length
    return maxWordLength * 0.6;
  },

  widthGuess: function(reviewText) {
    if(reviewText.length < 31) {
      return (reviewText.length * 0.3);
    } else {
      return (reviewText.length * 0.3)/(Math.floor(reviewText.length/30));
    }
  },

  reviewTextWidth: function(reviewText) {

    maxWordLength = this.maxWordLength(reviewText);
    widthGuess = this.widthGuess(reviewText);

    if(widthGuess < maxWordLength) {
      return ' style="width: ' + maxWordLength + 'em"';
    } else {
      return ' style="width: ' + widthGuess + 'em"';
    }
  },

  showReviewText: function($reviewedRange, $reviewPocket, markId, isComment, originalText) {
    // var reviewText = isComment ? LLC.comments.get(k).get('body') : LLC.revisions.get(k).get('body')
    var reviewText = isComment ? LLC.comments.get(markId).get('body') : originalText
    $reviewPocket.append('<span class=' + (isComment ? 'commentText' : 'revisionText') +
      this.reviewTextWidth(reviewText) + '>' + reviewText + '</span>');
    $reviewedRange.on('mouseout', function() {
      $reviewPocket.empty();
    })
  },
})