SimplePager
=========

SimplePager - это простейший jQuery плагин для реализации постраницчного предоставления данных (пагинации).

  - не перезагружает страницу (Ajax) при переходе по страницам;


Version
-

1.0

Использование
-----------

Для простейшей инициализации достаточно указать URL по которому будет доступно общее количество элементов:

```php
$('.pagination').SimplePager({
        urlCountALL: 'getCountItems.php'
});
```

Для получения элементов для текущей таблицы предусмотрен метод getItems. Она вызывается при изменении страницы в EasyPager. В эту функцию передается объект, который содержит практически все необходимые для получения верных данных параметры.

```php
$('.pagination').SimplePager({
        urlCountALL: 'getCountItems.php',
        getItems: function(options){
            $.post("getItems.php", { options: options }, 
                function(data) { $("#items").html(data);}
            , "html");
        }
    });
```

```html
<div id="pagination" class="pagination"></div>
<div id="items" class="items"></div>
```

Дополнительные параметры:
```php
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
```