$(document).ready(function () {
    var ingredientsArray = document.getElementsByName("ingredience[]");
    console.log(ingredientsArray);
    var pocet = 1;
    var celkem = 0;
    
    var cena;
    $('.pizza').click(function () {
        $('#pizza-shrnuti').text(this.value);
        cena = parseInt(this.getAttribute("data-price"));
        $('#checkboxy').show();
        console.log(cena);
        aktualizujCenu();
    });
    $('#pocet').change(function () {
        pocet = parseInt(this.value);
        console.log(pocet);
        $('#pizza-pocet').text(pocet);
        aktualizujCenu();
    });
    
    var zaDoplnky = 0;
    $('.ingredience-navic').click(function () {
        var pridatIngr = "";
        zaDoplnky = 0;
        for (let index = 0; index < ingredientsArray.length; index++) {
            if (ingredientsArray[index].checked) {
                pridatIngr += ingredientsArray[index].getAttribute("data-value") + "<br>";
                zaDoplnky += parseInt(ingredientsArray[index].getAttribute("data-price"));
            }
        }
        $('#pridano').html(pridatIngr);
        aktualizujCenu();
    });
    
    $('#pridej').click(function () {
        $('#kosik').append('<div class=".polozka" data-price=' + $("#cena-za-pizzu").text() + '>' + $('#pizza-shrnuti').html() + "<br>" + $('#pizza-pocet').html() + "<br>" + $("#pridano").html() + "<br>" + "<button class='odebrat'>Odebrat</button></div>");
        celkem += pocet * (cena + zaDoplnky);
        aktualizujCenu();
        
        vynuluj();
    });
    
    $(document).on('click', '.odebrat', function () {
        celkem -= parseInt($(this).closest('div').attr("data-price"));
        console.log(celkem);
        $(this).closest('div').remove();
        aktualizujCenu();
    });
    // $('.odebrat').click(function(){});
    
    $('#sladka').click(function () {
        $('#checkboxy').hide();
    });

    $('#odeslat').click(function(){
$('#odeslat').after('<p>Objednavka odeslana!</p>')
    });
    
    function aktualizujCenu() {
        $('#cena-za-pizzu').text(pocet * (cena + zaDoplnky));
        $('#cena-celkem').text(celkem);
    }
    
    function vynuluj() {
        for (let index = 0; index < ingredientsArray.length; index++) {
            ingredientsArray[index].checked = false;
        }
        zaDoplnky = 0;
        pridatIngr = "";
        $('#pizza-shrnuti').text('Vyberte dalsi pizzu');
        $('#cena-za-pizzu').text("0");
        $("#pridano").text('');
        $('#pizza-pocet').text(1);
        $("#pocet").val(1);
        pocet = 1;
    }


});

