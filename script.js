/* 
 * Simple pagination plugin jQuery
 * 2013 year.
 */


(function($){
    $.fn.Pagination = function(options){
        
        var settings = $.extend({
            urlCountALL : '',
            per_page: 10,
            base_url : '',
            classActivePage: 'active',
            numlinks: 2,
            getItems: function(){},
            page: 1,
            total: null,
            pages: null,
            prevPage:null
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
            html = '<ul>';
            html += '<li class="notPage prev"><a href="#prev">' + 'Предыдущая' + '</a></li>';
          
                
            if(settings.numlinks == 0){
                html += '<li>' + createLink(settings.page) + '</li>';
            }
            
            if((settings.page - settings.numlinks) == 0 && (settings.page + settings.numlinks == settings.pages) && settings.numlinks > 0){
                   console.log("Fuck!");
            }
            
            if((settings.page - settings.numlinks) > 0 && (settings.page + settings.numlinks < settings.pages) && settings.numlinks > 0){
                html += '<li><a href="#" class="notPage">...</a></li>';
               
                for(var i = settings.page - settings.numlinks; i <= (settings.page + settings.numlinks); i++){
                    html += '<li>' + createLink(i) + '</li>';
                        
                }
                html += '<li><a href="#" class="notPage">...</a></li>';
            }
                
            if((settings.page - settings.numlinks) <= 0 && (settings.page + settings.numlinks < settings.pages) && settings.numlinks > 0){
                 
                for(var i = 1; i <= (settings.page + settings.numlinks); i++){
                    html += '<li>' + createLink(i) + '</li>';
                        
                }
                html += '<li><a href="#" class="notPage">...</a></li>';
            }

            if((settings.page - settings.numlinks) > 0 && (settings.page + settings.numlinks >= settings.pages) && settings.numlinks > 0){
                html += '<li><a href="#" class="notPage">...</a></li>';
                for(var i = settings.page - settings.numlinks; i <= settings.pages; i++){
                    html += '<li>' + createLink(i) + '</li>';
                        
                }
            }
                
            html += '<li class="notPage next"><a href="#next">' + 'Следующая' + '</a></li>';
            html += '</ul>';
            return html;
        }
        
        
        function indexPages(){
            settings.pages$ = $('#pagination').find('li');
            settings.pages$.each(
                function(n){
                    $(this).data('pager-index',n); 
                });
        }
        
        function createLink(page){
            html = '';
            html += '<a href="#' + page + '">' + page + '</a>';
            return html;
        }
        
        function getCountPages(){
            blocked = true;
            console.log(blocked);
            $.ajax({
                type: "POST",
                url: settings.urlCountALL,
                data: {
                    page: settings.page
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success : function(data){
                settings.total = data.countItems;
                settings.pages = ((settings.total - settings.total%settings.per_page)/settings.per_page) + 1;
                $('#pagination').html(populateHTML());
                indexPages();
                setActivePage();
                blocked = false;
                settings.getItems(getSettings());
                
            }
        })
        }
        
        function setActivePage(){
            $(settings.pages$).removeClass(settings.classActivePage);
            $(settings.pages$).each(function(){
                if($(this).text() == settings.page) $(this).addClass(settings.classActivePage);
            });
        }
        
        $('body').on('click', '#pagination li',function(event){
            if(blocked) return;
            if ($(this).hasClass('notPage')) return;
            
            event.preventDefault();
            settings.prevPage = settings.page;
            settings.page = parseInt($(settings.pages$[$(this).data('pager-index')]).text());
           
            getCountPages();
        });
        
        $('body').on('click', '.notPage',function(event){
            console.log(blocked);
            event.preventDefault();
            if(blocked) return;
            settings.prevPage = settings.page;
          //  if(isNaN(settings.page)) return false;
            if($(this).hasClass("prev")){
                if (settings.page == 1) {
                    settings.page =  settings.pages;
                    
                } else {
                    settings.page--;
                }
                
            }
            if($(this).hasClass("next")){
                if(settings.page ==  settings.pages){
                    settings.page = 1;
                };
                if(settings.page < settings.pages){  
                    settings.page++;
                } else {
                    settings.page = 1;
                }
                
              
            }
            getCountPages();
        });
        
       
        blocked = true;
        getCountPages();
        return;
    };
})(jQuery);


$(function(){
    $('#pagination').Pagination({
        urlCountALL: 'getCountPages.php',
        getItems: function(options){
            $.post("getItems.php", {
                options: options, 
                method: "getItems"
            }, function(data) {
                $("#items").html(data);
            }, "html");
        }
    });
});