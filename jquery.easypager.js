/* 
 * Simple pagination plugin jQuery
 * 2013 year.
 */


(function($){
    $.fn.SimplePager = function(options){
        
        var settings = $.extend({
            urlCountALL : '',
            per_page: 10,
            classActivePage: 'active',
            classPrev: 'prev',
            classNext: 'next',
            textPrev: 'Предыдущая',
            textNext: 'Следующая',
            dataWithPage: {},
            numlinks: 3,
            getItems: function(){},
            page: 1,
            total: null,
            pages: null,
            prevPage:null
        },options||{});
        
        paginationContainer = this;
        
        function getSettings(){
            return {
                per_page: settings.per_page,
                urlCountALL : settings.urlCountALL,
                page: settings.page,
                total:  settings.total,
                classActivePage: settings.classActivePage,
                dataWithPage: settings.dataWithPage,
                numlinks: settings.numlinks,
                limit: settings.per_page,
                offset: (settings.page - 1)*settings.per_page
            }
        }
        
        function populateHTML(){
            html = '<ul>';
            html += '<li class="notPage '+ settings.classPrev +'"><a href="javascript:void(0)">' + settings.textPrev + '</a></li>';
          
                
            if(settings.numlinks == 0){
                html += '<li>' + createLink(settings.page) + '</li>';
            }
            
            
            if((settings.page - settings.numlinks) <= 1 && (settings.page + settings.numlinks < settings.pages) && settings.numlinks > 0){
                for(var i = 1; i <= (settings.page + settings.numlinks); i++){
                    html += '<li>' + createLink(i) + '</li>';
                }
                html += '<li class="notPage"><a href="javascript:void(0)" >...</a></li>';
            }
            
            if((settings.page - settings.numlinks) > 1 && (settings.page + settings.numlinks < settings.pages) && settings.numlinks > 0){
                html += '<li class="notPage"><a href="javascript:void(0)" >...</a></li>';
                for(var i = settings.page - settings.numlinks; i <= (settings.page + settings.numlinks); i++){
                    html += '<li>' + createLink(i) + '</li>';
                        
                }
                
                html += '<li  class="notPage"><a href="javascript:void(0)">...</a></li>';
            }
                
           

            if((settings.page - settings.numlinks) > 0 && (settings.page + settings.numlinks >= settings.pages) && settings.numlinks > 0){
                html += '<li class="notPage"><a href="javascript:void(0)" >...</a></li>';
                for(var i = settings.page - settings.numlinks; i <= settings.pages; i++){
                    html += '<li>' + createLink(i) + '</li>';
                        
                }
            }
                
            html += '<li class="notPage '+ settings.classNext +'"><a href="javascript:void(0)">' + settings.textNext + '</a></li>';
            html += '</ul>';
            return html;
        }
        
        function indexPages(){
            settings.pages$ = $(paginationContainer).find('li');
            settings.pages$.each(
                function(n){
                    $(this).data('pager-index',n); 
                });
        }
        
        function createLink(page){
            html = '';
            html += '<a href="javascript:void(0)' + page + '">' + page + '</a>';
            return html;
        }
        
        function getCountPages(){
           if(isNaN(settings.page))return;
           settings.dataWithPage['page'] = settings.page;
            $.ajax({
                type: "POST",
                url: settings.urlCountALL,
                data:  settings.dataWithPage,
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success : function(data){
                settings.total = data.countItems;
                settings.pages = ((settings.total - settings.total%settings.per_page)/settings.per_page) + 1;
                $(paginationContainer).html(populateHTML());
                indexPages();
                setActivePage();
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
        
        ($(paginationContainer)).on('click', 'li',function(event){
            if ($(this).hasClass('notPage')) return;
            
            event.preventDefault();
            settings.prevPage = settings.page;
            
            settings.page = parseInt($(settings.pages$[$(this).data('pager-index')]).text());
           
            getCountPages();
        });
        
        $(paginationContainer).on('click', '.notPage',function(event){
            event.preventDefault();
            settings.prevPage = settings.page;
            
            if($(this).hasClass(settings.classPrev)){
                (settings.page <= 1) ? settings.page =  settings.pages : settings.page--;
            }
            
            if($(this).hasClass(settings.classNext)){
                (settings.page < settings.pages) ?  settings.page++ : settings.page = 1;
            }
            
            getCountPages();
        });
        
        getCountPages();
        return;
    };
})(jQuery);


$(function(){
    $('.pagination').SimplePager({
        urlCountALL: 'getCountItems.php', // URL по которому можно получить общее количество элементов
        per_page: 10, // Количество элементов на каждой странице
        classActivePage: 'active', // CSS класс для активной страницы
        classPrev: 'prev', // CSS класс для ссылки "предыдущая"
        classNext: 'next', // CSS класс для ссылки "следующая"
        textPrev: 'Предыдущая', // текст для ссылки "предыдущая"
        textNext: 'Следующая', // текст для ссылки "следующая"
        dataWithPage: {}, // JS объект для передачи дополнительных параметров при переключении страниц
        numlinks: 3, // количество ссылок, которое будет обрамлять активную страницу
        getItems: function(){}, // Метод для получения самих элементов
        page: 1, // Начальная страница
        getItems: function(options){
            $.post("getItems.php", { options: options }, 
                function(data) { $("#items").html(data);}
            , "html");
        }
    });
});