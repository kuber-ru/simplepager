PrintVar
=========

Функция для вывода значений переменных на экран в php.

Плюшки:
* Переменная распечатывается в диалоговом окне,
* Вместе со значением переменной выводится информация о её типе,
* Значение массивов, объектов и функций можно сворачивать,
* Для переменных типа объект выводится информация о публичных полях и функциях,
* Для функций выводится список параметров вместе со значениями по-умолчанию,
* В шапке диалогового окна выводится информация о месте вызова функции.

<p align="center">
  <img src="https://github.com/xescoder/print_var/blob/master/demo.png?raw=true">
</p>

Использование
-------------

1.  Подключаем print_var.php где-нибудь в начале страницы,
2.  Пользуемся.

`````php
// Подключение print_var
include 'print_var.php';

// Вывод значения переменной $str
$str = 'variable';
print_var($str);
`````

Деактивация
-----------

В случае если необходимо экстренно деактивировать все вызовы print_var достаточно определить константу DISABLE_PRINT_VAR в начале страницы.

`````php
// Деактивация print_var
define('DISABLE_PRINT_VAR', true);
`````