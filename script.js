/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


(function($){
    $.fn.Pagination = function(options){
        
        var settings = $.extend({
            total: null,
            per_page: 10,
            base_url : '',
            current : null
        },options||{});
        
        function populateHTML(pages){
            html = '<ul>';
             for(var i = 1; i < pages; i++){
                 html += '<li>' + createLink(i) + '</li>';
             }
             html += '</ul>';
             
             return html;
        }
        
        function createLink(page){
           html = '';
           (page == settings.current) ? thisCurrent = "class='active'" : thisCurrent = "";
           html += '<a '+ thisCurrent +' href="'+ settings.base_url + '/?' + page +'">'+ page +'</a>';
           
           return html;
        }
        
        settings.elements$ = $('li');
        
        $('body').on('click', $(this).find('li'),function(event){
            //event.preventDefault();
            //alert("yes");
        })
        
        pages = (settings.total - settings.total%settings.per_page)/settings.per_page
       
        return $(this).html(populateHTML(pages));
       
    }; 
})(jQuery);


$(function(){
     $('#pagination').Pagination({ total: 98, per_page: 10, base_url: 'http://git.local', current : 3});
});