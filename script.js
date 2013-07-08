/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


(function($){
    $.fn.Pagination = function(options){
        
        var settings = $.extend({
            per_page: 10,
            base_url : '',
            urlCountALL : '',
            start : function(){},
            finish : function(){},
            pushQuery: function(){},
            receiveQuery: function(){},
            clickPage: function(){},
            page: 1,
            total: null
            
        },options||{});
        
        function getSettings(){
            return {
               per_page: settings.per_page,
               base_url : settings.base_url,
               urlCountALL : settings.urlCountALL,
               page: settings.page,
               total:  settings.total 
            }
        }
        function populateHTML(){
            pages = (settings.total - settings.total%settings.per_page)/settings.per_page
             html = '<ul>';
                for(var i = 1; i <= pages + 1; i++){
                    html += '<li>' + createLink(i) + '</li>';
                }
             html += '</ul>';
        return html;
        }
        
        function indexPages(){
        settings.pages$ = $('#pagination').find('li');
            settings.pages$.each(
                function(n){ $(this).data('pager-index',n); 
            });
        }
        
        function createLink(page){
           html = '';
           html += '<a href="' + settings.base_url + '/?' + page + '">' + page + '</a>';
           return html;
        }
        
        function getCountPages(){
            settings.pushQuery(this);
            $.getJSON(settings.urlCountALL, {page: settings.page}, function(data) {
   
                settings.receiveQuery(data);
                
                settings.total = data.countPages;
                
                $('#pagination').html(populateHTML());
                indexPages();
                setActivePage();
            });
        }
        
        function setActivePage(){
            $(settings.pages$).removeClass('active');
            $(settings.pages$).each(function(){
                if($(this).text() == settings.page) $(this).addClass('active');
            });
        }

          
        settings.start(this);
        $('body').on('click', '#pagination li',function(event){
            event.preventDefault();
            settings.clickPage(getSettings());
            settings.page = $(settings.pages$[$(this).data('pager-index')]).text();
            getCountPages();
        });
        
        getCountPages();
        settings.finish(this);
        
        return;
       
    }; 
})(jQuery);


$(function(){
     $('#pagination').Pagination({
         urlCountALL: 'pagination.php',
         per_page: 10,
         finish: function(){
           //  console.log("pager: Успешно создан!");
         },
         clickPage: function(options){
             console.log(options);
         },
         start: function(){
           //  console.log("pager: Начало инициализации!");
         },
         receiveQuery: function(data){
            // console.log(data);
         }
     });
});