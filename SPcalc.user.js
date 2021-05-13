// ==UserScript==
// @name        SPcalc
// @namespace   jiraSPCalc
// @description Jira storypoint calculator
// @include     https://your.jira.site.com/RapidBoard.jspa*
// @version     1.0
// @grant       none
// @author   Lucas Dasso / Manuel lara
// ==/UserScript==
var updateSprintMetaBox = function(){

 // Targets config
 var spItems = $('body').find('aui-badge[title="Story Points"]'); //All story points
 var spDone = $('.ghx-column[data-column-id="571"]').find('aui-badge[title="Story Points"]');
 var spMetaBox = $('body').find('.ghx-view-section'); //Sprint meta box on page header

 // Clean previous SPMetas
 $(spMetaBox).find('span.story-points-metabox').remove();

//Sum the SP
 var spCount = $(spItems).length;
 var spSum = 0;
 var spSumDone = 0;
 $.each(spItems, function(key, item){
 spSum += parseInt($(item).text()) || 0;
 })
  $.each(spDone, function(key, item){
 spSumDone += parseInt($(item).text()) || 0;
 })

 //console.table({spCount, spSum});

 // Add SP meta message to page header
 $(spMetaBox).prepend(`
 <span class="story-points-metabox">
 <span class="aui-icon aui-icon-small aui-iconfont-vid-full-connection-circle">Story Points meta</span>
 Total: ${spSum}, Remain: ${(spSum - spSumDone)}
 </span>
 `);
}

// On page load
setTimeout(updateSprintMetaBox, 2000);

//Listener

$('body').on('DOMSubtreeModified', ".subnav-container", function(){
   $(document).ready(function(){
    this.updateSprintMetaBox();
});
 setTimeout(updateSprintMetaBox, 2000);
});

    
