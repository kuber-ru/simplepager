/* 
 * Simple pagination plugin jQuery
 * 2013 year.
 */


(function($){
    $.fn.Pagination = function(options){
        
        var settings = $.extend({
            per_page: 10,
            base_url : '',
            urlCountALL : '',
            classActivePage: 'active',
            numlinks: 3,
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
               total:  settings.total,
               classActivePage: settings.classActivePage
            }
        }
        function populateHTML(){
            pages = (settings.total - settings.total%settings.per_page)/settings.per_page
            html = '<ul>';
            html += '<li class="notPage prev"><a href="#prev">' + 'Предыдущая' + '</a></li>';
                for(var i = 1; i <= pages + 1; i++){
                    html += '<li>' + createLink(i) + '</li>';
                }
            html += '<li class="notPage next"><a href="#next">' + 'Следующая' + '</a></li>';
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
           html += '<a href="#' + page + '">' + page + '</a>';
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
            $(settings.pages$).removeClass(settings.classActivePage);
            $(settings.pages$).each(function(){
                if($(this).text() == settings.page) $(this).addClass(settings.classActivePage);
            });
        }

          
        settings.start(this);
        
        
        $('body').on('click', '#pagination li',function(event){
           
            if ($(this).hasClass('notPage')) return;
            
            event.preventDefault();
            settings.clickPage(getSettings());
            settings.page = $(settings.pages$[$(this).data('pager-index')]).text();
            getCountPages();
        });
        
        $('body').on('click', '.notPage',function(event){
           event.preventDefault();
           pages = (settings.total - settings.total%settings.per_page)/settings.per_page;
           if($(this).hasClass("prev")){
               if (settings.page == 1) {
                   settings.page =  pages + 1
               } else {
                   settings.page--;
               }
           }
           if($(this).hasClass("next")){
               if(settings.page ==  pages + 1){
                   settings.page = 1;
               } else {
                   settings.page++;
               }    
           }
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
         classActivePage: 'active',
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